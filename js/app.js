/**
 * LAPTOPZONE - CONTROLLER CHÍNH CỦA ỨNG DỤNG (APP MODULE)
 * Điều phối sự kiện DOM, render sản phẩm, bộ lọc, tìm kiếm và modal chi tiết
 */

// Ảnh SVG mặc định dự phòng khi ảnh ngoài gặp sự cố hoặc offline
const FALLBACK_LAPTOP_IMG = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f1f5f9'/%3E%3Crect x='50' y='30' width='200' height='120' rx='8' fill='%23334155'/%3E%3Crect x='60' y='40' width='180' height='100' fill='%231e293b'/%3E%3Cpolygon points='30,165 270,165 250,150 50,150' fill='%2364748b'/%3E%3Ctext x='150' y='95' fill='%2394a3b8' font-family='sans-serif' font-size='14' text-anchor='middle'%3ELaptopZone%3C/text%3E%3C/svg%3E";

// Quản lý danh sách Yêu thích (Wishlist) lưu vào LocalStorage
let wishlist = JSON.parse(localStorage.getItem("laptopzone_wishlist") || "[]");

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  renderCatalog();
  setupFilterEvents();
  setupSearchEvents();
  setupModalEvents();
  updateWishlistBadge();
}

/**
 * Hiển thị danh sách sản phẩm dựa theo trạng thái bộ lọc hiện tại
 */
function renderCatalog() {
  const grid = document.getElementById("product-grid");
  const countBadge = document.getElementById("product-total-count");
  const emptyState = document.getElementById("empty-state");

  if (!grid) return;

  const filteredProducts = laptopFilter.applyFilter(LAPTOP_DATA);

  // Cập nhật số lượng sản phẩm hiển thị
  if (countBadge) {
    countBadge.textContent = filteredProducts.length;
  }

  // Xử lý trạng thái không tìm thấy sản phẩm
  if (filteredProducts.length === 0) {
    grid.innerHTML = "";
    grid.style.display = "none";
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  grid.style.display = "grid";
  if (emptyState) emptyState.style.display = "none";

  // Render danh sách thẻ sản phẩm
  grid.innerHTML = filteredProducts.map(laptop => {
    const isFav = wishlist.includes(laptop.id);
    const discount = laptop.originalPrice 
      ? Math.round(((laptop.originalPrice - laptop.price) / laptop.originalPrice) * 100) 
      : 0;

    return `
      <article class="product-card" data-id="${laptop.id}">
        <!-- Nhãn huy hiệu -->
        <div class="product-badge-wrap">
          ${laptop.badge ? `<span class="badge badge-hot">${laptop.badge}</span>` : ""}
          ${discount > 0 ? `<span class="badge badge-sale">-${discount}%</span>` : ""}
        </div>

        <!-- Nút Yêu thích -->
        <button class="product-fav-btn ${isFav ? 'active' : ''}" 
                onclick="toggleWishlist('${laptop.id}', event)" 
                title="${isFav ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        <!-- Ảnh sản phẩm -->
        <div class="product-thumb" onclick="openProductDetail('${laptop.id}')" style="cursor: pointer;">
          <img src="${laptop.image}" alt="${laptop.name}" loading="lazy" onerror="this.onerror=null; this.src='${FALLBACK_LAPTOP_IMG}';">
        </div>

        <!-- Tên laptop -->
        <h3 class="product-title" onclick="openProductDetail('${laptop.id}')" style="cursor: pointer;" title="${laptop.name}">
          ${laptop.name}
        </h3>

        <!-- Tóm tắt thông số cấu hình -->
        <div class="product-specs-pills">
          <span class="spec-pill" title="Vi xử lý CPU">⚡ ${laptop.specs.cpu.split('(')[0].trim()}</span>
          <span class="spec-pill" title="Bộ nhớ RAM">💾 ${laptop.specs.ram.split(' ')[0]}</span>
          <span class="spec-pill" title="Ổ cứng lưu trữ">💿 ${laptop.specs.storage.split(' ')[0]}</span>
        </div>

        <!-- Đánh giá sao -->
        <div class="product-rating">
          <span>⭐ ${laptop.rating}</span>
          <span class="rating-count">(${laptop.reviewsCount} đánh giá)</span>
        </div>

        <!-- Giá tiền -->
        <div class="product-price-box">
          <span class="current-price">${formatCurrency(laptop.price)}</span>
          ${laptop.originalPrice ? `<span class="original-price">${formatCurrency(laptop.originalPrice)}</span>` : ""}
        </div>

        <!-- Các nút thao tác nhanh -->
        <div class="product-card-actions">
          <button class="btn btn-outline" onclick="openProductDetail('${laptop.id}')" title="Xem chi tiết thông số">
            Chi tiết
          </button>
          <button class="btn btn-primary" onclick="handleAddToCart('${laptop.id}')" title="Thêm vào giỏ hàng">
            + Giỏ
          </button>
        </div>
        <button class="btn btn-secondary btn-sm" style="margin-top: 0.45rem; width: 100%; font-size: 11px; padding: 0.35rem 0.5rem;" onclick="handleAddToCompare('${laptop.id}')" title="So sánh thông số">
          ⚖️ Thêm vào so sánh
        </button>
      </article>
    `;
  }).join("");
}

/**
 * Thiết lập các sự kiện cho Bộ lọc & Sắp xếp
 */
function setupFilterEvents() {
  // 1. Lọc theo Thanh Danh Mục Nhanh (Pills)
  const categoryPills = document.querySelectorAll("#category-pills .nav-pill");
  categoryPills.forEach(pill => {
    pill.addEventListener("click", () => {
      categoryPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      laptopFilter.setCategory(pill.dataset.category);
      renderCatalog();
    });
  });

  // 2. Lọc theo Thương hiệu (Brand bar)
  const brandItems = document.querySelectorAll("#brand-list .brand-item");
  brandItems.forEach(item => {
    item.addEventListener("click", () => {
      brandItems.forEach(b => b.classList.remove("active"));
      item.classList.add("active");
      laptopFilter.setBrand(item.dataset.brand);
      renderCatalog();
    });
  });

  // 3. Lọc theo Mức giá (Radio buttons)
  const priceRadios = document.querySelectorAll('input[name="price-range"]');
  priceRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      laptopFilter.setPriceRange(e.target.value);
      renderCatalog();
    });
  });

  // 4. Lọc theo Nhu cầu sử dụng (Sidebar Checkbox)
  const categoryCheckboxes = document.querySelectorAll('input[name="category-filter"]');
  categoryCheckboxes.forEach(cb => {
    cb.addEventListener("change", () => {
      const selected = Array.from(categoryCheckboxes)
        .filter(c => c.checked)
        .map(c => c.value);
      laptopFilter.setSidebarCategories(selected);
      renderCatalog();
    });
  });

  // 5. Lọc theo RAM (Checkbox)
  const ramCheckboxes = document.querySelectorAll('input[name="ram-filter"]');
  ramCheckboxes.forEach(cb => {
    cb.addEventListener("change", () => {
      const selected = Array.from(ramCheckboxes)
        .filter(c => c.checked)
        .map(c => c.value);
      laptopFilter.setRamFilters(selected);
      renderCatalog();
    });
  });

  // 6. Lọc theo CPU (Checkbox)
  const cpuCheckboxes = document.querySelectorAll('input[name="cpu-filter"]');
  cpuCheckboxes.forEach(cb => {
    cb.addEventListener("change", () => {
      const selected = Array.from(cpuCheckboxes)
        .filter(c => c.checked)
        .map(c => c.value);
      laptopFilter.setCpuFilters(selected);
      renderCatalog();
    });
  });

  // 7. Sắp xếp sản phẩm (Sort select)
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      laptopFilter.setSortBy(e.target.value);
      renderCatalog();
    });
  }

  // 8. Đặt lại bộ lọc (Reset button)
  const resetBtn = document.getElementById("reset-filter-btn");
  const emptyResetBtn = document.getElementById("empty-reset-btn");
  const handleReset = () => {
    laptopFilter.reset();

    // Reset radio giá
    const firstPriceRadio = document.querySelector('input[name="price-range"][value="all"]');
    if (firstPriceRadio) firstPriceRadio.checked = true;

    // Bỏ check tất cả checkbox
    document.querySelectorAll('.filter-sidebar input[type="checkbox"]').forEach(cb => cb.checked = false);

    // Active pill đầu tiên
    categoryPills.forEach((p, idx) => p.classList.toggle("active", idx === 0));
    brandItems.forEach((b, idx) => b.classList.toggle("active", idx === 0));

    // Xóa từ khóa search
    const searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.value = "";

    renderCatalog();
    showToast("Đã đặt lại toàn bộ bộ lọc!", "info");
  };

  if (resetBtn) resetBtn.addEventListener("click", handleReset);
  if (emptyResetBtn) emptyResetBtn.addEventListener("click", handleReset);
}

/**
 * Thiết lập sự kiện Tìm kiếm thông minh & Gợi ý tức thì
 */
function setupSearchEvents() {
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const dropdown = document.getElementById("search-dropdown");

  if (!searchInput || !dropdown) return;

  // Lắng nghe khi gõ phím để tìm kiếm tức thì và hiển thị dropdown
  searchInput.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    laptopFilter.setSearchKeyword(val);
    renderCatalog();

    if (val.length >= 2) {
      const suggestions = laptopFilter.getSuggestions(LAPTOP_DATA, val, 5);
      if (suggestions.length > 0) {
        dropdown.innerHTML = suggestions.map(item => `
          <div class="search-suggest-item" onclick="openProductDetail('${item.id}'); document.getElementById('search-dropdown').style.display='none';">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='${FALLBACK_LAPTOP_IMG}';">
            <div>
              <div style="font-size: 13px; font-weight: 600; color: var(--text-main);">${item.name}</div>
              <div style="font-size: 12px; color: var(--accent-red); font-weight: 700;">${formatCurrency(item.price)}</div>
            </div>
          </div>
        `).join("");
        dropdown.style.display = "block";
      } else {
        dropdown.innerHTML = `<div style="padding: 1rem; font-size: 13px; color: var(--text-muted); text-align: center;">Không có gợi ý phù hợp</div>`;
        dropdown.style.display = "block";
      }
    } else {
      dropdown.style.display = "none";
    }
  });

  // Tìm kiếm khi nhấn Enter
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      dropdown.style.display = "none";
      laptopFilter.setSearchKeyword(searchInput.value);
      renderCatalog();
    }
  });

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      dropdown.style.display = "none";
      laptopFilter.setSearchKeyword(searchInput.value);
      renderCatalog();
    });
  }

  // Đóng dropdown khi click ra ngoài
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-box")) {
      dropdown.style.display = "none";
    }
  });
}

/**
 * Mở Modal xem chi tiết sản phẩm & Thông số kỹ thuật
 */
function openProductDetail(productId) {
  const laptop = LAPTOP_DATA.find(p => p.id === productId);
  if (!laptop) return;

  const modal = document.getElementById("product-detail-modal");
  const modalContent = document.getElementById("modal-product-content");
  const modalTitle = document.getElementById("modal-product-title");
  const backdrop = document.getElementById("overlay-backdrop");

  if (!modal || !modalContent) return;

  if (modalTitle) modalTitle.textContent = laptop.name;

  modalContent.innerHTML = `
    <div class="detail-grid">
      <!-- Cột Trái: Ảnh lớn, Giá & Thao tác -->
      <div>
        <div class="detail-img-box">
          <img src="${laptop.image}" alt="${laptop.name}" onerror="this.src='${FALLBACK_LAPTOP_IMG}';">
        </div>

        <div class="detail-price-box">
          <div>
            <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-red);">
              ${formatCurrency(laptop.price)}
            </div>
            ${laptop.originalPrice ? `
              <div style="font-size: 0.85rem; color: var(--text-muted); text-decoration: line-through;">
                Giá niêm yết: ${formatCurrency(laptop.originalPrice)}
              </div>
            ` : ""}
          </div>
          ${laptop.originalPrice ? `
            <span class="badge badge-sale" style="font-size: 13px;">
              Tiết kiệm ${formatCurrency(laptop.originalPrice - laptop.price)}
            </span>
          ` : ""}
        </div>

        <div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.25rem;">
          ${laptop.description}
        </div>

        <div class="flex" style="gap: 0.75rem;">
          <button class="btn btn-primary" style="flex: 1; padding: 0.75rem;" onclick="handleAddToCart('${laptop.id}'); closeAllModals();">
            🛒 Thêm vào giỏ hàng
          </button>
          <button class="btn btn-secondary" onclick="handleAddToCompare('${laptop.id}')" title="So sánh">
            ⚖️ So sánh
          </button>
        </div>
      </div>

      <!-- Cột Phải: Bảng thông số kỹ thuật chi tiết -->
      <div>
        <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-main);">
          Bảng thông số kỹ thuật chi tiết
        </h4>
        <table class="specs-table">
          <tbody>
            <tr>
              <td>Vi xử lý (CPU)</td>
              <td>${laptop.specs.cpu}</td>
            </tr>
            <tr>
              <td>Bộ nhớ RAM</td>
              <td>${laptop.specs.ram}</td>
            </tr>
            <tr>
              <td>Ổ cứng lưu trữ</td>
              <td>${laptop.specs.storage}</td>
            </tr>
            <tr>
              <td>Card màn hình (GPU)</td>
              <td>${laptop.specs.vga}</td>
            </tr>
            <tr>
              <td>Màn hình hiển thị</td>
              <td>${laptop.specs.screen}</td>
            </tr>
            <tr>
              <td>Thời lượng Pin</td>
              <td>${laptop.specs.battery}</td>
            </tr>
            <tr>
              <td>Trọng lượng</td>
              <td>${laptop.specs.weight}</td>
            </tr>
            <tr>
              <td>Hệ điều hành</td>
              <td>${laptop.specs.os}</td>
            </tr>
            <tr>
              <td>Chính sách bảo hành</td>
              <td>Bảo hành 24 tháng chính hãng tại tất cả các TTBH toàn quốc</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  modal.classList.add("open");
  if (backdrop) backdrop.classList.add("show");
}

/**
 * Xử lý đóng tất cả modal và drawer
 */
function setupModalEvents() {
  const backdrop = document.getElementById("overlay-backdrop");
  const closeDetailBtn = document.getElementById("close-detail-modal");
  const closeCompareBtn = document.getElementById("close-compare-modal");
  const closeCheckoutBtn = document.getElementById("close-checkout-modal");
  const closeCartBtn = document.getElementById("close-cart-btn");

  if (backdrop) backdrop.addEventListener("click", closeAllModals);
  if (closeDetailBtn) closeDetailBtn.addEventListener("click", closeAllModals);
  if (closeCompareBtn) closeCompareBtn.addEventListener("click", closeAllModals);
  if (closeCheckoutBtn) closeCheckoutBtn.addEventListener("click", closeAllModals);
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeAllModals);

  // Đóng bằng phím Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllModals();
  });
}

function closeAllModals() {
  document.querySelectorAll(".modal").forEach(m => m.classList.remove("open"));
  const drawer = document.getElementById("cart-drawer");
  if (drawer) drawer.classList.remove("open");
  const backdrop = document.getElementById("overlay-backdrop");
  if (backdrop) backdrop.classList.remove("show");
}

/**
 * Quản lý danh sách Yêu thích (Wishlist)
 */
function toggleWishlist(productId, event) {
  if (event) event.stopPropagation();

  const index = wishlist.indexOf(productId);
  const laptop = LAPTOP_DATA.find(p => p.id === productId);
  const name = laptop ? laptop.name : "Sản phẩm";

  if (index > -1) {
    wishlist.splice(index, 1);
    showToast(`Đã xóa "${name}" khỏi danh sách yêu thích`, "info");
  } else {
    wishlist.push(productId);
    showToast(`Đã thêm "${name}" vào danh sách yêu thích ❤️`, "success");
  }

  localStorage.setItem("laptopzone_wishlist", JSON.stringify(wishlist));
  updateWishlistBadge();
  renderCatalog();
}

function updateWishlistBadge() {
  const badge = document.getElementById("wishlist-badge");
  if (badge) {
    badge.textContent = wishlist.length;
    badge.style.display = wishlist.length > 0 ? "flex" : "none";
  }
}

/**
 * Hàm hỗ trợ hiển thị Toast thông báo
 */
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  
  let icon = "ℹ️";
  if (type === "success") icon = "✅";
  if (type === "warning") icon = "⚠️";
  if (type === "error") icon = "❌";

  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Hàm dự phòng khi chưa nạp module Cart hoặc Compare
function handleAddToCart(productId) {
  if (window.laptopCart && typeof window.laptopCart.addItem === "function") {
    window.laptopCart.addItem(productId);
  } else {
    showToast("Tính năng giỏ hàng sẽ được kích hoạt ở Giai đoạn 4!", "info");
  }
}

function handleAddToCompare(productId) {
  if (window.laptopCompare && typeof window.laptopCompare.addProduct === "function") {
    window.laptopCompare.addProduct(productId);
  } else {
    showToast("Tính năng so sánh cấu hình sẽ được kích hoạt ở Giai đoạn 5!", "info");
  }
}

