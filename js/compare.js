/**
 * LAPTOPZONE - CÔNG CỤ SO SÁNH CẤU HÌNH (COMPARE MODULE)
 * Hỗ trợ đối chiếu thông số 2 - 3 mẫu laptop song song trên bảng chi tiết
 */

class LaptopCompare {
  constructor() {
    this.selectedIds = JSON.parse(localStorage.getItem("laptopzone_compare") || "[]");
  }

  init() {
    this.setupEvents();
    this.updateBadge();
  }

  save() {
    localStorage.setItem("laptopzone_compare", JSON.stringify(this.selectedIds));
    this.updateBadge();
  }

  updateBadge() {
    const badge = document.getElementById("compare-badge");
    if (badge) {
      badge.textContent = this.selectedIds.length;
      badge.style.display = this.selectedIds.length > 0 ? "flex" : "none";
    }
  }

  // Thêm laptop vào danh sách so sánh (tối đa 3 máy)
  addProduct(productId) {
    if (this.selectedIds.includes(productId)) {
      showToast("Laptop này đã có trong danh sách so sánh!", "warning");
      this.openModal();
      return;
    }

    if (this.selectedIds.length >= 3) {
      showToast("Chỉ có thể so sánh tối đa 3 laptop cùng lúc!", "warning");
      this.openModal();
      return;
    }

    const laptop = LAPTOP_DATA.find(p => p.id === productId);
    const name = laptop ? laptop.name : "Sản phẩm";

    this.selectedIds.push(productId);
    this.save();
    showToast(`Đã thêm "${name}" vào danh sách so sánh ⚖️`, "success");
    this.openModal();
  }

  // Xóa 1 laptop khỏi danh sách so sánh
  removeProduct(productId) {
    this.selectedIds = this.selectedIds.filter(id => id !== productId);
    this.save();
    this.render();
  }

  // Xóa toàn bộ danh sách so sánh
  clearAll() {
    this.selectedIds = [];
    this.save();
    this.render();
    showToast("Đã làm trống danh sách so sánh", "info");
  }

  // Mở modal so sánh
  openModal() {
    const modal = document.getElementById("compare-modal");
    const backdrop = document.getElementById("overlay-backdrop");
    if (!modal) return;

    this.render();
    modal.classList.add("open");
    if (backdrop) backdrop.classList.add("show");
  }

  // Hiển thị bảng so sánh
  render() {
    const container = document.getElementById("compare-modal-content");
    if (!container) return;

    if (this.selectedIds.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem;">
          <div style="font-size: 3rem; margin-bottom: 0.75rem;">⚖️</div>
          <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-main);">
            Danh sách so sánh đang trống
          </h4>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.5rem; max-width: 450px; margin-left: auto; margin-right: auto;">
            Hãy bấm vào nút <strong>"⚖️ So sánh"</strong> trên bất kỳ laptop nào bạn đang phân vân để đặt chúng cạnh nhau và đối chiếu cấu hình chi tiết!
          </p>
          <button class="btn btn-primary" onclick="closeAllModals()">
            Khám phá danh sách laptop ngay
          </button>
        </div>
      `;
      return;
    }

    const products = this.selectedIds
      .map(id => LAPTOP_DATA.find(p => p.id === id))
      .filter(Boolean);

    container.innerHTML = `
      <div style="overflow-x: auto; margin-bottom: 1.25rem;">
        <table class="compare-table">
          <thead>
            <tr>
              <th style="width: 170px;">Tiêu chí so sánh</th>
              ${products.map(p => `
                <th class="compare-col">
                  <div style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0.5rem;">
                    <img src="${p.image}" alt="${p.name}" style="height: 90px; object-fit: contain;" onerror="this.src='${FALLBACK_LAPTOP_IMG}';">
                    <strong style="font-size: 13px; line-height: 1.3; color: var(--text-main); height: 2.6em; overflow: hidden;">
                      ${p.name}
                    </strong>
                    <div style="color: var(--accent-red); font-weight: 800; font-size: 15px;">
                      ${formatCurrency(p.price)}
                    </div>
                    <div class="flex" style="gap: 0.35rem; width: 100%;">
                      <button class="btn btn-primary btn-sm" style="flex: 1; padding: 0.35rem 0.5rem; font-size: 12px;" onclick="handleAddToCart('${p.id}')">
                        + Giỏ
                      </button>
                      <button class="btn btn-secondary btn-sm" style="padding: 0.35rem 0.6rem; font-size: 12px;" onclick="laptopCompare.removeProduct('${p.id}')" title="Xóa khỏi so sánh">
                        ✕
                      </button>
                    </div>
                  </div>
                </th>
              `).join("")}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Hãng sản xuất</th>
              ${products.map(p => `<td><strong style="text-transform: uppercase;">${p.brand}</strong></td>`).join("")}
            </tr>
            <tr>
              <th>Vi xử lý (CPU)</th>
              ${products.map(p => `<td><strong>${p.specs.cpu}</strong></td>`).join("")}
            </tr>
            <tr>
              <th>Bộ nhớ RAM</th>
              ${products.map(p => `<td>${p.specs.ram}</td>`).join("")}
            </tr>
            <tr>
              <th>Ổ cứng lưu trữ</th>
              ${products.map(p => `<td>${p.specs.storage}</td>`).join("")}
            </tr>
            <tr>
              <th>Card đồ họa (GPU)</th>
              ${products.map(p => `<td>${p.specs.vga}</td>`).join("")}
            </tr>
            <tr>
              <th>Màn hình</th>
              ${products.map(p => `<td>${p.specs.screen}</td>`).join("")}
            </tr>
            <tr>
              <th>Thời lượng Pin</th>
              ${products.map(p => `<td>${p.specs.battery}</td>`).join("")}
            </tr>
            <tr>
              <th>Trọng lượng</th>
              ${products.map(p => `<td>${p.specs.weight}</td>`).join("")}
            </tr>
            <tr>
              <th>Hệ điều hành</th>
              ${products.map(p => `<td>${p.specs.os}</td>`).join("")}
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex-between">
        <button class="btn btn-outline" onclick="laptopCompare.clearAll()" style="font-size: 13px;">
          Làm trống bảng so sánh
        </button>
        <span style="font-size: 13px; color: var(--text-muted);">
          Đang so sánh <strong>${products.length}/3</strong> laptop
        </span>
      </div>
    `;
  }

  setupEvents() {
    const openBtn = document.getElementById("open-compare-btn");
    if (openBtn) {
      openBtn.addEventListener("click", () => this.openModal());
    }
  }
}

// Khởi tạo instance so sánh dùng chung
const laptopCompare = new LaptopCompare();
window.laptopCompare = laptopCompare;

document.addEventListener("DOMContentLoaded", () => {
  laptopCompare.init();
});

