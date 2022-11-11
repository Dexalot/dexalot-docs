---
editLink: true
---
# DEXALOT SUBNET


![subnet](/images/subnet/subnet.png)
Avalanche ekosisteminin yatay ölçeklendirme paradigmasında yenilikçi bir değişim

Dexalot ekibi, Avalanche Subnetimizi oluşturmak için çok çalışıyor ve neredeyse sona gelmek üzere. Subnetimiz şu anda Avalanche Fuji test ağında test ediliyor, tamamlandıktan sonra kullanıcılar yeni geliştirilmiş bir ticaret deneyiminin keyfini çıkaracaklar. Daha ucuz işlem ücretleri, daha iyi likidite ve inanılmaz hız, subnetler ile gelen birçok yeni özellikten sadece birkaçı. Yeni Dexalot’un özgün yapısına ve Avalanche subnet’i olarak çok zincirli bir gelecek için nasıl bir temel oluşturduğuna bir göz atalım.

Orijinal Dexalot Testneti 6 Ağustos 2021'de tanıtıldı ve 6 Aralık 2021'de Mainnet lansmanı yapıldı. Ardından, Dexalot Subnet Testnet, 25 Nisan 2022'de oluşturuldu. Basitçe söylemek gerekirse, Dexalot yeni mimariye geçerken tüm zincir ortamları güncelleniyor.

Yeni Dexalot, hem Avalanche C-Chain (Mainnet) hem de Dexalot Subnet (Subnet) üzerinde bulunan çift zincirli bir uygulamadır. Ana Ağ ve Subnet, üst düzey köprü teknolojilerinin kullanımıyla genel mesaj ileterek iletişim kurar. Daha önce, Dexalot’ta işlem yapmak, tüm eylemlerinizin tek bir blok zincirine gönderildiği anlamına geliyordu, ancak bu büyük ölçüde değişiyor. Dexalot’un yeni mimarisi, yalnızca bir tane yerine tek bir arayüz üzerinden birden fazla blok zinciri arasında etkileşime izin verir. Bu sadece daha verimli olmakla kalmaz, aynı zamanda gelecekteki yeniliklerin de yolunu açar.

![trading](/images/subnet/trading.png)

Yeni mimariyle, Ana Ağdan para yatırmanız, Subnet’te işlem yapmanız ve yine Subnet’ten çekmeniz gerekecek. Bunu bu şekilde yapmanın avantajı, Subnet’te işlemler gerçekleşirken varlıkların kaynak zinciri asla terk etmemesidir.

Bu iki blok zinciri arasında geçiş yapmak için, tanıdık Dexalot panosundaki (dashboard) cüzdan bağlantı düğmesinin hemen yanında bulunan açılır menüden seçim yapmanız yeterlidir.

![chainswitch](/images/subnet/chainswitch.png)
![mainsub](/images/subnet/mainsub.png)

## Mimari

Frontend uygulaması, halihazırda yürürlükte olan tek zincirli uygulamaya benzerken, temel sözleşmeler, backend ve veritabanı mimarisinin tamamı önemli değişiklikler gördü.

Yeni çift zincir mimarisi, Dexalot’un daha zorlu işlemleri Subnet’e yüklemesine olanak tanır ve hızı artırırken gaz maliyetini düşürür. Dexalot’un yeni mimarisine, aynı anda Mainnet ve Subnet haberdar olacak şekilde yükseltilmiş olan frontend aracılığıyla erişilir. Ayrıca, ayrı bir köprüleme arayüzü yoktur. Tüm köprü işlevleri, size sorunsuz bir kullanıcı deneyimi sağlamak için Dexalot’un Mainnet akıllı sözleşmeler portföyüne (PortfolioMain) ve Subnet portföyüne (PortfolioSub) entegre edilmiştir. LayerZero başlangıçta tek köprü sağlayıcısı olacak ve gerektiğinde gelecekte daha fazla köprü eklenebilir. Bu yaklaşım, Dexalot’un birden fazla köprüye ölçeklenmesine (tek hata noktalarından kaynaklanan riski daha da azaltmak için) ve Avalanche dışındaki zincirlerdeki varlıkların Dexalot Subnet’inde takas edilebilir olmasına olanak tanır.

### 1. Aşama
Geçişin ilk aşaması 14 Temmuz 2022'de başladı. Fuij testnet ağı, çoklu zincir uygulamasının ilk adımı olan aynı veritabanı şemasını kullanan birden fazla blok zincirini desteklemek için kısa bir süre kapatıldı. Kullaniciya gosterilen veriler, blockchain uzerinde gerceklesen olaylarinin drop copy’sinin cogaltıldığı verilerle oluşturulup sunuluyor(bknz. Litepaper).Bu aşamada, birden fazla blok zinciriyle etkileşime girebilen okuyucular ve yazarlar ile yeni bir backend’e başarıyla dağıtıldı.

### 2. Aşama
Ağustos ayının ilk haftasında, Subnet ortamının test için etkinleştirilmesi amacıyla Ana Ağ kapatıldı. Mevcut Mainnet 4 akıllı sözleşme ile çalışmaktadır ve bu sistem 10+ akıllı sözleşmeyi içerecek şekilde güncellenmiştir. Bu geliştirme ortamı, Avalanche Fuji test ağında konuşlandırıldı ve dahili testlerden geçiyor.

Trade akışı:

* Cüzdanını bağla
* Mainnetten tokenlarını depozit et
* Subnette trade yap
* Subnetten geri çek (Withdraw)

## Temel Kavramlar ve Farklılıklar

* Bir varlık yalnızca Mainnet’e bağlıyken yatırılabilir. Depozito, kullanıcının varlığını PortföyAna’da kilitler ve aynı tutarı tek bir işlemde PortföySub’a yatırır.

* Kullanıcıların her hesap için iki cüzdanı olacaktır: biri Ana Ağda, diğeri Subnette. Core Wallet, MetaMask ve WalletConnect sağlayıcıları gibi desteklenen cüzdan uygulamaları aracılığıyla erişilebilir. Gelecekte daha fazla cüzdan eklenecektir.

* Ana ağ cüzdanı, daha önce olduğu gibi Ana Ağdaki tüm varlıkları tutar ve varlıkların alım satım için orada Dexalot’a yatırılması gerekir. Tüm köprü işlevleri, para yatırma ve çekme işlemlerine entegre edilmiştir.

* Subnet cüzdanı, gaz ödemeleri için yalnızca ALOT $ tutar. Bu nedenle Subnet cüzdanına “Gaz Tankı” da denir.

![gastank](/images/subnet/gastank.png)

* “Add Gas” fonksiyonu ALOT’u portföySub’dan subret cüzdanına aktaracaktır.

* “Remove Gas” fonksiyonu ALOT’u Subnet cüzdanından PortfolioSub’a aktaracaktır.

![subnetportfolio](/images/subnet/subnetportfolio.png)

* Mainnet cüzdanından veya Subnet cüzdanından (“Gas Tank”) aktarılan PortfolioSub’da bulunan ALOT, alım satım veya para çekme işlemlerinde kullanılacaktır.

* PortfolioSub, Subnette herhangi bir ERC20 oluşturmadan kullanıcıların varlıklarının Toplam ve Kullanılabilir bakiyelerini izler. Bu bakiyeler para yatırma, çekme ve alım satım fonksiyonları kullanıldığında güncellenir.

* Subnette ERC20 tokenları olmadığından ve Alt Ağa bağlanıldığında Core veya MetaMask gibi cüzdanlarda yalnızca ALOT bakiyesi (“Gaz Tankı” bakiyesi) görünür olacaktır.

* Tüm ticaret, Subnet’e bağlıyken yapılır.

* Bir varlık yalnızca Subnet’e bağlandığında çekilebilir. Para çekme işlemi, tutarı PortföySub’dan kaldırır ve aynı tutarı PortföyAna’dan açar, daha sonra çekilen varlığın tümü tek bir işlemde kullanıcının Mainnet cüzdanına aktarılır.

* Farklı zincirler için birden çok PortfolioMain sözleşmesi dağıtılarak gelecekte ek köprüler tanıtılacaktır.

![roadmap](/images/subnet/roadmap.png)

Yeni Dexalot Subnet’ini nasıl test edeceğinizi ve deneyeceğinizi gösterecek olan duyurular, medya ve makaleler için bizi takip etmeye devam edin!
---
**Yazar**: Brad McFall
**Editör**: Dan Marcoulis
**Tasarım**: Can Toygar
**Çevirmen**: Abdullah-SZD
