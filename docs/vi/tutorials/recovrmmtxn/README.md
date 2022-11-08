---
editLink: true
---

# Khắc phục các giao dịch Metamask đang chờ xử lý
 Cực kì đơn giản để thực hiện

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
. Mở plugin MetaMask của bạn.

![metamaskplugin](/images/recovrmmtxn/mmplgin.png)

b. Click on the colorful circle icon on the top-right, and click Settings from the drop down menu.

![metamasksettings](/images/recovrmmtxn/mmstngs.png)

c. In the Settings menu, select **Advanced**.

d. Scroll down until you see **Advanced gas controls**. Toggle this to ON.

![gascontrols](/images/recovrmmtxn/gscntlrs.png)

e. Still in Advanced settings, keep scrolling until you see **Customize transaction nonce**. Toggle this to **ON**.

### 2. Finding the nonce of your stuck transaction
a. Open your MetaMask wallet and go into the activity session. There will be a list of your recent transactions. When you find the one that’s stuck, left click with your mouse anywhere inside the transaction field.

![transactionnonce](/images/recovrmmtxn/txnnonce.png)

*make a note of the “nonce”. That’s a kind of identifier, which we’ll re-use later — here, it’s 124

### 3. Overwrite the Stuck Transaction
Now we’re going to make a new transaction to replace the stuck one. We’ll customize the nonce number, so that it’s the same as the one that you just wrote down.

a. Create a new transaction to replace your stuck transaction. Create the exact same transaction as the one that is pending, but make this one with a custom nonce, and increase the **Transaction Fee**.

![transactionfee](/images/recovrmmtxn/txnfee.png)

b. Click on Edit

![editfee](/images/recovrmmtxn/edtfee.png)

c. Now set the max base fee to the Standard, Fast or Rapid rate you have found from the Gas Tracker — here you could set it between 60 and 70 and then click Save.

d. Find the **CUSTOM NONCE** entry and change the nonce to the number you wrote down.

![customnonce](/images/recovrmmtxn/cstmnonce.png)

e. Click **Confirm**.

f. Your new transaction should now be accepted into a block. To check, open MetaMask and click the Activity tab.

g. Your completed transaction should show at the top of your Activity list. If it still says “Pending” in orange, you’ll need to wait a little longer, or try the process again with an even higher transaction fee (gas price).

h. Since no wallet can create two transactions of the same nonce, if the replacement transaction you make is successful, your stuck transaction will be canceled.

Lastly, aside from network congestion you may have a MetaMask software issue. You may not be able know this until you have tried to speed up your transaction, and the problem persists repeatedly. If this is the case then you will need contact [MetaMask](https://metamask.zendesk.com/hc/en-us/requests/new) for support.

---

**Author**: Brad McFall

**Editor**: Dan Marcoulis

**Graphics**: Can Toygar
