---
editLink: true
---

# Dexalot'un Örnek Botu


![samplebot](/images/samplebot/samplebot.png)

Dexalot, Market Maker’ın kaynak kodunun omurgasının bir kısmını Dexalot’un en yeni [sözleşmeleriyle](https://github.com/Dexalot/contracts/tree/main/contracts) kullanım için SampleBot [reposuna](https://github.com/Dexalot/samplebot) aktardı. Trade, piyasa yapıcılığı ve Dexalot’un üzerine inşa etmeyi düşünebileceğiniz şeyler hakkında bazı fikir ve terimlere [Trade ve Piyasa Yapıcılığı](https://medium.com/dexalot/trade-ve-piyasa-yap%C4%B1c%C4%B1l%C4%B1%C4%9F%C4%B1-f0386bd0cebd) ve [Ticaret Sözlüğü](https://medium.com/dexalot/dexalot-ticaret-s%C3%B6zl%C3%BC%C4%9F%C3%BC-7ed2708960d8) makalelerinden ulaşabilirsiniz.

[https://github.com/Dexalot/samplebot](https://github.com/Dexalot/samplebot)

SampleBot, AbstractBot’undan yapılandırılır ve Testnet’teki Dexalot RestAPI bağlantılarını kullanır(api.dexalot-test.com/api/). Lütfen bu kodun şu anda deploy edilmiş Mainnet sözleşmeleri veya mainnet RestAPI ile uyumlu olmadığını unutmayın. Ancak, Ocak 2023'ün başlarında planlanan üretim sürümüne hazırlık olarak Fuji testnet’te yayınlanan sözleşmelerle etkileşim kurmak için kullanılabilir. Dexalot’un en son RestAPI belgelerine [buradan](https://docs.dexalot-test.com/) ulaşabilirsiniz.

SampleBot’u değiştirmekten ve/veya AbstractBot’u yapılandıran yeni bir bot türü eklemekten çekinmeyin.Kurulum talimatları ve daha fazla ayrıntı için lütfen [README.md](https://github.com/Dexalot/samplebot) dosyasına bakın. SampleBot’un gerçekleştirebileceği işlevlerden bazıları şunlardır:

* RESTAPI’den Mainnet/Subnet ortamlarını, listelenen çiftleri ve token ayrıntılarını alır.
* Gerekli sözleşmelere referanslar oluşturur.
* Çökme durumunda RESTAPI’den varolan açık emirleri ister.
* Tamamlanmamış emirlerin listesini ve local bir emir defterini memory’de tutar.
* Zincirden en iyi 2 alış/satış emirini emir defterinden alır.
* SampleBot, tamamlanmamış emirlerin tamamlanması/kaldırılması durumunda blok zincirinden OrderStatusChanged’in durumunu takip eder.
* SampleBot ayrıca, emir gönderirken tx sonuçlarının bir parçası olan OrderStatusChanged olaylarını yakalar ve emir durumunu bellekte günceller. Birkaç saniye sonra blok zincirinden tüm dinleyicilere gönderilen OrderStatusChanged statülerini bir araya getirir. Birincisi, order gönderildiğinde ve ikinciside bağımsız dinleyinciler tarafından blockchainden alındığında. Bu nedenle “Yinelenen Sipariş olayı: ……” mesajını görmek normaldir.
* Bir OrderStatusChanged olayının kaçırılması durumunda zincirden emir durumunu her 10 dakikada bir iki kez kontrol eder.

---

**Author**: Brad McFall

**Editor**: Dan Marcoulis

**Graphics**: Can Toygar
