# Discord Custom Rich Presence

Một công cụ Node.js mạnh mẽ để tạo và tùy chỉnh trạng thái hoạt động (Rich Presence) trên Discord một cách chi tiết.

## ⚠️ Cảnh báo quan trọng

Công cụ này sử dụng thư viện **self-bot**. Việc tự động hóa tài khoản người dùng thông thường (self-botting) là hành vi **vi phạm Điều khoản dịch vụ của Discord**. Tài khoản của bạn có nguy cơ bị **khóa vĩnh viễn** nếu bị phát hiện.

**Hãy cân nhắc kỹ rủi ro trước khi sử dụng. Tác giả không chịu bất kỳ trách nhiệm nào nếu tài khoản của bạn bị ảnh hưởng.**

## Tính năng

-   **Trạng thái linh hoạt:** Hỗ trợ nhiều loại trạng thái như "Playing", "Watching", "Listening to", "Competing in" và "Custom Status".
-   **Tùy chỉnh chi tiết:**
    -   Hiển thị hình ảnh lớn và nhỏ (động hoặc tĩnh).
    -   Tùy chỉnh các dòng text (details, state, large/small text).
    -   Thêm các nút bấm có thể nhấp vào (link).
-   **Tự động tham gia kênh thoại:** Tự động kết nối vào một kênh thoại được chỉ định khi khởi động.
-   **Hoạt động 24/7:** Được thiết kế để chạy liên tục và có các cơ chế xử lý lỗi mạng để tăng tính ổn định.
-   **Dễ dàng cấu hình:** Tất cả các tùy chọn đều được quản lý tập trung trong tệp `config.js`.

## Yêu cầu

-   [Node.js](https://nodejs.org/) (khuyến nghị phiên bản LTS)

## Hướng dẫn cài đặt và cấu hình

### Bước 1: Lấy Token và ID cần thiết

1.  **Lấy Token của bạn:**
    -   Mở Discord trên trình duyệt.
    -   Nhấn `Ctrl + Shift + I` để mở Công cụ nhà phát triển (Developer Tools).
    -   Chuyển qua tab "Network".
    -   Gửi một tin nhắn bất kỳ.
    -   Trong danh sách các yêu cầu mạng, tìm một tệp có tên `messages`.
    -   Trong phần "Request Headers", tìm dòng `authorization`. Giá trị của nó chính là token của bạn. **TUYỆT ĐỐI KHÔNG CHIA SẺ TOKEN NÀY VỚI BẤT CỨ AI.**

2.  **Lấy Application ID:**
    -   Truy cập [Discord Developer Portal](https://discord.com/developers/applications).
    -   Tạo một ứng dụng mới ("New Application").
    -   Trong trang "General Information", sao chép "APPLICATION ID".

### Bước 2: Cài đặt dự án

1.  Tải mã nguồn về máy.
2.  Mở một cửa sổ terminal trong thư mục dự án và chạy lệnh sau để cài đặt các thư viện cần thiết:
    ```bash
    npm install
    ```
3.  Tạo một tệp mới trong thư mục dự án có tên là `.env`.
4.  Mở tệp `.env` và thêm token của bạn vào đó như sau:
    ```
    TOKEN=YOUR_TOKEN_HERE
    ```
    Thay `YOUR_TOKEN_HERE` bằng token bạn đã lấy ở Bước 1.

### Bước 3: Tùy chỉnh `config.js`

Mở tệp `config.js` và chỉnh sửa các giá trị theo ý muốn.

| Tên biến | Kiểu dữ liệu | Mô tả |
| :--- | :--- | :--- |
| `VOICE_CHANNEL_ID`| String | ID của kênh thoại bạn muốn bot tự động tham gia. Để trống (`''`) nếu không muốn. |
| `APPLICATION_ID` | String | Application ID bạn đã lấy ở trên. |
| `ACTIVITY_TYPE` | Number | Loại hoạt động: `0` (Chơi), `2` (Nghe), `3` (Xem), `4` (Tùy chỉnh), `5` (Thi đấu). |
| `GIF_URL` | String | Link URL của ảnh/gif lớn sẽ hiển thị. |
| `SMALL_URL` | String | Link URL của ảnh/gif nhỏ sẽ hiển thị. |
| `ACTIVITY_NAME` | String | Tên của hoạt động (ví dụ: tên game). |
| `DETAILS` | String | Dòng text đầu tiên, hiển thị ngay dưới tên hoạt động. |
| `LARGE_TEXT` | String | Text hiển thị khi di chuột qua ảnh lớn. |
| `SMALL_TEXT` | String | Text hiển thị khi di chuột qua ảnh nhỏ. |
| `BUTTONS` | Array | Một mảng chứa các đối tượng nút bấm. Tối đa 2 nút. Mỗi đối tượng có dạng `{ name: 'Tên nút', url: 'Link URL' }`. |
| `STATE` | String | Dòng text thứ hai. Nếu `ACTIVITY_TYPE` là `4`, đây là nội dung chính của status. |
| `EMOJI` | String | Emoji hiển thị bên cạnh status khi `ACTIVITY_TYPE` là `4`. |


## Sử dụng

Sau khi đã hoàn tất cài đặt và cấu hình, chạy lệnh sau trong terminal:

```bash
node index.js
```

Ứng dụng sẽ khởi động, đăng nhập và bắt đầu hiển thị trạng thái tùy chỉnh của bạn.

## Xử lý sự cố

-   **Lỗi `ECONNRESET`, `ENOTFOUND`, `fetch failed`:** Đây là các lỗi liên quan đến mạng, cho thấy kết nối tới máy chủ Discord không ổn định. Các bản vá đã được áp dụng để ứng dụng không bị sập khi gặp lỗi này. Nó sẽ tự động thử lại ở lần cập nhật tiếp theo.
-   **Lỗi `Không thể lấy shard`:** Lỗi này xảy ra khi kết nối đang trong quá trình khởi tạo lại. Ứng dụng sẽ tự động bỏ qua lần cập nhật đó và thử lại sau.

Nếu bạn gặp lỗi khác, hãy đảm bảo rằng `TOKEN` và các ID trong `config.js` là chính xác.
