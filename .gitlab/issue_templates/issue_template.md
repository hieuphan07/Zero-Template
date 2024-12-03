# User Story: Đăng nhập vào hệ thống

## Tiêu đề
Người dùng đăng nhập vào hệ thống.

## Mô tả
- **Là** một người dùng,  
- **Tôi muốn** đăng nhập vào hệ thống bằng tài khoản của mình,  
- **Để** tôi có thể truy cập các tính năng và thông tin cá nhân.

---

## Tiêu chí chấp nhận (Acceptance Criteria)

### 1. Trường hợp thành công
- Khi người dùng nhập đúng **tên đăng nhập** và **mật khẩu**, hệ thống cho phép đăng nhập thành công và chuyển đến trang chính.
- Sau khi đăng nhập, người dùng có thể xem thông tin cá nhân trên giao diện.

### 2. Trường hợp lỗi
- Nếu người dùng nhập **tên đăng nhập** hoặc **mật khẩu sai**, hệ thống hiển thị thông báo lỗi:  
  *"Tên đăng nhập hoặc mật khẩu không chính xác."*
- Nếu người dùng để trống trường nhập liệu, hệ thống hiển thị thông báo:  
  *"Vui lòng nhập đầy đủ thông tin."*

### 3. Yêu cầu bảo mật
- Hệ thống sử dụng giao thức bảo mật **HTTPS** để mã hóa thông tin đăng nhập.
- Sau 3 lần đăng nhập thất bại, tài khoản sẽ bị khóa tạm thời trong 15 phút và hiển thị thông báo:  
  *"Tài khoản của bạn đã bị khóa. Vui lòng thử lại sau 15 phút."*

### 4. Hỗ trợ quên mật khẩu
- Có liên kết *"Quên mật khẩu?"* để người dùng khôi phục tài khoản khi cần.

---

## Nhiệm vụ kỹ thuật (Tasks)

1. **Tạo giao diện đăng nhập** với các trường:
   - Tên đăng nhập (Username/Email).
   - Mật khẩu (Password).
   - Nút "Đăng nhập".
   - Liên kết "Quên mật khẩu?".
2. **Kiểm tra dữ liệu nhập:**
   - Kiểm tra trường trống.
   - Kiểm tra định dạng email (nếu sử dụng email để đăng nhập).
3. **Tích hợp API xác thực:**
   - Gửi yêu cầu xác thực đến backend.
   - Nhận phản hồi từ backend và xử lý giao diện tương ứng.
4. **Xây dựng cơ chế bảo mật:**
   - Mã hóa mật khẩu.
   - Sử dụng token JWT để quản lý phiên đăng nhập.
5. **Viết test cases:**
   - Kiểm tra các trường hợp đăng nhập thành công, thất bại, và quên mật khẩu.

---

## Ghi chú
- Tính năng này sẽ được ưu tiên hoàn thành trong Sprint hiện tại.
- Yêu cầu đảm bảo khả năng mở rộng để tích hợp các phương thức đăng nhập khác như Google hoặc Facebook trong tương lai.