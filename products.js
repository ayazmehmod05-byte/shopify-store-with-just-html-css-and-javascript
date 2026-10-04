export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Sparkles' },
  { id: 'smartwatches', name: 'Smart Watches', icon: 'Watch' },
  { id: 'earbuds', name: 'Wireless Earbuds', icon: 'Headphones' },
  { id: 'grooming', name: 'Men\'s Grooming', icon: 'Scissors' },
  { id: 'kitchen-home', name: 'Kitchen & Home', icon: 'Home' },
  { id: 'car-accessories', name: 'Car Accessories', icon: 'Car' }
];

export const PRODUCTS = [
  {
    id: 'connected-habitat-set',
    title: 'The Ultimate Connected Habitat Set (Legendary Edition)',
    description: 'A luxurious matte black commercial smart hardware suite: Premium smartwatch, oval wireless charging pad, 10.1" bezel-less touchscreen console, 360° spherical smart acoustics speaker, active stylus pen, and transparent wireless earbuds.',
    longDescription: 'The Ultimate Connected Habitat Set is a masterfully crafted commercial smart-hardware collection designed for the modern lifestyle. In the center, high-end matte black gadgets are neatly arranged on interlocking luxury white marble pedestals. The suite includes: (1) A sleek, circular premium smartwatch with deep black aerospace aluminum casing and dynamic health dials. (2) An oval wireless charging pad with soft glow ring. (3) A bezel-less 10.1" smart touchscreen hub console showing colorful control widgets. (4) A spherical mesh speaker with RGB Aura. (5) An active digital stylus pen. (6) Wireless earbuds with high-fidelity acoustics in an open charging case.',
    price: 14999,
    originalPrice: 29999,
    discountPercentage: 50,
    image: './images/products/connected-habitat.jpg',
    images: [
      './images/products/connected-habitat.jpg',
    ],
    category: 'smartwatches',
    rating: 5.0,
    reviewsCount: 38,
    variants: ['Matte Black Elite Edition'],
    specs: [
      { name: 'Console Screen', value: '10.1 inch Bezel-Less Ultra HD IPS' },
      { name: 'Smartwatch Dial', value: '1.43 inch Always-On AMOLED circular' },
      { name: 'Speaker Acoustics', value: '360° Omni-Directional 40W High-Fi sound' },
      { name: 'Wireless Charging', value: '15W Dual-Coil Qi Fast Charge Pad' },
      { name: 'Earbuds Bluetooth', value: 'v5.4 True Wireless low-latency' },
      { name: 'Stylus Precision', value: '4096 pressure-level active pen' }
    ],
    inStock: true,
    isBestSeller: true,
    isHotDeal: true
  },
  {
    id: 't800-ultra',
    title: 'T800 Ultra Smart Watch Series 8',
    description: '1.99" HD Display, Bluetooth Calling, Wireless Charging, Fitness Tracker & Heart Rate Monitor',
    longDescription: 'The T800 Ultra Smartwatch is the ultimate companion for your active lifestyle. Equipped with a brilliant 1.99-inch high-definition screen and responsive touch control. Connect seamlessly with your smartphone via Bluetooth to make and receive calls on the go. Features advanced health tracking including dynamic heart rate monitoring, blood oxygen levels (SpO2), sleep analysis, and multi-sport tracking modes.',
    price: 1899,
    originalPrice: 3500,
    discountPercentage: 46,
    image: './images/products/t800-watch.jpg',
    images: [
      './images/products/t800-watch.jpg',
      './images/products/t800-watch.jpg',
      './images/products/t800-watch.jpg'
    ],
    category: 'smartwatches',
    rating: 4.8,
    reviewsCount: 142,
    variants: ['Orange Strap', 'Black Strap', 'Grey Strap'],
    specs: [
      { name: 'Screen Size', value: '1.99 inch HD IPS Display' },
      { name: 'Resolution', value: '240 x 285 pixels' },
      { name: 'Connectivity', value: 'Bluetooth 5.0' },
      { name: 'Battery Capacity', value: '350 mAh (Up to 3 Days standby)' },
      { name: 'Charging', value: 'Magnetic Wireless Charging' },
      { name: 'Waterproof Level', value: 'IP67 Splash Proof' }
    ],
    inStock: true,
    isBestSeller: true,
    isHotDeal: true
  },
  {
    id: 'air31-earbuds',
    title: 'Air31 Transparent Wireless Earbuds',
    description: 'Crystal Clear Design, LED Power Display, Bass Boost Stereo, Heavy Sound Bluetooth 5.3 Earphones',
    longDescription: 'Stand out from the crowd with the Air31 Transparent Wireless Earbuds. Featuring a stunning crystal-clear casing with a futuristic LED battery indicator showing charging status for each earbud. Powered by Bluetooth 5.3 for latency-free gaming, hyper-stable music streaming, and clear calls. Enjoy rich, punchy bass, clear mids, and sharp highs with built-in environmental noise cancellation (ENC) for clean microphone input.',
    price: 1499,
    originalPrice: 3000,
    discountPercentage: 50,
    image: './images/products/air31-earbuds.jpeg',
    images: [
      './images/products/air31-earbuds.jpeg',
      './images/products/air31-earbuds.jpeg',
      './images/products/air31-earbuds.jpeg'
    ],
    category: 'earbuds',
    rating: 4.7,
    reviewsCount: 98,
    variants: ['Crystal Green', 'Crystal Pink', 'Crystal Blue', 'Crystal White'],
    specs: [
      { name: 'Bluetooth Version', value: 'v5.3' },
      { name: 'Transmission Distance', value: '10 - 15 meters' },
      { name: 'Music Time', value: '4 - 5 Hours (Up to 20 Hours with case)' },
      { name: 'Charging Port', value: 'Type-C Quick Charge' },
      { name: 'Water Resistance', value: 'IPX4 Sweat Resistant' },
      { name: 'Sound Driver', value: '13mm Dynamic Bass Driver' }
    ],
    inStock: true,
    isBestSeller: true,
    isHotDeal: true
  },
  {
    id: 'm10-pro-earbuds',
    title: 'M10 Pro TWS Gaming Earbuds',
    description: '3500mAh Power Bank Case, Dual LED Battery Indicators, Touch Control HIFI Stereo Earphones',
    longDescription: 'The absolute legendary M10 Pro Earbuds are engineered with an massive 3500mAh rechargeable case that doubles as an emergency power bank for your mobile phone! Equipped with dual digital battery percentage indicators. Features custom touch sensors on each earbud for seamless play, pause, volume control, and active voice assistants. Extreme low-latency mode makes it ideal for PUBG and mobile gamers.',
    price: 1199,
    originalPrice: 2500,
    discountPercentage: 52,
    image: './images/products/m10-earbuds.jpg',
    images: [
      './images/products/m10-earbuds.jpg',
      './images/products/m10-earbuds.jpg'
    ],
    category: 'earbuds',
    rating: 4.5,
    reviewsCount: 215,
    variants: ['Classic Black'],
    specs: [
      { name: 'Charging Case Capacity', value: '3500 mAh (Can charge phone)' },
      { name: 'Bluetooth Distance', value: '10m' },
      { name: 'Standby Time', value: 'Up to 280 hours' },
      { name: 'Control Type', value: 'Smart Soft Touch' },
      { name: 'Noise Reduction', value: 'CVC 8.0 Active Isolation' },
      { name: 'Output USB Port', value: 'Yes, 5V/1A Emergency' }
    ],
    inStock: true,
    isBestSeller: false,
    isHotDeal: true
  },
  {
    id: 'vgr-v030-trimmer',
    title: 'VGR V-030 Professional Hair Trimmer',
    description: 'T-Blade Zero Gapped Detailer, Rechargeable Beard Trimmer, USB Charging with Guide Combs',
    longDescription: 'Achieve absolute precision with the VGR V-030 Professional Detailer. Ideal for zero-gapped fades, beard grooming, necklines, and creative hair tattoo designs. Equipped with high-grade self-sharpening stainless steel T-blades that stay sharper longer. The low-noise, powerful rotary motor provides a smooth drag-free cutting experience. Charges via standard USB in just 75 minutes for 100 minutes of continuous runtime.',
    price: 2399,
    originalPrice: 4500,
    discountPercentage: 47,
    image: './images/products/vgr-trimmer.jpg',
    images: [
      './images/products/vgr-trimmer.jpg',
      './images/products/vgr-trimmer.jpg'
    ],
    category: 'grooming',
    rating: 4.6,
    reviewsCount: 76,
    variants: ['Premium Black'],
    specs: [
      { name: 'Blade Material', value: 'Precision T-Style Stainless Steel' },
      { name: 'Charging Type', value: 'USB Charging (Universal)' },
      { name: 'Charging Time', value: '75 Minutes' },
      { name: 'Run Time', value: '100 Minutes Cordless' },
      { name: 'Guide Combs', value: '5 Attachment Combs (1, 2, 3, 4, 5mm)' },
      { name: 'Battery', value: '1000mAh Lithium' }
    ],
    inStock: true,
    isBestSeller: true,
    isHotDeal: false
  },
  {
    id: 'vintage-t9-trimmer',
    title: 'Vintage T9 Buddha Hair Trimmer',
    description: 'Full Metal Golden Retro Outliner, Rechargeable Shaver & Barber Hair Grooming Machine',
    longDescription: 'Add vintage style to your grooming setup with the full-metal engraved Vintage T9 Buddha Trimmer. Featuring a high-torque electric motor with zero-drag precision. Perfect for personal styling, beard shaping, and detailing. Designed with an ergonomic, anti-slip metal cylinder body with beautifully detailed engravings.',
    price: 1249,
    originalPrice: 2500,
    discountPercentage: 50,
    image: './images/products/vintage-t9.jpg',
    images: [
      './images/products/vintage-t9.jpg',
      './images/products/vintage-t9.jpg'
    ],
    category: 'grooming',
    rating: 4.4,
    reviewsCount: 189,
    variants: ['Gold Buddha', 'Silver Dragon', 'Classic Black'],
    specs: [
      { name: 'Power', value: '5W' },
      { name: 'Battery Capacity', value: '1200 mAh' },
      { name: 'Material', value: 'Full Copper / Stainless Body' },
      { name: 'Charging Time', value: '2 Hours' },
      { name: 'Usage Time', value: '120 Minutes' }
    ],
    inStock: true,
    isBestSeller: false,
    isHotDeal: true
  },
  {
    id: 'portable-juicer',
    title: '6-Blade Portable USB Juicer Blender',
    description: 'Rechargeable Juice Blender Bottle, Mini Travel Protein Shaker, Quick Fresh Juice Maker',
    longDescription: 'Drink healthy and fresh wherever you go with the Portable 6-Blade USB Juicer Blender. Perfect for refreshing shakes, healthy fruit smoothies, baby food purees, and protein mixes. Equipped with 6 ultra-sharp stainless steel blades rotating at high-speed to crush pulp effortlessly. Powered by a USB rechargeable battery that lasts up to 10-12 blends per charge.',
    price: 1699,
    originalPrice: 3500,
    discountPercentage: 51,
    image: './images/products/portable-blender.png',
    images: [
      './images/products/portable-blender.png',
      './images/products/portable-blender.png'
    ],
    category: 'kitchen-home',
    rating: 4.5,
    reviewsCount: 84,
    variants: ['Sky Blue', 'Blossom Pink', 'Mint Green', 'Classic White'],
    specs: [
      { name: 'Cup Capacity', value: '380 ml' },
      { name: 'Motor Velocity', value: '15000 - 22000 RPM' },
      { name: 'Blades', value: '6 Premium 304 Stainless Steel' },
      { name: 'Battery Voltage', value: '3.7V / 2000mAh' },
      { name: 'Charging Time', value: 'Approx. 3 hours' }
    ],
    inStock: true,
    isBestSeller: true,
    isHotDeal: false
  },
  {
    id: 'usb-mini-chopper',
    title: 'Wireless USB Electric Mini Chopper',
    description: '250ml Electric Food Chopper, One-Touch Garlic Crusher, Vegetable & Meat Mincer',
    longDescription: 'Save cooking preparation time with the Wireless USB Electric Mini Chopper. This handy kitchen companion features one-button action to chop onions, crush garlic, blend baby purees, or mince small portions of meat in 10 seconds flat. Built with solid food-grade BPA-free materials and safety sensors that prevent rotation if the cup is not secured.',
    price: 1399,
    originalPrice: 2800,
    discountPercentage: 50,
    image: './images/products/mini-chopper.jpg',
    images: [
      './images/products/mini-chopper.jpg'
    ],
    category: 'kitchen-home',
    rating: 4.6,
    reviewsCount: 65,
    variants: ['Pastel Green', 'Clean White'],
    specs: [
      { name: 'Volume Capacity', value: '250 ml' },
      { name: 'Blade Count', value: '3 Stainless Steel Sharp Blades' },
      { name: 'Charging Type', value: 'Micro USB (Cable Included)' },
      { name: 'Rated Power', value: '30W' },
      { name: 'Safe Lock', value: 'Magnetic Safety Sensor induction' }
    ],
    inStock: true,
    isBestSeller: false,
    isHotDeal: false
  },
  {
    id: 'sunset-lamp',
    title: 'Sunset Projection Lamp with Remote',
    description: '16 Colors RGB Color Changing Sunset Aura Projection Light, Romantic Mood Night Light',
    longDescription: 'Set the perfect relaxed mood in your room with the 16-Color RGB Sunset Projection Lamp. Casts a warm, glowing circular light representing sunsets, sunrises, or deep rainbow halos. Comes with an infrared remote controller to switch between 16 custom colors, 4 dynamic light patterns (Flash, Strobe, Fade, Smooth), and adjust brightness levels.',
    price: 999,
    originalPrice: 2000,
    discountPercentage: 50,
    image: './images/products/sunset-lamp.jpg',
    images: [
      './images/products/sunset-lamp.jpg',
      './images/products/sunset-lamp.jpg'
    ],
    category: 'kitchen-home',
    rating: 4.7,
    reviewsCount: 112,
    variants: ['RGB 16 Colors (Remote Included)'],
    specs: [
      { name: 'Cable Length', value: '1.2 meters USB Cable' },
      { name: 'Color Modes', value: '16 Custom RGB Hues' },
      { name: 'Material', value: 'Aluminium Alloy & Heavy Base' },
      { name: 'Angle Rotation', value: '360° Horizontal & 180° Vertical' },
      { name: 'Power Source', value: 'USB 5V/2A' }
    ],
    inStock: true,
    isBestSeller: true,
    isHotDeal: true
  },
  {
    id: 'car-ambient-led',
    title: 'RGB Car Interior LED Strip Lights',
    description: '4pcs 48 LED Car Footwell Lights, Sound Active Music Sync, Remote Control Auto Foot Atmosphere Lamp',
    longDescription: 'Transform your driving experience with the Sound-Active RGB Car Ambient Lights. Includes four premium flexible light strips holding 48 bright LEDs that mount easily in your car footwell areas. Features a built-in high sensitivity microphone that auto-syncs the lights to your music beat. Powered from any 12V Car Cigarette socket or USB port.',
    price: 899,
    originalPrice: 1800,
    discountPercentage: 50,
    image: './images/products/car-led.jpeg',
    images: [
      './images/products/car-led.jpeg'
    ],
    category: 'car-accessories',
    rating: 4.3,
    reviewsCount: 51,
    variants: ['Cigarette Port Power', 'USB Interface Power'],
    specs: [
      { name: 'LED Strip Count', value: '4 Pieces' },
      { name: 'LED Type', value: 'RGB SMD 5050 LEDs' },
      { name: 'Strip Dimensions', value: '22 cm per strip' },
      { name: 'Control Protocol', value: 'Wireless IR Remote & App Sync' },
      { name: 'Music Sensing', value: 'Yes, Audio Sync chip' }
    ],
    inStock: true,
    isBestSeller: false,
    isHotDeal: false
  },
  {
    id: 'portable-handheld-fan',
    title: 'USB Portable Handheld Mini Fan',
    description: '3-Speed Strong Wind Handheld Desk Fan, Rechargeable Battery, Quiet Personal Cooling Fan',
    longDescription: 'Beat the scorching heat waves with this pocket-friendly Portable Handheld Mini Fan. Provides strong, chilling wind with 3 adjustable velocity levels. Quiet brushless motor ensures silent operation at work, study, or travel. Convertible base lets you use it as a standard desktop fan or hand-held outdoors. Rechargeable via micro-USB.',
    price: 1150,
    originalPrice: 2200,
    discountPercentage: 48,
    image: './images/products/portable-fan.jpg',
    images: [
      './images/products/portable-fan.jpg'
    ],
    category: 'kitchen-home',
    rating: 4.5,
    reviewsCount: 43,
    variants: ['Sky White', 'Navy Blue', 'Salmon Pink'],
    specs: [
      { name: 'Speed Modes', value: 'Low / Medium / High Turbines' },
      { name: 'Battery', value: '1200mAh Lithium Rechargeable' },
      { name: 'Work Time', value: '2.5 to 5 Hours depending on speed' },
      { name: 'Charging Time', value: '2 Hours' },
      { name: 'Dimensions', value: '20 x 9.5 x 4 cm' }
    ],
    inStock: true,
    isBestSeller: false,
    isHotDeal: false
  }
];

export const MOCK_REVIEWS = {
  't800-ultra': [
    { id: 'rev-1', author: 'Bilal Khan', rating: 5, date: '3 days ago', comment: 'Kamal ki watch hai! Screen bohot saaf hai aur touch bilkul lag free hai. Bluetooth calling perfect kaam kar rahi hai. Recommended!', verified: true },
    { id: 'rev-2', author: 'Saba Ahmed', rating: 5, date: '1 week ago', comment: 'Amazing watch in this price range. Very premium feel like original Apple watch ultra. Orange strap looks stunning.', verified: true },
    { id: 'rev-3', author: 'Muhammad Usman', rating: 4, date: '2 weeks ago', comment: 'Battery backup normal use pe 2 din chal jati hai. Packing bohot achi thi aur delivery bilkul time pe mili.', verified: true }
  ],
  'air31-earbuds': [
    { id: 'rev-4', author: 'Zainab Fatima', rating: 5, date: 'Yesterday', comment: 'Bohot hi pyare earbuds hain. Design is very beautiful and battery indicator is so cool. Sound quality and bass is superb.', verified: true },
    { id: 'rev-5', author: 'Ahmed Raza', rating: 4, date: '5 days ago', comment: 'Mene green color order kiya tha, matching translucent color bohot piyara hai. Bass sound bohot sharp ha.', verified: true }
  ],
  'm10-pro-earbuds': [
    { id: 'rev-6', author: 'Yasir Ali', rating: 5, date: '4 days ago', comment: 'Mene is se apna mobile charge kiya emergency me, perfect kaam kiya. Sound is also loud and PUBG me delay bilkul na hone k barabar ha.', verified: true },
    { id: 'rev-7', author: 'Hamza Malik', rating: 4, date: '12 days ago', comment: 'Value for money product. Battery capacity is real. Highly satisfied with Royal Sphire.', verified: true }
  ],
  'vgr-v030-trimmer': [
    { id: 'rev-8', author: 'Asif Mehmood', rating: 5, date: '6 days ago', comment: 'Clean zero cut trimmer. Blade quality is top notch. Barber jesi finish milti ha ghr pe hi. Delivery was fast too.', verified: true },
    { id: 'rev-9', author: 'Noman Shah', rating: 5, date: '2 weeks ago', comment: 'Bohot powerful motor ha aur battery 5, 6 shaves asani se nikal deti ha.', verified: true }
  ],
  'vintage-t9-trimmer': [
    { id: 'rev-10', author: 'Kashif Jamil', rating: 5, date: '1 week ago', comment: 'Metal body quality is amazing, engravings are extremely detailed. Sound is very silent and cuts beautifully.', verified: true }
  ],
  'portable-juicer': [
    { id: 'rev-11', author: 'Dr. Maryam', rating: 4, date: '8 days ago', comment: 'Very useful for daily gym shakes. Easily blends bananas and strawberries. USB charge lets me use it in hospital too.', verified: true }
  ],
  'usb-mini-chopper': [
    { id: 'rev-12', author: 'Saira Pervez', rating: 5, date: '3 days ago', comment: 'Onions and garlic chop karna ab bohot asan ho gya hai. Direct wash hojata ha without worries. Loved it.', verified: true }
  ],
  'sunset-lamp': [
    { id: 'rev-13', author: 'Hina Rizvi', rating: 5, date: '2 days ago', comment: 'Room me photography k lye perfect hai. 16 colors remote se change hojate hain asani se.', verified: true }
  ]
};

export const POPULAR_CITIES = [
  'Karachi',
  'Lahore',
  'Faisalabad',
  'Rawalpindi',
  'Gujranwala',
  'Peshawar',
  'Multan',
  'Hyderabad',
  'Islamabad',
  'Quetta',
  'Bahawalpur',
  'Sargodha',
  'Sialkot',
  'Sukkur',
  'Larkana',
  'Sheikhupura',
  'Rahim Yar Khan',
  'Jhang',
  'Dera Ghazi Khan',
  'Gujrat',
  'Sahiwal',
  'Wah Cantt',
  'Mardan',
  'Kasur',
  'Okara',
  'Mingora',
  'Nawabshah',
  'Chiniot',
  'Kotri',
  'Kāmoke'
];
