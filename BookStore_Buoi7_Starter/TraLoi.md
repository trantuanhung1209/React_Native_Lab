# Câu Hỏi Bổ Sung - Buổi 7: BookStore

## 1. Cấu trúc điều hướng
**Câu hỏi:** Vì sao `BookDetail` được đăng ký ở Stack mà không đặt trong Tab? Nếu đặt vào Tab thì màn hình sẽ khác đi thế nào?
**Trả lời:**
- Khi đặt ở `Stack`, màn hình `BookDetail` sẽ phủ lên toàn bộ màn hình (che cả thanh Tab Bar phía dưới) và tự động có nút quay lại (←) ở thanh header.
- Nếu đặt vào `Tab`, `BookDetail` sẽ trở thành một tab riêng ở thanh điều hướng bên dưới, thanh Tab Bar vẫn hiển thị và không có nút quay lại tự động, làm mất trải nghiệm điều hướng tự nhiên của người dùng khi xem chi tiết sản phẩm.

---

## 2. Redux
**Câu hỏi:** Trong reducer viết `state.items.push(...)` mà sao state gốc không bị sửa trực tiếp? Thử bỏ `useMemo` trong `useCart`: kết quả hiển thị có đổi không, và có hậu quả gì?
**Trả lời:**
- Redux Toolkit tích hợp sẵn thư viện **Immer**. Khi thao tác thay đổi trực tiếp (như `push`, gán thuộc tính), ta thực chất chỉ đang thao tác trên một đối tượng bản nháp (draft state). Immer sẽ theo dõi các thay đổi này và tự động tạo ra một bản sao state mới bất biến (immutable).
- Nếu bỏ `useMemo` trong `useCart`, kết quả tính toán và hiển thị giao diện **không thay đổi**. Tuy nhiên, hàm tính toán sẽ bị chạy lại ở mọi lần re-render của component dù danh sách `items` không hề thay đổi, gây lãng phí hiệu năng nếu giỏ hàng có nhiều mặt hàng.

---

## 3. Promise.all
**Câu hỏi:** Nếu `getCategories()` lỗi còn `getBooks()` thành công thì Home hiện gì? Tìm cách để vẫn hiện được danh sách sách (gợi ý: `Promise.allSettled`) và nói rõ cách đó phải đánh đổi gì?
**Trả lời:**
- Khi dùng `Promise.all`, nếu một trong hai request bị lỗi thì cả nhóm sẽ reject ngay lập tức, do đó màn hình Home sẽ hiển thị giao diện báo lỗi (`ErrorView`) mặc dù dữ liệu sách đã tải thành công.
- Giải pháp: Sử dụng `Promise.allSettled([getBooks(), getCategories()])`. Cách này cho phép hứng kết quả độc lập của từng promise: sách thành công thì vẫn hiển thị `BookGrid`, danh mục lỗi thì ẩn hoặc báo lỗi riêng ở thanh chip danh mục. Đánh đổi là code xử lý kết quả phức tạp hơn, phải kiểm tra trạng thái `status === "fulfilled"` cho từng request và giao diện bị khuyết một phần dữ liệu.

---

## 4. Debounce
**Câu hỏi:** Vì sao không đặt `setTimeout` thẳng trong `onChangeText`? Hàm dọn dẹp (`return () => clearTimeout`) giúp tránh lỗi gì?
**Trả lời:**
- Nếu đặt `setTimeout` trực tiếp trong `onChangeText`, mỗi phím bấm sẽ tạo ra một timer riêng rẽ mà không bị hủy khi người dùng gõ phím tiếp theo, dẫn đến việc mỗi ký tự gõ vẫn gây ra một lần lọc (chỉ bị trễ đi chứ không gộp lại được).
- Hàm dọn dẹp (`return () => clearTimeout(t)`) giúp hủy bỏ timer của lần gõ trước đó để chỉ lần gõ cuối cùng (khi người dùng dừng gõ đủ khoảng thời gian delay) mới kích hoạt cập nhật, đồng thời ngăn chặn việc cập nhật state khi component đã bị unmount (tránh rò rỉ bộ nhớ / memory leak).

---

## 5. Code bổ sung (Sắp xếp giá tăng dần / giảm dần)
**Câu hỏi:** Thêm tuỳ chọn sắp xếp “Giá tăng dần / giảm dần” cho Home. Chỉ cần thêm một state và sửa một chỗ trong `visibleBooks`.

```typescript
// 1. Khai báo thêm state sắp xếp trong HomeScreen.tsx:
const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

// 2. Cập nhật useMemo của visibleBooks:
const visibleBooks = useMemo(() => {
  const filtered = filterBooks(books, { keyword: debouncedKeyword, categoryId, priceRange });
  if (!sortOrder) return filtered;
  return [...filtered].sort((a, b) => 
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );
}, [books, debouncedKeyword, categoryId, priceRange, sortOrder]);
```
