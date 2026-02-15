---
---

## El Problema

Waymo está mapeando activamente las calles de Denver y planea lanzar un servicio de transporte sin conductor en 2026. Denver se convertirá en una de las primeras ciudades importantes en albergar vehículos totalmente autónomos (VA) en un estado con casi ningún marco regulatorio. La ley de Colorado de 2017 (SB 17-213) es una de las más permisivas del país: no se requiere un permiso estatal para VA, no se exige la notificación de incidentes, no existen protocolos para los servicios de emergencia, no existen requisitos de transparencia de datos y los gobiernos locales tienen prohibido imponer sus propias regulaciones sobre VA (Estatutos Revisados de Colorado, Título 42, Artículo 4, Parte 18).

Esto significa que Waymo puede desplegar cientos de vehículos sin conductor en las calles de Denver con:

- Ningún proceso de aprobación o permisos de la ciudad
- Ninguna obligación de informar a Denver sobre choques, cuasi accidentes u obstrucciones de tráfico
- Ningún protocolo sobre cómo los VA interactúan con los servicios de emergencia, las zonas de construcción o las condiciones climáticas severas
- Ninguna protección de la privacidad de los datos para los millones de imágenes capturadas diariamente por las cámaras de los VA
- Ningún plan de transición laboral para los miles de conductores de Denver cuyos trabajos están en riesgo
- Ningún requisito para integrarse o apoyar el transporte público

El Gobernador Polis vetó la HB 25-1122 en 2025, un proyecto de ley que habría requerido un operador humano en vehículos autónomos comerciales. Colorado es ahora posiblemente el entorno menos regulado de cualquier estado con despliegue activo de VA, menos regulado que Arizona, California o Texas (Conferencia Nacional de Legislaturas Estatales, Base de Datos de Legislación de VA, 2025).

Los residentes de Denver están justamente preocupados. Los vehículos de Waymo en San Francisco han bloqueado intersecciones, interferido con los servicios de emergencia y se han agrupado en vecindarios residenciales tocando el claxon entre sí a las 4 de la mañana (Informes de incidentes de la Agencia de Transporte Municipal de San Francisco, 2023-2024). En Phoenix, un vehículo de Waymo atropelló a un ciclista en 2023. Austin ha documentado 122 incidentes relacionados con VA desde 2023 (Panel de Control de VA del Departamento de Transporte de Austin, 2025). El clima invernal de Denver (hielo, nieve, visibilidad reducida) añade desafíos en los que ninguna flota de VA ha operado a gran escala.

### Lo Que Denver Hace Actualmente

Denver **no tiene regulaciones de vehículos autónomos, marco de permisos o mecanismo de supervisión**. El estatuto de preferencia de Colorado (SB 17-213) prohíbe a los gobiernos locales imponer requisitos a los operadores de VA más allá de lo que exige la ley estatal, y la ley estatal no exige casi nada.

El Departamento de Transporte e Infraestructura (DOTI) de Denver no tiene un enlace de VA, ningún sistema de seguimiento de incidentes y ninguna coordinación formal con Waymo o cualquier otro operador de VA. La ciudad no ha realizado una evaluación del impacto público del despliegue de VA en los patrones de tráfico, el número de pasajeros del transporte público, los mercados laborales o la calidad de vida del vecindario.

Por el contrario:

- **San Francisco** ha luchado por la autoridad local a través de demandas judiciales, promoción legislativa estatal y desarrollo de marcos de permisos modelo, a pesar de la preferencia estatal de la regulación municipal directa de California.
- **Nueva York** permite solo 8 vehículos de prueba, requiere conductores de seguridad en todo momento, exige informes de datos periódicos y requiere certificación de ciberseguridad (Reglas de VA de la Comisión de Taxis y Limusinas de Nueva York, 2024).
- **Austin** mantiene un panel de control público de incidentes de VA que rastrea todos los incidentes reportados a pesar de carecer de autoridad reguladora directa (Departamento de Transporte de Austin, 2025).

Denver no está haciendo ninguna de estas cosas.

## Nuestra Solución

### La Ley de Responsabilidad de Vehículos Autónomos de Denver

#### 1. Estándares de Respuesta de Emergencia y Seguridad Pública

Basado en la AB 1777 de California (vigente a partir de julio de 2026), la ley de responsabilidad de VA más completa promulgada en cualquier estado:

- **Línea directa de respuesta de emergencia 24/7:** Los operadores de VA deben mantener una línea directa con personal para que los servicios de emergencia de Denver se pongan en contacto cuando los VA obstruyan las operaciones de emergencia, no cedan el paso o estén involucrados en incidentes.
- **Dispositivos de comunicación bidireccional:** Cada VA que opere en Denver debe tener un mecanismo para que los servicios de emergencia y las fuerzas del orden se comuniquen directamente con un operador remoto.
- **Cumplimiento del geocercado de emergencia:** Los operadores de VA deben cumplir en un plazo de 60 minutos con cualquier solicitud de geocercado de la Oficina de Gestión de Emergencias de Denver (OEM), el Departamento de Bomberos de Denver o la Policía de Denver durante emergencias, eventos climáticos severos, construcciones importantes o grandes reuniones públicas. Los VA deben poder ser desviados remotamente de las zonas de emergencia.
- **Autoridad de citación:** La policía de tránsito de Denver debe poder citar a los operadores de VA por las infracciones de tráfico cometidas por vehículos autónomos, tal como lo harían con un conductor humano.
- **Protocolos para clima invernal:** Los operadores de VA deben presentar políticas operativas sobre el clima ante el DOTI, incluidas las condiciones definidas (acumulación de nieve, hielo, visibilidad) en las que los VA cesarán o limitarán sus operaciones. Los 245 días soleados de Denver son una ventaja, pero los 120 que no lo son requieren planificación.

#### 2. Reporte de Incidentes y Transparencia

- **Reporte obligatorio de incidentes:** Los operadores de VA deben reportar todos los choques, cuasi accidentes, obstrucciones de tráfico que excedan los 5 minutos e interacciones con los servicios de emergencia al DOTI dentro de las 24 horas. Los informes deben incluir datos de los sensores del VA, registros del operador remoto y datos de geolocalización.
- **Panel de control público de incidentes:** El DOTI publica todos los datos de incidentes de VA en un panel de control público, actualizado semanalmente, siguiendo el modelo del rastreador de incidentes de VA de Austin.
- **Informes trimestrales de seguridad:** Los operadores de VA deben presentar informes trimestrales al DOTI que incluyan: el total de millas recorridas por el vehículo, los incidentes por milla, las tasas de desconexión, los tiempos de respuesta a las solicitudes de geocercado de emergencia y los datos de las quejas.
- **Auditorías de seguridad independientes:** Auditorías de seguridad anuales de terceros de todos los operadores de VA, financiadas con las tarifas de los operadores, con resultados publicados públicamente.

#### 3. Privacidad de Datos y Protecciones de Vigilancia

Las cámaras de los VA capturan imágenes continuas de alta resolución de cada calle, acera y edificio por el que pasan. Una flota de 500 VA que operan 12 horas al día crea una red de vigilancia generalizada a la que ningún residente de Denver ha dado su consentimiento.

- **Minimización de datos:** Los operadores de VA no pueden conservar los datos brutos de las cámaras y los sensores durante más de 72 horas, a menos que estén relacionados con un incidente específico bajo investigación.
- **Prohibición de venta de datos:** Los operadores de VA tienen prohibido vender, licenciar o compartir datos de cámaras, sensores o ubicación con terceros, incluidos los corredores de datos y los anunciantes.
- **Acceso de las fuerzas del orden solo con orden judicial:** La policía de Denver y cualquier otra agencia de aplicación de la ley puede acceder a los datos de los sensores de los VA solo a través de una orden judicial válida emitida por un tribunal. No se permiten solicitudes de datos masivos. No se permiten acuerdos permanentes. No se permite el acceso al Servicio de Inmigración y Control de Aduanas (ICE), de acuerdo con las protecciones de ciudad santuario de Denver. (Véase: [Inmigración y Ciudad Santuario](/platform/immigration-sanctuary) y el precedente de la cámara Flock en [Seguridad Comunitaria y Reforma Policial](/platform/public-safety).)
- **Prohibición del reconocimiento facial:** Los operadores de VA no pueden utilizar las cámaras a bordo para el reconocimiento facial, la creación de perfiles de comportamiento o la identificación de personas, ya sea para los propios fines del operador o a petición de terceros.
- **Auditoría anual de privacidad:** Auditoría de privacidad independiente de las prácticas de datos de todos los operadores de VA, financiada con las tarifas de los operadores, con resultados publicados públicamente.

#### 4. Transición Laboral y Protección de los Trabajadores

Los vehículos autónomos amenazan el sustento de miles de trabajadores de Denver: conductores de viajes compartidos, taxistas, conductores de reparto y operadores de vehículos comerciales. Ninguna ciudad del país ha promulgado un programa integral de transición laboral para los trabajadores desplazados por los VA. Denver debería ser la primera.

- **Evaluación del operador de VA:** Los operadores de transporte de pasajeros y reparto de VA pagan una tarifa por viaje de $0.50-$1.00 por cada viaje autónomo completado en Denver, que se deposita en el Fondo de Transición para Conductores de Denver.
- **Fondo de Transición para Conductores de Denver:** Proporciona a los conductores desplazados:
  - Hasta 12 meses de apoyo a los ingresos al 80% de las ganancias promedio anteriores
  - Programas gratuitos de reciclaje y certificación (conversión de CDL, mantenimiento de vehículos eléctricos, operaciones de tránsito, gestión de flotas de VA)
  - Contratación prioritaria para puestos en la ciudad de Denver, operaciones de RTD y trabajos de operador de VA (monitoreo remoto, mantenimiento de flotas)
  - Continuación del seguro médico durante la transición
- **Requisitos de contratación del operador de VA:** Las empresas de VA que operan en Denver deben cubrir al menos el 30% de los puestos locales (operadores remotos, técnicos de flota, servicio al cliente) con el grupo de trabajadores del transporte desplazados.
- **Compromiso de no pérdida neta de empleos:** Los operadores de VA deben presentar informes anuales sobre el impacto en el empleo. Si el despliegue de VA causa pérdidas netas de empleos en el sector del transporte de Denver que excedan el 5% en cualquier año, la evaluación por viaje aumenta automáticamente para financiar un mayor apoyo a la transición.

#### 5. Integración del Transporte Público

Los VA deben complementar el sistema de transporte público de Denver, no socavarlo. En las ciudades sin requisitos de integración, se ha demostrado que el transporte de pasajeros (incluido el autónomo) reduce el número de pasajeros del transporte público y aumenta las millas recorridas por los vehículos (Instituto de Estudios del Transporte de la UC Davis, 2020).

- **Zonas prioritarias para el transporte público:** En las zonas situadas a menos de media milla de las estaciones de tren de RTD y de las rutas de autobús de alta frecuencia, el transporte de pasajeros de VA se limita a los viajes que comienzan o terminan en una parada de transporte público (servicio de primera/última milla), no a los viajes directos de punto a punto que compiten con el transporte público.
- **Integración de RTD:** Los operadores de VA deben ofrecer una integración perfecta de las tarifas con RTD, permitiendo a los pasajeros utilizar un único método de pago en los servicios de transporte público y VA.
- **Tarifas de congestión para los VA:** Los vehículos autónomos que operan sin pasajeros (recorrido en vacío) están sujetos a una tarifa de congestión por milla en el centro de Denver y otras zonas de mucho tráfico. Los VA vacíos que dan vueltas para evitar los cargos de estacionamiento empeoran la congestión sin servir a nadie.
- **Asociación de microtránsito:** Los operadores de VA deben ofertar en los contratos de microtránsito de RTD (servicio estilo Denver Connector) en desiertos de transporte público como Montbello, el extremo noreste y Green Valley Ranch antes de operar el transporte de pasajeros premium en áreas de alta demanda. Siguiendo el modelo de la asociación Chandler, Arizona / Waymo / Via, que ofrece viajes de $1-2 con descuentos para personas mayores, personas con discapacidades y viajes gratuitos para estudiantes (Ciudad de Chandler, 2024).

#### 6. Requisitos de Accesibilidad

Los VA tienen el potencial de transformar la movilidad de los 61 millones de estadounidenses con discapacidades, pero solo si están diseñados para la inclusión desde el principio, no readaptados a posteriori.

- **Vehículos accesibles para sillas de ruedas:** Al menos el 20% de cualquier flota de VA que opere en Denver debe ser accesible para sillas de ruedas desde el primer día de operaciones, aumentando al 50% en un plazo de 5 años.
- **Tecnología de asistencia:** Todos los VA deben ser compatibles con la navegación por audio, las interfaces compatibles con braille y la comunicación con los pasajeros sordos, ciegos o con discapacidades cognitivas.
- **Cumplimiento de la ADA:** Cumplimiento total de la Ley para Estadounidenses con Discapacidades (ADA), con Denver realizando auditorías de accesibilidad independientes.
- **Precios equitativos:** Los operadores de VA deben ofrecer tarifas reducidas para los pasajeros con discapacidades, las personas mayores de 65 años y los hogares por debajo del 200% del Nivel Federal de Pobreza (FPL), igualando o superando los niveles de descuento de RTD LiVE.

#### 7. Supervisión Democrática y Control Comunitario

- **Junta Asesora de VA de Denver:** Una junta nombrada por el Concejo Municipal que incluye representantes de: organizaciones vecinales (especialmente de los vecindarios donde operarán los VA), organizaciones de derechos de las personas con discapacidades, sindicatos (Teamsters, organizaciones de conductores de taxis/viajes compartidos), defensores del transporte público, grupos de privacidad/libertades civiles y personal del DOTI. La junta revisa todas las solicitudes de los operadores de VA, monitorea los datos de seguridad y hace recomendaciones vinculantes sobre las restricciones operativas.
- **Consentimiento del vecindario:** Antes de expandir las operaciones de VA a cualquier nuevo vecindario de Denver, los operadores deben celebrar una reunión pública con al menos 30 días de anticipación, presentar los datos de seguridad de las operaciones existentes y recibir la aprobación de la Junta Asesora de VA. No al despliegue por decreto.
- **Audiencia pública anual:** El Concejo Municipal celebra una audiencia pública anual sobre las operaciones de VA en Denver, con el testimonio de la Junta Asesora de VA, los operadores de VA, los representantes sindicales y los miembros de la comunidad.

### Evidencia Internacional y Nacional: Cómo Otras Ciudades Están Manejando los VA

| Ciudad/Estado                      | Enfoque                                                                                                                                                     | Resultado                                                                                                                |
| :------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| **California (AB 1777, 2026)** | Líneas directas de respuesta de emergencia, comunicación bidireccional, cumplimiento del geocercado, autoridad de citación, responsabilidad del fabricante por las infracciones de tráfico de los VA. | La ley de responsabilidad de VA más completa de cualquier estado de EE. UU. Establece el estándar para la integración de la respuesta de emergencia. |
| **Nueva York**                   | Solo se permiten 8 vehículos de prueba. Se requiere un conductor de seguridad. Reporte de datos periódico. Certificación de ciberseguridad. Permisos municipales estrictos.                      | Demuestra que es posible un control local significativo y que las empresas de VA cumplirán con requisitos estrictos.               |
| **Chandler, AZ / Waymo / Via** | VA integrados en el microtránsito público (Chandler Flex). $1-2 por viaje. Descuentos para personas mayores y personas con discapacidades. Gratis para estudiantes.                                | Modelo líder para que los VA complementen en lugar de competir con el transporte público. Precios centrados en la equidad.             |
| **Austin, TX**                   | Panel de control público de incidentes de VA (122 incidentes desde 2023). Sin autoridad reguladora directa debido a la preferencia estatal, pero transparencia a través de la publicación de datos. | Muestra que la transparencia es alcanzable incluso sin regulación directa.                                                           |
| **Texas (SB 2807, 2025)**        | Se requiere autorización del DMV estatal. Dispositivos de grabación obligatorios. Se requieren planes de interacción con los servicios de emergencia.                                                      | Pasó de una regulación casi nula a requisitos significativos a nivel estatal.                                                           |
| **Unión Europea**                | El Reglamento Marco de VA (EU 2022/1426) exige la homologación de tipo, la certificación de ciberseguridad y el registro de datos.                                                                        | Marco regulatorio a escala continental con normas de seguridad obligatorias.                                                           |

**El patrón es claro:** Las ciudades y los estados que regulan proactivamente los VA obtienen mejores resultados que aquellos que permiten el despliegue no regulado. Las empresas cumplen con los requisitos porque necesitan acceso a los mercados. La influencia de Denver son sus más de 700,000 residentes y la creciente demanda de transporte de pasajeros.

## Cómo Lo Financiamos

Se trata principalmente de un marco regulatorio financiado por las empresas que se benefician de la operación de VA en las calles de Denver.

- **Tarifa de Permiso del Operador de VA:** Tarifa de permiso anual de $50,000-$100,000 por operador, más $500/vehículo/año. Cubre la supervisión del DOTI, el panel de control de incidentes y las operaciones de la Junta Asesora de VA.
- **Evaluación Por Viaje:** $0.50-$1.00 por viaje autónomo financia el Fondo de Transición para Conductores y los requisitos de integración del transporte público.
- **Tarifa de Congestión:** La tarifa por milla para los VA que recorren en vacío en zonas de mucho tráfico genera ingresos para el mantenimiento del transporte público y las carreteras.
- **Tarifas de Auditoría de Privacidad y Seguridad:** Los operadores de VA financian auditorías independientes de sus prácticas de seguridad y datos.
- **Ingresos totales estimados:** $5-15 millones/año dependiendo del tamaño de la flota y el volumen de viajes, más que suficiente para financiar la supervisión de la ciudad y el Fondo de Transición para Conductores.
- **Costo neto para los contribuyentes de Denver:** Cero. Los operadores de VA pagan por el privilegio de utilizar las calles de Denver comercialmente.

## Preguntas Frecuentes

**"Colorado impide la regulación local de los VA. ¿Puede Denver hacer esto?"**
La preferencia de Colorado (SB 17-213) es amplia, pero no absoluta. La autoridad de autonomía de Denver en virtud de la Constitución de Colorado (Artículo XX) proporciona un poder significativo para regular las actividades dentro de los límites de la ciudad con fines de salud, seguridad y bienestar. La regulación del tráfico, la concesión de permisos para operaciones comerciales, la privacidad de los datos y las normas laborales son áreas en las que Denver ha ejercido la autoridad local. Algunas disposiciones (reporte de incidentes, permisos) pueden requerir un cambio legislativo estatal. Denver debería implementar lo que pueda ahora, abogar por la reforma estatal y desafiar la preferencia cuando sea necesario. San Francisco ha seguido exactamente esta estrategia en California.

**"¿Esto no ahuyentará a las empresas de VA de Denver?"**
Waymo opera en San Francisco bajo el estricto marco regulatorio de California, incluidos los requisitos de respuesta de emergencia de la AB 1777. Operan en Phoenix bajo los requisitos estatales específicos para VA. Las empresas van donde están los clientes. La creciente población de Denver y la demanda de transporte de pasajeros garantizan el acceso al mercado, y una regulación razonable hace que el despliegue sea más seguro y políticamente sostenible para las propias empresas de VA. El despliegue no regulado que produce reacciones negativas es peor para las empresas de VA que las reglas claras.

**"¿No son los vehículos autónomos más seguros que los conductores humanos?"**
Las empresas de VA afirman que sus vehículos son más seguros por milla que los conductores humanos, pero los datos son limitados y auto reportados. Waymo publicó un estudio revisado por pares que afirmaba que había un 57% menos de choques que causaban lesiones (Informe de seguridad de Waymo, 2023), pero la verificación independiente es difícil porque las empresas controlan los datos. Lo que sí sabemos: los VA en San Francisco han bloqueado camiones de bomberos, atropellado líneas eléctricas caídas y conducido hacia concreto húmedo (Registros de incidentes de SFMTA, 2023-2024). El hielo y la nieve de Denver presentan desafíos en los que ninguna flota de VA ha operado a gran escala. Las afirmaciones de seguridad deben ser verificadas por auditorías independientes, no dadas por sentadas.

**"¿No reducirán los VA el tráfico y las emisiones?"**
Potencialmente, pero la evidencia es mixta. Los estudios de la UC Davis encontraron que el transporte de pasajeros (incluidos Uber y Lyft) aumentó las millas recorridas por los vehículos en un 85% en comparación con los viajes que reemplazaron, debido al recorrido en vacío (conducción vacía entre tarifas) y la demanda inducida (personas que realizan viajes en automóvil en lugar de transporte público, caminar o andar en bicicleta) (Schaller Consulting, 2018; UC Davis ITS, 2020). Sin precios de congestión, integración del transporte público y tarifas por recorrido en vacío, los VA podrían empeorar el tráfico y las emisiones, no mejorarlas.

**"¿Qué pasa con los trabajos? ¿No es esto solo retrasar lo inevitable?"**
La automatización no es un desastre natural. Es una elección de política sobre quién se beneficia y quién asume los costos. Cuando Denver automatizó los parquímetros, no dejó a los asistentes de los parquímetros en la indigencia, sino que los transfirió a otros puestos de la ciudad. El Fondo de Transición para Conductores garantiza que los trabajadores que construyeron la economía de transporte de pasajeros y reparto de Denver no sean descartados cuando su trabajo se automatice. Cada transición tecnológica importante en la historia ha requerido una política pública para distribuir los beneficios de manera justa. Esto no es diferente.

**"Me preocupa que las cámaras de los VA vigilen mi vecindario."**
Debería estarlo. Una flota de 500 VA con cámaras de alta resolución que operan más de 12 horas diarias crea una red de vigilancia más generalizada que cualquier sistema de cámaras de la ciudad. La experiencia de Denver con los lectores de matrículas Flock (más de 1,400 búsquedas de ICE sin conocimiento público) demuestra lo que sucede cuando la tecnología de vigilancia se despliega sin supervisión democrática. Nuestras disposiciones sobre privacidad de datos (límites de retención de 72 horas, requisitos de orden judicial, no acceso al ICE, prohibición del reconocimiento facial) aplican las lecciones del desastre de Flock a la vigilancia de VA antes de que sea demasiado tarde.

## Quién Se Opone a Esto (y Por Qué)

- **Waymo (Alphabet/Google)** y otras empresas de VA prefieren operar con una regulación mínima. Cabildean en las legislaturas estatales para la preferencia de la autoridad local y en contra de los requisitos de reporte de incidentes.
- **El Gobernador Polis** vetó la HB 25-1122 (requisito de operador humano) y ha señalado su apoyo a una política de VA permisiva. La oficina del gobernador enmarca el despliegue de VA como desarrollo económico.
- **Los lobistas de la industria tecnológica de Colorado** argumentan que la regulación hará que las empresas de VA se trasladen a otros estados. La evidencia de California (el entorno regulatorio más estricto y el mercado de VA más grande) contradice esto.
- **Algunos defensores urbanistas/tecnológicos** argumentan que los VA reducirán la propiedad de automóviles y mejorarán la movilidad. Esto es posible, pero no está garantizado sin los requisitos de integración y equidad de nuestra propuesta.

## Referencias

- Colorado SB 17-213. (2017). Relativo al Funcionamiento de Vehículos Autónomos. (Marco estatal de VA; disposiciones de preferencia local).
- Colorado HB 25-1122. (2025). Relativo a los Humanos que Operan Ciertos Vehículos Motorizados. (Veto del Gobernador Polis.)
- California AB 1777. (2025, vigente a partir de julio de 2026). Vehículos autónomos: servicios de emergencia. (Línea directa de respuesta de emergencia, geocercado, autoridad de citación, requisitos de comunicación bidireccional.)
- Texas SB 2807. (2025). Relativo al funcionamiento de vehículos motorizados automatizados. (Autorización estatal, dispositivos de grabación, planes de respuesta a los servicios de emergencia).
- Comisión de Taxis y Limusinas de Nueva York (NYC Taxi & Limousine Commission). (2024). Normas para las Pruebas de Vehículos Autónomos (Autonomous Vehicle Testing Rules). (Permisos, requisito de conductor de seguridad, reporte de datos).
- Conferencia Nacional de Legislaturas Estatales (National Conference of State Legislatures). (2025). Base de Datos de Legislación sobre Vehículos Autónomos (Autonomous Vehicles Legislation Database). (Comparación de la regulación de VA estado por estado).
- Waymo. (2023). Informe de Seguridad de Waymo: Comparaciones de Colisiones (Waymo Safety Report: Collision Comparisons). (Datos de seguridad auto reportados; afirmación de un 57% menos de choques que causan lesiones).
- Agencia de Transporte Municipal de San Francisco (San Francisco Municipal Transportation Agency). (2023-2024). Informes de Incidentes de VA (AV Incident Reports). (Interferencia documentada de los VA con los servicios de emergencia, obstrucciones de tráfico).
- Departamento de Transporte de Austin (Austin Transportation Department). (2025). Panel de Control de Incidentes de Vehículos Autónomos (Autonomous Vehicle Incident Dashboard). (122 incidentes documentados).
- Ciudad de Chandler, AZ. (2024). Asociación de Microtránsito Chandler Flex / Waymo (Chandler Flex Microtransit / Waymo Partnership). (Modelo de integración del transporte público; precios equitativos).
- Instituto de Estudios del Transporte de la UC Davis (UC Davis Institute of Transportation Studies). (2020). "Transporte Disruptivo: La Adopción, Utilización e Impactos del Transporte de Pasajeros en los Estados Unidos" ("Disruptive Transportation: The Adoption, Utilization, and Impacts of Ride-Hailing in the United States"). (Aumento de VMT por el transporte de pasajeros).
- Schaller Consulting. (2018). "La Nueva Automovilidad: Lyft, Uber y el Futuro de las Ciudades Estadounidenses" ("The New Automobility: Lyft, Uber and the Future of American Cities"). (Estimación del aumento del 85% de VMT).
- ACLU de Colorado. (2025). Tecnología de vigilancia y preocupaciones sobre la privacidad de los datos de VA. (Precedente de la cámara Flock para los riesgos de la vigilancia de VA).
- Unión Europea. (2022). Reglamento 2022/1426. Marco de homologación de tipo de seguridad general y sistemas de conducción automatizada.
- Ley Federal de Accesibilidad de VA (H.R. 7126). (2024). Requisitos propuestos para la accesibilidad de los VA para las personas con discapacidades.