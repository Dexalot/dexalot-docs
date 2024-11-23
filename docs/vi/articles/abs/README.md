---
editLink: true
---

# Ảnh chụp số dư tài sản của Dexalot

![abs1](/images/abs/abs1.png)

[Dexalot](https://dexalot.com/) là một DEX sổ lệnh trung tâm chuỗi kép, không giam giữ, được hỗ trợ bởi [công nghệ mạng con của Avalanche ](https://www.avax.network/). Giai đoạn tiếp theo trong quá trình phát triển vòng đời của Dexalot là tiếp tục phát hành kiến ​​trúc phần mềm, được tối ưu hóa cho tốc độ, sự an toàn và trải nghiệm. Việc khởi chạy mạng con của Dexalot sẽ bao gồm tính năng chụp nhanh số dư tài sản (ABS) tích hợp để tạo bằng chứng chụp nhanh bất biến về số dư tài sản của bạn.

Tính năng độc đáo này giúp người dùng xác minh nhanh chóng và dễ dàng số dư tài sản bằng cách ghi định kỳ thông tin tài sản trên mạng con Dexalot vào một cấu trúc dữ liệu có tên là **Merkle Tree** . Sau khi được viết, ABS độc lập với tính khả dụng của mạng con Dexalot, do đó tăng cường bảo mật. Việc khôi phục trạng thái tài sản của bạn trên chuỗi C của mạng chính Avalanche có thể thực hiện được với ABS nếu điều đó là cần thiết vì bất kỳ lý do gì. Hãy trải nghiệm và tận hưởng một bước đột phá khác với sự đổi mới tốt nhất trong phân khúc từ Dexalot!

---
## Làm cách nào để:

- Kết nối ví của bạn với <https://app.dexalot-test.com/asset_balance_snapshot>.
- Chọn một mã thông báo bạn sở hữu.
- Có được dữ liệu bảo mật về số dư trên chuỗi của tài sản của bạn.

## ABS cung cấp:

- Tính minh bạch của số dư tài sản tương tác với Dexalot
- Khả năng cho mọi người xác nhận tài sản một cách độc lập
- Dữ liệu chuỗi thời gian bất biến của số dư tài sản để phân tích nếu cần

---

Đây là một đoạn video ngắn hướng dẫn bạn cách kết nối ví của mình và lấy số dư của bất kỳ tài sản nào bạn sở hữu.

<https://youtu.be/IEuRCxOJ20k>

![abs2](/images/abs/abs2.png)

## Sở hữu ABS của bạn:

Nếu bạn quan tâm đến việc xác minh số dư tài sản của mình theo cách thủ công, bạn có thể sử dụng [Merkletreejs](https://www.npmjs.com/package/merkletreejs) (thư viện Javascript). Bạn có thể sử dụng thư viện này để đơn giản hóa các [bước sau](https://app.dexalot.com/asset_balance_snapshot):

- Lấy Root của số dư Merkle Tree từ [IPFS](https://ipfs.dexalot.com/ipfs/bafkreifjvfqxxar2upv5ab42ewy327g6hcdswq5imrhpa3wgdtoki47auq).
- Lấy số dư Merkle Tree từ [S3](https://merkletree.dexalot.com/ALOT-1732324905.json).
- Xác minh Root bằng cách sử dụng Tree.
- Xác minh Leaf hash của bạn bằng thuật toán keccak256 của Solidity từ chỉ mục Leaf, địa chỉ ví và số dư tài sản của bạn bằng cách sử dụng Tree.
- Xác minh bằng chứng cho hàm Leaf hash của bạn bằng cách sử dụng Root và Tree.
- Xác thực bằng chứng Leaf hash của bạn bằng cách sử dụng tổ hợp Root, proofs, Leaf bằng cách sử dụng Tree.

---
**Tác giả**: Brad McFall

**Biên tập viên**: Dan Marcoulis

**Đồ họa**: Can Toygar
