---
editLink: true
---

# Dexalot Discovery

## Daha önce hiçbir DEX’in gitmediği yer!

![discoverybanner](/images/discovery/discoverybanner.png)

* IDO’lar başarılı bir şekilde çalışıyor, ancak AMM’lerde yapılan token lansmanları başarılı olamıyor.
* AMM’lerin limit emir işlevi yoktur ve slippage(kayma kontrolü) yeterli değildir.
* Botlar ve MEV, lansmanlar sırasında kullanıcıları zarara uğratıyor.
* Dexalot, bu sorunları çözmek için Dexalot Discovery’yi sunar.
* **Dexalot Discovery**, limit emirlerini destekliyor.
* **Dexalot Discovery**, botların kullanıcıları safdışı bırakmasını önlüyor.
* **Dexalot Discovery**, kullanıcılara emir girmek ve eşleştirmek için bolca zaman tanıyor.
* **Dexalot Discovery**, daha düzenli ve daha adil bir fiyat keşif süreci yaratıyor.
* Yeni bir varlığın fiyatı keşfedildikten sonra, AMM listelemeleri daha güvenli hale geliyor!

Yukarıdakilerin harika olduğunu mu düşünüyorsun? Peki o zaman, okumaya devam edin!

Dexalot’un benimsediği yol gösterici ilkelerden biri, topluluk sonuçlarının sürekli iyileştirilmesidir. Son birkaç ay boyunca topluluk, yeni projelerin token listelemesi sırasında çok sayıda olumsuzluklar yaşadı. Bu verimsiz listelemeler çoğu kullanıcı için zararlı sonuçlara yol açtı ve yalnızca birkaç seçkin kişiye(Botlar, büyük node sahibi kişiler vs.) fayda sağladı.Dexalot, bu sorunların çözülmesine yardımcı olmak istiyor.

Kullanıcıların sürekli olarak muzdarip olduğu büyük bir sorun, çeşitli IDO’ların listelenmesi sırasında meydana gelen kötü niyetli fiyat hareketidir.

Avalaunch (ve diğerleri) kelimenin tam anlamıyla proje dağıtımının daha geniş bir insan grubuna yeni ve adil bir şekilde dağıtılmasına giden yolu açtı. Tek bir büyük katılımcının çok fazla pay alarak sonuçlandığı “balina” etkisini azaltmak için karmaşık algoritmalar bile uyguladılar. Artık ekosistem projelerinin sermaye artırmasına yardımcı olma konusunda kendi rollerini üstlenen ve kötü aktörlerin etkilerini en aza indirecek fikirlerden yararlanan başka IDO platformları da var. Dexalot, Avalaunch ile ortaklık kurmuştur ve onların değerlerine ve yeteneklerine sıkı bir şekilde inanmaktadır.

Piyasa öncesi sermaye artırımı süreci oldukça iyi işlese de, projeler sermaye artırımını tamamlayıp listeleme zamanı geldiğinde sorunlar başlıyor.

## IDO’lar listelendiğinde var olduğunu bildiğimiz üst düzey sorunlar şunlardır:

* IDO’lar genel olarak, belirli bir zamanda ticarete açılan Uniswap gibi AMM platformlarında başlatılır ve bu da hızın önemli olduğu bir durum yaratır.

* Hız kavramını genişletirsek, **token listelendikten sonra ilk işlemi yapanın en iyi fiyata aldığını görebilirsiniz** çünkü herkes aynı anda satın almak için yarışıyor. Etkili bir şekilde bu, insanları ilk olmak için en iyi yolu bulmaya veya en azından mümkün olduğunca erken olmaya teşvik eder.

Böyle bir senaryoda yapılacak ilk ve en basit şey, **satın almak için gerekli işlemleri otomatikman yapabilen bir yazılım yazmaktır.** Bu kullanışlıdır çünkü fare hareketleri, fare tıklamaları, işlem onayları ve genellikle bir kullanıcı cüzdanıyla etkileşimin neden olduğu yavaşlık gibi insan unsurunu atlar.

Yapılacak ikinci ve daha kötü şey, yeterince büyük bir node’nuz varsa, MEV (Miner Extractable Value) saldırı yüzeyini kullanmaktır. Avalanche konsensüs mekanizması, nihai bir cevaba ulaşmak için diğer node’ları sorgulayan node’lar tarafından çalışır.Her node, olasılık hesaplamasını kullanarak sorgulamak için başka bir node seçer. Olasılıklar, node’ların stake ağırlığına göre hesaplanır ve aslında, **yeterince büyük bir stake ağırlığına sahip bir node’nuz varsa, ortalama olarak diğerlerinden daha fazla ilk sırada hangi işlemin yapılması gerektiğine dair ‘fikriniz’ sorulacaktır.**

Bu bilgileri işe koyacak olursak, yeterince büyük bir düğümünüz varsa ve işlemlerinizi nasıl önceliklendireceğinizi biliyorsanız, bir IDO listeleme sırasında ‘fikriniz’ sorulma şansı yüksek ve işleminizi (satın alma emri) ilk verme fırsatınız olacak.Bu elbette oldukça sermaye yoğun, ancak orijinal Avalanche satışına katıldıysanız, coinlerin bugün olduğundan önemli ölçüde farklı fiyatlarla satıldığını bilirsiniz. İkincisi, bir projenin piyasa tarafından makul bir talebin altında olduğunu biliyorsanız, Tokenların piyasaya çıktıkları anda ilk payı almak ve işlem talepleri gelmeye başladığında geri dönüp diğer olası alıcılara satmak gerçekten kazançlı.

Yeni listelenen projeleri satın almak için **AMM’leri kullanan kullanıcılar, tokenları satın almak istedikleri gerçek fiyat yerine bir slippage** (ticaret yaptıklarında kabul ettikleri fiyatta ne kadar tolerans) tanımlamalıdır.

IDO listeleme süresi genellikle çok rekabetçi olduğu için (çünkü tüm kullanıcılar mümkün olan en kısa sürede satın almak için yarışıyor). Çoğu kullanıcı, etkili ticaret işlemleri sağlamak için sayının ne olması gerektiğini tanımlamak çok zor olduğundan, **büyük kayma yüzdelerine sahip olmak zorunda kalır** bu sebeple kullanıcılar işlemlerinin yapılabilmesi için yüksek bir kayma yüzdesi belirler.

**Sonuç olarak, işlem açısından “yavaş” olan ve Metamask gibi cüzdanları kullanırken nispeten uzun gecikmelere maruz kalan kullanıcılarının, emirlerinin yerine getirilmesi için çok büyük kayma yüzdesi ayarları kullanmaları gerektiğidir. Bununla birlikte, fikir birliği mekaniğinden nasıl yararlanılacağına dair bilgiye sahip olan kullanıcılar, herhangi bir projeye gerçekten yatırım yapma niyetinde olmadan para kazanma konusunda belirgin bir avantaja sahiptir.**

## Dexalot, Dexalot Discovery’yi oyun sahasına sunar.

**Dexalot Discovery**, kullanıcıların en hızlı olmaya çalışmadan veya botlar hakkında endişelenmeden yeni listelenen jetonlar için uygun fiyatı keşfedebileceği adil bir süreç oluşturarak yukarıdaki sorunları çözmeyi amaçlamaktadır.

**Dexalot Discovery**, başarılı ekosistem projelerinden öğrenilen bazı önemli dersleri içerir ve projelerin tokenlarını Dexalot’da adil ve şeffaf bir şekilde listelemeleri için aşağıdaki süreci uygular:

1- Bir proje Dexalot ile entegre olur; Proje,tokenlarını Dexalot’a yatırma seçeneği yaratır ve bu seçeneği claim açılmadan önce önceden tanımlanmış bir süre boyunca etkinleştirilir (ör. 8 saat). Bu süre zarfında Proje tokenı için Dexalot para çekme işlemleri devre dışı bırakılacaktır.

2- Avalaunch, Dexalot’a entegre için koordine eder. Proje tokenlarını Dexalot’a yatırma seçeneği yaratır ve bu seçenek, claim uygun hale gelmeden önce (ör. 8 saat) önceden tanımlanmış süre kadar etkinleştirilir. Bu süre zarfında Proje tokenı için Dexalot para çekme işlemleri devre dışı bırakılacaktır.

3- Dexalot, “no-match” diye adlandırdığı limit emir işlemi yapabileceğimiz modu başlatır.Bu modda kullanıcı alım yapabilmek için deposit ettiği karşı varlığı (AVAX, USDT) ile alım için limit emir verebilir. Proje tokenını deposit eden kullanıcılar ise satış için limit emir verebilir. Verilen tüm emirler topluluk tarafından şeffaf ve sürekli olarak görüntülenebilir.

4- Kullanıcılar, önceden tanımlanmış süre boyunca (ör. 8 saat) siparişleri iptal etme ve değiştirme olanağına sahiptir. Satıcıların, satış yapabilmek için yatırılan gerçek tokenlara sahip olmaları gerekir ancak alıcılar, karşı varlığın doğru miktarını yatırdıkları sürece satın alma siparişi verebilirler.

5- Sipariş kabul süresinin sonunda, sipariş kabulü durur ve Dexalot bir “Eşleştirme” moduna girer. Burada alış ve satış limit emirleri eşleştirilir ve varlığın ilk fiyatı keşfedilir (doldurmalar, kullanıcıların karar vermek ve limit emirlerini vermek için sahip oldukları belirlenen süre içinde verdikleri fiyatlarda gerçekleşir).

6- Emirlerin eşleşmesi tamamlandıktan sonra emir defteri “normal” moda geçer. Bu aşamada,Avalaunch,Proje ve Dexalot koordineli bir şekilde claim ve çekim işlemilerini aktif hale getirir.

7- Discovery’e katılan bir proje çeşitli AMM lere likitide eklemek isterse keşfedilen ve dexalotta devam eden fiyattan likitide ekleyebilirler.

##  Sonuç

Özünde Dexalot, herkesin belirli bir projeden pay alma şansını eşitlemek için CLOB kapasitesini birkaç geliştirmeyle kullanır. Kullanıcılar, en iyi tekliflerini sunmak için yeterli zamana sahip olmalıdır (kullanıcının Avalaunch’ta bir IDO’ya nasıl kaydolduğuna benzer şekilde). Anında işlem yapan botlar veya Avalanche platformunun nasıl çalıştığını daha fazla bilen bilgi sahibi kişiler tarafından yönetilme konusunda endişelenmeleri gerekmez. Sonuçta, kullanıcılar ekosisteme bu şekilde katılarak daha iyi bir sonuca sahip olacaklar. Dexalot ayrıca, bugün içinde faaliyet gösterdiğimiz ortamda son derece merkezi olmayan bir uygulama oluşturmanın son derece zor olduğunun da farkındadır. Avalanche ekosistemi için yeni ve harika ürünler geliştiren tüm rock yıldızı ekipler için en azından listeleme kısmını kolaylaştırmak istiyoruz.

Dexalot, yukarıdaki süreçle mümkün olduğu kadar çok kullanıcı için olumsuz olan faaliyetleri azaltmayı amaçlarken, aynı zamanda da daha fazla veri topladıkça ve daha fazla proje listelendikçe bu süreci sürekli olarak değerlendirmeyi, izlemeyi ve iyileştirmeyi amaçlıyor.

Yukarıdaki süreç, ekosistem destekçileri ile yapılan birçok tartışmanın ürünüdür. Ancak Dexalot, süreci daha da geliştirebilecek insanlar olduğunu biliyor. Dexalot Discovery’yi daha da geliştirmek için parlak bir fikri olan kişilerden biriyseniz, lütfen bize Twitter, Telegram veya yeni oluşturulan Discord grupları üzerinden ulaşmaktan çekinmeyin.

**Daha önce hiçbir DEX’in gitmediği yer!**

---

**Yazar**: Brad McFall

**Editor**: Dan Marcoulis

**Tasarımcı**: Can Toygar

**Çevirmen** : Abdullah-SZD
