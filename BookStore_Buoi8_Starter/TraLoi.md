# BÁO CÁO TRẢ LỜI CÂU HỎI BỔ SUNG · BUỔI 8

## Câu 1: Cờ `ready` trong `useAutoPersist`
**Hỏi:** Trong `useAutoPersist`, nếu bỏ điều kiện `ready` thì chuyện gì xảy ra với giỏ hàng đã lưu khi bạn mở lại app? Giải thích theo thứ tự các lần render.

**Trả lời:**
- Ở lần render đầu tiên khi app vừa khởi động, store của Redux khởi tạo giỏ hàng với mảng rỗng `items: []`. Quá trình đọc `AsyncStorage` là bất đồng bộ (`Promise`) nên chưa kịp hoàn thành.
- Nếu không có cờ `ready` chặn lại, `useEffect` trong `useAutoPersist` sẽ chạy ngay lập tức và ghi mảng rỗng `[]` đè lên toàn bộ dữ liệu giỏ hàng cũ đã lưu trong `AsyncStorage`.
- Khi hàm đọc dữ liệu bất đồng bộ trả về thì dữ liệu cũ đã bị xoá mất. Do đó, cờ `ready` (chỉ bật `true` sau khi `Promise.all` đọc xong dữ liệu từ storage) là bắt buộc để ngăn chặn việc ghi đè sớm này.

---

## Câu 2: Token giả & Bảo mật
**Hỏi:** Ở bài này app tự so mật khẩu và tự tạo token. Hãy nêu hai điểm không an toàn. Hệ thống thật thì ai kiểm tra mật khẩu, và token nên lưu ở đâu thay cho AsyncStorage?

**Trả lời:**
1. **Hai điểm không an toàn:**
   - Mật khẩu người dùng được lưu dưới dạng văn bản thô (plain text) trong file `db.json` và truyền về client; ứng dụng tự so sánh mật khẩu ở phía client khiến kẻ tấn công dễ dàng đọc trộm hoặc can thiệp mã nguồn để vượt qua xác thực.
   - Token được sinh giả lập tự do ở phía client mà không có chữ ký số bí mật (như HMAC/RSA của JWT), không có thời hạn hết hạn (expiration), nên bất kỳ ai cũng có thể giả mạo token hợp lệ.
2. **Trong hệ thống thực tế:**
   - **Server (Backend)** phải là nơi duy nhất nhận mật khẩu, băm mật khẩu (với thuật toán an toàn như bcrypt/argon2), kiểm tra và phát hành token có chữ ký số bí mật cùng thời gian sống giới hạn.
   - **Lưu trữ an toàn:** Token trên thiết bị di động nên được lưu trong bộ nhớ bảo mật phần cứng như **Expo SecureStore** (sử dụng Keychain trên iOS và Keystore trên Android), không nên lưu dưới dạng văn bản thô trong `AsyncStorage`.

---

## Câu 3: Hai effect trong `CartItemRow`
**Hỏi:** Thử xóa effect đồng bộ `setQty(item.quantity)`. Với thao tác nào thì số hiển thị trên nút bị lệch so với store?

**Trả lời:**
- Khi nạp dữ liệu giỏ hàng từ `AsyncStorage` sau khi mở app, hoặc khi người dùng ở màn hình khác/thao tác khác thêm cùng một cuốn sách vào giỏ (hoặc xóa rồi thêm lại), giá trị `item.quantity` từ store Redux sẽ cập nhật mới.
- Nếu không có effect đồng bộ `useEffect(() => { setQty(item.quantity); }, [item.quantity])`, state cục bộ `qty` trong `CartItemRow` sẽ vẫn giữ nguyên giá trị khởi tạo ban đầu của lần render đầu tiên, dẫn đến số lượng hiển thị trên giao diện bị lệch so với dữ liệu thực tế trong store.

---

## Câu 4: Một nguồn state (Single Source of Truth)
**Hỏi:** Nếu `HeartButton` giữ trạng thái bằng `useState` riêng ở mỗi nơi, tim ở lưới và ở trang chi tiết sẽ khác nhau ra sao? Store giải quyết việc đó thế nào?

**Trả lời:**
- Nếu mỗi `HeartButton` sử dụng một `useState` cục bộ độc lập, khi người dùng bấm thả tim một cuốn sách ở màn hình danh sách (lưới sách Home), chỉ có `HeartButton` ở đó đổi màu sang đỏ; khi bấm vào xem màn hình Chi tiết của cuốn sách đó, nút tim ở trang Chi tiết vẫn là màu xám (chưa thả tim).
- **Store giải quyết:** Bằng cách tập trung toàn bộ danh sách `ids` các sách yêu thích vào Redux store chung (`wishlistSlice`), mọi component (lưới sách, trang chi tiết, tab tài khoản) đều đọc và cập nhật từ một nguồn chân lý duy nhất (Single Source of Truth), đảm bảo trạng thái tim luôn đồng bộ tức thì trên toàn bộ ứng dụng.

---

## Câu 5: Hiện / Ẩn mật khẩu (Mắt 👁) ở màn Đăng nhập
**Đoạn mã bổ sung:**
```tsx
const [showPassword, setShowPassword] = useState(false);

<FormField
  label="Mật khẩu"
  value={password}
  onChangeText={setPassword}
  error={errors.password}
  secureTextEntry={!showPassword}
/>
```
Bọc thêm một nút bấm chuyển đổi trạng thái `showPassword` (ví dụ icon 👁 / 🙈) để người dùng có thể xem lại mật khẩu đã nhập trước khi bấm Đăng nhập.
