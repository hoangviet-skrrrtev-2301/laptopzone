# NGUYÊN TẮC LÀM VIỆC & AN TOÀN DỰ ÁN (PROJECT RULES & SAFETY GUIDELINES)
**Dự án**: Website Bán Laptop (LaptopZone)  
**Vị trí dự án**: `D:\laptopzone`  
**Ngày thiết lập**: 12/10/2026  
**Trạng thái**: Hoàn thành & Sẵn sàng bàn giao (Completed & Ready)

---

## I. MỤC TIÊU CỐT LÕI
Tài liệu này xác lập các giới hạn, quy chuẩn và quy trình làm việc bắt buộc giữa Trợ lý AI và Người dùng (User). Mọi hành động thao tác với hệ thống tệp tin, viết mã nguồn và vận hành dự án đều phải tuân thủ nghiêm ngặt các nguyên tắc dưới đây.

---

## II. CÁC NGUYÊN TẮC BẮT BUỘC

### 1. Nguyên tắc Phê duyệt từng bước (Approval-First Workflow)
- **Quy tắc**: Mọi bước triển khai quan trọng (tạo cấu trúc file mới, thay đổi luồng dữ liệu, bổ sung thư viện/tính năng lớn) phải được giải thích rõ mục đích và **chờ sự đồng ý của User trước khi thực hiện**.
- **Không hành động đơn phương**: Không tự ý nhảy cóc qua giai đoạn tiếp theo nếu giai đoạn trước chưa được User nghiệm thu hoặc đồng thuận.

### 2. Nguyên tắc Bảo toàn Dữ liệu Tuyệt đối (Zero Data Loss)
- **CẤM TỰ Ý XOÁ FILE**: Tuyệt đối **không chạy bất kỳ lệnh xoá nào** (`Remove-Item`, `del`, `rm`, `unlink`...) đối với file hoặc thư mục trong hệ thống.
- **Bảo toàn tài nguyên sẵn có**: Chỉ tạo mới hoặc chỉnh sửa cục bộ các file thuộc dự án `D:\laptopzone`. Không đụng chạm, sửa đổi bất kỳ tệp tin nào ngoài phạm vi thư mục dự án.
- **Chỉnh sửa an toàn (Non-destructive Edits)**: Khi cần sửa code, ưu tiên chỉnh sửa đúng đoạn cần cập nhật (`replace_file_content`), bảo toàn toàn bộ comment, logic và cấu trúc hiện có.

### 3. Nguyên tắc An toàn Mã nguồn & Bảo mật (Code Safety & Standards)
- **Mã nguồn sạch & Thuần (Clean Vanilla)**:
  - Chỉ sử dụng chuẩn HTML5 Semantic, CSS3 hiện đại và JavaScript thuần (ES6+).
  - Không nhúng các đoạn mã không rõ nguồn gốc, không dùng `eval()` hoặc các hàm tiềm ẩn rủi ro bảo mật (XSS, Injection).
- **Độc lập & Không phụ thuộc ngầm**:
  - Website phải mở và chạy được trực tiếp qua trình duyệt (bằng cách click đúp `index.html` hoặc dùng Live Server nội bộ).
  - Không âm thầm cài đặt các phần mềm, tiến trình nền lạ hoặc chạy script độc hại.

### 4. Nguyên tắc Minh bạch & Giao tiếp (Transparency)
- **Giải trình trước khi làm**: Trước mỗi hành động ghi file hay chạy lệnh, phải nêu rõ:
  1. File nào sẽ được tạo/sửa?
  2. Nội dung chính và mục đích kỹ thuật là gì?
- **Báo cáo trung thực**: Khi xảy ra lỗi hoặc ngoại lệ, phải dừng lại, trích xuất nguyên nhân chính xác và đề xuất phương án xử lý để User quyết định.

### 5. Nguyên tắc Kiểm thử & Chất lượng (Quality & Responsiveness)
- **Đảm bảo tính tương thích**: Giao diện và tính năng phải hoạt động tốt trên các trình duyệt tiêu chuẩn (Chrome, Edge, Firefox) và tương thích đa kích thước màn hình (Mobile, Tablet, Desktop).
- **Dữ liệu chuẩn xác**: Mock data sản phẩm laptop phải có cấu trúc logic (tên, hãng, thông số CPU/RAM/VGA, hình ảnh rõ nét, giá bán hợp lý).

---

## III. QUY TRÌNH DUYỆT TỪNG BƯỚC (WORKFLOW CHECKLIST)

```
[BƯỚC 1] Trình bày mục tiêu & danh sách file sắp tạo/sửa
    │
    ▼
[BƯỚC 2] Người dùng phê duyệt (Approved)
    │
    ▼
[BƯỚC 3] Thực hiện viết mã chuẩn, an toàn
    │
    ▼
[BƯỚC 4] Báo cáo kết quả & Hướng dẫn User kiểm tra (Review)
    │
    ▼
[BƯỚC 5] Lặp lại cho giai đoạn kế tiếp
```

---

## IV. XÁC NHẬN CỦA NGƯỜI DÙNG
- [x] Tôi đã đọc và đồng ý với các nguyên tắc trên. Cho phép bắt đầu triển khai dự án theo kế hoạch.
- [ ] Cần điều chỉnh hoặc bổ sung thêm nguyên tắc riêng.

---

## V. NHẬT KÝ NGHIỆM THU 6 GIAI ĐOẠN (PROJECT AUDIT LOG)
- [x] **Giai đoạn 1**: Khởi tạo cấu trúc thư mục, `css/style.css`, `js/data.js` và `assets/images/README.md`.
- [x] **Giai đoạn 2**: Xây dựng cấu trúc `index.html` ngữ nghĩa hoàn chỉnh (Header, Hero Banner, Brand Bar, Catalog Layout, Modals & Footer).
- [x] **Giai đoạn 3**: Kích hoạt `js/filter.js` & `js/app.js` (Bộ lọc đa điều kiện, tìm kiếm tức thì, sắp xếp, modal chi tiết).
- [x] **Giai đoạn 4**: Kích hoạt `js/cart.js` (Slide-over Cart Drawer, mã Voucher, quy trình đặt hàng Checkout & mã QR giả lập).
- [x] **Giai đoạn 5**: Kích hoạt `js/compare.js` & `css/responsive.css` (So sánh 3 laptop song song, tương thích Mobile/Tablet/Desktop).
- [x] **Giai đoạn 6**: Kiểm thử toàn diện tự động, xác nhận 100% không lỗi cú pháp và chạy độc lập qua trình duyệt.


