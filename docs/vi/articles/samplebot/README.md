---
editLink: true
---

# Dexalot's Sample Bot


![samplebot](/images/samplebot/samplebot.png)

Dexalot đã tóm tắt một số trụ cột của mã nguồn Market Maker của mình vào [kho lưu trữ](https://github.com/Dexalot/samplebot) SampleBot để sử dụng với [các hợp đồng](https://github.com/Dexalot/contracts/tree/main/contracts) mới nhất của Dexalot . Bạn có thể tìm thấy một số ý tưởng, thuật ngữ về giao dịch, tạo lập thị trường và những gì bạn có thể cân nhắc xây dựng trên Dexalot trong [Trading & Market Making](https://medium.com/dexalot/giao-d%E1%BB%8Bch-t%E1%BA%A1o-l%E1%BA%ADp-th%E1%BB%8B-tr%C6%B0%E1%BB%9Dng-15b3294d8b84) và [Trading Glossary](https://medium.com/dexalot/dexalot-c%C3%A1c-thu%E1%BA%ADt-ng%E1%BB%AF-trong-giao-d%E1%BB%8Bch-2f92bb7e3ddc) .

[https://github.com/Dexalot/samplebot](https://github.com/Dexalot/samplebot)

SampleBot mở rộng AbstractBot và sử dụng các kết nối với Dexalot RestAPI trên Testnet (api.dexalot-test.com/api/). Xin lưu ý rằng mã này không tương thích với các hợp đồng Mainnet hiện đang được triển khai cũng như RestAPI của mạng chính. Tuy nhiên, nó có thể được sử dụng để tương tác với các hợp đồng được triển khai trên Fuji testnet như một sự chuẩn bị cho bản phát hành sản xuất dự kiến ​​vào đầu tháng 1 năm 2023. Tài liệu RestAPI mới nhất của Dexalot có sẵn [tại đây](https://docs.dexalot-test.com/).

Thoải mái thay đổi SampleBot và / hoặc thêm một loại bot mới để mở rộng AbstractBot. Vui lòng xem tệp [README.md](https://github.com/Dexalot/samplebot) để xem hướng dẫn cài đặt và biết thêm chi tiết. Dưới đây là một số chức năng mà SampleBot có thể thực hiện :

* Nhận môi trường mạng chính / mạng con, các cặp được liệt kê, thông tin chi tiết về mã thông báo từ RESTAPI
* Tạo tham chiếu đến các hợp đồng cần thiết
* Yêu cầu các lệnh mở từ RESTAPI trong trường hợp khôi phục sự cố
* Lưu giữ danh sách các đơn đặt hàng chưa thanh toán và một sổ đặt hàng cục bộ trong bộ nhớ
* Nhận sổ đặt hàng 2 giá thầu / yêu cầu tốt nhất từ ​​chuỗi
* SampleBot lắng nghe các sự kiện OrderStatusChanged từ blockchain trong trường hợp một trong các đơn hàng chưa xử lý của nó được nhấn / nâng.
* SampleBot cũng ghi lại các sự kiện OrderStatusChanged như một phần của kết quả tx khi gửi đơn hàng và cập nhật trạng thái đơn hàng trong bộ nhớ. Sự kiện OrderStatusChanged được đưa ra từ blockchain cho tất cả người nghe một vài giây sau đó. Vì vậy, cùng một sự kiện được xử lý hai lần. Một lần khi đơn đặt hàng được gửi đi và một lần nữa khi nó được nhận từ chuỗi khối người nghe độc ​​lập. Do đó, thông báo “Sự kiện đơn hàng trùng lặp: ……” là điều bình thường
* Kiểm tra lại trạng thái đơn hàng từ chuỗi 10 phút một lần, trong trường hợp sự kiện OrderStatusChanged bị bỏ lỡ.


---

**Author**: Brad McFall

**Editor**: Dan Marcoulis

**Graphics**: Can Toygar
