import { PRODUCTS, CATEGORIES, MOCK_REVIEWS, POPULAR_CITIES } from './products.js';

// ==========================================
// 1. APP STATE
// ==========================================
let state = {
  cart: JSON.parse(localStorage.getItem('royalsphire_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('royalsphire_wishlist')) || [],
  selectedCategory: 'all',
  hasSelectedCategory: false,
  searchTerm: '',
  selectedProductId: null,
  selectedVariant: '',
  directCheckoutItem: null, // used for single "Buy Now" instant checkout
  activeCheckoutItems: []   // array of items checking out
};

// Timer counts
let cartTimerSeconds = 600; // 10:00
let checkoutDiscountSeconds = 525; // 08:45

// ==========================================
// 2. HELPER UTILITIES
// ==========================================
function saveCart() {
  localStorage.setItem('royalsphire_cart', JSON.stringify(state.cart));
  updateCartBadges();
}

function saveWishlist() {
  localStorage.setItem('royalsphire_wishlist', JSON.stringify(state.wishlist));
  updateWishlistBadges();
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'flex items-center gap-2.5 px-5 py-3.5 rounded-none shadow-2xl text-xs sm:text-sm font-bold bg-[#1a1a1a] text-[#fdfdfb] border border-white/10 transform translate-y-4 opacity-0 transition-all duration-300 pointer-events-auto';
  
  const icon = type === 'success' 
    ? '<i data-lucide="check" class="text-green-400 flex-shrink-0 w-4 h-4"></i>' 
    : '<i data-lucide="info" class="text-[#b89253] flex-shrink-0 w-4 h-4"></i>';

  toast.innerHTML = `
    ${icon}
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  lucide.createIcons();

  // Animate Entrance
  setTimeout(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  }, 10);

  // Auto Dismiss after 3s
  setTimeout(() => {
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// ==========================================
// 3. UI RENDERING ENGINES
// ==========================================

// 3.1 RENDERING CATEGORIES
function renderCategories() {
  const container = document.getElementById('categories-container');
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => {
    const isActive = state.selectedCategory === cat.id;
    const activeClasses = isActive 
      ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' 
      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50';

    // Get correct icon attribute
    let iconName = 'sparkles';
    if (cat.icon === 'Watch') iconName = 'watch';
    if (cat.icon === 'Headphones') iconName = 'headphones';
    if (cat.icon === 'Scissors') iconName = 'scissors';
    if (cat.icon === 'Home') iconName = 'home';
    if (cat.icon === 'Car') iconName = 'car';

    return `
      <button 
        data-id="${cat.id}" 
        class="category-btn flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-xs uppercase font-bold tracking-wide sm:tracking-widest px-3 sm:px-4.5 py-2.5 border transition-all cursor-pointer ${activeClasses}"
      >
        <i data-lucide="${iconName}" class="w-3.5 h-3.5"></i>
        <span>${cat.name}</span>
      </button>
    `;
  }).join('');

  lucide.createIcons();

  // Attach click events
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const catId = btn.getAttribute('data-id');
      state.selectedCategory = catId;
      state.hasSelectedCategory = true;
      renderCategories();
      renderCatalog();
      document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// 3.2 RENDERING CATALOG GRID
function renderCatalog() {
  const grid = document.getElementById('products-grid');
  const alert = document.getElementById('no-products-alert');
  if (!grid) return;

  const showLanding = state.selectedCategory === 'all' && !state.searchTerm.trim() && !state.hasSelectedCategory;
  document.getElementById('hero-section')?.classList.toggle('hidden', !showLanding);
  document.getElementById('sale-marquee')?.classList.toggle('hidden', !showLanding);
  document.getElementById('catalog-section')?.classList.toggle('category-view', !showLanding);
  // Filter items
  const filtered = PRODUCTS.filter(p => {
    const matchesCategory = state.selectedCategory === 'all' || p.category === state.selectedCategory;
    const query = state.searchTerm.toLowerCase();
    const matchesSearch = p.title.toLowerCase().includes(query) || 
                          p.description.toLowerCase().includes(query) || 
                          p.category.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  // Update counter and category text
  const countDisplay = document.getElementById('catalog-count-display');
  if (countDisplay) {
    countDisplay.textContent = `Showing ${filtered.length} items`;
  }

  const titleDisplay = document.getElementById('catalog-title');
  if (titleDisplay) {
    const selectedCat = CATEGORIES.find(c => c.id === state.selectedCategory);
    titleDisplay.textContent = state.searchTerm.trim()
      ? 'Search results'
      : state.selectedCategory === 'all'
        ? state.hasSelectedCategory ? 'All Products' : 'Explore Smart Gadgets'
        : selectedCat?.name || 'Shop products';
  }

  const badgeDisplay = document.getElementById('catalog-badge-text');
  if (badgeDisplay) {
    badgeDisplay.textContent = state.selectedCategory === 'all' ? 'Browse the collection' : 'Category collection';
  }

  if (filtered.length === 0) {
    grid.classList.add('hidden');
    alert.classList.remove('hidden');
    return;
  }

  grid.classList.remove('hidden');
  alert.classList.add('hidden');

  grid.innerHTML = filtered.map(p => {
    const isWishlisted = state.wishlist.some(item => item.id === p.id);
    const wishlistIconClass = isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-900';
    const hasDiscount = p.discountPercentage > 0;

    // Badges
    let badgeHtml = '';
    if (p.isBestSeller) {
      badgeHtml = `<span class="absolute top-3 left-3 bg-[#1a1a1a] text-[#fdfdfb] text-[8px] sm:text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 z-10">Best Seller</span>`;
    } else if (p.isHotDeal) {
      badgeHtml = `<span class="absolute top-3 left-3 bg-red-600 text-white text-[8px] sm:text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 z-10">Hot Deal</span>`;
    }

    return `
      <div class="group flex flex-col bg-white border border-gray-150 overflow-hidden relative transition-all duration-300">
        ${badgeHtml}
        
        <!-- Save/Wishlist Trigger -->
        <button 
          data-id="${p.id}" 
          class="wishlist-toggle-click absolute top-3 right-3 z-10 w-8.5 h-8.5 bg-white/90 hover:bg-white border border-gray-200 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 active:scale-90"
        >
          <i data-lucide="heart" class="w-4 h-4 ${wishlistIconClass}"></i>
        </button>

        <!-- Product Image Container -->
        <div class="relative product-image-surface aspect-square overflow-hidden cursor-pointer product-card-click" data-id="${p.id}">
          <img 
            src="${p.image}" 
            alt="${p.title}" 
            referrerpolicy="no-referrer"
            class="w-full h-full object-center transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <!-- Product Copy & Details -->
        <div class="p-2 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            <!-- Star Rating -->
            <div class="flex items-center gap-1.5 mb-2">
              <div class="text-amber-500 text-[10px] sm:text-xs tracking-wider">★★★★★</div>
              <span class="text-[9px] sm:text-[10px] text-gray-400 font-bold font-mono">(${p.reviewsCount})</span>
            </div>

            <!-- Title -->
            <h3 class="product-card-click text-[11px] sm:text-sm font-bold text-gray-900 tracking-tight line-clamp-2 hover:opacity-80 transition-opacity cursor-pointer mb-2" data-id="${p.id}">
              ${p.title}
            </h3>

            <!-- Short descriptive bio -->
            <p class="hidden sm:block text-[11px] text-gray-500 line-clamp-2 mb-4 leading-relaxed">
              ${p.description}
            </p>
          </div>

          <!-- Price & CTA Button triggers -->
          <div>
            <div class="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 mb-2.5 sm:mb-4">
              <span class="text-xs sm:text-sm font-bold font-mono text-gray-900">Rs. ${p.price.toLocaleString()}</span>
              ${hasDiscount ? `
                <span class="product-original-price hidden sm:inline text-[10px] line-through text-gray-400 font-mono">Rs. ${p.originalPrice.toLocaleString()}</span>
                <span class="text-[9px] font-bold font-mono text-red-600 bg-red-50 px-1 border border-red-500/10">-${p.discountPercentage}%</span>
              ` : ''}
            </div>

            <!-- Action CTA Group -->
            <div class="grid grid-cols-2 gap-1 sm:gap-2">
              <button 
                data-id="${p.id}" 
                class="product-card-click text-center border border-[#1a1a1a]/15 hover:bg-gray-50 text-[8px] sm:text-xs font-bold uppercase tracking-wide sm:tracking-widest py-2 sm:py-3 transition-all active:scale-98 cursor-pointer"
              >
                Details
              </button>
              <button 
                data-id="${p.id}" 
                class="buy-now-quick text-center bg-red-600 hover:bg-red-700 text-white text-[8px] sm:text-xs font-bold uppercase tracking-wide sm:tracking-widest py-2 sm:py-3 transition-all active:scale-98 shadow-xs cursor-pointer"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();

  // Attach card clicks and buy now clicks
  document.querySelectorAll('.product-card-click').forEach(element => {
    element.addEventListener('click', () => {
      const id = element.getAttribute('data-id');
      openProductDetails(id);
    });
  });

  document.querySelectorAll('.buy-now-quick').forEach(element => {
    element.addEventListener('click', () => {
      const id = element.getAttribute('data-id');
      const product = PRODUCTS.find(p => p.id === id);
      triggerDirectCheckout(product);
    });
  });

  document.querySelectorAll('.wishlist-toggle-click').forEach(element => {
    element.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = element.getAttribute('data-id');
      toggleWishlistProduct(id);
    });
  });
}

// 3.3 UPDATE BADGES & ICON COUNTS
function updateCartBadges() {
  const badge = document.getElementById('cart-badge');
  const totalCount = state.cart.reduce((total, item) => total + item.quantity, 0);
  
  if (totalCount > 0) {
    badge.textContent = totalCount;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

function updateWishlistBadges() {
  const badge = document.getElementById('wishlist-badge');
  const totalCount = state.wishlist.length;

  if (totalCount > 0) {
    badge.textContent = totalCount;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

// ==========================================
// 4. DIALOG DRAWERS & OVERLAYS EVENT BINDINGS
// ==========================================
function setupDrawersAndModals() {
  // Mobile search toggle
  const mobileSearchBtn = document.getElementById('mobile-search-btn');
  const mobileSearchBar = document.getElementById('mobile-search-bar');
  if (mobileSearchBtn && mobileSearchBar) {
    mobileSearchBtn.addEventListener('click', () => {
      mobileSearchBar.classList.toggle('hidden');
    });
  }

  // Mobile menu drawer toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  
  if (mobileMenuBtn && mobileMenuDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      openDrawer('mobile-menu-drawer');
    });
    mobileMenuClose.addEventListener('click', () => {
      closeDrawer('mobile-menu-drawer');
    });
    // Click outside to close
    mobileMenuDrawer.addEventListener('click', (e) => {
      if (e.target === mobileMenuDrawer) closeDrawer('mobile-menu-drawer');
    });
    // Link clicks inside mobile menu close it
    document.querySelectorAll('.mobile-menu-link').forEach(link => {
      link.addEventListener('click', () => closeDrawer('mobile-menu-drawer'));
    });
  }

  // Cart Drawer togglers
  const cartTrigger = document.getElementById('cart-trigger');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartClose = document.getElementById('cart-close');
  if (cartTrigger && cartDrawer) {
    cartTrigger.addEventListener('click', () => {
      renderCartDrawer();
      openDrawer('cart-drawer');
    });
    cartClose.addEventListener('click', () => {
      closeDrawer('cart-drawer');
    });
    cartDrawer.addEventListener('click', (e) => {
      if (e.target === cartDrawer) closeDrawer('cart-drawer');
    });
  }

  // Wishlist Drawer togglers
  const wishlistTrigger = document.getElementById('wishlist-trigger');
  const wishlistDrawer = document.getElementById('wishlist-drawer');
  const wishlistClose = document.getElementById('wishlist-close');
  if (wishlistTrigger && wishlistDrawer) {
    wishlistTrigger.addEventListener('click', () => {
      renderWishlistDrawer();
      openDrawer('wishlist-drawer');
    });
    wishlistClose.addEventListener('click', () => {
      closeDrawer('wishlist-drawer');
    });
    wishlistDrawer.addEventListener('click', (e) => {
      if (e.target === wishlistDrawer) closeDrawer('wishlist-drawer');
    });
  }

  // Product Details Modal closer
  const productModal = document.getElementById('product-modal');
  const productModalClose = document.getElementById('product-modal-close');
  if (productModal) {
    productModalClose.addEventListener('click', () => {
      closeModal('product-modal');
    });
    productModal.addEventListener('click', (e) => {
      if (e.target === productModal) closeModal('product-modal');
    });
  }

  // Checkout Drawer closers
  const checkoutDrawer = document.getElementById('checkout-drawer');
  const checkoutClose = document.getElementById('checkout-close');
  if (checkoutDrawer) {
    checkoutClose.addEventListener('click', () => {
      closeDrawer('checkout-drawer');
    });
    checkoutDrawer.addEventListener('click', (e) => {
      if (e.target === checkoutDrawer) closeDrawer('checkout-drawer');
    });
  }

  // Success Modal closer
  const successModal = document.getElementById('success-modal');
  const successCloseBtn = document.getElementById('success-close-btn');
  if (successModal) {
    successCloseBtn.addEventListener('click', () => {
      closeModal('success-modal');
    });
  }

  // Bind clear catalog filters button
  const clearCatalogBtn = document.getElementById('clear-catalog-filters-btn');
  if (clearCatalogBtn) {
    clearCatalogBtn.addEventListener('click', () => {
      state.searchTerm = '';
      state.selectedCategory = 'all';
      state.hasSelectedCategory = false;
      const desktopSearch = document.getElementById('desktop-search-input');
      const mobileSearch = document.getElementById('mobile-search-input');
      if (desktopSearch) desktopSearch.value = '';
      if (mobileSearch) mobileSearch.value = '';
      renderCategories();
      renderCatalog();
    });
  }

  // Search Input Bindings
  const desktopSearch = document.getElementById('desktop-search-input');
  if (desktopSearch) {
    desktopSearch.addEventListener('input', (e) => {
      state.searchTerm = e.target.value;
      renderCatalog();
    });
  }

  const mobileSearch = document.getElementById('mobile-search-input');
  if (mobileSearch) {
    mobileSearch.addEventListener('input', (e) => {
      state.searchTerm = e.target.value;
      renderCatalog();
    });
  }

  // Check out forms
  const cartCheckoutBtn = document.getElementById('cart-checkout-btn');
  if (cartCheckoutBtn) {
    cartCheckoutBtn.addEventListener('click', () => {
      if (state.cart.length === 0) {
        showToast('Your shopping cart is empty!', 'info');
        return;
      }
      state.directCheckoutItem = null;
      state.activeCheckoutItems = [...state.cart];
      closeDrawer('cart-drawer');
      renderCheckoutDrawer();
      openDrawer('checkout-drawer');
    });
  }

  // Quick feedback form in Contact Section
  const quickForm = document.getElementById('quick-contact-form');
  if (quickForm) {
    quickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const phone = document.getElementById('form-phone').value;
      const msg = document.getElementById('form-message').value;

      // Deep link message
      const formattedText = `Assalam-o-Alaikum! My Name is ${name}. %0APhone: ${phone}%0A%0A*Message:*%0A${encodeURIComponent(msg)}`;
      const url = `https://wa.me/923495979062?text=${formattedText}`;
      
      showToast('Form filled! Redirecting to WhatsApp...', 'success');
      setTimeout(() => {
        window.open(url, '_blank');
      }, 1000);
      quickForm.reset();
    });
  }

  // Setup city selection autocomplete
  setupCityAutocomplete();

  // Checkout Form Submission
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleOrderSubmit);
  }
}

// DRAWER TOGGLE LOGIC
function openDrawer(drawerId) {
  const drawer = document.getElementById(drawerId);
  if (!drawer) return;
  drawer.classList.remove('pointer-events-none', 'opacity-0');
  drawer.classList.add('pointer-events-auto', 'opacity-100');
  
  const childPanel = drawer.querySelector('.absolute');
  if (childPanel) {
    childPanel.classList.remove('-translate-x-full', 'translate-x-full');
    childPanel.classList.add('translate-x-0');
  }
}

function closeDrawer(drawerId) {
  const drawer = document.getElementById(drawerId);
  if (!drawer) return;
  
  const childPanel = drawer.querySelector('.absolute');
  if (childPanel) {
    childPanel.classList.remove('translate-x-0');
    // If it is mobile menu, slide to left (-translate-x-full), else right (translate-x-full)
    if (drawerId === 'mobile-menu-drawer') {
      childPanel.classList.add('-translate-x-full');
    } else {
      childPanel.classList.add('translate-x-full');
    }
  }

  setTimeout(() => {
    drawer.classList.remove('pointer-events-auto', 'opacity-100');
    drawer.classList.add('pointer-events-none', 'opacity-0');
  }, 300);
}

// MODAL TOGGLE LOGIC
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('pointer-events-none', 'opacity-0');
  modal.classList.add('pointer-events-auto', 'opacity-100');

  const container = modal.querySelector('.transform');
  if (container) {
    container.classList.remove('scale-95');
    container.classList.add('scale-100');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  const container = modal.querySelector('.transform');
  if (container) {
    container.classList.remove('scale-100');
    container.classList.add('scale-95');
  }

  setTimeout(() => {
    modal.classList.remove('pointer-events-auto', 'opacity-100');
    modal.classList.add('pointer-events-none', 'opacity-0');
  }, 300);
}

// ==========================================
// 5. WISHLIST MANAGEMENT DRAWERS
// ==========================================
function toggleWishlistProduct(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const index = state.wishlist.findIndex(item => item.id === id);
  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast('Removed from Wishlist', 'info');
  } else {
    state.wishlist.push(product);
    showToast('Added to Wishlist!', 'success');
  }
  
  saveWishlist();
  renderCatalog();
  renderWishlistDrawer();
}

function renderWishlistDrawer() {
  const container = document.getElementById('wishlist-items-container');
  if (!container) return;

  if (state.wishlist.length === 0) {
    container.innerHTML = `
      <div class="text-center py-16 space-y-4">
        <div class="w-12 h-12 rounded-full border border-gray-150 flex items-center justify-center text-gray-300 mx-auto">
          <i data-lucide="heart" class="w-5 h-5 text-gray-300"></i>
        </div>
        <div>
          <h4 class="text-sm font-bold text-[#1a1a1a]">Your wishlist is empty</h4>
          <p class="text-xs text-gray-400 mt-1">Save your favorite smart accessories here!</p>
        </div>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = state.wishlist.map(p => {
    return `
      <div class="flex gap-4 p-3 bg-white border border-gray-100 items-center justify-between shadow-2xs">
        <div class="flex gap-3 items-center">
          <div class="w-14 h-14 bg-gray-50 flex-shrink-0 border border-gray-100">
            <img src="${p.image}" alt="${p.title}" referrerpolicy="no-referrer" class="w-full h-full object-cover" />
          </div>
          <div>
            <h4 class="text-xs font-bold text-gray-900 line-clamp-1">${p.title}</h4>
            <p class="text-xs font-bold font-mono text-gray-600 mt-0.5">Rs. ${p.price.toLocaleString()}</p>
          </div>
        </div>
        <div class="flex flex-col gap-1.5 shrink-0">
          <button 
            data-id="${p.id}" 
            class="wishlist-add-to-cart bg-[#1a1a1a] hover:bg-black text-white font-bold text-[9px] uppercase tracking-wider px-3 py-1.5 transition-all cursor-pointer"
          >
            Add To Cart
          </button>
          <button 
            data-id="${p.id}" 
            class="wishlist-remove text-gray-400 hover:text-red-500 font-bold text-[9px] uppercase tracking-wider px-3 py-1.5 transition-colors cursor-pointer"
          >
            Remove
          </button>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();

  // Attach actions
  document.querySelectorAll('.wishlist-add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const product = PRODUCTS.find(p => p.id === id);
      if (product) {
        // Add default variant to cart
        addToCart(product, product.variants[0] || 'Default', 1);
        // Remove from wishlist
        toggleWishlistProduct(id);
      }
    });
  });

  document.querySelectorAll('.wishlist-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      toggleWishlistProduct(id);
    });
  });
}

// ==========================================
// 6. CART MANAGEMENT DRAWERS
// ==========================================
function addToCart(product, variant, qty = 1) {
  const existingIdx = state.cart.findIndex(
    item => item.product.id === product.id && item.selectedVariant === variant
  );

  if (existingIdx > -1) {
    state.cart[existingIdx].quantity += qty;
  } else {
    state.cart.push({ product, quantity: qty, selectedVariant: variant });
  }

  showToast(`Added ${qty}x ${product.title} (${variant}) to Cart!`, 'success');
  saveCart();
  renderCartDrawer();
}

function updateCartQuantity(productId, variant, qty) {
  if (qty <= 0) {
    removeCartItem(productId, variant);
    return;
  }

  const idx = state.cart.findIndex(
    item => item.product.id === productId && item.selectedVariant === variant
  );

  if (idx > -1) {
    state.cart[idx].quantity = qty;
    saveCart();
    renderCartDrawer();
  }
}

function removeCartItem(productId, variant) {
  state.cart = state.cart.filter(
    item => !(item.product.id === productId && item.selectedVariant === variant)
  );
  showToast('Item removed from Cart', 'info');
  saveCart();
  renderCartDrawer();
}

function renderCartDrawer() {
  const container = document.getElementById('cart-items-container');
  const subtotalDisplay = document.getElementById('cart-subtotal');
  if (!container || !subtotalDisplay) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-20 space-y-4">
        <div class="w-12 h-12 rounded-full border border-gray-150 flex items-center justify-center text-gray-300 mx-auto">
          <i data-lucide="shopping-cart" class="w-5 h-5 text-gray-300"></i>
        </div>
        <div>
          <h4 class="text-sm font-bold text-[#1a1a1a]">Your cart is empty</h4>
          <p class="text-xs text-gray-400 mt-1">Browse our smart catalog to add smart items!</p>
        </div>
      </div>
    `;
    subtotalDisplay.textContent = 'Rs. 0';
    lucide.createIcons();
    return;
  }

  // Populate items
  container.innerHTML = state.cart.map(item => {
    const p = item.product;
    const itemTotal = p.price * item.quantity;
    return `
      <div class="flex gap-4 p-3 bg-white border border-gray-100 shadow-3xs items-center">
        <!-- Thumbnail -->
        <div class="w-16 h-16 bg-gray-50 border border-gray-100 flex-shrink-0">
          <img src="${p.image}" alt="${p.title}" referrerpolicy="no-referrer" class="w-full h-full object-cover" />
        </div>

        <!-- Info -->
        <div class="flex-1 min-w-0 space-y-1">
          <h4 class="text-xs font-bold text-gray-900 truncate">${p.title}</h4>
          <p class="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Color: ${item.selectedVariant}</p>
          <div class="flex items-center justify-between pt-1">
            <!-- Quantity Control -->
            <div class="flex items-center border border-gray-200 bg-gray-50">
              <button 
                data-id="${p.id}" 
                data-variant="${item.selectedVariant}" 
                data-qty="${item.quantity - 1}" 
                class="cart-qty-btn px-2.5 py-1 text-xs text-gray-500 hover:text-black cursor-pointer font-bold"
              >
                -
              </button>
              <span class="px-2 text-xs font-bold font-mono text-gray-800">${item.quantity}</span>
              <button 
                data-id="${p.id}" 
                data-variant="${item.selectedVariant}" 
                data-qty="${item.quantity + 1}" 
                class="cart-qty-btn px-2.5 py-1 text-xs text-gray-500 hover:text-black cursor-pointer font-bold"
              >
                +
              </button>
            </div>
            
            <span class="text-xs font-bold font-mono text-gray-900">Rs. ${itemTotal.toLocaleString()}</span>
          </div>
        </div>

        <!-- Remove -->
        <button 
          data-id="${p.id}" 
          data-variant="${item.selectedVariant}" 
          class="cart-item-delete p-1 text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
        >
          <i data-lucide="trash-2" class="w-4.5 h-4.5"></i>
        </button>
      </div>
    `;
  }).join('');

  lucide.createIcons();

  // Calc subtotal
  const subtotal = state.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  subtotalDisplay.textContent = `Rs. ${subtotal.toLocaleString()}`;

  // Attach quantity change click listeners
  document.querySelectorAll('.cart-qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const variant = btn.getAttribute('data-variant');
      const qty = parseInt(btn.getAttribute('data-qty'));
      updateCartQuantity(id, variant, qty);
    });
  });

  // Attach delete clicks
  document.querySelectorAll('.cart-item-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const variant = btn.getAttribute('data-variant');
      removeCartItem(id, variant);
    });
  });
}

// ==========================================
// 7. PRODUCT DETAILS MODAL DETAILS
// ==========================================
function openProductDetails(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  state.selectedProductId = productId;
  state.selectedVariant = product.variants[0] || 'Default';

  // Fill content
  const mainImg = document.getElementById('modal-main-image');
  const modalTitle = document.getElementById('modal-title');
  const modalPrice = document.getElementById('modal-price');
  const modalOriginal = document.getElementById('modal-original-price');
  const modalDiscount = document.getElementById('modal-discount-tag');
  
  mainImg.src = product.image;
  mainImg.alt = product.title;
  modalTitle.textContent = product.title;
  modalPrice.textContent = `Rs. ${product.price.toLocaleString()}`;

  if (product.discountPercentage > 0) {
    modalOriginal.textContent = `Rs. ${product.originalPrice.toLocaleString()}`;
    modalOriginal.classList.remove('hidden');
    modalDiscount.textContent = `${product.discountPercentage}% OFF`;
    modalDiscount.classList.remove('hidden');
  } else {
    modalOriginal.classList.add('hidden');
    modalDiscount.classList.add('hidden');
  }

  // 1. Image thumbnails rendering
  const thumbnailsContainer = document.getElementById('modal-thumbnails');
  const imagesList = product.images && product.images.length > 0 ? product.images : [product.image];
  
  thumbnailsContainer.innerHTML = imagesList.map((img, idx) => {
    const activeBorder = idx === 0 ? 'border-black' : 'border-gray-200';
    return `
      <button 
        data-src="${img}" 
        class="thumbnail-btn w-12 h-12 bg-white border ${activeBorder} rounded p-0.5 overflow-hidden transition-all cursor-pointer"
      >
        <img src="${img}" referrerpolicy="no-referrer" class="w-full h-full object-contain" />
      </button>
    `;
  }).join('');

  // Thumbnail events
  document.querySelectorAll('.thumbnail-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.thumbnail-btn').forEach(b => b.classList.replace('border-black', 'border-gray-200'));
      btn.classList.replace('border-gray-200', 'border-black');
      mainImg.src = btn.getAttribute('data-src');
    });
  });

  // 2. Variants choices
  const variantsSection = document.getElementById('modal-variants-section');
  const variantsList = document.getElementById('modal-variants-list');
  
  if (product.variants && product.variants.length > 0 && product.variants[0] !== 'Default') {
    variantsSection.classList.remove('hidden');
    variantsList.innerHTML = product.variants.map((v, idx) => {
      const activeClass = idx === 0 
        ? 'border-black bg-black text-white' 
        : 'border-gray-200 bg-white text-gray-800 hover:bg-gray-50';
      return `
        <button 
          data-val="${v}" 
          class="variant-select-btn px-4 py-2 border text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer ${activeClass}"
        >
          ${v}
        </button>
      `;
    }).join('');

    document.querySelectorAll('.variant-select-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.variant-select-btn').forEach(b => b.className = b.className.replace('border-black bg-black text-white', 'border-gray-200 bg-white text-gray-800'));
        btn.className = btn.className.replace('border-gray-200 bg-white text-gray-800', 'border-black bg-black text-white');
        state.selectedVariant = btn.getAttribute('data-val');
      });
    });
  } else {
    variantsSection.classList.add('hidden');
  }

  // 3. Specifications list
  const specsTable = document.getElementById('modal-specs-table');
  if (product.specs && product.specs.length > 0) {
    specsTable.innerHTML = product.specs.map(spec => {
      return `
        <tr class="grid grid-cols-3 py-2.5">
          <td class="font-bold text-gray-500 uppercase tracking-wider text-[10px]">${spec.name}</td>
          <td class="col-span-2 text-gray-800 font-medium pl-4">${spec.value}</td>
        </tr>
      `;
    }).join('');
  } else {
    specsTable.innerHTML = `<tr><td class="py-4 text-center text-gray-400">Standard factory specifications apply.</td></tr>`;
  }

  // 4. Quantity default resetting
  const qtySelect = document.getElementById('modal-qty');
  if (qtySelect) qtySelect.value = "1";

  // 5. Dynamic Reviews inside Details
  const reviewsContainer = document.getElementById('modal-reviews-list');
  const productReviews = MOCK_REVIEWS[product.id] || [];

  if (productReviews.length > 0) {
    reviewsContainer.innerHTML = productReviews.map(rev => {
      return `
        <div class="p-4 bg-gray-50/50 border border-gray-100 rounded-xl space-y-1">
          <div class="flex items-center justify-between">
            <span class="font-bold text-xs text-gray-900">${rev.author}</span>
            <span class="text-[10px] text-amber-500 font-bold font-mono">${'★'.repeat(rev.rating)}</span>
          </div>
          <p class="text-[10px] text-gray-400 font-medium font-mono">${rev.date} • Verified buyer</p>
          <p class="text-xs text-gray-600 leading-normal italic mt-1.5">"${rev.comment}"</p>
        </div>
      `;
    }).join('');
  } else {
    reviewsContainer.innerHTML = `
      <div class="p-4 border border-dashed border-gray-200 text-center rounded-xl">
        <p class="text-xs text-gray-400 leading-normal">Be the first to review this product!<br>All products are covered by 7 days return terms.</p>
      </div>
    `;
  }

  // Dynamic eye viewing count (6 to 18)
  const viewerCountDisplay = document.getElementById('modal-live-viewers-count');
  if (viewerCountDisplay) {
    viewerCountDisplay.textContent = Math.floor(Math.random() * 13) + 6;
  }

  // 6. Action handlers
  const modalAddToCartBtn = document.getElementById('modal-add-to-cart-btn');
  const modalBuyNowBtn = document.getElementById('modal-buy-now-btn');

  // Remove stale handlers by cloning
  const newAddToCartBtn = modalAddToCartBtn.cloneNode(true);
  const newBuyNowBtn = modalBuyNowBtn.cloneNode(true);

  modalAddToCartBtn.parentNode.replaceChild(newAddToCartBtn, modalAddToCartBtn);
  modalBuyNowBtn.parentNode.replaceChild(newBuyNowBtn, modalBuyNowBtn);

  newAddToCartBtn.addEventListener('click', () => {
    const qty = parseInt(qtySelect.value);
    addToCart(product, state.selectedVariant, qty);
    closeModal('product-modal');
  });

  newBuyNowBtn.addEventListener('click', () => {
    const qty = parseInt(qtySelect.value);
    triggerDirectCheckout(product, qty, state.selectedVariant);
  });

  openModal('product-modal');
}

// DIRECT BUY CHECKOUT
function triggerDirectCheckout(product, qty = 1, variant = '') {
  state.directCheckoutItem = {
    product,
    quantity: qty,
    selectedVariant: variant || product.variants[0] || 'Default'
  };
  state.activeCheckoutItems = [state.directCheckoutItem];
  
  closeModal('product-modal');
  renderCheckoutDrawer();
  openDrawer('checkout-drawer');
}

// ==========================================
// 8. CHECKOUT SECURE HANDLING
// ==========================================
function renderCheckoutDrawer() {
  const container = document.getElementById('checkout-summary-list');
  const totalDisplay = document.getElementById('checkout-total-bill');
  if (!container || !totalDisplay) return;

  const items = state.activeCheckoutItems;
  if (items.length === 0) {
    container.innerHTML = `<p class="text-xs text-gray-400">No items specified for checkout.</p>`;
    totalDisplay.textContent = 'Rs. 0';
    return;
  }

  // Populate list
  container.innerHTML = items.map(item => {
    const p = item.product;
    const itemTotal = p.price * item.quantity;
    return `
      <div class="flex justify-between items-center text-xs py-1.5">
        <div class="min-w-0 pr-4">
          <span class="font-bold text-gray-900 line-clamp-1">${p.title}</span>
          <span class="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Color: ${item.selectedVariant} x${item.quantity}</span>
        </div>
        <span class="font-mono text-gray-700 font-bold flex-shrink-0">Rs. ${itemTotal.toLocaleString()}</span>
      </div>
    `;
  }).join('');

  const totalBill = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  totalDisplay.textContent = `Rs. ${totalBill.toLocaleString()}`;
}

// Popular Cities dropdown Autocomplete
function setupCityAutocomplete() {
  const input = document.getElementById('check-city');
  const dropdown = document.getElementById('city-dropdown');
  if (!input || !dropdown) return;

  const renderSuggestions = (query) => {
    const filtered = POPULAR_CITIES.filter(city => 
      city.toLowerCase().startsWith(query.toLowerCase())
    ).slice(0, 5); // top 5 only

    if (filtered.length === 0) {
      dropdown.classList.add('hidden');
      return;
    }

    dropdown.innerHTML = filtered.map(city => {
      return `
        <button 
          type="button" 
          data-val="${city}" 
          class="city-suggestion-btn w-full text-left px-3 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-black cursor-pointer transition-colors block uppercase tracking-wider"
        >
          ${city}
        </button>
      `;
    }).join('');

    dropdown.classList.remove('hidden');

    // Attach clicks
    document.querySelectorAll('.city-suggestion-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        input.value = btn.getAttribute('data-val');
        dropdown.classList.add('hidden');
      });
    });
  };

  input.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query.length > 0) {
      renderSuggestions(query);
    } else {
      dropdown.classList.add('hidden');
    }
  });

  // Hide dropdown on blur
  document.addEventListener('click', (e) => {
    if (e.target !== input && !dropdown.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });
}

// HANDLE FORM SUBMISSION
function handleOrderSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('check-name').value.trim();
  const phone = document.getElementById('check-phone').value.trim();
  const city = document.getElementById('check-city').value.trim();
  const address = document.getElementById('check-address').value.trim();

  // 1. Phone number validation (Standard Pakistani format: starts with 03, exactly 11 digits)
  const pkPhoneRegex = /^(03)[0-9]{9}$/;
  if (!pkPhoneRegex.test(phone)) {
    showToast('Please enter a valid Pakistani mobile number starting with 03 (e.g., 03495979062)', 'info');
    return;
  }

  // 2. Generate Tracking ID
  const trackingId = `RS-${Math.floor(100000 + Math.random() * 900000)}`;

  // 3. Complete order state transition
  const checkoutItems = state.activeCheckoutItems;
  const totalBill = checkoutItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  // Clear cart if we ordered items directly from cart
  if (!state.directCheckoutItem) {
    state.cart = [];
    saveCart();
    renderCartDrawer();
  }

  // Close Checkout panel
  closeDrawer('checkout-drawer');

  // Fill and show order success modal
  const successTracking = document.getElementById('success-tracking-id');
  const successName = document.getElementById('success-name');
  const successTotal = document.getElementById('success-total');
  const successWhatsappBtn = document.getElementById('success-whatsapp-btn');

  successTracking.textContent = trackingId;
  successName.textContent = name;
  successTotal.textContent = `Rs. ${totalBill.toLocaleString()}`;

  // Formulate WhatsApp order details string
  const itemsText = checkoutItems.map(item => `- ${item.product.title} (${item.selectedVariant}) x${item.quantity}`).join('%0A');
  const rawMessage = `Assalam-o-Alaikum! Royal Sphire Team, I have just placed an order.%0A%0A*Order Details:*%0A- Tracking ID: *${trackingId}*%0A- Name: ${name}%0A- Phone: ${phone}%0A- City: ${city}%0A- Address: ${address}%0A%0A*Items Ordered:*%0A${itemsText}%0A%0A*Total Bill:* Rs. ${totalBill.toLocaleString()}%0A%0APlease verify and dispatch my order. Shukriya!`;
  
  successWhatsappBtn.href = `https://wa.me/923495979062?text=${rawMessage}`;

  // Reset form
  document.getElementById('checkout-form').reset();
  
  // Show modal
  openModal('success-modal');
  showToast('Order received successfully! Check tracking ID.', 'success');
}

// ==========================================
// 9. ANIMATIONS & RECURRING COUNTDOWNS
// ==========================================

// 9.1 FREE DELIVERY TIMED COUNTDOWN (2 Hrs Loop)
function startFreeDeliveryTimer() {
  const display = document.getElementById('countdown-timer');
  if (!display) return;

  const duration = 2 * 60 * 60 * 1000; // 2 hours
  let endTime = Date.now() + duration;

  const tick = () => {
    const now = Date.now();
    let diff = endTime - now;
    if (diff <= 0) {
      endTime = Date.now() + duration;
      diff = duration;
    }
    const hrs = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    display.textContent = `00 : ${String(hrs).padStart(2, '0')} : ${String(mins).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`;
  };

  tick();
  setInterval(tick, 1000);
}

// 9.2 CART RESERVATION TIMER (10:00 Countdown)
function startCartTimer() {
  const display = document.getElementById('cart-timer-countdown');
  if (!display) return;

  setInterval(() => {
    if (cartTimerSeconds > 0) {
      cartTimerSeconds--;
      const m = Math.floor(cartTimerSeconds / 60);
      const s = cartTimerSeconds % 60;
      display.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    } else {
      cartTimerSeconds = 600; // reset
    }
  }, 1000);
}

// 9.3 CHECKOUT COD DISCOUNT TIMER (08:45 Countdown)
function startCheckoutTimer() {
  const display = document.getElementById('checkout-discount-countdown');
  if (!display) return;

  setInterval(() => {
    if (checkoutDiscountSeconds > 0) {
      checkoutDiscountSeconds--;
      const m = Math.floor(checkoutDiscountSeconds / 60);
      const s = checkoutDiscountSeconds % 60;
      display.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    } else {
      checkoutDiscountSeconds = 525; // reset
    }
  }, 1000);
}

// 9.4 DYNAMIC EYE VIEWING CHIPS (browsing the catalog count)
function startCatalogBrowsingViews() {
  const display = document.getElementById('global-watching-text');
  if (!display) return;

  const update = () => {
    const viewers = Math.floor(Math.random() * 13) + 6; // 6 to 18
    display.textContent = `${viewers} people are browsing the catalog now`;
  };

  update();
  setInterval(update, 7000);
}

// 9.5 REVIEWS ROTATION CAROUSEL (Widget 13)
function startReviewsCarouselRotation() {
  const container = document.getElementById('reviews-carousel-widget');
  if (!container) return;

  const reviews = [
    { name: "Sufyan Ali", review: "I really like the product!", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9Qg7w3Dpu5v13hKKzlSWqjWjBUheEPXmFQl6w&s" },
    { name: "Mubashir", review: "The quality was 10/10.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvUDXAYdm6YZk_Pecu_wSfGpyH9Fjz-JsWgfI2Hm8KXlCFSDi509P7kiBcfnTqir5_jv4&usqp=CAU" },
    { name: "Faisal", review: "This is exactly what I was looking for.", image: "https://images.unsplash.com/profile-1675810780829-fcfb69d41b8cimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128" },
    { name: "Chaudhary", review: "Great value for money, highly recommend!", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQRWVHV4umgdf7ekk8oQmINm8-jI8xGItbaxPnJoISAJMdAiDOnNWzbU0aKAlGL5VFA7A&usqp=CAU" },
    { name: "Saim", review: "Will definitely buy again.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3kprXSmAqpSeDBVP9vmHZpvCbB_WNcxn8Eg&s" },
    { name: "Bilal", review: "Exceeded my expectations!", image: "https://t4.ftcdn.net/jpg/08/53/07/37/360_F_853073742_s0I2xKQU9I6aK3YUdQDMt9HL6rAuQLsQ.jpg" },
    { name: "Laraib", review: "The customer service was amazing!", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUseLtpH3FvRCKw2rw-7devfp98GNjOrwTDh4DR9ujf6ENRE1UdVvBJPUnPWh2N5zwf6A&usqp=CAU" },
    { name: "Rizwan", review: "Fantastic product, would buy again.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyvHZ24jwN_PsKxxglDKDPUcT3S0NpJ9gP0BqJuWDEMIUSy05Sj4_xLhNhlhp4FoWP6yw&usqp=CAU" },
    { name: "Noor", review: "Quality is top-notch, highly recommend.", image: "https://i.pinimg.com/736x/1a/88/1c/1a881cdc93e267ba871d3e523707e893.jpg" },
    { name: "Malik", review: "Perfect fit and so comfortable!", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_zZz0-J4LyvLP6592A5QAc1Z4MEfdi16j4klROD84bLdQZuZBt09PiSQsh-sei_dohFM&usqp=CAU" }
  ];

  let activeIndex = 0;

  const renderCurrentReview = () => {
    const current = reviews[activeIndex];
    
    // Add opacity transitions smoothly
    container.classList.add('opacity-0', 'scale-95');
    
    setTimeout(() => {
      container.innerHTML = `
        <img src="${current.image}" alt="${current.name}" class="w-12 h-12 rounded-full object-cover border border-black/10 flex-shrink-0" referrerpolicy="no-referrer" />
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <span class="font-bold text-[#b89253] text-xs sm:text-sm">${current.name}</span>
            <span class="text-[10px] text-amber-500 font-bold">★★★★★</span>
          </div>
          <p class="text-xs italic text-[#1a1a1a]/80 mt-1">"${current.review}"</p>
        </div>
      `;
      container.classList.remove('opacity-0', 'scale-95');
    }, 300);

    activeIndex = (activeIndex + 1) % reviews.length;
  };

  renderCurrentReview();
  setInterval(renderCurrentReview, 4000);
}

// 9.6 LIVE ORDER ACTIVITY TOASTER (Widget 18)
function startLiveOrderTicker() {
  const names = ['Ayesha', 'Muhammad', 'Zainab', 'Fatima', 'Usman', 'Bilal', 'Saba', 'Hamza', 'Anum', 'Raza'];
  const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar', 'Multan', 'Faisalabad', 'Gujranwala', 'Quetta', 'Sialkot'];
  const items = ['T800 Ultra Smartwatch', 'Air31 Transparent Earbuds', 'M10 Pro TWS Earbuds', 'Vintage T9 Buddha Trimmer', 'VGR V-030 Trimmer', '6-Blade Portable Juicer'];

  const ticker = document.getElementById('live-order-ticker');
  const textContainer = document.getElementById('live-order-ticker-text');
  if (!ticker || !textContainer) return;

  const trigger = () => {
    const name = names[Math.floor(Math.random() * names.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const item = items[Math.floor(Math.random() * items.length)];

    textContainer.innerHTML = `
      <strong>${name}</strong> from ${city} just ordered a <span class="text-[#b89253] font-semibold">${item}</span>!
    `;

    // Slide in
    ticker.classList.remove('translate-y-24', 'opacity-0');
    ticker.classList.add('translate-y-0', 'opacity-100');

    // Slide out after 5s
    setTimeout(() => {
      ticker.classList.remove('translate-y-0', 'opacity-100');
      ticker.classList.add('translate-y-24', 'opacity-0');
    }, 5000);
  };

  // First trigger after 3s
  setTimeout(trigger, 3000);

  // Repeat every 12s
  setInterval(trigger, 12000);
}

// ==========================================
// 10. REVIEWS MARQUEE CARDS
// ==========================================
function renderReviewsMarquee() {
  const container = document.getElementById('reviews-marquee-container');
  if (!container) return;

  const reviews = [
    { name: "Ayesha", city: "Lahore", text: "Excellent quality, packed well and delivered fast.", stars: 5 },
    { name: "Ahmed", city: "Karachi", text: "Original item and smooth checkout. Highly trusted store.", stars: 5 },
    { name: "Fatima", city: "Islamabad", text: "Good price and next-day delivery. Recommended.", stars: 5 },
    { name: "Hassan", city: "Rawalpindi", text: "Product exactly as described. Great service overall.", stars: 4 },
    { name: "Mariam", city: "Lahore", text: "Customer support replied quickly and solved my issue.", stars: 5 },
    { name: "Saad", city: "Faisalabad", text: "Fast delivery and clean packaging. Will order again.", stars: 5 },
    { name: "Noor", city: "Multan", text: "High quality item, feels premium. Great experience.", stars: 5 },
    { name: "Khalid", city: "Peshawar", text: "Good value for money and delivery was on time.", stars: 4 },
    { name: "Sara", city: "Sialkot", text: "Easy ordering, secure payment and reliable delivery.", stars: 5 },
    { name: "Yousaf", city: "Karachi", text: "Everything was perfect. I will purchase again.", stars: 5 }
  ];

  // Render original items
  const itemsHtml = reviews.map(rev => {
    return `
      <article class="inline-block w-[280px] sm:w-[320px] bg-white border border-gray-200 p-5 rounded-2xl shadow-xs mx-3 whitespace-normal align-top font-sans text-left">
        <div class="flex justify-between items-start mb-3">
          <div class="flex gap-3">
            <span class="w-10 h-10 rounded-full bg-gray-900 text-white font-bold text-sm flex items-center justify-center">
              ${rev.name.slice(0, 1).toUpperCase()}
            </span>
            <div>
              <h4 class="text-xs sm:text-sm font-bold text-gray-950">${rev.name}</h4>
              <p class="text-[10px] text-gray-500 mt-0.5">${rev.city}, Pakistan</p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-amber-500 text-xs">
              ${'★'.repeat(rev.stars)}${'☆'.repeat(5 - rev.stars)}
            </div>
            <div class="text-[9px] text-green-600 font-semibold block mt-1">
              <span class="inline-block w-1.5 h-1.5 bg-green-600 rounded-full mr-1"></span>
              Verified Purchase
            </div>
          </div>
        </div>
        <p class="text-xs text-gray-700 leading-relaxed italic">“${rev.text}”</p>
      </article>
    `;
  }).join('');

  // Duplicate for seamless infinite loop scroll
  container.innerHTML = itemsHtml + itemsHtml;
}

// ==========================================
// 11. INITIALIZATION & SETUP
// ==========================================
function init() {
  updateCartBadges();
  updateWishlistBadges();

  renderCategories();
  renderCatalog();
  renderReviewsMarquee();

  setupDrawersAndModals();

  // Start timers and chips
  startFreeDeliveryTimer();
  startCartTimer();
  startCheckoutTimer();
  startCatalogBrowsingViews();
  startReviewsCarouselRotation();
  startLiveOrderTicker();

  // Highlight footer categories link click
  document.querySelectorAll('.category-link-footer').forEach(link => {
    link.addEventListener('click', () => {
      const catId = link.getAttribute('data-category');
      state.selectedCategory = catId;
      state.hasSelectedCategory = true;
      renderCategories();
      renderCatalog();
      document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// Kick off when DOM is fully loaded
window.addEventListener('DOMContentLoaded', init);

