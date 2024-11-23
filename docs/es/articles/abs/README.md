---
editLink: true
---

# Asset Balance Snapshot de Dexalot

![abs1](/images/abs/abs1.png)

[Dexalot](https://dexalot.com/) es un DEX con libro de ordenes central, dual-chain y non-custodial,impulsado por [la tecnología subnet de Avalanche](https://www.avax.network/). La siguiente etapa en el desarrollo del ciclo de vida de Dexalot continúa continúa con el lanzamiento de la arquitectura de software, optimizada para la velocidad, seguridad y experiencia. El lanzamiento de la subnet de Dexalot incluirá una función integrada de captura instantánea del saldos de activos (ABS, de su nombre en inglés: “Asset Balance Snapshot”), que crea una prueba inmutable de la instantánea de tus saldos de activos.

Ésta característica excepcional realiza una rápida y fácil verificación del saldo de los activos de un usuario, escribiendo periódicamente la información de los activos en la subnet de Dexalot en una estructura de datos denominada **Merkle Tree**. Una vez escrito, el ABS es independiente de la disponibilidad de la subnet de Dexalot, incrementando así la seguridad. La recuperación del estado de tus activos en la C-Chain de la mainnet de Avalanche es posible con el ABS, si fuera necesario por alguna razón. ¡Experimenta y disfruta otra innovación pionera de primera clase de Dexalot!

---

## Como utilizarlo:

- Conecta tur wallet a <https://app.dexalot-test.com/asset_balance_snapshot>.
- Selecciona un token que poseas.
- Obtén datos seguros sobre el saldo de tus activos on-chain.

## ABS proporciona:

- Transparencia de los saldos de tus activos que interactúan con Dexalot.
- Posibilidad de que cualquiera confirme los activos de forma. independiente.
- Serie de datos temporales inmutable del saldo de activos para su análisis en caso de ser necesario.

---

Aquí hay un breve video que muestra como conectar tu wallet y obtener el saldo de cualquier activo que poseas.

<https://youtu.be/IEuRCxOJ20k>

![abs2](/images/abs/abs2.png)

## Sé dueño de tu ABS:

Si estás interesado en verificar manualmente tus propios saldos de activos, puedes usar [Merkletreejs](https://www.npmjs.com/package/merkletreejs) (una librería Javascript). Puedes utilizar ésta librería para simplificar los siguientes [pasos](https://app.dexalot.com/asset_balance_snapshot):

- Obtén el saldo de merkle tree desde [IPFS](https://ipfs.dexalot.com/ipfs/bafkreifjvfqxxar2upv5ab42ewy327g6hcdswq5imrhpa3wgdtoki47auq).
- Obtén el saldo de Merkle tree desde [S3](https://merkletree.dexalot.com/ALOT-1732324905.json).
- Verificar el root utilizando el tree.
- Verificar tu leaf hash utilizando el algoritmokeccak256 de Solidity desde tu leaf index, tu wallet address, y tu saldo de activos utilizando el tree.
- Verificar las pruebas de tus leaf hash utilizando el root y el tree.
- Validar tus leaf hash utilizando la combinación inmutable de root, proofs, y leaf utilizando el tree.

---
**Author**: Brad McFall

**Editor**: Dan Marcoulis

**Graphics**: Can Toygar
