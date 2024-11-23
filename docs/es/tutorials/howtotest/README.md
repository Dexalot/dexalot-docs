---
editLink: true
---
# La Dexalot-Subnet
## Cómo testearla

![Dextr](/images/howtotest/dextrcomp.png)

El equipo de Dexalot se complace en presentar la Dexalot-Subnet para testing público. El equipo de desarrolladores pasó meses programando sin parar, escribiendo smart contracts y otros códigos para migrar la Mainnet de Dexalot a la Subnet de Dexalot. A Dexalot le encantaría tu ayuda para que la Subnet Dexalot sea aún mejor. Estamos agradecidos a la comunidad por ayudarnos a llegar hasta aquí. Gracias por ayudarnos a llegar a la siguiente etapa en el desarrollo de Dexalot.

En tanto que la Subnet es esenciamente igual que la Mainnet con la que estás familiarizado, simplemente puedes conectarte y usarla.

**Ve a ésta [URL](https://app.dexalot-test.com/trade) y ya estás listo para comenzar.**

Sentite libre de probarla usando ésta Introduction o lee a continuación para aprender mas para ayudarte y guiarte en tu testeo.

<VidStack src="youtube/vRvaswPuMNg" />

Ésta es una beta pública y esperamos que la comunidad pueda ayudarnos a realizar pruebas de stress de nuestros sistemas. Si quieres ayudar, pero no sabes por donde comenzar, siéntete libre de utilizar la lista de tareas que está mas abajo.

Los desarrolladores de Dexalot abordarán la mayor cantidad de bugs y problemas de usabilidad como sea posible. Por favor, informanos cualquier observación o inquietud que desees que examine el equipo. Por favor, adjunte capturas de pantalla de tus inquietudes y la información suficiente, incluyendo IDs de las transacciones, para ayudarlos a abordar tus observaciones y ellos harán los cambios necesarios.

Podes enviarle al equipo tu reporte por email a [support@dexalot.com](mailto:support@dexalot.com). Los community managers y moderadores de Dexalot están disponibles en Discord para ayudarte, podes dejarles tus comentarios en el hilo de los testeos de la Subnet en el canal #Subnet. ¡Nos vemos allí!

**Feliz testeo!!**

## Arquitectura

Se accede a la nueva arquitectura de Dexalot a través de su front end, que ha sido actualizado para para estar al tanto simultáneamente de la Mainnet y la Subnet. La novedosa arquitectura dual-chain permite a Dexalot descargar las operaciones mas demandantes a la subnet, reduciendo el costo del gas y aumentando la velocidad.

El frontend de la app es similar a la implementación de la single-chain ya existente, mientras los contratos subyacentes, el backend, y la arquitectura de la base de datos han visto todos cambios sustanciales. No hay interfaz de bridge separada. Toda la funcionalidad del bridge está integrada a los smart contracts del portfolio de la Mainnet de Dexalot (PortfolioMain) y el portfolio de la Subnet (PortfolioSub) para proporcionarte una experiencia de usuario fluida. LayerZero será al principio el único proveedor del bridge, y mas bridges se podrán añadir en un futuro si es necesario.

![roadmap](/images/howtotest/roadmp.png)

Éste abordaje le permite a Dexalot escalar hacia multiples bridges (para reducir aún mas el riesgo de puntos únicos de falla) y para que activos en otras chains distintas de Avalanche sean negociables en la Dexalot-Subnet.

## Cosas a recordar, nuevas características y conceptos clave

* Uno puede depositar un activo sólo estando conectado a la Mainnet. El deposito bloquea los activos del usuario en el PortfolioMain y deposita la misma cantidad en el PortfolioSub, todo en una transacción.

* Los usuarios tendrán dos wallets para cada cuenta: una en la Mainnet y otra en la Subnet, accesibles a través de aplicaciones de wallet soportadas como Core, MetaMask y los proveedores de WalletConnect. Mas wallets serán agregadas en el futuro.

* La wallet de la mainnet mantiene todos los activos en la Mainnet como antes, y los activos tienen que ser depositados en Dexalot para operar allí. Todas las funciones del bridge están integradas en las acciones de depósito y retiro.

* La wallet de la subnet mantiene solo $ALOT para los pagos del gas. Por eso, la wallet de la Subnet también se denomina “Gas Tank” (“Tanque de Gas” en español).

![submaintank](/images/howtotest/submaintank.png)

* “Add Gas” transfiere ALOT desde el PortfolioSub a la wallet de la Subnet.

* “Remove Gas” transfiere ALOT desde la wallet de la Subnet al PortfolioSub.

![addrmgas](/images/howtotest/addrmgas.png)

* El ALOT disponible en el PortfolioSub transferido desde la wallet de la Mainnet o la wallet de la Subnet (“Gas Tank”) puede ser utilizado para operar o se retirado.

* El PortfolioSub monitorea los balances “Total” y “Available” (“disponible” en español) de los activos del usuario sin crear ningún token ERC20s en la Subnet. Éstos balances son actualizados cuando se utilizan las funciones de deposito, retiro o trading.

* Como no hay tokens ERC20 en la Subnet, sólo el balance de ALOT (balance “Gas Tank”) será visible en las wallets como Core o MetaMask cuando se conecta a la Subnet.

* Todas las operaciones se realizan mientras se está conectado a la Subnet.

* Uno puede retirar un activo sólo cuando se está conectado a la Subnet. El retiro elimina la cantidad de tokens del PortfolioSub y desbloquea la misma cantidad del PortfolioMain, posteriormente transfiriendo los activos retirados a la wallet Mainnet del usuario, todo en una transacción.
Mas bridges adicionales se introducirán en el futuro, desplegando múltiples contratos de PortfolioMain para diferentes chains.

## Lista de Tareas del Testeo

Por favor, tenga en cuenta los siguientes puntos durante tus pruebas:

1. Por cada tareas que se indica a continuación, realiza el seguimiento de la cantidad de tokens en tu wallet, así como el total y el disponible del portfolio. Asegurate que las cantidades coincidan con las que esperas ver. Has éstos controles de seguridad a medida que vayas realizando tus pruebas.

2. Es necesario crear de 6 a 12 bloques antes que se comprometa un depósito o retiro en la cadena, ya que implica una transferencia de mensaje a través del bridge. Como la actividad en Fuji es relativamente alta, el aspecto limitante será la actividad en la Subnet. Dependiendo del nivel de actividad de la Subnet, las operaciones de transferencias pueden retrasarse. Si los fondos no se entregan incluso después de 1 hora , por favor, avise al equipo de dearrolladores a través de los canales de ayuda, ya que el bridge puede estar bloqueado.

* Deposita desde la Mainnet a la Subnet al menos los siguientes tres activos (por comodidad, se incluyen las address Fuji de los activos soportados en la Subnet):

* AVAX (nativo)

* ALOT (0x9983F755Bbd60d1886CbfE103c98C272AA0F03d6)

Uno de los siguientes

1. ETH (0x16F3e7B8327F2cA3f49Efbb1510d5842F7d4a68C)
2. SER (0xf52602253474ddaF6111133ADc1F7C3d28A30ABd)
3. USDC (0x68B773B8C10F2ACE8aC51980A1548B6B48a2eC54)
4. USDT.e (0x2B62a6c0C750250034e328547Aa38830bd768a18)

* Cambia a la Subnet e ingresa al menos 4 maker orders (2 de venta y 2 de compra) por cada uno de tus activos.

* Usa “Replace Order” por cada activo al menos una vez para cambiar un parámetro de la orden.

* Usa la nueva funcionalidad “Send in Subnet” para enviar fondos a otra cuenta que tengas.

* Desde la otra cuenta, ingresa al menos 1 orden tomadora para cada uno de tus activos.

* Retira tus activos a Mainnet.

![willtest](/images/howtotest/dextrbarttest.png)

**Piensa en casos límite o extremos y testealos. Trata de romper las cosas. Es mejor romper cosas en los testeos!**

---

**Autor**: Brad McFall

**Editor**: Dan Marcoulis

**Gráficos**: Can Toygar

**Traductores**: Mariano Davo y Leandro Davo
