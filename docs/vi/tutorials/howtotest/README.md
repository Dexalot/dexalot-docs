---
editLink: true
---

# Thử nghiệm công khai Dexalot-Subnet

 ## Làm thế nào để test?

![Dextr](/images/howtotest/dextrcomp.png)

Nhóm Dexalot rất vui được giới thiệu Dexalot-Subnet để thử nghiệm công khai. Nhóm phát triển đã dành nhiều tháng không ngừng để lập trình và viết các hợp đồng thông minh cùng các mã khác để chuyển Mainnet của Dexalot sang Dexalot Subnet. Dexalot rất thích sự giúp đỡ của bạn để làm cho Dexalot Subnet tốt hơn nữa. Chúng tôi rất biết ơn cộng đồng đã giúp chúng tôi đến được đây. Cảm ơn bạn đã giúp chúng tôi đi đến giai đoạn tiếp theo trong sự phát triển của Dexalot.

Vì Subnet về cơ bản giống như Mainnet mà bạn đã quen thuộc, nên bạn chỉ cần kết nối và sử dụng nó.

**Điều hướng đến [URL này](https://app.dexalot-test.com/trade) và bạn đã sẵn sàng.**

Vui lòng dùng thử bằng phần Giới thiệu này hoặc đọc phần bên dưới để tìm hiểu thêm nhằm trợ giúp và hướng dẫn bạn trong quá trình thử nghiệm.

<VidStack src="youtube/vRvaswPuMNg" />

Đây là bản beta công khai và chúng tôi hy vọng cộng đồng có thể giúp chúng tôi kiểm tra hệ thống của mình một cách triệt để nhất. Nếu bạn muốn trợ giúp, nhưng không biết bắt đầu từ đâu, vui lòng sử dụng danh sách nhiệm vụ bên dưới.

Các nhà phát triển Dexalot sẽ giải quyết càng nhiều lỗi và các vấn đề về khả năng sử dụng càng tốt. Vui lòng báo cáo lại bất kỳ quan sát và lo ngại nào mà bạn muốn nhóm kiểm tra. Vui lòng đính kèm ảnh chụp màn hình về các mối quan tâm của bạn và đủ thông tin bao gồm id giao dịch để hỗ trợ họ giải quyết các quan sát của bạn và họ sẽ thực hiện các thay đổi khi cần thiết.

Bạn có thể gửi email cho nhóm báo cáo của mình tại [support@dexalot.com](mailto:support@dexalot.com). Người quản lý và người kiểm duyệt cộng đồng Dexalot sẵn sàng trợ giúp bạn và bạn có thể để lại nhận xét của mình trong chuỗi Kiểm tra mạng con trong kênh #Subnet. Hẹn gặp bạn ở đó!

**Chúc bạn thử nghiệm vui vẻ !!**

## **Kiến ​​​​trúc**

Kiến trúc mới của Dexalot được truy cập thông qua giao diện người dùng, đã được nâng cấp để nhận biết Mainnet và Subnet cùng lúc. Kiến trúc chuỗi kép mới lạ cho phép Dexalot tải các hoạt động đòi hỏi nhiều hơn vào mạng con, giảm chi phí gas trong khi tăng tốc độ.

Ứng dụng giao diện người dùng tương tự như việc triển khai chuỗi đơn đã có sẵn, trong khi các hợp đồng cơ bản, phụ trợ và kiến ​​trúc cơ sở dữ liệu đều có những thay đổi đáng kể. Không có giao diện bắc cầu riêng biệt. Tất cả chức năng cầu nối được tích hợp vào danh mục hợp đồng thông minh Mainnet (PortfolioMain) và danh mục đầu tư mạng con (PortfolioSub) của Dexalot để cung cấp trải nghiệm người dùng liền mạch cho bạn. LayerZero sẽ là nhà cung cấp cầu duy nhất khi bắt đầu và nhiều cầu hơn có thể được bổ sung trong tương lai nếu cần.

![roadmap](/images/howtotest/roadmp.png)


## Những điều cần nhớ, các tính năng mới và các khái niệm chính

* Người ta chỉ có thể gửi một tài sản khi được kết nối với Mainnet. Khoản tiền gửi sẽ khóa tài sản của người dùng trên PortfolioMain và gửi cùng một số tiền vào PortfolioSub, tất cả chỉ trong một giao dịch.

* Người dùng sẽ có hai ví cho mỗi tài khoản: một trong Mainnet và một trong Subnet có thể truy cập thông qua các ứng dụng ví được hỗ trợ như các nhà cung cấp Core, MetaMask và WalletConnect. Nhiều ví sẽ được thêm vào trong tương lai.

* Ví Mainnet giữ tất cả tài sản trong Mainnet như trước đây và tài sản cần được gửi vào Dexalot ở đó để giao dịch. Tất cả các chức năng cầu nối được tích hợp vào các hành động gửi tiền và rút tiền.

* Ví Subnet chỉ giữ $ ALOT cho các khoản thanh toán bằng gas. Đó là lý do tại sao ví Subnet còn được gọi là “Gas Tank” (Bình gas).

![submaintank](/images/howtotest/submaintank.png)

* “Thêm Gas” chuyển ALOT từ portfolioSub sang ví Subnet.

* “Loại bỏ Gas” chuyển ALOT từ ví Subnet sang PortfolioSub.

![addrmgas](/images/howtotest/addrmgas.png)

* ALOT có sẵn trong PortfolioSub được chuyển từ ví Mainnet hoặc ví Subnet (“Gas Tank”) có thể được sử dụng trong giao dịch hoặc rút tiền.

* PortfolioSub theo dõi số dư Tổng số và Số dư khả dụng của tài sản của người dùng mà không cần tạo bất kỳ ERC20 nào trong Mạng con. Các số dư này được cập nhật khi các chức năng gửi tiền, rút ​​tiền và giao dịch được sử dụng.

* Vì không có mã thông báo ERC20 trong Mạng con, chỉ số dư ALOT (số dư “Gas Tank”) sẽ hiển thị trong các ví như Core hoặc MetaMask khi được kết nối với Mạng con.

* Tất cả giao dịch được thực hiện khi kết nối với Mạng con.

* Người ta chỉ có thể rút tài sản khi được kết nối với Mạng con. Việc rút tiền sẽ xóa số tiền khỏi PortfolioSub và mở khóa số tiền tương tự từ PortfolioMain, sau đó chuyển tài sản đã rút vào ví Mainnet của người dùng tất cả trong một giao dịch.

* Các cầu nối bổ sung sẽ được giới thiệu trong tương lai bằng cách triển khai nhiều hợp đồng PortfolioMain cho các chuỗi khác nhau.


## Danh sách các nhiệm vụ test

Hãy lưu ý những điểm sau trong quá trình kiểm tra của bạn:

1. Đối với mọi nhiệm vụ bên dưới, hãy theo dõi số tiền của bạn trong ví cũng như tổng danh mục đầu tư và số tiền có sẵn. Đảm bảo rằng số tiền tăng lên với những gì bạn mong đợi. Hãy kiểm tra sự tỉnh táo này khi bạn thực hiện với các bài test của mình.

2. 6–12 block cần được tạo trước khi cam kết gửi hoặc rút tiền vào chuỗi vì nó liên quan đến việc chuyển thông điệp qua cầu. Vì hoạt động trên Fuji tương đối cao, bước giới hạn tỷ lệ sẽ là hoạt động trên Mạng con. Tùy thuộc vào mức độ hoạt động của Mạng con, các hoạt động chuyển giao có thể bị trì hoãn. Nếu tiền không được chuyển ngay cả sau 1 giờ, vui lòng thông báo cho nhóm phát triển qua các kênh hỗ trợ vì cầu nối có thể bị chặn.

* Gửi tiền từ Mainnet vào Subnet ít nhất cho ba tài sản sau (để thuận tiện, các địa chỉ Fuji của tài sản được hỗ trợ trong Mạng con được bao gồm):

* AVAX (gốc)

* ALOT (0x9983F755Bbd60d1886CbfE103c98C272AA0F03d6)

Một trong

1. ETH (0x16F3e7B8327F2cA3f49Efbb1510d5842F7d4a68C)
2. SER (0xf52602253474ddaF6111133ADc1F7C3d28A30ABd)
3. USDC (0x68B773B8C10F2ACE8aC51980A1548B6B48a2eC54)
4. USDT.e (0x2B62a6c0C750250034e328547Aa38830bd768a18)

* Chuyển sang Mạng con và nhập ít nhất 4 lệnh nhà sản xuất (2 lệnh bán và 2 lệnh mua) cho mỗi tài sản của bạn.

* Sử dụng “Thay thế đơn đặt hàng” cho mỗi nội dung ít nhất một lần để thay đổi một tham số của đơn đặt hàng.

* Sử dụng chức năng “Gửi trong Mạng con” mới để gửi tiền vào một tài khoản khác mà bạn có.

* Từ một tài khoản khác, hãy nhập ít nhất 1 đơn đặt hàng cho mỗi tài sản của bạn.

* Rút tài sản của bạn trở lại Mainnet.

![willtest](/images/howtotest/dextrbarttest.png)

**Hãy nghĩ đến các trường hợp hóc búa/ cực đoan và kiểm tra chúng. Cố gắng phá vỡ mọi thứ. Tốt hơn là nên phá vỡ mọi thứ trong thử nghiệm!**


---
**Biên kịch**: Brad McFall

**Biên tập viên**: Dan Marcoulis

**Đồ họa**: Can Toygar

**Người dịch**: Luong Hung
