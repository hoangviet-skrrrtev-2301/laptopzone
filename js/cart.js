/**
 * LAPTOPZONE - QUẢN LÝ GIỎ HÀNG & THANH TOÁN (CART MODULE)
 * Đồng bộ hóa dữ liệu vào LocalStorage, hỗ trợ Voucher và mô phỏng Checkout
 */

class LaptopCart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("laptopzone_cart") || "[]");
    this.appliedVoucher = null;
    this.orders = JSON.parse(localStorage.getItem("laptopzone_orders") || "[]");
  }

  init() {
    this.setupCartEvents();
    this.render();
  }

  // Lưu giỏ hàng vào LocalStorage
  save() {
    localStorage.setItem("laptopzone_cart", JSON.stringify(this.items));
    this.render();
  }

  // Thêm laptop vào giỏ hàng
  addItem(productId, quantity = 1) {
    const product = LAPTOP_DATA.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = this.items.findIndex(item => item.productId === productId);

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({ productId, quantity });
    }

    this.save();
    this.openDrawer();
    showToast(`Đã thêm "${product.name}" vào giỏ hàng! 🛒`, "success");
  }

  // Cập nhật số lượng sản phẩm trong giỏ
  updateQuantity(productId, newQuantity) {
    const index = this.items.findIndex(item => item.productId === productId);
    if (index === -1) return;

    if (newQuantity <= 0) {
      this.removeItem(productId);
    } else {
      this.items[index].quantity = newQuantity;
      this.save();
    }
  }

  // Xóa sản phẩm khỏi giỏ hàng
  removeItem(productId) {
    const product = LAPTOP_DATA.find(p => p.id === productId);
    const name = product ? product.name : "Sản phẩm";
    
    this.items = this.items.filter(item => item.productId !== productId);
    this.save();
    showToast(`Đã xóa "${name}" khỏi giỏ hàng`, "info");
  }

  // Xóa toàn bộ giỏ hàng
  clearCart() {
    this.items = [];
    this.appliedVoucher = null;
    this.save();
  }

  // Tính tạm tính (chưa trừ voucher)
  getSubtotal() {
    return this.items.reduce((total, item) => {
      const product = LAPTOP_DATA.find(p => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  }

  // Tính số tiền được giảm giá theo voucher
  getDiscountAmount() {
    if (!this.appliedVoucher) return 0;
    const subtotal = this.getSubtotal();

    if (this.appliedVoucher.flatDiscount) {
      return Math.min(subtotal, this.appliedVoucher.flatDiscount);
    }

    if (this.appliedVoucher.discountPercent) {
      let discount = Math.round((subtotal * this.appliedVoucher.discountPercent) / 100);
      if (this.appliedVoucher.maxDiscount && discount > this.appliedVoucher.maxDiscount) {
        discount = this.appliedVoucher.maxDiscount;
      }
      return discount;
    }

    return 0;
  }

  // Tính tổng số tiền cuối cùng phải thanh toán
  getTotal() {
    const subtotal = this.getSubtotal();
    const discount = this.getDiscountAmount();
    return Math.max(0, subtotal - discount);
  }

  // Tổng số lượng món hàng trong giỏ
  getTotalItemsCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Áp dụng mã khuyến mãi
  applyVoucherCode(code) {
    const cleanCode = (code || "").trim().toUpperCase();
    const messageEl = document.getElementById("voucher-message");

    if (!cleanCode) {
      if (messageEl) {
        messageEl.style.display = "block";
        messageEl.style.color = "var(--accent-red)";
        messageEl.textContent = "Vui lòng nhập mã giảm giá!";
      }
      return;
    }

    if (VOUCHERS && VOUCHERS[cleanCode]) {
      this.appliedVoucher = { code: cleanCode, ...VOUCHERS[cleanCode] };
      if (messageEl) {
        messageEl.style.display = "block";
        messageEl.style.color = "var(--accent-green)";
        messageEl.textContent = `Áp dụng thành công mã "${cleanCode}": ${this.appliedVoucher.description}`;
      }
      this.render();
      showToast(`Áp dụng mã giảm giá ${cleanCode} thành công! 🎉`, "success");
    } else {
      this.appliedVoucher = null;
      if (messageEl) {
        messageEl.style.display = "block";
        messageEl.style.color = "var(--accent-red)";
        messageEl.textContent = "Mã giảm giá không hợp lệ hoặc đã hết hạn!";
      }
      this.render();
    }
  }

  // Mở thanh trượt giỏ hàng (Slide-over Cart)
  openDrawer() {
    const drawer = document.getElementById("cart-drawer");
    const backdrop = document.getElementById("overlay-backdrop");
    if (drawer) drawer.classList.add("open");
    if (backdrop) backdrop.classList.add("show");
  }

  // Đóng thanh trượt giỏ hàng
  closeDrawer() {
    const drawer = document.getElementById("cart-drawer");
    const backdrop = document.getElementById("overlay-backdrop");
    if (drawer) drawer.classList.remove("open");
    if (backdrop) backdrop.classList.remove("show");
  }

  // Hiển thị nội dung giỏ hàng ra giao diện
  render() {
    const container = document.getElementById("cart-items-container");
    const badge = document.getElementById("cart-badge");
    const headerCount = document.getElementById("cart-items-count");
    const subtotalEl = document.getElementById("cart-subtotal");
    const discountRow = document.getElementById("cart-discount-row");
    const discountEl = document.getElementById("cart-discount");
    const totalEl = document.getElementById("cart-total");
    const checkoutBtn = document.getElementById("checkout-btn");

    const totalCount = this.getTotalItemsCount();

    // Cập nhật badge số lượng giỏ hàng
    if (badge) {
      badge.textContent = totalCount;
      badge.style.display = totalCount > 0 ? "flex" : "none";
    }

    if (headerCount) headerCount.textContent = totalCount;

    if (!container) return;

    // Trường hợp giỏ hàng trống
    if (this.items.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-view">
          <div style="font-size: 3.5rem; margin-bottom: 0.75rem;">🛒</div>
          <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-main);">
            Giỏ hàng đang trống
          </h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">
            Chưa có chiếc laptop nào được chọn. Hãy dạo quanh cửa hàng và chọn ngay bạn nhé!
          </p>
          <button class="btn btn-primary" onclick="laptopCart.closeDrawer()">
            Tiếp tục mua sắm
          </button>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = "0 đ";
      if (discountRow) discountRow.style.display = "none";
      if (totalEl) totalEl.textContent = "0 đ";
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    }

    if (checkoutBtn) checkoutBtn.disabled = false;

    // Render danh sách sản phẩm trong giỏ
    container.innerHTML = this.items.map(item => {
      const laptop = LAPTOP_DATA.find(p => p.id === item.productId);
      if (!laptop) return "";

      const itemTotal = laptop.price * item.quantity;

      return `
        <div class="cart-item-row" data-id="${laptop.id}">
          <div class="cart-item-thumb">
            <img src="${laptop.image}" alt="${laptop.name}" onerror="this.src='${FALLBACK_LAPTOP_IMG}';">
          </div>
          <div class="cart-item-info">
            <div class="cart-item-title" title="${laptop.name}">${laptop.name}</div>
            <div class="cart-item-price">${formatCurrency(itemTotal)}</div>
            <div style="font-size: 11px; color: var(--text-muted);">${formatCurrency(laptop.price)} / máy</div>
          </div>
          <div class="cart-qty-control">
            <button class="cart-qty-btn" onclick="laptopCart.updateQuantity('${laptop.id}', ${item.quantity - 1})">-</button>
            <span class="cart-qty-number">${item.quantity}</span>
            <button class="cart-qty-btn" onclick="laptopCart.updateQuantity('${laptop.id}', ${item.quantity + 1})">+</button>
          </div>
          <button class="cart-remove-btn" onclick="laptopCart.removeItem('${laptop.id}')" title="Xóa">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      `;
    }).join("");

    // Cập nhật giá tổng
    const subtotal = this.getSubtotal();
    const discount = this.getDiscountAmount();
    const total = this.getTotal();

    if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);

    if (discountRow) {
      if (discount > 0) {
        discountRow.style.display = "flex";
        if (discountEl) discountEl.textContent = `-${formatCurrency(discount)}`;
      } else {
        discountRow.style.display = "none";
      }
    }

    if (totalEl) totalEl.textContent = formatCurrency(total);
  }

  // Khởi tạo các sự kiện giỏ hàng
  setupCartEvents() {
    const openCartBtn = document.getElementById("open-cart-btn");
    const closeCartBtn = document.getElementById("close-cart-btn");
    const applyVoucherBtn = document.getElementById("apply-voucher-btn");
    const voucherInput = document.getElementById("voucher-input");
    const checkoutBtn = document.getElementById("checkout-btn");

    if (openCartBtn) {
      openCartBtn.addEventListener("click", () => this.openDrawer());
    }

    if (closeCartBtn) {
      closeCartBtn.addEventListener("click", () => this.closeDrawer());
    }

    if (applyVoucherBtn && voucherInput) {
      applyVoucherBtn.addEventListener("click", () => {
        this.applyVoucherCode(voucherInput.value);
      });
      voucherInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          this.applyVoucherCode(voucherInput.value);
        }
      });
    }

    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => this.openCheckout());
    }
  }

  // Mở Modal Thanh toán (Checkout)
  openCheckout() {
    if (this.items.length === 0) {
      showToast("Giỏ hàng của bạn đang trống!", "warning");
      return;
    }

    this.closeDrawer();
    const modal = document.getElementById("checkout-modal");
    const modalContent = document.getElementById("checkout-modal-content");
    const backdrop = document.getElementById("overlay-backdrop");

    if (!modal || !modalContent) return;

    const total = this.getTotal();
    const discount = this.getDiscountAmount();

    modalContent.innerHTML = `
      <form id="checkout-order-form" onsubmit="laptopCart.handleOrderSubmit(event)">
        <!-- Tóm tắt đơn hàng ngắn -->
        <div style="background-color: var(--bg-card-alt); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.25rem;">
          <div class="flex-between" style="font-size: 14px; margin-bottom: 0.35rem;">
            <span style="color: var(--text-muted);">Số lượng laptop:</span>
            <strong>${this.getTotalItemsCount()} chiếc</strong>
          </div>
          ${discount > 0 ? `
            <div class="flex-between" style="font-size: 14px; margin-bottom: 0.35rem; color: var(--accent-green);">
              <span>Mã giảm giá (${this.appliedVoucher.code}):</span>
              <strong>-${formatCurrency(discount)}</strong>
            </div>
          ` : ""}
          <div class="flex-between" style="font-size: 16px; border-top: 1px dashed var(--border-color); padding-top: 0.5rem; margin-top: 0.5rem;">
            <span style="font-weight: 700;">Tổng tiền cần thanh toán:</span>
            <strong style="color: var(--accent-red); font-size: 1.25rem;">${formatCurrency(total)}</strong>
          </div>
        </div>

        <!-- Thông tin giao hàng -->
        <h4 style="font-size: 15px; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-main);">
          1. Thông tin người nhận hàng
        </h4>
        <div class="checkout-form-group">
          <label class="checkout-label">Họ và tên khách hàng *</label>
          <input type="text" id="order-fullname" class="checkout-input" required placeholder="Ví dụ: Nguyễn Hoàng Việt">
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
          <div class="checkout-form-group">
            <label class="checkout-label">Số điện thoại liên hệ *</label>
            <input type="tel" id="order-phone" class="checkout-input" required pattern="[0-9]{10,11}" placeholder="Ví dụ: 0988123456">
          </div>
          <div class="checkout-form-group">
            <label class="checkout-label">Email nhận hóa đơn</label>
            <input type="email" id="order-email" class="checkout-input" placeholder="email@gmail.com">
          </div>
        </div>

        <div class="checkout-form-group">
          <label class="checkout-label">Địa chỉ nhận hàng chi tiết *</label>
          <input type="text" id="order-address" class="checkout-input" required placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành">
        </div>

        <div class="checkout-form-group">
          <label class="checkout-label">Ghi chú đơn hàng (Tùy chọn)</label>
          <textarea id="order-note" class="checkout-input" rows="2" placeholder="Giao giờ hành chính, gọi trước khi giao..."></textarea>
        </div>

        <!-- Phương thức thanh toán -->
        <h4 style="font-size: 15px; font-weight: 700; margin: 1.25rem 0 0.5rem 0; color: var(--text-main);">
          2. Phương thức thanh toán
        </h4>
        <div class="payment-options">
          <label class="payment-card selected" id="payment-label-cod">
            <input type="radio" name="payment-method" value="cod" checked onchange="laptopCart.changePaymentMethod('cod')" style="accent-color: var(--primary);">
            <span>💵 Tiền mặt khi nhận hàng (COD)</span>
          </label>
          <label class="payment-card" id="payment-label-qr">
            <input type="radio" name="payment-method" value="qr" onchange="laptopCart.changePaymentMethod('qr')" style="accent-color: var(--primary);">
            <span>📱 Quét mã VietQR / MoMo</span>
          </label>
        </div>

        <!-- Khung quét mã QR ngân hàng giả lập -->
        <div id="qr-payment-box" style="display: none; margin-top: 1rem; padding: 1rem; background-color: #f0fdf4; border: 1.5px dashed var(--accent-green); border-radius: var(--radius-md); text-align: center;">
          <p style="font-size: 13px; font-weight: 600; color: #166534; margin-bottom: 0.5rem;">
            Quét mã QR qua ứng dụng Ngân hàng hoặc MoMo
          </p>
          <div style="display: inline-block; background: white; padding: 0.75rem; border-radius: 8px; box-shadow: var(--shadow-sm);">
            <svg width="140" height="140" viewBox="0 0 100 100" fill="#0f172a">
              <rect x="0" y="0" width="30" height="30" fill="#0f172a"/>
              <rect x="5" y="5" width="20" height="20" fill="white"/>
              <rect x="10" y="10" width="10" height="10" fill="#0f172a"/>
              <rect x="70" y="0" width="30" height="30" fill="#0f172a"/>
              <rect x="75" y="5" width="20" height="20" fill="white"/>
              <rect x="80" y="10" width="10" height="10" fill="#0f172a"/>
              <rect x="0" y="70" width="30" height="30" fill="#0f172a"/>
              <rect x="5" y="75" width="20" height="20" fill="white"/>
              <rect x="10" y="80" width="10" height="10" fill="#0f172a"/>
              <rect x="40" y="15" width="10" height="20" fill="#0f172a"/>
              <rect x="55" y="5" width="10" height="10" fill="#0f172a"/>
              <rect x="35" y="45" width="30" height="20" fill="#0f172a"/>
              <rect x="75" y="45" width="20" height="10" fill="#0f172a"/>
              <rect x="45" y="75" width="20" height="20" fill="#0f172a"/>
              <rect x="75" y="75" width="15" height="15" fill="#0f172a"/>
            </svg>
          </div>
          <div style="font-size: 12px; color: var(--text-muted); margin-top: 0.5rem;">
            Ngân hàng: <strong>MBBank (Ngân Hàng Quân Đội)</strong><br>
            STK: <strong>8888 6668 8888</strong> - CTK: <strong>LAPTOPZONE VIETNAM</strong><br>
            Số tiền: <strong style="color: var(--accent-red);">${formatCurrency(total)}</strong>
          </div>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.9rem; margin-top: 1.5rem; font-size: 15px;">
          Xác nhận đặt mua ngay
        </button>
      </form>
    `;

    modal.classList.add("open");
    if (backdrop) backdrop.classList.add("show");
  }

  changePaymentMethod(method) {
    const qrBox = document.getElementById("qr-payment-box");
    const codCard = document.getElementById("payment-label-cod");
    const qrCard = document.getElementById("payment-label-qr");

    if (method === "qr") {
      if (qrBox) qrBox.style.display = "block";
      if (qrCard) qrCard.classList.add("selected");
      if (codCard) codCard.classList.remove("selected");
    } else {
      if (qrBox) qrBox.style.display = "none";
      if (codCard) codCard.classList.add("selected");
      if (qrCard) qrCard.classList.remove("selected");
    }
  }

  // Xử lý gửi đơn hàng thành công
  handleOrderSubmit(event) {
    event.preventDefault();

    const name = document.getElementById("order-fullname").value.trim();
    const phone = document.getElementById("order-phone").value.trim();
    const email = document.getElementById("order-email").value.trim();
    const address = document.getElementById("order-address").value.trim();
    const note = document.getElementById("order-note").value.trim();
    const paymentMethodEl = document.querySelector('input[name="payment-method"]:checked');
    const paymentMethod = paymentMethodEl ? paymentMethodEl.value : "cod";

    const orderId = "LZ-" + Math.floor(100000 + Math.random() * 900000);
    const orderDate = new Date().toLocaleString("vi-VN");
    const finalTotal = this.getTotal();
    const finalItems = [...this.items];

    const orderRecord = {
      orderId,
      orderDate,
      customer: { name, phone, email, address, note },
      paymentMethod: paymentMethod === "cod" ? "Tiền mặt (COD)" : "Chuyển khoản QR",
      items: finalItems,
      totalAmount: finalTotal
    };

    // Lưu vào lịch sử đơn hàng
    this.orders.push(orderRecord);
    localStorage.setItem("laptopzone_orders", JSON.stringify(this.orders));

    // Xóa giỏ hàng
    this.clearCart();

    // Render thông báo đặt hàng thành công
    const modalContent = document.getElementById("checkout-modal-content");
    if (modalContent) {
      modalContent.innerHTML = `
        <div class="order-success-box">
          <div class="order-success-icon">✓</div>
          <h3 style="font-size: 1.4rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
            ĐẶT HÀNG THÀNH CÔNG!
          </h3>
          <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1.25rem;">
            Cảm ơn bạn <strong>${name}</strong> đã tin tưởng lựa chọn LaptopZone. Chúng tôi sẽ liên hệ qua số điện thoại <strong>${phone}</strong> để xác nhận giao hàng.
          </p>

          <div style="background-color: var(--bg-card-alt); border-radius: var(--radius-md); padding: 1.25rem; text-align: left; font-size: 14px; margin-bottom: 1.5rem;">
            <div class="flex-between" style="margin-bottom: 0.4rem;">
              <span style="color: var(--text-muted);">Mã đơn hàng:</span>
              <strong style="color: var(--primary); font-family: monospace; font-size: 15px;">#${orderId}</strong>
            </div>
            <div class="flex-between" style="margin-bottom: 0.4rem;">
              <span style="color: var(--text-muted);">Thời gian đặt:</span>
              <span>${orderDate}</span>
            </div>
            <div class="flex-between" style="margin-bottom: 0.4rem;">
              <span style="color: var(--text-muted);">Địa chỉ nhận hàng:</span>
              <span>${address}</span>
            </div>
            <div class="flex-between" style="margin-bottom: 0.4rem;">
              <span style="color: var(--text-muted);">Hình thức thanh toán:</span>
              <span>${orderRecord.paymentMethod}</span>
            </div>
            <div class="flex-between" style="border-top: 1px dashed var(--border-color); padding-top: 0.5rem; margin-top: 0.5rem; font-size: 16px;">
              <span style="font-weight: 700;">Tổng thanh toán:</span>
              <strong style="color: var(--accent-red); font-size: 1.25rem;">${formatCurrency(finalTotal)}</strong>
            </div>
          </div>

          <button class="btn btn-primary" style="padding: 0.8rem 2rem;" onclick="closeAllModals()">
            Hoàn tất & Tiếp tục mua sắm
          </button>
        </div>
      `;
    }

    showToast(`Chúc mừng bạn đã đặt hàng thành công! Mã đơn: #${orderId}`, "success");
  }
}

// Khởi tạo instance giỏ hàng dùng chung
const laptopCart = new LaptopCart();

// Đảm bảo gắn vào window để các file khác dễ dàng gọi
window.laptopCart = laptopCart;

// Khởi chạy khi DOM load
document.addEventListener("DOMContentLoaded", () => {
  laptopCart.init();
});

