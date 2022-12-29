---
editLink: true
---

# Sample Bot de Dexalot


![samplebot](/images/samplebot/samplebot.png)

Dexalot ha extraído parte de la columna vetebral de su código fuente de Market Maker en el [repositorio](https://github.com/Dexalot/samplebot) SampleBot, para su uso con los [contratos](https://github.com/Dexalot/contracts/tree/main/contracts) mas nuevos de Dexalot. Algunas ideas y términos sobre trading, market making y lo que puedas considerar construir sobre Dexalot, puede ser encontrado en [Trading y Creación de Mercado](https://medium.com/dexalot/trading-y-creaci%C3%B3n-de-mercado-1d45fc51be42) y [Glosario del Trading.](https://medium.com/dexalot/dexalot-glosario-de-trading-12c5588bac1d).

[https://github.com/Dexalot/samplebot](https://github.com/Dexalot/samplebot)

SampleBot amplía el AbstractBot y utiliza conexiones con el RestAPI de Dexalot en la Testnet (api.dexalot-test.com/api/). Note que éste código no es compatible con los contratos desplegados actualmente en Mainnet ni con RestAPI de Mainnet. Sin embargo, puede ser utilizado para interactuar con los contratos desplegados en la Fuji testnet, como preparación para el lanzamiento de producción planeado para principios de Enero de 2023. La última documentación de RestAPI de Dexalot está disponible  [aquí](https://docs.dexalot-test.com/).

Siéntete libre de cambiar SampleBot y/o agregar un nuevo tipo de bot que amplíe AbstractBot. Consulta el archivo [README.md](https://github.com/Dexalot/samplebot) por instrucciones de instalación y mas detalles. Aquí hay algunas de las funciones que SampleBot puede realizar:

* Obtener los entornos de mainnet/subnet, pares listados, detalles de tokens desde RESTAPI
* Crear referencias a los contratos necesarios
* Requerir la apertura de ordenes desde RESTAPI en caso de recuperación de fallas (crash recovery)
* Mantener una lista de sus ordenes pendientes y un libro de ordenes local en la memoria
* Obtener desde la chain las mejores 2 ordenes bid/asks del libro de ordenes
* SampleBot presta atención a los eventos de OrderStatusChanged desde la blockchain en caso que sus ordenes pendientes logren ser vendidas/compradas.
* Además SampleBot captura los eventos de OrderStatusChanged como parte de los resultados de tx cuando envía una orden y actualiza el estado de la orden en la memoria. El evento OrderStatusChanged se levanta desde la blockchain a todos los oyentes unos pocos segundos despues. Así que el mismo evento se procesa dos veces. Una vez cuando la orden es enviada y nuevamente cuando es recibida desde la blockchain por el hilo del oyente independiente. Por ello, es normal ver el mensaje “Duplicate Order event: ……” (o “Evento de Orden Duplicada:…”)
* Haz una doble comprobación del estado de la orden desde la chain cada 10 minutos, en caso que se pierda un evento de OrderStatusChanged .

---

**Author**: Brad McFall

**Editor**: Dan Marcoulis

**Graphics**: Can Toygar
