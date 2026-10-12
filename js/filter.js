/**
 * LAPTOPZONE - BỘ LỌC TÌM KIẾM & SẮP XẾP SẢN PHẨM (FILTER MODULE)
 * Hỗ trợ lọc đa điều kiện thời gian thực không reload trang
 */

class LaptopFilter {
  constructor() {
    this.state = {
      brand: "all",
      category: "all",
      priceRange: "all",
      sidebarCategories: [],
      ramFilters: [],
      cpuFilters: [],
      searchKeyword: "",
      sortBy: "featured"
    };
  }

  // Cập nhật từng tiêu chí lọc
  setBrand(brand) {
    this.state.brand = brand || "all";
  }

  setCategory(category) {
    this.state.category = category || "all";
  }

  setPriceRange(rangeId) {
    this.state.priceRange = rangeId || "all";
  }

  setSidebarCategories(categories) {
    this.state.sidebarCategories = categories || [];
  }

  setRamFilters(rams) {
    this.state.ramFilters = rams || [];
  }

  setCpuFilters(cpus) {
    this.state.cpuFilters = cpus || [];
  }

  setSearchKeyword(keyword) {
    this.state.searchKeyword = (keyword || "").trim().toLowerCase();
  }

  setSortBy(sortBy) {
    this.state.sortBy = sortBy || "featured";
  }

  // Đặt lại toàn bộ bộ lọc về mặc định
  reset() {
    this.state = {
      brand: "all",
      category: "all",
      priceRange: "all",
      sidebarCategories: [],
      ramFilters: [],
      cpuFilters: [],
      searchKeyword: "",
      sortBy: "featured"
    };
  }

  // Áp dụng tất cả bộ lọc lên danh sách sản phẩm
  applyFilter(products) {
    if (!Array.isArray(products)) return [];

    let filtered = products.filter(product => {
      // 1. Lọc theo thương hiệu (Brand bar)
      if (this.state.brand !== "all" && product.brand !== this.state.brand) {
        return false;
      }

      // 2. Lọc theo danh mục trên thanh điều hướng (Category pills)
      if (this.state.category !== "all" && product.category !== this.state.category) {
        return false;
      }

      // 3. Lọc theo nhu cầu trong Sidebar (Checkbox)
      if (this.state.sidebarCategories.length > 0) {
        if (!this.state.sidebarCategories.includes(product.category)) {
          return false;
        }
      }

      // 4. Lọc theo khoảng giá (Radio button)
      if (this.state.priceRange !== "all") {
        const range = PRICE_RANGES.find(r => r.id === this.state.priceRange);
        if (range) {
          if (product.price < range.min || product.price > range.max) {
            return false;
          }
        }
      }

      // 5. Lọc theo dung lượng RAM (Checkbox)
      if (this.state.ramFilters.length > 0) {
        const ramText = (product.specs.ram || "").toLowerCase();
        const matchesRam = this.state.ramFilters.some(ram => {
          if (ram === "8gb") return ramText.includes("8gb");
          if (ram === "16gb") return ramText.includes("16gb");
          if (ram === "32gb") return ramText.includes("32gb") || ramText.includes("64gb");
          return false;
        });
        if (!matchesRam) return false;
      }

      // 6. Lọc theo dòng CPU (Checkbox)
      if (this.state.cpuFilters.length > 0) {
        const cpuText = (product.specs.cpu || "").toLowerCase();
        const matchesCpu = this.state.cpuFilters.some(cpu => {
          if (cpu === "intel") return cpuText.includes("intel") || cpuText.includes("core");
          if (cpu === "apple") return cpuText.includes("apple") || cpuText.includes("m2") || cpuText.includes("m3");
          return false;
        });
        if (!matchesCpu) return false;
      }

      // 7. Lọc theo từ khóa tìm kiếm (Tên, Hãng, CPU, VGA, Mô tả)
      if (this.state.searchKeyword) {
        const keyword = this.state.searchKeyword;
        const searchableContent = [
          product.name,
          product.brand,
          product.specs.cpu,
          product.specs.vga,
          product.specs.storage,
          product.specs.screen,
          product.description
        ].join(" ").toLowerCase();

        if (!searchableContent.includes(keyword)) {
          return false;
        }
      }

      return true;
    });

    // Sắp xếp kết quả sau khi lọc
    return this.sortProducts(filtered);
  }

  // Sắp xếp sản phẩm theo tiêu chí
  sortProducts(products) {
    const list = [...products];

    switch (this.state.sortBy) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating-desc":
        return list.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
      case "name-asc":
        return list.sort((a, b) => a.name.localeCompare(b.name, "vi"));
      case "featured":
      default:
        // Ưu tiên sản phẩm Hot và điểm rating cao
        return list.sort((a, b) => (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0) || b.rating - a.rating);
    }
  }

  // Gợi ý tìm kiếm nhanh cho ô Search box (tối đa 5 kết quả)
  getSuggestions(products, query, limit = 5) {
    if (!query || query.trim().length === 0) return [];
    const keyword = query.trim().toLowerCase();

    return products
      .filter(p => {
        const text = `${p.name} ${p.brand} ${p.specs.cpu} ${p.specs.vga}`.toLowerCase();
        return text.includes(keyword);
      })
      .slice(0, limit);
  }
}

// Khởi tạo đối tượng bộ lọc dùng chung cho ứng dụng
const laptopFilter = new LaptopFilter();

