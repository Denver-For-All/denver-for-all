---
---

## El Problema

Waymo está mapeando activamente las calles de Denver y planea lanzar un servicio de transporte sin conductor en 2026. Denver se convertirá en una de las primeras grandes ciudades en albergar vehículos totalmente autónomos (VA) en un estado con casi ningún marco regulatorio. La ley de Colorado de 2017 (SB 17-213) es una de las más permisivas del país: no se requiere permiso estatal para VA, no se exige la notificación de incidentes, no existen protocolos para primeros respondientes, no hay requisitos de transparencia de datos, y se prohíbe a los gobiernos locales imponer sus propias regulaciones sobre VA (Colorado Revised Statutes, Title 42, Article 4, Part 18).

Esto significa que Waymo puede desplegar cientos de vehículos sin conductor en las calles de Denver con:

- Ningún proceso de aprobación o permisos de la ciudad
- Ninguna obligación de reportar choques, casi-accidentes u obstrucciones de tráfico a Denver
- Ningún protocolo sobre cómo los VA interactúan con primeros respondientes, zonas de construcción o clima severo
- Ninguna protección de privacidad de datos para los millones de imágenes capturadas diariamente por las cámaras de los VA
- Ningún plan de transición laboral para los miles de conductores de Denver cuyos empleos están en riesgo
- Ningún requisito de integrarse con o apoyar el transporte público

El gobernador Polis vetó la HB 25-1122 en 2025, un proyecto de ley que habría requerido un operador humano en vehículos autónomos comerciales. Colorado es ahora posiblemente el entorno menos regulado de cualquier estado con despliegue activo de VA, menos regulado que Arizona, California o Texas (National Conference of State Legislatures, AV Legislation Database, 2025).

Los residentes de Denver están legítimamente preocupados. Los vehículos de Waymo en San Francisco han bloqueado intersecciones, interferido con respondientes de emergencia y se han agrupado en vecindarios residenciales tocando bocinas entre sí a las 4 AM (San Francisco Municipal Transportation Agency incident reports, 2023-2024). En Phoenix, un vehículo de Waymo atropelló a un ciclista en 2023. Austin ha documentado 122 incidentes relacionados con VA desde 2023 (Austin Transportation Department AV Dashboard, 2025). El clima invernal de Denver — hielo, nieve, visibilidad reducida — añade desafíos que ninguna flota de VA ha enfrentado a escala.

### Lo que Denver hace actualmente

Denver **no tiene regulaciones de vehículos autónomos, marco de permisos ni mecanismo de supervisión**. El estatuto de primacía estatal de Colorado (SB 17-213) prohíbe a los gobiernos locales imponer requisitos a los operadores de VA más allá de lo que exige la ley estatal, y la ley estatal no exige casi nada.

El Departamento de Transporte e Infraestructura de Denver (DOTI) no tiene un enlace de VA, ningún sistema de seguimiento de incidentes y ninguna coordinación formal con Waymo o cualquier otro operador de VA. La ciudad no ha realizado una evaluación de impacto público del despliegue de VA sobre los patrones de tráfico, la afluencia del transporte público, los mercados laborales o la calidad de vida de los vecindarios.

En contraste:

- **San Francisco** ha luchado por la autoridad local a través de demandas, defensa legislativa estatal y desarrollo de marcos modelo de permisos, a pesar de la primacía estatal de California sobre la regulación municipal directa.
- **Nueva York** permite solo 8 vehículos de prueba, requiere conductores de seguridad en todo momento, exige informes de datos regulares y requiere certificación de ciberseguridad (NYC Taxi & Limousine Commission, AV Rules, 2024).
- **Austin** mantiene un panel público de incidentes de VA que rastrea todos los incidentes reportados a pesar de carecer de autoridad regulatoria directa (Austin Transportation Department, 2025).

Denver no está haciendo nada de esto.

## Nuestra Solución

### La Ley de Responsabilidad de Vehículos Autónomos de Denver

#### 1. Respuesta de Emergencia y Estándares de Seguridad Pública

Basada en la AB 1777 de California (vigente a partir de julio de 2026), la ley de responsabilidad de VA más completa promulgada en cualquier estado:

- **Línea directa de respuesta de emergencia 24/7:** Los operadores de VA deben mantener una línea directa con personal para que los primeros respondientes de Denver se comuniquen cuando los VA obstruyan las operaciones de emergencia, no cedan el paso o estén involucrados en incidentes.
- **Dispositivos de comunicación bidireccional:** Cada VA que opere en Denver debe tener un mecanismo para que los primeros respondientes y las fuerzas del orden se comuniquen directamente con un operador remoto.
- **Cumplimiento de geocercas de emergencia:** Los operadores de VA deben cumplir dentro de 60 minutos con cualquier solicitud de geocerca de Denver OEM, Denver Fire o Denver Police durante emergencias, eventos climáticos severos, construcción mayor o grandes reuniones públicas. Los VA deben ser capaces de ser redirigidos remotamente fuera de las zonas de emergencia.
- **Autoridad de citación:** La aplicación de tráfico de Denver debe poder citar a los operadores de VA por infracciones de tráfico cometidas por vehículos autónomos, tal como citarían a un conductor humano.
- **Protocolos de clima invernal:** Los operadores de VA deben presentar políticas climáticas operacionales ante DOTI, incluyendo condiciones definidas (acumulación de nieve, hielo, visibilidad) bajo las cuales los VA cesarán o limitarán las operaciones. Los 245 días soleados de Denver son una ventaja, pero los 120 que no lo son requieren planificación.

#### 2. Informes de Incidentes y Transparencia

- **Informes de incidentes obligatorios:** Los operadores de VA deben reportar todos los choques, casi-accidentes, obstrucciones de tráfico que excedan 5 minutos e interacciones con primeros respondientes a DOTI dentro de 24 horas. Los informes deben incluir datos de sensores del VA, registros del operador remoto y datos de geolocalización.
- **Panel público de incidentes:** DOTI publica todos los datos de incidentes de VA en un panel público, actualizado semanalmente, siguiendo el modelo del rastreador de incidentes de VA de Austin.
- **Informes trimestrales de seguridad:** Los operadores de VA envían informes trimestrales a DOTI que incluyen: millas-vehículo totales recorridas, incidentes por milla, tasas de desconexión, tiempos de respuesta a solicitudes de geocercas de emergencia y datos de quejas.
- **Auditorías de seguridad independientes:** Auditorías anuales de seguridad por terceros de todos los operadores de VA, financiadas por tarifas del operador, con resultados publicados públicamente.

#### 3. Protecciones de Privacidad de Datos y Vigilancia

Las cámaras de VA capturan imágenes continuas de alta resolución de cada calle, acera y edificio por el que pasan. Una flota de 500 VA operando 12 horas al día crea una red de vigilancia generalizada a la que ningún residente de Denver consintió.

- **Minimización de datos:** Los operadores de VA pueden retener datos de cámaras y sensores sin procesar por no más de 72 horas, a menos que estén relacionados con un incidente específico bajo investigación.
- **Prohibición de venta de datos:** Los operadores de VA tienen prohibido vender, licenciar o compartir datos de cámaras, sensores o ubicación con terceros, incluidos corredores de datos y anunciantes.
- **Acceso de las fuerzas del orden solo mediante orden judicial:** La policía de Denver y cualquier otra agencia de aplicación de la ley pueden acceder a los datos de sensores de VA solo a través de una orden válida emitida por un tribunal. Sin solicitudes masivas de datos. Sin acuerdos permanentes. Sin acceso de ICE, consistente con las protecciones de ciudad santuario de Denver. (Ver: [Inmigración y Ciudad Santuario](/platform/immigration-sanctuary) y el precedente de las cámaras Flock en [Seguridad Comunitaria y Reforma Policial](/platform/public-safety).)
- **Prohibición del reconocimiento facial:** Los operadores de VA no pueden usar cámaras a bordo para reconocimiento facial, perfilado conductual o identificación de individuos, ya sea para los propios fines del operador o a solicitud de terceros.
- **Auditoría de privacidad anual:** Auditoría de privacidad independiente de las prácticas de datos de todos los operadores de VA, financiada por tarifas del operador, con resultados publicados públicamente.

#### 4. Transición Laboral y Protecciones para Trabajadores

Los vehículos autónomos amenazan los medios de vida de miles de trabajadores de Denver: conductores de transporte compartido, taxistas, conductores de entrega y operadores de vehículos comerciales. Ninguna ciudad en el país ha promulgado un programa integral de transición laboral para trabajadores desplazados por VA. Denver debería ser la primera.

- **Evaluación del Operador de VA:** Los operadores de transporte compartido y entrega de VA pagan una tarifa por viaje de $0.50-$1.00 en cada viaje autónomo completado en Denver, depositada en el Denver Driver Transition Fund.
- **Denver Driver Transition Fund:** Proporciona a los conductores desplazados:
  - Hasta 12 meses de apoyo de ingresos al 80% de los ingresos promedio anteriores
  - Programas gratuitos de reentrenamiento y certificación (conversión de CDL, mantenimiento de VE, operaciones de tránsito, gestión de flotas de VA)
  - Contratación prioritaria para puestos de la ciudad de Denver, operaciones de RTD y empleos de operadores de VA (monitoreo remoto, mantenimiento de flotas)
  - Continuación del seguro de salud durante la transición
- **Requisitos de contratación de operadores de VA:** Las empresas de VA que operan en Denver deben cubrir al menos el 30% de los puestos locales (operadores remotos, técnicos de flotas, servicio al cliente) del grupo de trabajadores de transporte desplazados.
- **Compromiso de cero pérdida neta de empleo:** Los operadores de VA deben presentar informes anuales de impacto laboral. Si el despliegue de VA causa pérdidas netas de empleo en el sector de transporte de Denver que excedan el 5% en cualquier año, la evaluación por viaje aumenta automáticamente para financiar apoyo de transición ampliado.

#### 5. Integración con el Transporte Público

Los VA deben complementar el sistema de transporte público de Denver, no socavarlo. En ciudades sin requisitos de integración, se ha demostrado que el transporte compartido (incluido el autónomo) reduce la afluencia del transporte público y aumenta las millas-vehículo recorridas (UC Davis Institute of Transportation Studies, 2020).

- **Zonas de prioridad para el tránsito:** En áreas dentro de media milla de las estaciones de tren de RTD y las rutas de autobús de alta frecuencia, el transporte compartido de VA se restringe a viajes que comienzan o terminan en una parada de tránsito (servicio de primera/última milla), no viajes directos punto a punto que compitan con el tránsito.
- **Integración con RTD:** Los operadores de VA deben ofrecer integración tarifaria fluida con RTD, permitiendo a los pasajeros usar un solo método de pago entre el tránsito y los servicios de VA.
- **Precio por congestión para VA:** Los vehículos autónomos que operan sin pasajeros (recorridos en vacío) están sujetos a una tarifa por milla en el centro de Denver y otras zonas de alto tráfico. Los VA vacíos circulando para evitar cargos de estacionamiento empeoran la congestión sin servir a nadie.
- **Asociación de microtránsito:** Los operadores de VA deben licitar en contratos de microtránsito de RTD (servicio estilo Denver Connector) en desiertos de tránsito como Montbello, Far Northeast y Green Valley Ranch antes de operar transporte compartido premium en áreas de alta demanda. Basado en la asociación Chandler, Arizona / Waymo / Via, que ofrece viajes de $1-2 con descuentos para personas mayores, personas con discapacidades y viajes gratuitos para estudiantes (City of Chandler, 2024).

#### 6. Requisitos de Accesibilidad

Los VA tienen el potencial de transformar la movilidad para los 61 millones de estadounidenses con discapacidades, pero solo si se diseñan para la inclusión desde el principio, no se adaptan como una ocurrencia tardía.

- **Vehículos accesibles para sillas de ruedas:** Al menos el 20% de cualquier flota de VA que opere en Denver debe ser accesible para sillas de ruedas desde el primer día de operaciones, aumentando al 50% dentro de 5 años.
- **Tecnología asistiva:** Todos los VA deben soportar navegación por audio, interfaces compatibles con braille y comunicación con pasajeros sordos, ciegos o con discapacidades cognitivas.
- **Cumplimiento de la ADA:** Cumplimiento total con la Americans with Disabilities Act, con auditorías de accesibilidad independientes realizadas por Denver.
- **Precios equitativos:** Los operadores de VA deben ofrecer tarifas reducidas para pasajeros con discapacidades, personas mayores de 65 años y hogares por debajo del 200% del nivel federal de pobreza, igualando o superando los niveles de descuento de RTD LiVE.

#### 7. Supervisión Democrática y Control Comunitario

- **Junta Asesora de VA de Denver:** Una junta designada por el concejo municipal que incluya representantes de: organizaciones vecinales (especialmente de vecindarios donde operarán los VA), organizaciones de derechos de personas con discapacidades, sindicatos (Teamsters, organizaciones de conductores de taxi/transporte compartido), defensores del transporte, grupos de privacidad/libertades civiles y personal de DOTI. La junta revisa todas las solicitudes de operadores de VA, monitorea los datos de seguridad y hace recomendaciones vinculantes sobre restricciones operacionales.
- **Consentimiento vecinal:** Antes de expandir las operaciones de VA a cualquier nuevo vecindario de Denver, los operadores deben celebrar una reunión pública con al menos 30 días de aviso, presentar datos de seguridad de las operaciones existentes y recibir aprobación de la Junta Asesora de VA. Sin despliegue por decreto.
- **Audiencia pública anual:** El concejo municipal celebra una audiencia pública anual sobre las operaciones de VA en Denver, con testimonio de la Junta Asesora de VA, operadores de VA, representantes laborales y miembros de la comunidad.

### Evidencia Internacional y Nacional: Cómo Otras Ciudades Manejan los VA

| Ciudad/Estado                  | Enfoque                                                                                                                                                                                     | Resultado                                                                                                                                        |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **California (AB 1777, 2026)** | Líneas directas de respuesta de emergencia, comunicación bidireccional, cumplimiento de geocercas, autoridad de citación, responsabilidad del fabricante por infracciones de tráfico de VA. | La ley de responsabilidad de VA más completa en cualquier estado de EE.UU. Establece el estándar para la integración de respuesta de emergencia. |
| **Nueva York**                 | Solo 8 vehículos de prueba permitidos. Conductor de seguridad requerido. Informes de datos regulares. Certificación de ciberseguridad. Permisos municipales estrictos.                      | Demuestra que el control local significativo es posible y que las empresas de VA cumplirán con requisitos estrictos.                             |
| **Chandler, AZ / Waymo / Via** | VA integrados en microtránsito público (Chandler Flex). $1-2/viaje. Descuentos para personas mayores y personas con discapacidades. Gratis para estudiantes.                                | Modelo líder para que los VA complementen en lugar de competir con el transporte público. Precios enfocados en la equidad.                       |
| **Austin, TX**                 | Panel público de incidentes de VA (122 incidentes desde 2023). Sin autoridad regulatoria directa debido a la primacía estatal, pero transparencia a través de la publicación de datos.      | Muestra que la transparencia es alcanzable incluso sin regulación directa.                                                                       |
| **Texas (SB 2807, 2025)**      | Se requiere autorización del DMV estatal. Dispositivos de grabación obligatorios. Planes de interacción con primeros respondientes requeridos.                                              | Pasó de casi cero regulación a requisitos significativos a nivel estatal.                                                                        |
| **Unión Europea**              | Regulación Marco de VA (EU 2022/1426) que requiere aprobación de tipo, certificación de ciberseguridad y registro de datos.                                                                 | Marco regulatorio a escala continental con estándares de seguridad obligatorios.                                                                 |

**El patrón es claro:** Las ciudades y estados que regulan proactivamente los VA obtienen mejores resultados que aquellos que permiten el despliegue sin regulación. Las empresas cumplen con los requisitos porque necesitan acceso a los mercados. La ventaja de Denver son sus más de 700,000 residentes y la creciente demanda de transporte compartido.

## Cómo lo Pagamos

Este es principalmente un marco regulatorio financiado por las empresas que se benefician de operar VA en las calles de Denver.

- **Tarifa de Permiso de Operador de VA:** $50,000-$100,000 de tarifa anual de permiso por operador, más $500/vehículo/año. Cubre la supervisión de DOTI, el panel de incidentes y las operaciones de la Junta Asesora de VA.
- **Evaluación por Viaje:** $0.50-$1.00 por viaje autónomo financia el Driver Transition Fund y los requisitos de integración con el tránsito.
- **Tarifa de Congestión:** Tarifa por milla para VA que recorren en vacío en zonas de alto tráfico genera ingresos para el tránsito y el mantenimiento de calles.
- **Tarifas de Auditoría de Privacidad y Seguridad:** Los operadores de VA financian auditorías independientes de sus prácticas de seguridad y datos.
- **Ingresos totales estimados:** $5-15M/año dependiendo del tamaño de la flota y el volumen de viajes, más que suficiente para financiar la supervisión de la ciudad y el Driver Transition Fund.
- **Costo neto para los contribuyentes de Denver:** Cero. Los operadores de VA pagan por el privilegio de usar las calles de Denver comercialmente.

## Preguntas Frecuentes

**"Colorado prohíbe la regulación local de VA. ¿Puede Denver hacer esto?"**
La primacía de Colorado (SB 17-213) es amplia pero no absoluta. La autoridad de autonomía municipal de Denver bajo la Constitución de Colorado (Artículo XX) proporciona un poder significativo para regular actividades dentro de los límites de la ciudad con fines de salud, seguridad y bienestar. La regulación del tráfico, los permisos para operaciones comerciales, la privacidad de datos y los estándares laborales son todas áreas donde Denver ha ejercido autoridad local. Algunas disposiciones (informes de incidentes, permisos) pueden requerir cambios legislativos estatales. Denver debería implementar lo que pueda ahora, abogar por la reforma estatal y desafiar la primacía donde sea necesario. San Francisco ha seguido exactamente esta estrategia en California.

**"¿No ahuyentará esto a las empresas de VA de Denver?"**
Waymo opera en San Francisco bajo el estricto marco regulatorio de California, incluyendo los requisitos de respuesta de emergencia de la AB 1777. Operan en Phoenix bajo requisitos estatales específicos para VA. Las empresas van donde están los clientes. La creciente población de Denver y la demanda de transporte compartido aseguran el acceso al mercado, y una regulación razonable hace que el despliegue sea más seguro y políticamente más sostenible para las propias empresas de VA. Un despliegue sin regulación que produce rechazo es peor para las empresas de VA que reglas claras.

**"¿No son los vehículos autónomos más seguros que los conductores humanos?"**
Las empresas de VA afirman que sus vehículos son más seguros por milla que los conductores humanos, pero los datos son limitados y autoinformados. Waymo publicó un estudio revisado por pares afirmando un 57% menos de choques con lesiones (Waymo Safety Report, 2023), pero la verificación independiente es difícil porque las empresas controlan los datos. Lo que sí sabemos: los VA en San Francisco han bloqueado camiones de bomberos, pasado sobre cables de energía caídos y entrado en concreto húmedo (SFMTA incident logs, 2023-2024). El hielo y la nieve de Denver presentan desafíos que ninguna flota de VA ha enfrentado a escala. Las afirmaciones de seguridad deben ser verificadas por auditorías independientes, no aceptadas por fe.

**"¿No reducirán los VA el tráfico y las emisiones?"**
Potencialmente, pero la evidencia es mixta. Estudios de UC Davis encontraron que el transporte compartido (incluidos Uber y Lyft) aumentó las millas-vehículo recorridas en un 85% en comparación con los viajes que reemplazaron, debido a los recorridos en vacío (conducir vacío entre viajes) y la demanda inducida (personas que toman viajes en auto en lugar de tránsito, caminar o andar en bicicleta) (Schaller Consulting, 2018; UC Davis ITS, 2020). Sin precios por congestión, integración con el tránsito y tarifas por recorridos en vacío, los VA podrían empeorar el tráfico y las emisiones, no mejorarlos.

**"¿Qué pasa con los empleos? ¿No es esto solo retrasar lo inevitable?"**
La automatización no es un desastre natural. Es una decisión política sobre quién se beneficia y quién asume los costos. Cuando Denver automatizó los parquímetros, no dejó a los asistentes de parquímetros en la indigencia — los transfirió a otros roles municipales. El Driver Transition Fund asegura que los trabajadores que construyeron la economía de transporte compartido y entrega de Denver no sean descartados cuando su trabajo sea automatizado. Cada transición tecnológica importante en la historia ha requerido políticas públicas para distribuir los beneficios de manera justa. Esto no es diferente.

**"Me preocupa que las cámaras de VA vigilen mi vecindario."**
Debería preocuparse. Una flota de 500 VA con cámaras de alta resolución operando más de 12 horas diarias crea una red de vigilancia más omnipresente que cualquier sistema de cámaras municipal. La experiencia de Denver con los lectores de placas Flock (más de 1,400 búsquedas de ICE sin conocimiento público) demuestra lo que sucede cuando la tecnología de vigilancia se despliega sin supervisión democrática. Nuestras disposiciones de privacidad de datos — límites de retención de 72 horas, requisitos de orden judicial, sin acceso de ICE, prohibición de reconocimiento facial — aplican las lecciones del fiasco de Flock a la vigilancia de VA antes de que sea demasiado tarde.

## Quién se Opone a Esto (y Por Qué)

- **Waymo (Alphabet/Google)** y otras empresas de VA prefieren operar con regulación mínima. Cabildean ante las legislaturas estatales por la primacía sobre la autoridad local y contra los requisitos de informes de incidentes.
- **El gobernador Polis** vetó la HB 25-1122 (requisito de operador humano) y ha señalado apoyo para una política permisiva de VA. La oficina del gobernador enmarca el despliegue de VA como desarrollo económico.
- **Los cabilderos de la industria tecnológica de Colorado** argumentan que la regulación ahuyentará a las empresas de VA a otros estados. La evidencia de California (el entorno regulatorio más estricto y el mayor mercado de VA) contradice esto.
- **Algunos defensores urbanistas/tecnológicos** argumentan que los VA reducirán la propiedad de autos y mejorarán la movilidad. Esto es posible pero no está garantizado sin los requisitos de integración y equidad de nuestra propuesta.

## Referencias

- Colorado SB 17-213. (2017). Concerning the Operation of Autonomous Vehicles. (Marco estatal de VA; disposiciones de primacía local.)
- Colorado HB 25-1122. (2025). Concerning Humans Operating Certain Motor Vehicles. (Vetado por el gobernador Polis.)
- California AB 1777. (2025, vigente julio 2026). Autonomous vehicles: emergency services. (Línea directa de respuesta de emergencia, geocercas, autoridad de citación, requisitos de comunicación bidireccional.)
- Texas SB 2807. (2025). Relating to the operation of automated motor vehicles. (Autorización estatal, dispositivos de grabación, planes para primeros respondientes.)
- NYC Taxi & Limousine Commission. (2024). Autonomous Vehicle Testing Rules. (Permisos, requisito de conductor de seguridad, informes de datos.)
- National Conference of State Legislatures. (2025). Autonomous Vehicles Legislation Database. (Comparación regulatoria de VA estado por estado.)
- Waymo. (2023). Waymo Safety Report: Collision Comparisons. (Datos de seguridad autoinformados; afirmación de 57% menos choques con lesiones.)
- San Francisco Municipal Transportation Agency. (2023-2024). AV Incident Reports. (Interferencia documentada de VA con respondientes de emergencia, obstrucciones de tráfico.)
- Austin Transportation Department. (2025). Autonomous Vehicle Incident Dashboard. (122 incidentes documentados.)
- City of Chandler, AZ. (2024). Chandler Flex Microtransit / Waymo Partnership. (Modelo de integración con tránsito; precios equitativos.)
- UC Davis Institute of Transportation Studies. (2020). "Disruptive Transportation: The Adoption, Utilization, and Impacts of Ride-Hailing in the United States." (Aumento de VMT por transporte compartido.)
- Schaller Consulting. (2018). "The New Automobility: Lyft, Uber and the Future of American Cities." (Estimación de aumento del 85% en VMT.)
- ACLU of Colorado. (2025). Preocupaciones de tecnología de vigilancia y privacidad de datos de VA. (Precedente de cámaras Flock para riesgos de vigilancia de VA.)
- Unión Europea. (2022). Regulation 2022/1426. Marco de seguridad general y aprobación de tipo de sistemas de conducción automatizada.
- Federal AV Accessibility Act (H.R. 7126). (2024). Requisitos propuestos de accesibilidad de VA para personas con discapacidades.
