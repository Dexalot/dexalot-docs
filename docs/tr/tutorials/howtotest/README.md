---
editLink: true
---

# Dexalot-Subnet Public Testi

## Test Nasıl Yapılır

![Dextr](/images/howtotest/dextrcomp.png)

Dexalot ekibi, herkesin kullanımına açık olan Dexalot-Subnet testini sunmaktan mutluluk duyuyor. Geliştirme ekibi, Dexalot Mainnet’i Dexalot Subnet’e taşımak için akıllı sözleşmeler ve diğer kodlar için aylarca kesintisiz programlama yaptı. Dexalot, Dexalot Subnet’ini daha da iyi hale getirmek için yardımınıza ihtiyaç duyuyor. Buralara gelmemize yardımcı oldukları için topluluğa minnettarız. Dexalot’un geliştirilmesinde bir sonraki aşamaya geçmemize yardımcı olduğunuz için teşekkür ederiz.

Subnet, zaten aşina olduğunuz Mainnet’e benzediği için, direkt bağlanıp kullanabilirsiniz.

[Bu bağlantıya](https://app.dexalot-test.com/trade) gitmeniz yeterli…

Aşağıdaki tanıtım videosu yardımıyla testi denemekten çekinmeyin veya testinizde size yardımcı olacak ve size rehberlik edecek daha fazla bilgi edinmek için aşağıdakileri okuyun.

 **Navigate to [this URL](https://app.dexalot-test.com/trade) and you are good to go.**

Feel free to try it out using this Introduction or read below to learn more to help and guide you in your testing.

<YouTube id="vRvaswPuMNg" />

Bu herkese açık bir beta sürümüdür ve topluluğun sistemlerimizi stres testine tabi tutmamıza yardımcı olabileceğini umuyoruz. Yardım etmek istiyor ancak nereden başlayacağınızı bilmiyorsanız, aşağıdaki görev listesini kullanmaktan çekinmeyin.

Dexalot geliştiricileri, mümkün olduğunca çok sayıda hata ve kullanım sorununu ele alacaktır. Lütfen ekibin incelemesini istediğiniz tüm gözlemlerinizi ve varsa sorunları geri bildirin. Lütfen karşılaştığınız hataların ekran görüntülerini ve gözlemlerinizi ele almalarına yardımcı olmak için transaction id’ leri de dahil olmak üzere yeterli bilgiyi ekleyin; ekibimiz gerekli değişiklikleri yapacaklardır.

Ekibe raporunuzu, [support@dexalot.com](support@dexalot.com) adresinden e-posta ile gönderebilirsiniz. Dexalot topluluk yöneticileri ve moderatörleri size yardımcı olmak için Discord’da olacaklardır ve yorumlarınızı #Subnet kanalındaki Subnet Testing bölümüne bırakabilirsiniz. Orada görüşmek üzere!

**Mutlu Testler!!**

## Mimari

Dexalot’un yeni mimarisine, aynı anda Mainnet ve Subnet erişimine imkan veren frontend aracılığıyla ulaşabilirsiniz. Yeni çift-zincir mimarisi, Dexalot’un daha zorlu işlemleri subnete yüklemesine olanak tanır ve hızı artırırken gaz maliyetini düşürür.

Frontend uygulaması, halihazırda yürürlükte olan tek zincirli uygulamaya benzerken, altında yatan akıllı kontratlar, backend ve veritabanı mimarisinin tamamı önemli değişiklikler gördü. Ayrı bir köprüleme arayüzü yoktur. Tüm köprü işlevleri, size sorunsuz bir kullanıcı deneyimi sağlamak için Dexalot’un Mainnet akıllı kontratlar portfolyosuna(PortfolioMain) ve Subnet portfolyosuna (PortfolioSub) entegre edilmiştir. LayerZero başlangıçta tek köprü sağlayıcısı olacak ve gerektiğinde gelecekte daha fazla köprü eklenebilecektir.

## **Architecture**

Dexalot’s new architecture is accessed through its front end, which has been upgraded to be Mainnet and Subnet aware simultaneously. The novel dual-chain architecture allows Dexalot to unload more demanding operations to the subnet, reducing the gas cost while increasing speed.

The frontend app is similar to the single-chain implementation already in place, while the underlying contracts, backend, and database architecture have all seen substantial changes. There is no separate bridging interface. All bridge functionality is integrated into Dexalot’s Mainnet smart contracts portfolio (PortfolioMain) and Subnet portfolio (PortfolioSub) to provide a seamless user experience for you. LayerZero will be the sole bridge provider at the start, and more bridges could be added in the future as needed.

![roadmap](/images/howtotest/roadmp.png)

Bu yaklaşım, Dexalot’un birden çok köprüye ölçeklenmesine (bir noktadan kaynaklanan hata riskini daha da azaltmak için) ve Avalanche dışındaki zincirlerdeki varlıkların Dexalot-Subnet’te takas edilebilir olmasına olanak tanır.

## Bilinmesi gerekenler, yeni özellikler ve temel kavramlar

* Bir varlık yalnızca Mainnet’e bağlıyken yatırılabilir. Yatırma işlemi, kullanıcının varlığını PortfolioMain’de kilitler ve aynı tutarı tek bir işlemde PortfolioSub’a yatırır.

* Kullanıcıların her hesap için iki cüzdanı olacaktır: biri Mainnet, diğeri Subnette, Core, MetaMask ve WalletConnect sağlayıcıları gibi desteklenen cüzdan uygulamaları aracılığıyla erişilebilir. Gelecekte daha fazla cüzdan eklenecektir.

* Mainnet cüzdanı, daha önce olduğu gibi Mainnet’teki tüm varlıkları tutar ve varlıkların alım satım için orada Dexalot’a yatırılması gerekir. Tüm köprü işlevleri, para yatırma ve çekme işlemlerine entegre edilmiştir.

Subnet cüzdanı, gaz ödemeleri için yalnızca $ALOT tutar. Bu nedenle Subnet cüzdanına “Gaz Tankı” da denir.
![submaintank](/images/howtotest/submaintank.png)

* “Add Gas” fonksiyonu ALOT’u portföySub’dan subret cüzdanına aktaracaktır.

* “Remove Gas” fonksiyonu ALOT’u Subnet cüzdanından PortfolioSub’a aktaracaktır.

![addrmgas](/images/howtotest/addrmgas.png)

* Mainnet cüzdanından veya Subnet cüzdanından (“Gas Tank”) aktarılan PortfolioSub’da bulunan ALOT, alım satım veya para çekme işlemlerinde kullanılacaktır.

* PortfolioSub, Subnette herhangi bir ERC20 oluşturmadan kullanıcıların varlıklarının Toplam ve Kullanılabilir bakiyelerini izler. Bu bakiyeler para yatırma, çekme ve alım satım fonksiyonları kullanıldığında güncellenir.

* Subnette ERC20 tokenları olmadığından ve Alt Ağa bağlanıldığında Core veya MetaMask gibi cüzdanlarda yalnızca ALOT bakiyesi (“Gaz Tankı” bakiyesi) görünür olacaktır.

* Tüm ticaret, Subnet’e bağlıyken yapılır.

* Bir varlık yalnızca Subnet’e bağlandığında çekilebilir. Para çekme işlemi, tutarı PortföySub’dan kaldırır ve aynı tutarı PortföyAna’dan açar, daha sonra çekilen varlığın tümü tek bir işlemde kullanıcının Mainnet cüzdanına aktarılır.

* Farklı zincirler için birden çok PortfolioMain sözleşmesi dağıtılarak gelecekte ek köprüler tanıtılacaktır.

## Test Görev Listesi

1. Aşağıdaki her görev için cüzdanlarınızdaki tutarların yanı sıra portföy toplamını ve kullanılabilirliğini takip edin. Tutarların, görmeyi beklediğiniz miktara ulaştığından emin olun.

2. Köprü üzerinden bir mesaj aktarımı içerdiğinden, zincire bir para yatırma veya çekme işlemi yapılmadan önce 6–12 blok oluşturulmalıdır. Fuji’deki etkinlik nispeten yüksek olduğundan, hız sınırlayan basamak Subnetteki etkinlik olacaktır. Subnet etkinliğinin düzeyine bağlı olarak, aktarım işlemleri gecikebilir. 1 saat geçmesine rağmen para teslim edilmezse, köprü bloke olabileceğinden lütfen destek kanalları aracılığıyla geliştirici ekibini uyarın.

* En azından aşağıdaki üç varlık için Mainnetten, Subnete para yatırın. (kolaylık olması için Alt Ağda desteklenen varlıkların Fuji adresleri dahil edilmiştir):

* AVAX (native)

* ALOT (0x9983F755Bbd60d1886CbfE103c98C272AA0F03d6)
Aşağıdakilerden biri,

1. ETH (0x16F3e7B8327F2cA3f49Efbb1510d5842F7d4a68C)

2. SER (0xf52602253474ddaF6111133ADc1F7C3d28A30ABd)

3. USDC (0x68B773B8C10F2ACE8aC51980A1548B6B48a2eC54)

4. USDT.e (0x2B62a6c0C750250034e328547Aa38830bd768a18)

* Subnete geçin ve varlıklarınızın her biri için en az 4 maker order(2 satış ve 2 satın alma emri) girin.

* Siparişin bir parametresini değiştirmek için her varlık için en az bir kez “Replace Order” seçeneğini kullanın.

* Sahip olduğunuz başka bir hesaba para göndermek için yeni “Send in Subnet” işlevini kullanın.

* Başka bir hesaptan, varlıklarınızın her biri için en az 1 taker order girin.
Varlıklarınızı Mainnet’e geri çekin.

![willtest](/images/howtotest/dextrbarttest.png)

**Sınırları zorlayın, ekstrem durumları test edin. Bir şeyleri bozmaya çalışın. Testte bir şeyleri bozmak her zaman iyidir!**

---
**Yazar**: Brad McFall

**Editör**: Dan Marcoulis

**Grafikler**: Can Toygar

**Çeviren**: ZainCypher
