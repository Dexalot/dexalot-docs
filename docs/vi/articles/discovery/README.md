---
editLink: true
---

# Dexalot Discovery ( Khám phá Dexalot)

## Chưa từng xuất hiện ở các sàn phi tập trung (DEX) trước đây

![discoverybanner](/images/discovery/discoverybanner.png)

* IDO hoạt động tốt, nhưng việc khởi chạy mã thông báo trên AMM thì không hề đơn giản.
* AMM không có chức năng đặt lệnh giới hạn, không đủ khả năng kiểm soát trượt giá.
* Bot và MEV là rào cản lớn cho người dùng trong thời gian ra mắt.
* Để giải quyết những vấn đề này Dexalot xin giới thiệu : Dexalot Discovery.
* **Dexalot Discovery** sẽ hỗ trợ các lệnh giới hạn.
* **Dexalot Discovery** sẽ ngăn không cho bot ngăn chặn người dùng.
* **Dexalot Discovery** sẽ cung cấp cho người dùng nhiều thời gian để nhập lệnh và khớp lệnh.
* **Dexalot Discovery** sẽ tạo ra một quy trình khám phá giá có trật tự hơn và công bằng hơn.
* Sau khi khám phá giá, niêm yết AMM sẽ trở nên an toàn hơn!
Bạn nghĩ ở những điều ở trên là tuyệt ư? Chưa hết đâu, đọc tiếp nhé!

Một trong những nguyên tắc chỉ đạo mà Dexalot áp dụng là liên tục cải thiện kết quả của cộng đồng. Trong vài tháng qua, cộng đồng đã phải chịu rất nhiều sự kém hiệu quả trong quá trình liệt kê mã thông báo dự án mới, điều này dẫn đến kết quả bất lợi cho hầu hết người dùng và chỉ mang lại lợi ích cho một số ít được chọn có thế mạnh đặc biệt (Ví dụ: bot, những người nắm giữ node lớn,…). Dexalot mong muốn giúp giải quyết được những vấn đề này.

Một vấn đề lớn mà người dùng liên tục mắc phải là hành động làm giá xảy ra trong quá trình niêm yết các IDO khác nhau (niêm yết các mã thông báo dự án mới để giao dịch).

[Avalaunch](https://avalaunch.app/) (và những dự án khác) theo đúng nghĩa đen đã mở đường cho một sự phân bổ mới, công bằng trong việc phân bổ dự án cho một nhóm người lớn hơn. Họ thậm chí họ đã triển khai các thuật toán phức tạp để giảm thiểu hiệu ứng “cá voi”, khi mà một “tay to” nhận được quá nhiều phân bổ. Hiện đã có các nền tảng IDO khác thực hiện vai trò của mình bằng việc hỗ trợ các dự án trong hệ sinh thái huy động vốn, và cũng đang áp dụng các ý tưởng để giảm thiểu tác động từ các tác nhân xấu. [Dexalot]((https://dexalot.com/)) đã hợp tác với Avalaunch và tin tưởng vững chắc vào đặc tính, khả năng của họ.

Trong khi quy trình huy động vốn trước khi niêm yết hoạt động khá tốt, thì các vấn đềlại bắt đầu xảy ra khi các dự án hoàn thành quá trình gọi vốn và vào thời điểm niêm yết.

Dưới đây là các vấn đề nghiêm trọng tồn tại mà chúng tôi biết khi IDO được niêm yết :

IDO thường được khởi chạy trên các nền tảng AMM, chẳng hạn như Uniswap, mở cửa giao dịch tại một thời điểm cụ thể (chức năng giao dịch đơn lẻ), điều này tạo ra một tình huống mà tốc độ là vấn đề quan trọng.
Nếu chúng ta phân tích rõ hơn về tốc độ, bạn có thể thấy rằng bất kỳ ai thực hiện đầu tiên, sau khi mã thông báo được niêm yết sẽ có được giá tốt nhất, bởi vì tất cả mọi người đều chạy đua để mua cùng một lúc. Nói cách khác, điều này khuyến khích mọi người tìm ra cách tốt nhất để trở thành người đầu tiên hoặc ít nhất là càng sớm càng tốt.
Việc đầu tiên và đơn giản hơn hết là viết một phần mềm tự động gửi các giao dịch thích hợp để mua . Điều này hữu ích vì nó bỏ qua yếu tố con người, các chuyển động chuột, nhấp chuột, phê duyệt giao dịch,… Sự chậm chạp này thường được gây ra do các tương tác với ví của người dùng. Những hành động này diễn ra theo thứ tự trong vài giây, nhưng nếu bạn đang cố gắng trở thành người đầu tiên, thì điều đó vẫn quan trọng.
Điều thứ hai và bất chính hơn cần làm là sử dụng MEV (Miner Extractable Value — Lợi nhuận mà thợ đào kiếm được nhờ việc lợi dụng quyền hạn của mình) để giành quyền mua(như Emin Gun Sirer đã thảo luận ở đây ) nếu bạn có một Node đủ lớn. Ở cấp độ cao hơn, cơ chế đồng thuận Avalanche hoạt động bằng việc các node sẽ truy vấn các node khác để đạt được kết quả cuối cùng. Mỗi node sẽ chọn một node khác để truy vấn bằng tính toán xác suất. Các xác suất được tính toán dựa trên số lượng tiền đặt cược của các node và thực tế: nếu bạn có một node có số tiền đặt cược đủ lớn, bạn sẽ được hỏi ‘ý kiến ​’ về giao dịch nào nên thực hiện trước so với các giao dịch khác.
Những điều này hoạt động khi : Bạn có một node đủ lớn và bạn biết cách sắp xếp thứ tự ưu tiên cho các giao dịch của mình, bạn sẽ có cơ hội được hỏi ‘ý kiến ​​’ tại thời điểm niêm yết IDO và bạn sẽ có cơ hội giao dịch (một lệnh mua) đầu tiên. Tất nhiên, điều này khá tốn vốn, nhưng nếu bạn đã tham gia vào đợt bán Avalanche ban đầu, bạn biết rằng các mã thông báo đã được bán với giá chênh lệch đáng kể so với giá hiện tại. Thứ hai, nếu bạn biết rằng một dự án đang có lượng nhu cầu hợp lý của thị trường, thì việc lấy phần đầu tiên của các mã thông báo ngay khi chúng được tung ra thị trường sẽ thực sự sinh lời, sau đó quay lại bán cho những người mua một khi yêu cầu giao dịch bắt đầu nhỏ dần.
Người dùng sử dụng AMM để mua các dự án mới được liệt kê phải xác định % trượt giá (mức giá mà họ chấp nhận được khi giao dịch) thay cho giá thực tế mà họ muốn mua mã thông báo.
Vì thời gian niêm yết IDO thường rất cạnh tranh (Tất cả người dùng đều đua nhau mua càng sớm càng tốt), hầu hết người dùng buộc phải có tỷ lệ trượt giá lớn, vì rất khó xác định số lượng cần phải có để đảm bảo giao dịch thương mại hiệu quả. Thông thường, người dùng phải chọn số lượng lớn chỉ để lệnh của họ được thực hiện.
Kết quả thực tếlà những người dùng bán lẻ giao dịch “chậm”, chịu độ trễ tương đối lớn liên quan đến việc sử dụng các ví như Metamask, phải cài đặt % trượt giá rất lớn để lệnh của họ được thực hiện. Tuy nhiên, người dùng có tự động hóa và kiến ​​thức về cách tận dụng cơ chế của sự đồng thuận, có được lợi thế đặc biệt để kiếm tiền mà không thực sự đầu tư vào bất kỳ dự án nào.
Dexalot giới thiệu Dexalot Discovery một giải pháp tuyệt vời cho tất cả.

Dexalot Discovery giải quyết các vấn đề trên bằng cách tạo ra một quy trình công bằng mà theo đó người dùng và toàn bộ thị trường có thể tìm ra mức giá thích hợp cho các mã thông báo mới, được niêm yết mà không cần lo lắng về tốc độ hoặc bot.
Dexalot Discovery rút kinh nghiệm từ các dự án hệ sinh thái thành công và sẽ thực hiện quy trình sau để các dự án niêm yết mã thông báo của họ một cách công bằng, minh bạch trên Dexalot :
Dự án làm việc và tích hợp với Dexalot :
Dự án đó sẽ tạo và gửi mã thông báo vào Dexalot, điều này được kích hoạt vào một số thời điểm được xác định, trước khi xác nhận quyền sở hữu có sẵn (ví dụ: 8 giờ). Dexalot sẽ vô hiệu hóa đối với việc rút tiền từ các mã thông báo của dự án này.

2. Avalaunch phối hợp với Dexalot để tích hợp :

Tạo tùy chọn, gửi mã thông báo dự án vào Dexalot, điều này được kích hoạt trong một số thời điểm được xác định, trước khi xác nhận quyền sở hữu có sẵn (ví dụ: 8 giờ). Dexalot sẽ vô hiệu hóa đối với việc rút tiền từ các mã thông báo của dự án.

3. Sổ đặt hàng Dexalot bắt đầu ở chế độ “không khớp”

Một chế độ mà người dùng đặt cọc tài sản (AVAX hoặc USDT), có thể đặt lệnh giới hạn MUA cho mã thông báo, người dùng đã gửi mã thông báo dự án có thể đặt lệnh giới hạn BÁN. Tất cả các đơn đặt hàng đều được hiển thị minh bạch và liên tục cho cộng đồng.

4. Người dùng có khả năng hủy và thay thế các đơn lệnh trong suốt khoảng thời gian được xác định trước (ví dụ: 8 giờ). Người bán được yêu cầu phải gửi mã thông báo thực tế để có thể bán, nhưng người mua chỉ cần đặt lệnh mua miễn là họ đã gửi đúng số lượng tài sản mà họ hiện có.

5. Khi kết thúc giai đoạn chấp nhận lệnh, việc chấp nhận lệnh sẽ dừng lại , Dexalot sẽ chuyển sang chế độ “khớp lệnh”, trong đó các lệnh giới hạn mua và bán được khớp và giá ban đầu cho tài sản được phát hiện (thực hiện ở mức giá mà người dùng đã có 8 giờ để quyết định và đặt lệnh giới hạn cho).

6. Sau khi khớp lệnh hoàn tất, sổ lệnh sẽ chuyển sang chế độ “bình thường”. Ở giai đoạn này, Avalaunch, Dự án và Dexalot đều phối hợp để cho phép yêu cầu rút tiền của người mua mã thông báo.

7. Giờ đây, bất kỳ Dự án nào tham gia đều có thể sử dụng phân bổ thanh khoản của họ để tạo các nhóm thanh khoản (nếu họ muốn) trên các AMM khác nhau, với mức giá đã có và tiếp tục được định giá trên Dexalot.

Về bản chất, Dexalot có thể sử dụng khả năng CLOB của mình với một vài cải tiến, để cân bằng cơ hội cho bất kỳ ai cũng có thể sở hữu được một phần của một dự án. Người dùng nên có nhiều thời gian để trình bày giá thầu và ưu đãi tốt nhất của họ (tương tự như cách một người đăng ký IDO trên Avalaunch). Họ không phải lo lắng về việc bị bỏ lại bởi các bot hoặc những người biết về thông tin chi tiết kỹ thuật và cách thức hoạt động của nền tảng Avalanche. Cuối cùng, người dùng sẽ có kết quả tốt hơn khi tham gia vào hệ sinh thái theo cách này. Dexalot cũng hiểu rằng việc xây dựng một ứng dụng phi tập trung triệt để trong môi trường mà chúng ta đang hoạt động là vô cùng khó khăn. Chúng tôi muốn làm cho phần niêm yết ít nhất trở nên dễ dàng hơn cho tất cả các nhà phát triển mới, những người đang xây dựng các sản phẩm mới và thú vị cho hệ sinh thái Avalanche.

Mặc dù Dexalot đang hướng tới mục tiêu giảm thiểu nhiều hoạt động bất chính nhất có thể với quy trình trên, nhưng chúng tôi biết rằng việc cập nhật, thực hiện giảm thiểu của chúng tôi là một cuộc chiến mà chúng tôi sẽ phải tiến hành trong tương lai vì mọi thứ không ngừng phát triển. Dexalot đang có ý định liên tục đánh giá, giám sát, cải tiến quy trình này khi có được nhiều dữ liệu hơn được thu thập và nhiều dự án hơn được liệt kê.

Quá trình trên là sản phẩm của nhiều cuộc thảo luận với các nhà vô địch của hệ sinh thái. Tuy nhiên, Dexalot biết rằng có những người ngoài kia có thể cải thiện nó nhiều hơn nữa. Nếu bạn là một trong những người có ý tưởng sáng tạo để cải thiện Dexalot Discovery hơn nữa, vui lòng liên hệ với chúng tôi qua Twitter , T elegram hoặc kênh Discord của chúng tôi .

Hẹn gặp các bạn một ngày sớm nhất!

Chưa từng xuất hiện ở các sàn phi tập trung (DEX) trước đây!

Tác giả : FireStorm

Biên tập viên : Brad McFall

Đồ họa: Can Toygar

Người dịch: Luong Hung
