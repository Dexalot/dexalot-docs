---
editLink: true
---
# The Dexalot Subnet

![subnet](/images/subnet/subnet.png)
Một exchange sáng tạo trên mô hình mở rộng theo chiều ngang của hệ sinh thái Avalanche.

## Introduction

Nhóm Dexalot đã và đang làm việc chăm chỉ để xây dựng Mạng con Avalanche của chúng ta và nó sắp hoàn thành! Mạng con của chúng ta hiện đang được thử nghiệm trong mạng thử nghiệm Avalanche Fuji, vì vậy người dùng chắc chắn sẽ tận hưởng trải nghiệm giao dịch mới được nâng cao sau khi hoàn tất. Phí giao dịch rẻ hơn, thanh khoản tốt hơn và tốc độ giao dịch nhanh chỉ là một vài trong số rất nhiều tính năng mới đi kèm với mạng con. Hãy cùng xem cấu trúc mới của Dexalot mới và cách nó thiết lập nền tảng cho một tương lai đa chuỗi như một Subnet Avalanche.

Dexalot Testnet ban đầu được giới thiệu vào ngày 6 tháng 8 năm 2021, tiếp theo là ra mắt Mainnet vào ngày 6 tháng 12 năm 2021. Sau đó, [Dexalot Subnet Testnet](https://medium.com/dexalot/the-dexalot-subnet-7a776408a01b) được tạo vào ngày 25 tháng 4 năm 2022. Nói một cách đơn giản, tất cả các môi trường chuỗi đang được cập nhật khi Dexalot di chuyển sang kiến ​​trúc mới.

Dexalot mới là một ứng dụng chuỗi kép hiện có trên cả Avalanche C-Chain (Mainnet) và Dexalot Subnet (Mạng con). Mainnet và Subnet giao tiếp bằng cách truyền thông điệp chung với việc sử dụng các công nghệ cầu nối cao cấp. Trước đây, giao dịch trên Dexalot có nghĩa là tất cả các hành động của bạn đều được gửi đến một blockchain duy nhất, nhưng điều đó đang thay đổi theo một cách lớn. Kiến trúc mới của Dexalot cho phép tương tác giữa nhiều blockchains từ giao diện người dùng của nó, thay vì chỉ một. Điều này không chỉ hiệu quả hơn mà còn mở đường cho những đổi mới trong tương lai.

![trading](/images/subnet/trading.png)
Cách người dùng tương tác với Dexalot — trước và sau khi chuyển sang Mạng con Dexalot mới

Với kiến ​​trúc mới, bạn sẽ cần phải gửi tiền từ Mainnet, giao dịch trong Subnet và rút tiền từ Subnet. Lợi thế của việc làm theo cách này là thực tế là các tài sản không bao giờ rời khỏi chuỗi ban đầu trong khi các giao dịch đang diễn ra trong mạng con.

Để chuyển đổi giữa hai blockchain này, chỉ cần chọn Menu thả xuống được tìm thấy ngay bên cạnh nút kết nối ví trên bảng điều khiển Dexalot quen thuộc.

![chainswitch](/images/subnet/chainswitch.png)
![mainsub](/images/subnet/mainsub.png)

## Kiến ​​​​trúc

Ứng dụng giao diện người dùng tương tự như triển khai chuỗi đơn đã có sẵn, trong khi các hợp đồng cơ bản, phụ trợ và kiến ​​trúc cơ sở dữ liệu đều có những thay đổi đáng kể.

Kiến trúc chuỗi kép mới lạ cho phép Dexalot tải các hoạt động đòi hỏi nhiều hơn vào mạng con, giảm chi phí gas trong khi tăng tốc độ. Kiến trúc mới của Dexalot được truy cập thông qua giao diện người dùng của nó, đã được nâng cấp để nhận biết Mainnet và Subnet cùng lúc. Ngoài ra, không có giao diện bắc cầu riêng biệt. Tất cả chức năng cầu nối được tích hợp vào danh mục hợp đồng thông minh Mainnet (PortfolioMain) và danh mục đầu tư mạng con (PortfolioSub) của Dexalot để cung cấp trải nghiệm người dùng liền mạch . LayerZero sẽ là nhà cung cấp cầu duy nhất khi bắt đầu và nhiều cầu hơn có thể được bổ sung trong tương lai nếu cần. Cách tiếp cận này sẽ cho phép Dexalot mở rộng quy mô đến nhiều cầu (để giảm rủi ro hơn nữa từ các điểm lỗi đơn lẻ) và để các tài sản trong chuỗi không phải Avalanche có thể giao dịch trên Dexalot Subnet.

### Giai đoạn 1
---
Giai đoạn đầu tiên của quá trình di chuyển bắt đầu vào ngày 14 tháng 7 năm 2022. Mạng Fuij testnet đã bị đóng cửa trong thời gian ngắn để hỗ trợ nhiều blockchains sử dụng cùng một lược đồ cơ sở dữ liệu — bước đầu tiên của ứng dụng đa chuỗi. Chế độ xem của người dùng Dexalot (như được thấy trên trang web bảng điều khiển) được tạo chủ yếu bằng cách truy vấn các bản ghi từ cơ sở dữ liệu (xem [Litepaper Dexalot](https://dexalot.com/docs/DEXALOT-Litepaper.pdf) ) được điền bởi một bản sao nhỏ của các sự kiện blockchain. Một cơ sở hạ tầng phụ trợ mới với người đọc và người viết có khả năng tương tác với nhiều blockchain cũng đã được triển khai thành công trong giai đoạn này.

### Giai đoạn 2
---
Trong tuần đầu tiên của tháng 8, Mainnet đã ngừng hoạt động để có thể thử nghiệm môi trường Subnet. Mainnet hiện tại hoạt động với 4 hợp đồng thông minh và hệ thống này đã được cập nhật để bao gồm hơn 10 hợp đồng thông minh. Môi trường phát triển này đã được triển khai trên mạng thử nghiệm Avalanche Fuji và đang trong quá trình thử nghiệm nội bộ.

## Các giao dịch điển hình

* Kết nối ví của bạn
* Gửi mã thông báo từ Mainnet
* Giao dịch trong mạng con
* Rút tiền từ Mạng con

## Các khái niệm chính và sự khác biệt

* Bạn chỉ có thể gửi một tài sản khi được kết nối với Mainnet. Khoản tiền gửi sẽ khóa tài sản của người dùng trên PortfolioMain và gửi cùng một số tiền vào PortfolioSub, tất cả chỉ trong một giao dịch.

* Người dùng sẽ có hai ví cho mỗi tài khoản: một trong Mainnet và một trong Subnet có thể truy cập thông qua các ứng dụng ví được hỗ trợ như nhà cung cấp Core, MetaMask và WalletConnect. Nhiều ví hơn sẽ được thêm vào trong tương lai.

* Ví mainnet giữ tất cả tài sản trong Mainnet như trước đây và tài sản cần được gửi vào Dexalot ở đó để giao dịch. Tất cả các chức năng cầu nối được tích hợp vào các hành động gửi tiền và rút tiền.

* Ví mạng con chỉ giữ $ALOT cho các khoản thanh toán bằng gas. Đó là lý do tại sao ví Subnet còn được gọi là “Gas Tank”.

![gastank](/images/subnet/gastank.png)
* “Add Gas” sẽ chuyển ALOT từ portfolioSub sang ví mạng con.
* “Remove Gas” sẽ chuyển ALOT từ ví Subnet sang PortfolioSub.

![subnetportfolio](/images/subnet/subnetportfolio.png)

* ALOT có sẵn trong PortfolioSub được chuyển từ ví Mainnet hoặc ví Subnet (“Gas Tank”) có thể được sử dụng trong giao dịch hoặc rút tiền.

* PortfolioSub theo dõi số dư Tổng số và Số dư khả dụng của tài sản của người dùng mà không cần tạo bất kỳ ERC20 nào trong mạng con. Các số dư này được cập nhật khi các chức năng gửi tiền, rút ​​tiền và giao dịch được sử dụng.

* Vì không có mã thông báo ERC20 trong Mạng con và chỉ số dư ALOT (số dư “Bình xăng”) sẽ hiển thị trong các ví như Core hoặc MetaMask khi được kết nối với Mạng con.
Tất cả giao dịch được thực hiện khi kết nối với mạng con.

* Người ta chỉ có thể rút tài sản khi được kết nối với Mạng con. Việc rút tiền sẽ xóa số tiền khỏi PortfolioSub và mở khóa số tiền tương tự từ PortfolioMain, sau đó chuyển tài sản đã rút vào ví Mainnet của người dùng tất cả trong một giao dịch.

* Các cầu nối bổ sung sẽ được giới thiệu trong tương lai bằng cách triển khai nhiều hợp đồng PortfolioMain cho các chuỗi khác nhau.

## Roadmap

![roadmap](/images/subnet/roadmap.png)
Hãy theo dõi các thông báo, phương tiện truyền thông và các bài báo sắp tới, điều này sẽ hướng dẫn bạn cách kiểm tra và dùng thử Dexalot Subnet mới!

---

**Biên kịch**: Brad McFall

**Biên tập viên**: Dan Marcoulis

**Đồ họa**: Can Toygar

**Người dịch**: Luong Hung
