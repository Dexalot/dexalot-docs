---
editLink: true
---

# Khắc phục các giao dịch Metamask đang chờ xử lý
 Cực kì đơn giản để thực hiện
![fixmmcover](/images/recovrmmtxn/fixpendngcvr.png)
---
Dexalot được xây dựng trên mạng Avalanche, mạng này rõ ràng đang phát triển rất nhanh chóng. Một hệ quả của việc sử dụng ngày càng tăng này: phí gas có thể cao theo định kỳ đối với một ứng dụng do hoạt động cao trên ứng dụng khác. Khi lưu lượng truy cập cao, các giao dịch có thể bị chờ xử lý lâu hơn bình thường.

Dexalot được xây dựng trên mạng Avalanche, mạng này rõ ràng đang phát triển rất nhanh chóng. Một hệ quả của việc sử dụng ngày càng tăng này: phí gas có thể cao theo định kỳ đối với một ứng dụng do hoạt động cao trên ứng dụng khác. Khi lưu lượng truy cập cao, [các giao dịch có thể bị chờ xử lý](https://snowtrace.io/chart/pendingtx) lâu hơn bình thường.

 ![pendingchart](/images/recovrmmtxn/pendngchrt.png)

 Bản thân Dexalot không có lượng hoạt động đủ cao để dẫn đến chi phí gas cao cho các ứng dụng khác hoặc khiến các giao dịch khác phải chờ xử lý trong thời gian dài. Nếu bạn kiểm tra công [cụ theo dõi gas Snow Trace](https://snowtrace.io/gastracker) , bạn sẽ có thể biết khi nào chi phí xăng cao và các giao dịch bị “kẹt” trên mạng. Công cụ theo dõi gas liên tục cập nhật các giao dịch đang chờ xử lý và sắp xếp theo giá khí được sử dụng cho mỗi giao dịch.

 ![gastransactionsorted](/images/recovrmmtxn/gastxnsortd.png)

Chi phí gas trung bình lớn hơn 30 nAVAX có nghĩa là giao dịch Dexalot của bạn sẽ mất nhiều thời gian hơn bình thường để hoàn thành. Chi phí gas giao dịch trên 20–30 nAVAX cho thấy trạng thái mạng blockchain ngày càng tắc nghẽn.

 ![metamaskpending](/images/recovrmmtxn/mmpending.png)

Trước khi thử một trong hai giải pháp được liệt kê bên dưới, bạn chỉ cần làm mới trình duyệt của mình (Nhấn Ctrl + F5, Shift + F5 hoặc Ctrl + Shift + R). Nếu điều này không hiệu quả, bạn có thể hủy giao dịch nếu bạn không còn quan tâm đến việc hoàn tất giao dịch đang chờ xử lý.

## Giải pháp 1 — Tăng gas cho giao dịch hiện tại và đang chờ xử lý của bạn

![pendingspeedup](/images/recovrmmtxn/pendngspeedup.png)

Bạn có thể nhấp vào nút “tăng tốc” để chỉnh sửa mức độ ưu tiên và mức phí tối đa của mình. Theo mặc định, giao dịch mới có mức phí ưu tiên và tối đa cao hơn một chút (giả sử cao hơn 10% so với giao dịch trước đó), nhưng bạn có thể chỉnh sửa theo ý thích của mình.

![speedupoptions](/images/recovrmmtxn/speedpopts.png)

Hãy xem công cụ theo gas của Snowtrace để có ước tính về phí cơ bản trung bình, đang mặc định. Nếu phí tối đa của mạng cao hơn nhiều so với giao dịch của bạn, hãy đặt giới hạn phí tối đa để phù hợp với mạng. Trong ví dụ trên, bạn có thể đặt giới hạn phí tối đa trong khoảng từ 60 đến 74 GWEI (trong nAVAX). Khi bạn đã quyết định, hãy nhấp vào Lưu . Bây giờ bạn đã tăng tốc giao dịch của mình và hy vọng, nó sẽ diễn ra nhanh hơn so với khi lượng gas không được tăng lên.

Nếu bạn đã biết rằng mạng đang bận, bạn có thể chọn đặt mức phí ưu tiên tối đa cao trước khi bạn gửi giao dịch. Bằng cách đó, bạn có thể không cần tăng tốc sau này. Đây là một đoạn video ngắn giải thích quá trình này.

<YouTube id="gsfJywNxpi4" />

## Giải pháp 2 — Hủy giao dịch đang chờ xử lý của bạn bằng cách tạo một giao dịch khác với cùng một nonce, nhưng lượng gas cao hơn

Nếu giao dịch mới được chấp nhận, giao dịch đang chờ xử lý sẽ không thành công vì nó đã được sử dụng. Do đó, trạng thái đang chờ xử lý trước đây của bạn với MetaMask sẽ không còn tồn tại. Giao dịch của bạn sẽ bị hủy ở trạng thái đang chờ xử lý, miễn là lượng gas trong giao dịch mới đủ cao để chuyển qua mạng nhanh hơn so với khi nó chưa được thay đổi. Nếu lượng gas tăng được thêm vào giao dịch đang diễn ra của bạn dẫn đến một giao dịch được chấp nhận, bạn sẽ thoát khỏi trạng thái chờ xử lý thành công.

### 1. Bật Nonce giao dịch tùy chỉnh
1.  Mở plugin MetaMask của bạn.

![metamaskplugin](/images/recovrmmtxn/mmplgin.png)

2. Nhấp vào biểu tượng vòng tròn đầy màu sắc ở trên cùng bên phải và nhấp vào **Cài đặt** từ menu thả xuống.

![metamasksettings](/images/recovrmmtxn/mmstngs.png)

3. Trong menu Cài đặt, chọn **Nâng cao (Advanced)** .

4. Cuộn xuống cho đến khi bạn nhìn thấy **Điều khiển gas nâng cao (Advanced gas controls)** . Chuyển sang chế **độ BẬT** .

![gascontrols](/images/recovrmmtxn/gscntlrs.png)

5. Vẫn trong Cài đặt nâng cao, hãy tiếp tục cuộn cho đến khi bạn thấy **Tùy chỉnh giao dịch nonce(Customize transaction nonce)** . Chuyển sang chế **độ BẬT** .

### 2. Tìm thời điểm bắt đầu giao dịch bị mắc kẹt của bạn

1. Mở ví **MetaMask** của bạn và tham gia phiên hoạt động. Sẽ có một danh sách các giao dịch gần đây của bạn. Khi bạn tìm thấy một giao dịch bị kẹt, hãy nhấp chuột trái vào bất kỳ vị trí nào bên trong trường giao dịch.

![transactionnonce](/images/recovrmmtxn/txnnonce.png)

* ghi lại “nonce”. Đó là một loại số nhận dạng, chúng tôi sẽ sử dụng lại sau — đây, nó là 124

### 3. Ghi đè Giao dịch bị mắc kẹt
Bây giờ chúng ta sẽ thực hiện một giao dịch mới để thay thế giao dịch bị mắc kẹt. Chúng tôi sẽ tùy chỉnh số nonce để nó giống với số mà bạn vừa viết ra.

1. Tạo một giao dịch mới để thay thế giao dịch bị kẹt của bạn. Tạo giao dịch giống hệt như giao dịch đang chờ xử lý, nhưng thực hiện giao dịch này với nonce tùy chỉnh và tăng **Phí giao dịch(Transaction Fee)** .

![transactionfee](/images/recovrmmtxn/txnfee.png)

2. Nhấp vào Chỉnh sửa

![editfee](/images/recovrmmtxn/edtfee.png)

3. Bây giờ, hãy đặt mức phí cơ bản tối đa thành mức Tiêu chuẩn, Nhanh hoặc Nhanh hơn mức mà bạn đã tìm thấy từ Công cụ theo dõi gas— ở đây bạn có thể đặt mức phí này từ 60 đến 70 và sau đó nhấp vào Lưu.

4. Tìm mục nhập **CUSTOM NONCE** và thay đổi số nonce thành số bạn đã viết ra.

![customnonce](/images/recovrmmtxn/cstmnonce.png)

5. Nhấp vào **Xác nhận(Confirm)** .

6. Giao dịch mới của bạn bây giờ sẽ được chấp nhận thành một khối. Để kiểm tra, hãy mở MetaMask và nhấp vào tab **Hoạt động(Activity)**.

7. Giao dịch đã hoàn thành của bạn sẽ hiển thị ở đầu danh sách Hoạt động của bạn. Nếu nó vẫn cho biết “Đang chờ xử lý” bằng màu cam, bạn sẽ cần đợi thêm một chút nữa hoặc thử lại quy trình với phí giao dịch thậm chí còn cao hơn (giá gas).

8. Vì không có ví nào có thể tạo hai giao dịch giống nhau nên nếu giao dịch thay thế bạn thực hiện thành công, giao dịch bị mắc kẹt của bạn sẽ bị hủy.

Cuối cùng, ngoài việc tắc nghẽn mạng, bạn có thể gặp sự cố phần mềm MetaMask. Bạn có thể không biết điều này cho đến khi bạn đã cố gắng tăng tốc giao dịch của mình và sự cố vẫn lặp đi lặp lại. Nếu đúng như vậy thì bạn cần liên hệ với [MetaMask](https://metamask.zendesk.com/hc/en-us/requests/new) để được hỗ trợ.

---

**Biên kịch**: Brad McFall

**Biên tập viên**: Dan Marcoulis

**Đồ họa**: Can Toygar

**Người dịch**: Luong Hung
