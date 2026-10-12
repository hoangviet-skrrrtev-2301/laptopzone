/**
 * LAPTOPZONE - DỮ LIỆU SẢN PHẨM MẪU (MOCK DATA)
 * Tương thích chuẩn ES6+ / Chạy độc lập trên trình duyệt
 */

const LAPTOP_DATA = [
  {
    id: "lp-01",
    name: "MacBook Pro 14 M3 Pro (18GB / 512GB)",
    brand: "apple",
    category: "macbook",
    price: 49990000,
    originalPrice: 52990000,
    rating: 4.9,
    reviewsCount: 128,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    badge: "Bán chạy",
    isHot: true,
    inStock: true,
    specs: {
      cpu: "Apple M3 Pro (11-core CPU, 14-core GPU)",
      ram: "18GB Unified Memory",
      storage: "512GB SSD PCIe siêu tốc",
      vga: "Apple 14-core GPU tích hợp",
      screen: '14.2" Liquid Retina XDR (3024 x 1964) 120Hz ProMotion',
      battery: "70 Wh (lên tới 18 giờ)",
      weight: "1.61 kg",
      os: "macOS Sonoma"
    },
    description: "MacBook Pro 14 inch trang bị chip M3 Pro mang lại hiệu năng phi thường cho lập trình viên, nhà sáng tạo đồ họa và biên tập video chuyên nghiệp."
  },
  {
    id: "lp-02",
    name: "ASUS ROG Strix G16 G614JVR (RTX 4060 / i9-14900HX)",
    brand: "asus",
    category: "gaming",
    price: 41490000,
    originalPrice: 45990000,
    rating: 4.8,
    reviewsCount: 86,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    badge: "Hot Gaming",
    isHot: true,
    inStock: true,
    specs: {
      cpu: "Intel Core i9-14900HX (24 nhân, 32 luồng, up to 5.8GHz)",
      ram: "16GB DDR5 5600MHz (Nâng cấp tối đa 64GB)",
      storage: "1TB SSD M.2 NVMe PCIe 4.0",
      vga: "NVIDIA GeForce RTX 4060 8GB GDDR6 (TGP 140W)",
      screen: '16.0" QHD+ (2560 x 1600) 240Hz, 100% DCI-P3, G-Sync',
      battery: "90 Wh 4-cell Li-ion",
      weight: "2.50 kg",
      os: "Windows 11 Home Bản quyền"
    },
    description: "Cỗ máy chiến game đỉnh cao với hệ thống tản nhiệt thông minh ROG Intelligent Cooling kèm keo tản nhiệt kim loại lỏng Conductonaut Extreme."
  },
  {
    id: "lp-03",
    name: "Dell XPS 15 9530 (i7-13700H / RTX 4050 / OLED 3.5K)",
    brand: "dell",
    category: "premium",
    price: 52990000,
    originalPrice: 57990000,
    rating: 4.7,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
    badge: "Cao cấp",
    isHot: false,
    inStock: true,
    specs: {
      cpu: "Intel Core i7-13700H (14 nhân, 20 luồng, up to 5.0GHz)",
      ram: "32GB DDR5 4800MHz Dual-channel",
      storage: "1TB SSD PCIe Gen4 NVMe",
      vga: "NVIDIA GeForce RTX 4050 6GB GDDR6",
      screen: '15.6" 3.5K OLED Touch (3456 x 2160) 100% DCI-P3 InfinityEdge',
      battery: "86 Whr tích hợp",
      weight: "1.92 kg",
      os: "Windows 11 Pro"
    },
    description: "Tuyệt phẩm laptop doanh nhân và sáng tạo nội dung với vỏ nhôm nguyên khối cắt CNC, viền màn hình siêu mỏng 4 cạnh chuẩn InfinityEdge."
  },
  {
    id: "lp-04",
    name: "Lenovo Legion Pro 5 16IRX9 (i7-14650HX / RTX 4060)",
    brand: "lenovo",
    category: "gaming",
    price: 38990000,
    originalPrice: 42990000,
    rating: 4.8,
    reviewsCount: 110,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
    badge: "Trả góp 0%",
    isHot: true,
    inStock: true,
    specs: {
      cpu: "Intel Core i7-14650HX (16 nhân, 24 luồng)",
      ram: "16GB DDR5 5600MHz",
      storage: "512GB SSD M.2 PCIe 4.0",
      vga: "NVIDIA GeForce RTX 4060 8GB GDDR6 (140W TGP)",
      screen: '16" WQXGA (2560x1600) IPS 240Hz, 500 nits, 100% sRGB',
      battery: "80 Whr kèm sạc nhanh 300W",
      weight: "2.35 kg",
      os: "Windows 11 Home"
    },
    description: "Laptop gaming quốc dân sở hữu chip AI chuyên dụng Lenovo LA1 tối ưu hiệu suất tự động theo từng tựa game bom tấn AAA."
  },
  {
    id: "lp-05",
    name: "MacBook Air 13 M3 (8-core CPU / 8GB / 256GB)",
    brand: "apple",
    category: "macbook",
    price: 27490000,
    originalPrice: 28990000,
    rating: 4.9,
    reviewsCount: 245,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
    badge: "Bán chạy #1",
    isHot: true,
    inStock: true,
    specs: {
      cpu: "Apple M3 (8-core CPU, 8-core GPU, 16-core Neural Engine)",
      ram: "8GB Unified Memory",
      storage: "256GB SSD siêu tốc",
      vga: "Apple 8-core GPU",
      screen: '13.6" Liquid Retina (2560 x 1664) 500 nits True Tone',
      battery: "52.6 Whr (lên tới 18 giờ dùng liên tục)",
      weight: "1.24 kg siêu mỏng",
      os: "macOS Sonoma"
    },
    description: "Thiết kế siêu mỏng nhẹ chỉ 11.3mm, thời lượng pin cả ngày dài và hỗ trợ xuất ra đồng thời 2 màn hình ngoài khi gập máy."
  },
  {
    id: "lp-06",
    name: "HP Envy x360 14-es1023dx 2-in-1 (i7-150U / 16GB)",
    brand: "hp",
    category: "office",
    price: 21990000,
    originalPrice: 24500000,
    rating: 4.6,
    reviewsCount: 42,
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80",
    badge: "Xoay gập 360",
    isHot: false,
    inStock: true,
    specs: {
      cpu: "Intel Core 7 150U (10 nhân, 12 luồng, up to 5.4GHz)",
      ram: "16GB DDR4 3200MHz Onboard",
      storage: "512GB PCIe NVMe M.2 SSD",
      vga: "Intel Graphics tích hợp",
      screen: '14.0" FHD (1920 x 1080) Cảm ứng đa điểm, kính cường lực Gorilla Glass',
      battery: "43 Wh Li-ion Polymer",
      weight: "1.52 kg",
      os: "Windows 11 Home"
    },
    description: "Linh hoạt biến hóa từ laptop sang tablet chỉ với thao tác xoay gập 360 độ, phục vụ hoàn hảo cho hội họp thuyết trình và ghi chú nhanh."
  },
  {
    id: "lp-07",
    name: "ASUS Zenbook 14 OLED UX3405MA (Intel Core Ultra 7 155H)",
    brand: "asus",
    category: "creator",
    price: 31990000,
    originalPrice: 34990000,
    rating: 4.9,
    reviewsCount: 58,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80",
    badge: "Màn hình OLED 120Hz",
    isHot: true,
    inStock: true,
    specs: {
      cpu: "Intel Core Ultra 7 155H tích hợp Intel AI Boost NPU",
      ram: "32GB LPDDR5X 7467MHz",
      storage: "1TB M.2 NVMe PCIe 4.0 SSD",
      vga: "Intel Arc Graphics hiệu năng cao",
      screen: '14.0" 3K (2880 x 1800) OLED 16:10 120Hz 0.2ms 100% DCI-P3 600 nits',
      battery: "75 Whrs chuẩn pin trâu",
      weight: "1.20 kg",
      os: "Windows 11 Home"
    },
    description: "Laptop chuẩn Intel Evo thế hệ mới trang bị màn hình OLED Lumina rực rỡ và chip AI chuyên dụng xử lý tác vụ thông minh mượt mà."
  },
  {
    id: "lp-08",
    name: "Acer Predator Helios Neo 16 PHN16 (i7-14700HX / RTX 4060)",
    brand: "acer",
    category: "gaming",
    price: 36490000,
    originalPrice: 39990000,
    rating: 4.7,
    reviewsCount: 77,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
    badge: "Quạt AeroBlade 3D",
    isHot: false,
    inStock: true,
    specs: {
      cpu: "Intel Core i7-14700HX (20 nhân, 28 luồng, up to 5.5GHz)",
      ram: "16GB DDR5 5600MHz (2 khe rời)",
      storage: "512GB PCIe Gen4 NVMe SSD (Còn 1 khe trống)",
      vga: "NVIDIA GeForce RTX 4060 8GB GDDR6 (Max TGP 140W)",
      screen: '16" WQXGA (2560 x 1600) 165Hz IPS, 100% sRGB, 500 nits',
      battery: "90 Wh Li-ion",
      weight: "2.60 kg",
      os: "Windows 11 Home"
    },
    description: "Khắc laser mã ký hiệu viễn tưởng độc đáo trên nắp máy, hệ thống quạt kim loại 3D AeroBlade thế hệ 5 giữ nhiệt độ luôn mát mẻ."
  },
  {
    id: "lp-09",
    name: "MSI Katana 15 B13VEK (i7-13620H / RTX 4050 6GB)",
    brand: "msi",
    category: "gaming",
    price: 25490000,
    originalPrice: 28990000,
    rating: 4.6,
    reviewsCount: 93,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
    badge: "Giá hời Gaming",
    isHot: false,
    inStock: true,
    specs: {
      cpu: "Intel Core i7-13620H (10 nhân, 16 luồng)",
      ram: "16GB DDR5 5200MHz",
      storage: "1TB NVMe PCIe Gen4x4 SSD",
      vga: "NVIDIA GeForce RTX 4050 6GB GDDR6",
      screen: '15.6" FHD (1920x1080) 144Hz IPS-level',
      battery: "53.5 Whr 3-cell",
      weight: "2.25 kg",
      os: "Windows 11 Home"
    },
    description: "Bàn phím RGB 4 vùng nổi bật với cụm phím WASD trong suốt, hiệu năng gaming ấn tượng trong phân khúc giá phổ thông dưới 26 triệu."
  },
  {
    id: "lp-10",
    name: "Lenovo ThinkPad X1 Carbon Gen 11 (i7-1365U vPro / 32GB)",
    brand: "lenovo",
    category: "premium",
    price: 46990000,
    originalPrice: 51900000,
    rating: 4.9,
    reviewsCount: 39,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    badge: "Chuẩn Quân đội Mỹ",
    isHot: false,
    inStock: true,
    specs: {
      cpu: "Intel Core i7-1365U vPro (10 nhân, 12 luồng)",
      ram: "32GB LPDDR5 6400MHz",
      storage: "1TB SSD M.2 2280 PCIe NVMe Opal 2.0",
      vga: "Intel Iris Xe Graphics",
      screen: '14.0" WUXGA (1920 x 1200) IPS Anti-glare 400 nits, 100% sRGB',
      battery: "57 Whr hỗ trợ sạc nhanh Rapid Charge",
      weight: "1.12 kg siêu nhẹ",
      os: "Windows 11 Pro Bản quyền"
    },
    description: "Được chế tác từ sợi carbon cao cấp và hợp kim magie, đạt chuẩn độ bền quân đội Mỹ MIL-STD-810H cùng bàn phím ThinkPad gõ êm số 1 thế giới."
  },
  {
    id: "lp-11",
    name: "Acer Swift Go 14 SFG14 (Core Ultra 5 125H / OLED 2.8K)",
    brand: "acer",
    category: "office",
    price: 19990000,
    originalPrice: 22490000,
    rating: 4.7,
    reviewsCount: 52,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
    badge: "OLED Dưới 20 Triệu",
    isHot: true,
    inStock: true,
    specs: {
      cpu: "Intel Core Ultra 5 125H (14 nhân, 18 luồng)",
      ram: "16GB LPDDR5X Dual-channel",
      storage: "512GB PCIe NVMe SSD",
      vga: "Intel Arc Graphics",
      screen: '14.0" 2.8K OLED (2880 x 1800) 90Hz, 100% DCI-P3 500 nits',
      battery: "65 Whr",
      weight: "1.32 kg",
      os: "Windows 11 Home"
    },
    description: "Sự kết hợp hoàn hảo giữa chip Intel Core Ultra AI mới nhất và màn hình OLED 2.8K tuyệt đẹp với mức giá dễ tiếp cận nhất cho sinh viên."
  },
  {
    id: "lp-12",
    name: "Dell Inspiron 15 3530 (i5-1335U / 16GB / 512GB)",
    brand: "dell",
    category: "office",
    price: 14890000,
    originalPrice: 16990000,
    rating: 4.5,
    reviewsCount: 140,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
    badge: "Tiết kiệm",
    isHot: false,
    inStock: true,
    specs: {
      cpu: "Intel Core i5-1335U (10 nhân, 12 luồng, up to 4.6GHz)",
      ram: "16GB DDR4 2666MHz (2x8GB)",
      storage: "512GB M.2 PCIe NVMe SSD",
      vga: "Intel Iris Xe Graphics",
      screen: '15.6" FHD (1920 x 1080) 120Hz WVA Anti-glare',
      battery: "41 Whr 3-cell",
      weight: "1.65 kg",
      os: "Windows 11 Home + Office Home & Student"
    },
    description: "Chiếc laptop văn phòng bền bỉ, màn hình 120Hz mượt mà, tặng kèm bản quyền Office trọn đời phù hợp cho học sinh, giáo viên và nhân viên văn phòng."
  }
];

// Danh mục nhu cầu sử dụng
const CATEGORIES = [
  { id: "all", name: "Tất cả sản phẩm", icon: "laptop" },
  { id: "gaming", name: "Laptop Gaming", icon: "gamepad" },
  { id: "office", name: "Văn phòng & Sinh viên", icon: "book" },
  { id: "creator", name: "Đồ họa & Kỹ thuật", icon: "palette" },
  { id: "premium", name: "Mỏng nhẹ & Cao cấp", icon: "award" },
  { id: "macbook", name: "Apple MacBook", icon: "apple" }
];

// Danh sách hãng sản xuất
const BRANDS = [
  { id: "apple", name: "Apple", logo: "Apple" },
  { id: "asus", name: "ASUS", logo: "ASUS" },
  { id: "dell", name: "Dell", logo: "Dell" },
  { id: "lenovo", name: "Lenovo", logo: "Lenovo" },
  { id: "hp", name: "HP", logo: "HP" },
  { id: "acer", name: "Acer", logo: "Acer" },
  { id: "msi", name: "MSI", logo: "MSI" }
];

// Khoảng giá lọc sản phẩm
const PRICE_RANGES = [
  { id: "all", label: "Tất cả mức giá", min: 0, max: Infinity },
  { id: "under-15m", label: "Dưới 15 triệu", min: 0, max: 15000000 },
  { id: "15m-25m", label: "Từ 15 - 25 triệu", min: 15000000, max: 25000000 },
  { id: "25m-35m", label: "Từ 25 - 35 triệu", min: 25000000, max: 35000000 },
  { id: "above-35m", label: "Trên 35 triệu", min: 35000000, max: Infinity }
];

// Mã voucher giảm giá giả lập
const VOUCHERS = {
  "LAPTOPZONE10": { discountPercent: 10, maxDiscount: 2000000, description: "Giảm 10% (tối đa 2.000.000đ)" },
  "WELCOME2026": { discountPercent: 5, maxDiscount: 1000000, description: "Giảm 5% cho khách hàng mới (tối đa 1.000.000đ)" },
  "FREESHIP": { discountPercent: 0, flatDiscount: 50000, description: "Miễn phí vận chuyển toàn quốc (-50.000đ)" }
};

// Hàm định dạng tiền tệ VND (VD: 25.000.000 đ)
function formatCurrency(number) {
  if (typeof number !== "number" || isNaN(number)) return "0 đ";
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(number);
}

