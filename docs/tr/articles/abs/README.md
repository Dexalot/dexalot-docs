---
editLink: true
---

# Dexalot’un Asset Balance Snapshot’ı

![abs1](/images/abs/abs1.png)

[Dexalot](https://dexalot.com/), [Avalanche’ın subnet teknolojisi](https://www.avax.network/)tarafından desteklenen, çift zincirli, gözetimsiz(non-custodial) bir merkezi emir defteriyle çalışan bir DEX’tir. Dexalot’un yaşam döngüsünün gelişimindeki bir sonraki aşama, hız, güvenlik ve deneyim için optimize edilmiş yazılım mimarisinin piyasaya sürülmesiyle devam ediyor. Dexalot’un subnet lansmanı, varlık bakiyeniz için, değiştirilemez bir anlık durum görüntüsü(snapshot) kanıtı sunan, yerleşik bir varlık bakiyesi anlık görüntüsü (ABS) özelliği içerecektir.

Bu benzersiz özellik, Dexalot alt ağındaki varlık bilgilerini, **Merkle Tree** adı verilen bir veri yapısına periyodik olarak yazarak bir kullanıcı için varlık bakiyelerinin hızlı ve kolay bir şekilde doğrulanmasını sağlar. Yazıldıktan sonra, ABS, Dexalot subnetin varlığından bağımsız olur ve böylece güvenliği artırır. Avalanche mainnet C-chain’ deki varlıklarınızın durumunun herhangi bir nedenle gerekli olması durumunda ABS ile kurtarılması mümkündür. Dexalot’un sizlere sunduğu sınıfının en iyisi, yeniliğiyle çığır açan başka bir deneyimi daha yaşayın ve keyfini çıkarın!

---
## Nasıl Çalışır:

- Cüzdanınızı şuraya bağlayın: <https://app.dexalot-test.com/asset_balance_snapshot>.
- Sahip olduğunuz bir tokeni seçin.
- Varlığınızın on-chain bakiyesi hakkında güvenli veriler elde edin.

## ABS şunları sunar:

- Dexalot ile etkileşime giren varlıkların bakiyelerinin şeffaflığı
- Herkesin, varlıkları bağımsız olarak teyit edebilmesi
- Gerektiğinde, analiz için varlık bakiyelerinin değiştirilemez zaman serisi verileri

---

İşte cüzdanınızı nasıl bağlayacağınızı ve sahip olduğunuz herhangi bir varlığın bakiyesini nasıl öğrenebileceğinizi gösteren kısa bir video.

<https://youtu.be/IEuRCxOJ20k>

![abs2](/images/abs/abs2.png)

## ABS’nizin sahibi olun:

Kendi varlık bakiyelerinizi manuel olarak doğrulamakla ilgileniyorsanız, [Merkletreejs'i](https://www.npmjs.com/package/merkletreejs) (bir Javascript kütüphanesi) kullanabilirsiniz. Aşağıdaki [adımları](https://app.dexalot-test.com/balance_proof) basitleştirmek için bu kütüphaneyi kullanabilirsiniz::

- Bakiye merkle ağacının kökünü [IPFS'den](https://ipfs.io/ipfs/bafkreibus7wgzcnukfkc5klog4urln4w5qgxxdfo2nx6okwucggaph5qci) alın.
- [S3'ten](https://dexalot-balance-merkle-test.s3.amazonaws.com/AVAX-1672244063.json) Bakiye Merkle ağacını alın..
- Ağacı kullanarak kökü doğrulayın.
- Ağacı kullanarak yaprak dizininizden, cüzdan adresinizden ve varlık bakiyenizden Solidity’nin keccak256 algoritmasını kullanarak yaprak hash’inizi doğrulayın.
- Kök ve ağacı kullanarak yaprak hash’inizin kanıtlarını doğrulayın.
- Ağacı kullanarak kök, kanıtlar ve yaprağın değişmez kombinasyonunu kullanarak yaprak hash’inizi doğrulayın.

---
**Author**: Brad McFall

**Editor**: Dan Marcoulis

**Graphics**: Can Toygar
