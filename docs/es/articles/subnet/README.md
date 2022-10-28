---
editLink: true
---

# Programa de Incentivos de Dexalot

![subnet](/images/subnet/subnet.png)

**Un exchange innovador sobre el paradigma de la escalabilidad horizontal del ecosistema Avalanche**

## Introducción

El equipo de Dexalot ha estado trabajando duro construyendo nuestra Subnet de Avalanche, ¡y ya casi está aquí! Nuestra Subnet está actualmente siendo testeada en la red de prueba Avalanche Fuji, por lo que los usuarios podrán disfrutar de una nueva experiencia de trading mejorada una vez que esté completa. La tarifas de transacciones mas baratas, la liquidez mejorada, y la altísima velocidad son sólo algunas de las muchas nuevas características que vendrán con la subnet. Echemos un vistazo a la novedosa estructura del nuevo Dexalot y como establece una base para un futuro multi-chain como una Subnet de Avalanche.

<YouTube id="vRvaswPuMNg" />


La Testner original de Dexalot Testnet se presentó el 6 de Agosto de 2021, seguida del lanzamiento de la Mainnet el 6 de Diciembre de 2021. Posteriormente, la Testnet Subnet de Dexalot se creó el 25 de Abril de 2022. Dicho sencillamente, todos los entornos fueron actualizados a medida que Dexalot migra a la nueva arquitectura.

El nuevo Dexalot es una aplicación dual-chain existente en la C-Chain de Avalanche (Mainnet) y en la Dexalot Subnet (Subnet). La Mainnet y la Subnet se comunican por mediante el traspaso de mensajes genéricos con la utilización tecnologías de bridge de alta calidad. Previamente, el trading en Dexalot significaba que todas tus acciones se enviaban a una sola blockchain, pero eso está cambiando en una gran forma. La nueva arquitectura de Dexalot permite la interacción entre múltiples blockchains desde su frontend, en vez de una sóla. Ésto no es sólo más eficiente, sino que también pavimenta el camino para futuras innovaciones.
![trading](/images/subnet/trading.png)
Cómo interactúan los usuarios con — antes y después de la migración a la nueva Dexalot Subnet

Con la nueva arquitectura, deberás depositar desde la Mainnet, operar en la Subnet y retirar desde la Subnet. La ventaja de hacerlo de éste modo es el hecho que los activos nunca dejan la chain de origen mientras las operaciones se producen en la subnet.

Para cambiar entre éstas dos blockchains, basta con seleccionar desde el menú desplegable ubicado justo al lado del botón de conexión de la wallet en el conocido panel de Dexalot.
![chainswitch](/images/subnet/chainswitch.png)
![mainsub](/images/subnet/mainsub.png)

## Arquitectura

El frontend de la app es similar a la implementación de la single-chain ya existente, mientras los contratos subyacentes, el backend, y la arquitectura de la base de datos han visto todos cambios sustanciales.

La novedosa arquitectura dual-chain permite a Dexalot descargar las operaciones mas demandantes a la subnet, reduciendo el costo del gas y aumentando la velocidad. Se accede a la nueva arquitectura de Dexalot a través de su frontend, que ha sido actualizado para estar al tanto simultáneamente de la Mainnet y la Subnet. Además, no hay interfaz de bridge separada. Toda la funcionalidad del bridge está integrada a los smart contracts del portfolio de la Mainnet de Dexalot (PortfolioMain) y el portfolio de la Subnet (PortfolioSub) para proporcionarte una experiencia de usuario fluida. LayerZero será al principio el único proveedor del bridge, y mas bridges se podrán añadir en un futuro si es necesario. Ésta abordaje le permitirá a Dexalot escalar hacia multiples bridges (para reducir aún mas el riesgo de puntos únicos de falla) y para que activos en otras chains distintas de Avalanche sean negociables en la Dexalot Subnet.

### Fase 1
La primer fase de la migración comenzó el 14 de Julio de 2022. La testnet network Fuij se detuvo brevemente para soportar multiples blockchainss utilizando el mismo esquema de base de datos — el primer paso de la aplicación multi-chain. La vista del usuario de Dexalot (como se ve en el panel del website) se crea principalmente consultando el registro de la base de datos (ver el litepaper de Dexalot) que se llena con una copia de los eventos de la blockchain. También se desplegó con éxito durante ésta fase una nueva infraestructura de backend con readers y writers capaces de interactuar con multiples blockchainss.

### Fase 2
Durante la primer semana de Agosto, la Mainnet se detuvo con el fin de habilitar el entorno de la Subnet para testeos. La Mainnet actual opera con 4 smart contracts y éste sistema se actualizó para incluir mas de 10 smart contracts. Éste entorno de desarrollo ha sido desplegado en la red de prueba Avalanche Fuji y se está sometiendo a pruebas internas.

## Flujo típico de trading

* Conectar tu wallet
* Depositar tokens desde la Mainnet
* Operar en la Subnet
* Retirar desde la Subnet

## Conceptos claves y diferencias

* Uno puede depositar un activo sólo estando conectado a la Mainnet. El deposito bloquea los activos del usuario en el PortfolioMain y deposita la misma cantidad en el PortfolioSub, todo en una transacción.

* Los usuarios tendrán dos wallets para cada cuenta: una en la Mainnet y otra en la Subnet, accesibles a través de aplicaciones de wallet soportadas como Core, MetaMask y los proveedores de WalletConnect. Mas wallets serán agregadas en el futuro.

* La wallet de la mainnet mantiene todos los activos en la Mainnet como antes, y los activos tienen que ser depositados en Dexalot para operar allí. Todas las funciones del bridge están integradas en las acciones de depósito y retiro.

* La wallet de la subnet mantiene solo $ALOT para los pagos del gas. Por eso, la wallet de la Subnet también se denomina “Gas Tank” (“Tanque de Gas” en español).

![gastank](/images/subnet/gastank.png)
* “Add Gas” transfiere ALOT desde el PortfolioSub a la wallet de la subnet.

* “Remove Gas” transfiere ALOT fdesde la wallet de la Subnet al PortfolioSub.
![subnetportfolio](/images/subnet/subnetportfolio.png)

* El ALOT disponible en el PortfolioSub transferido desde la wallet de la Mainnet o la wallet de la Subnet (“Gas Tank”) puede ser utilizado para operar o se retirado.

* El PortfolioSub monitorea los balances “Total” y “Available” (“disponibl” en español) de los activos del usuario sin crear ningun token ERC20s en la subnet. Éstos balances son actualizados cuando se utilizan las funciones de deposito, retiro o trading.

* Como no hay tokens ERC20 en la Subnet, sólo el balance de ALOT (balance “Gas Tank” balance) será visible en las wallets como Core o MetaMask cuando se conecta a la Subnet.

* Todas las operaciones realizan mientras se está conectado a la subnet.
Uno puede retirar un activo sólo cuando se está conectado a la Subnet. El retiro elimina la cantidad de tokens del PortfolioSub y desbloquea la misma cantidad del PortfolioMain, posteriormente transfiendo los activos retirados a la wallet Mainnet del usuario, todo en una transacción.

* Mas bridges adicionales se introducirán en el futuro, desplegando múltiples contratos de PortfolioMain para diferentes chains.

## Mapa vial

![roadmap](/images/subnet/roadmap.png)
Estate atento a los próximos anuncios, media, y artículos que te mostrarán como probar la nueva Dexalot Subnet!

---

Escritor: Brad McFall

Editor: Dan Marcoulis

Gráficos: Can Toygar

Traductores: Marian y Leandro
