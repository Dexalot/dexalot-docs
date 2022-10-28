---
editLink: true
---

# Dexalot Discovery

## Donde ningún DEX ha llegado antes

![discoverybanner](/images/discovery/discoverybanner.png)

* Los IDO funcionan bien, pero lanzar tokens en AMMs simplemente no.
* Los AMMs no tienen funcionalidad de orden límite, el control de slippage o deslizamiento no es suficiente.
* Los bots y MEV están arruinando a los usuarios durante los lanzamientos.
* Dexalot presenta **Dexalot Discovery** para solucionar éstos problemas.
* **Dexalot Discovery** soportará ordenes límite.
* **Dexalot Discovery** prevendrá que los bots excluyan a los usuarios.
* **Dexalot Discovery** dará a los usuarios tiempo suficiente para ingresar ordenes y emperejarlas.
* **Dexalot Discovery** creará un proceso de descubrimiento de precios mas ordenado y justo.
* Una vez que se descubre el precio de un nuevo activo, el listado en los AMM debería volverse mas seguro!

**Piensas que lo anterior es genial? Pues entonces, continúa leyendo!**

Una de las principios rectores que Dexalot adopta es la mejora continua en los resultados de la comunidad. En el curso de los últimos meses, la comunidad ha sufrido una gran cantidad de ineficiencias durante los listados de tokens de nuevos proyectos, lo que ha llevado a resultados perjudiciales para la mayoría de los usuarios y sólo ha beneficiado a un pequeño grupo con ventajas especiales (por ejemplo, bots, personas con grandes nodos, etc.). Dexalot desea ayudar a solucionar esos problemas.

Un gran problema que los usuarios continuamente sufren es la maliciosa acción de precio que ocurre durante el listado de varios IDOs (listados de tokens de nuevos proyectos para intercambiar).

[Avalaunch](https://avalaunch.app/) (y otros) literalmente pavimentaron el camino para una novedosa y justa distribución de la asignación de proyectos para un grupo más grande de personas. Ellos incluso han implementado algoritmos sofisticados para mitigar el efecto “ballena”, donde un solo participante grande terminaba con una gran cantidad de la distribución. Ahora existen otras plataformas de IDO que hacen su parte para ayudar a que los proyectos del ecosistema recauden capital y asimismo están implementando ideas para minimizar los efectos de los malos actores. [Dexalot](https://dexalot.com/) se ha asociado con Avalaunch y cree firmemente en sus valores y sus capacidades.

Si bien el proceso de recaudación de capital del pre-mercado funciona bien, el problema comienza cuando los proyectos completan su recaudación de capital y llega el momento de listarlos.

## Éstos son, a grandes rasgos, los problemas que sabemos que existen cuando los IDOs son listados:

* Los IDOs generalmente son lanzados en plataformas AMM, tales como Uniswap, las cuales abren para intercambiar en un momento específico (funcionalidad de simple transacción), lo cual crea una situación en la que la velocidad importa.

* Si ampliamos el concepto de velocidad, podrán ver que quien logra la primer ejecución cuando el token es listado, obtiene el mejor precio, porque todos terminan compitiendo para comprar al mismo tiempo. Efectivamente, ésto incentiva a la gente a encontrar el mejor modo para ser los primeros o al menos para llegar tan temprano como sea posible.

* Lo primero y más simple para hacer es escribir un programa que automáticamente envíe las transacciones apropiadas para comprar. Ésto es útil porque supera al factor humano de los movimientos del mouse, los clicks del mouse, las aprobaciones de las transacciones y la lentitud que usualmente causa la interacción con una wallet del usuario. Éstas acciones están en el orden de unos pocos segundos, pero si intentas ser el primero, aún es importante.

* Lo segundo y mas nefasto para hacer, es utilizar una superficie de ataque MEV (Miner Extractable Value), si tienes un nodo lo suficientemente grande (tal como lo discutió aquí Emin Gun Sirer). A grandes rasgos, el mecanismo de consenso de Avalanche funciona por nodos que consultan a otros nodos para arribar a una respuesta final. Cada nodo elige otro nodo para consultar usando un calculo probabilístico. Las probabilidades son calculadas en base al peso de la inversión o stake de los nodos, y en efecto si tu tienes un nodo que tenga una inversión o stake suficientemente grande, serás preguntado mas que otros en promedio respecto “tu opinión” sobre que transacción debería ser la primera.

* Poniendo ésta información en acción, si tienes un nodo suficientemente grande y sabes como priorizar tus transacciones, tendrás una buena chance de ser preguntado acerca de “tu opinión” cuando se liste el IDO y tendrás la oportunidad de poner primero tu propia transacción (una orden de compra). Ésto es bastante intensivo en capital, por supuesto, pero si has participado en la venta original de Avalanche, sabes que los tokens han sido vendidos a un precio significativamente diferente al que están hoy. En segundo lugar, si sabes que un proyecto tiene una cantidad razonable de demanda por parte del mercado, es realmente lucrativo tomar una primera participación de los tokens tan pronto como llegan al mercado y luego darse vuelta y venderlos a otros posibles compradores una vez que las solicitudes de sus transacciones comienzan a llegar.

* Los usuarios que usan AMMs, para comprar proyectos recientemente listados tienen que definir un % de slippage o deslizamiento (cuanta tolerancia en el precio aceptan cuando hacen el intercambio) en lugar del precio real al que les gustaría comprar los tokens.

* En razón que el tiempo del listado del IDO usualmente termina siendo muy competitivo (porque todos los usuarios están en una carrera para comprar lo antes posible), la mayoría de los usuarios son forzados a tener grandes porcentajes de slippage o deslizamiento, puesto que es muy difícil definir que número necesitan para asegurar transacciones eficientes y efectivas. Generalmente, los usuarios tienen que elegir números grandes para que sus órdenes sean ejecutadas.

* El resultado neto es que los usuarios minoristas que son “lentos” en sus transacciones, que sufren latencias relativamente grandes asociadas con el uso de billeteras como Metamask, tienen que ajustar % de slippage o deslizamiento muy grande para que sus ordenes sean ejecutadas. Sin embargo, los usuarios que utilizan automatizaciones y tienen conocimientos sobre como sacar ventaja de las mecánicas de consenso, tienen una ventaja considerable para para ganar dinero sin necesariamente tener la intención de invertir en ningún proyecto.

## Dexalot presenta Dexalot Discovery para igualar el campo de juego.

**Dexalot Discovery** tiene como objetivo solucionar los problemas antes descriptos mediante la creación de un proceso justo por el cual los usuarios y el mercado en general puedan descubrir el precio apropiado de los tokens recientemente listados sin preocuparse por la velocidad o los bots.

**Dexalot Discovery** incorpora algunas de las lecciones clave aprendidas de proyectos exitosos del ecosistema e implementará el siguiente proceso para que los proyectos listen sus tokens de manera justa y transparente en Dexalot:

1. Un proyecto trabaja y se integra con Dexalot; crea la opción para depositar tokens del proyecto en Dexalot y esa opción se habilita en un número pre-definido de horas antes que las reclamaciones o claims estén disponibles (ejemplo, 8 horas). Los retiros de Dexalot se desactivarán para el token del proyecto.

2. Avalaunch coordina con Dexalot para la integración; crea la opción de depositar tokens del proyecto en Dexalot y esa opción se habilita en un número pre-definido de horas ates de que reclamaciones o claims estén disponibles (ejemplo 8 horas). Los retiros de Dexalot se desctivarán para el token del proyecto.

3. El libro de ordenes de Dexalot empieza en modo “no-emparejado” (“no match”), un modo en que los usuarios que depositaron el contra activo (AVAX o USDT) pueden colocar ordenes límite de COMPRA (BUY) para el token y los usuarios que depositaron el token del proyecto pueden colocar ordenes límite de VENTA (SELL). Todas las ordenes son mostradas a la comunidad de forma transparente y continua.

4. Los usuarios tienen la capacidad de cancelar y reemplazar ordenes durante el período pre-definido (ejemplo, 8 horas). Los vendedores deben tener depositados los tokens para vender, pero los compradores pueden colocar órdenes de compra mientras hayan depositado la cantidad correcta del contra activo.

5. Al final del período de aceptación de órdenes, la aceptación de órdenes se detendrá y Dexalot entra en modo de “emparejamiento” (“matching”) en el cuál las ordenes límite de compra y venta se emparejan y el precio inicial del activo es descubierto (las entradas ocurren a precios para los que los usuarios tuvieron 8 horas a fin de decidir y colocar órdenes límite).

6. Una vez completado el emparejamiento de las ordenes, el libro de ordenes entra en modo “normal”. En ésta etapa, Avalaunch, el Proyecto and Dexalot, todos se coordinan para habilitar el reclamo y retiro (claim/withdraw) para los compradores del token.

7. Cualquier Proyecto participante puede ahora utilizar sus asignaciones de liquidez para crear pools de liquidez si eligen hacerlo en varios AMMs con el precio descubierto y continuar cotizando en Dexalot.

## Conclusión

En essencia, Dexalot puede utilizar su capacidad de CLOB (Central Limit Order Book) con algunas mejoras para igualar las oportunidades para que cualquiera obtenga una porción de un proyecto en particular. Los usuarios deberían tener un amplio tiempo para presentar sus mejores ofertas (similar a como uno se registra por una IDO en Avalaunch). No deben preocuparse por ser adelantados por bots o gente que conoce más sobre las características técnicas de como funciona la plataforma Avalanche. En definitiva, los usuarios obtendrán un mejor resultado al participar del ecosistema de ésta forma. Dexalot también entiende que es extremadamente difícil construir una estupenda aplicación descentralizada en el ambiente en que operamos hoy. Nos gustaría al menos hacer mas fácil la parte del listado para todos los equipos de estrellas que están construyendo nuevos y estupendos productos para el ecosistema de Avalanche.

Si bien Dexalot tiene como objetivo mitigar la mayor cantidad posible de actividades nefastas mediante el proceso antes descripto, sabemos que actualizar nuestra implementación de mitigación es una batalla que debemos dar a futuro porque el espacio está en permanente evolución. Dexalot tiene la intención de evaluar, monitorear y mejorar continuamente éste proceso a medida que más datos son recopilados y más proyectos son listados.

El proceso antes descripto es producto de muchas discusiones con adalides del ecosistema. Sin embargo, Dexalot sabe que hay gente allí afuera que puede mejorarlo aún mas. Si eres una de esas personas que tiene una brillante idea para mejorar aun mas **Dexalot Discovery** para el usuario final, por favor no dudes en comunicarte con nosotros mediante Twitter, Telegram o nuestro recientemente creado Discord.

**Nos vemos pronto, anon!**

**Donde ningún DEX ha llegado antes!**

---

Autor: FireStorm

Editor: Brad McFall

Graficos: Can Toygar

Traductores: Marian y Leandro
