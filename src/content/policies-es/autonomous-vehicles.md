---
---

## El Problema

Waymo está cartografiando activamente las calles de Denver y planea lanzar un servicio de transporte sin conductor en 2026. Denver se convertirá en una de las primeras grandes ciudades en albergar vehículos totalmente autónomos (AV, por sus siglas en inglés) en un estado que casi no cuenta con un marco regulatorio. La ley de Colorado de 2017 (SB 17-213) es una de las más permisivas del país: no se requiere un permiso estatal para AV, no se exige la notificación de incidentes, no existen protocolos para los servicios de emergencia, no existen requisitos de transparencia de datos y los gobiernos locales no pueden imponer sus propias regulaciones de AV (Estatutos Revisados de Colorado, Título 42, Artículo 4, Parte 18).

Esto significa que Waymo puede desplegar cientos de vehículos sin conductor en las calles de Denver con:

- Ningún proceso de aprobación o permisos de la ciudad
- Ninguna obligación de informar a Denver sobre choques, cuasi accidentes u obstrucciones de tráfico
- Ningún protocolo sobre cómo interactúan los AV con los servicios de emergencia, las zonas de construcción o las condiciones climáticas severas
- Ninguna protección de la privacidad de los datos para los millones de imágenes capturadas diariamente por las cámaras de los AV
- Ningún plan de transición laboral para los miles de conductores de Denver cuyos empleos están en riesgo
- Ningún requisito para integrarse o apoyar el transporte público

El gobernador Polis vetó la HB 25-1122 en 2025, un proyecto de ley que habría exigido un operador humano en los vehículos autónomos comerciales. Colorado es ahora posiblemente el entorno menos regulado de todos los estados con despliegue activo de AV, menos regulado que Arizona, California o Texas (Conferencia Nacional de Legislaturas Estatales, Base de Datos de Legislación de AV, 2025).

Los residentes de Denver están legítimamente preocupados. Los vehículos de Waymo en San Francisco han bloqueado intersecciones, interferido con los servicios de emergencia y se han agrupado en barrios residenciales tocando el claxon entre sí a las 4 de la madrugada (informes de incidentes de la Agencia de Transporte Municipal de San Francisco, 2023-2024). En Phoenix, un vehículo de Waymo atropelló a un ciclista en 2023. Austin ha documentado 122 incidentes relacionados con AV desde 2023 (Panel de Control de AV del Departamento de Transporte de Austin, 2025). El clima invernal de Denver (hielo, nieve, visibilidad reducida) añade desafíos que ninguna flota de AV ha enfrentado a gran escala.

### Lo que Denver Hace Actualmente

Denver **no tiene regulaciones de vehículos autónomos, marco de permisos ni mecanismo de supervisión**. El estatuto de preferencia de Colorado (SB 17-213) prohíbe a los gobiernos locales imponer requisitos a los operadores de AV más allá de lo que exige la ley estatal, y la ley estatal no exige casi nada.

El Departamento de Transporte e Infraestructura (DOTI, por sus siglas en inglés) de Denver no tiene un enlace de AV, ni un sistema de seguimiento de incidentes, ni una coordinación formal con Waymo ni con ningún otro operador de AV. La ciudad no ha llevado a cabo una evaluación del impacto público del despliegue de AV en los patrones de tráfico, el número de pasajeros del transporte público, los mercados laborales o la calidad de vida del vecindario.

Por el contrario:

- **San Francisco** ha luchado por la autoridad local a través de demandas judiciales, la defensa legislativa estatal y el desarrollo de marcos de permisos modelo, a pesar de la preferencia estatal de la regulación municipal directa de California.
- **Nueva York** permite sólo 8 vehículos de prueba, exige conductores de seguridad en todo momento, exige la presentación regular de informes de datos y exige la certificación de ciberseguridad (Comisión de Taxis y Limusinas de Nueva York, Normas de AV, 2024).
- **Austin** mantiene un panel de control público de incidentes de AV que rastrea todos los incidentes reportados a pesar de carecer de autoridad reguladora directa (Departamento de Transporte de Austin, 2025).

Denver no está haciendo nada de esto.

## Nuestra Solución

### La Ley de Responsabilidad de Vehículos Autónomos de Denver

#### 1. Estándares de Respuesta a Emergencias y Seguridad Pública

Inspirada en la AB 1777 de California (en vigor a partir de julio de 2026), la ley de responsabilidad de AV más completa promulgada en cualquier estado:

- **Línea directa de respuesta a emergencias 24/7:** Los operadores de AV deben mantener una línea directa con personal para que los servicios de emergencia de Denver se pongan en contacto cuando los AV obstruyan las operaciones de emergencia, no cedan el paso o estén involucrados en incidentes.
- **Dispositivos de comunicación bidireccional:** Cada AV que opere en Denver debe tener un mecanismo para que los servicios de emergencia y las fuerzas del orden se comuniquen directamente con un operador remoto.
- **Cumplimiento del geoperímetro de emergencia:** Los operadores de AV deben cumplir en un plazo de 60 minutos con cualquier solicitud de geoperímetro de la OEM de Denver, los Bomberos de Denver o la Policía de Denver durante emergencias, fenómenos meteorológicos graves, grandes obras o grandes concentraciones públicas. Los AV deben poder ser desviados a distancia de las zonas de emergencia.
- **Autoridad para emitir citaciones:** Las autoridades de tráfico de Denver deben poder citar a los operadores de AV por las infracciones de tráfico cometidas por los vehículos autónomos, al igual que citarían a un conductor humano.
- **Protocolos para el clima invernal:** Los operadores de AV deben presentar políticas meteorológicas operativas al DOTI, incluyendo las condiciones definidas (acumulación de nieve, hielo, visibilidad) en las que los AV cesarán o limitarán sus operaciones. Los 245 días soleados de Denver son una ventaja, pero los 120 que no lo son requieren planificación.

#### 2. Notificación de Incidentes y Transparencia

- **Notificación obligatoria de incidentes:** Los operadores de AV deben informar al DOTI en un plazo de 24 horas sobre todos los choques, cuasi accidentes, obstrucciones de tráfico que superen los 5 minutos e interacciones con los servicios de emergencia. Los informes deben incluir datos de los sensores de los AV, registros de los operadores remotos y datos de geolocalización.
- **Panel de control público de incidentes:** El DOTI publica todos los datos de los incidentes de AV en un panel de control público, actualizado semanalmente, siguiendo el modelo del rastreador de incidentes de AV de Austin.
- **Informes trimestrales de seguridad:** Los operadores de AV presentan informes trimestrales al DOTI que incluyen: el total de kilómetros recorridos por el vehículo, los incidentes por milla, las tasas de desconexión, los tiempos de respuesta a las solicitudes de geoperímetro de emergencia y los datos de las quejas.
- **Auditorías de seguridad independientes:** Auditorías de seguridad anuales de terceros de todos los operadores de AV, financiadas con las tarifas de los operadores, con los resultados publicados públicamente.

#### 3. Privacidad de Datos y Protección contra la Vigilancia

Las cámaras de los AV capturan imágenes continuas de alta resolución de cada calle, acera y edificio por los que pasan. Una flota de 500 AV que operan 12 horas al día crea una red de vigilancia generalizada a la que ningún residente de Denver consintió.

- **Minimización de datos:** Los operadores de AV no pueden conservar los datos brutos de las cámaras y los sensores durante más de 72 horas, a menos que estén relacionados con un incidente específico que se esté investigando.
- **Prohibición de venta de datos:** Los operadores de AV tienen prohibido vender, licenciar o compartir datos de cámaras, sensores o ubicación con terceros, incluyendo corredores de datos y anunciantes.
- **Acceso de las fuerzas del orden sólo con orden judicial:** La policía de Denver y cualquier otra agencia de aplicación de la ley puede acceder a los datos de los sensores de los AV sólo a través de una orden válida emitida por un tribunal. No se permiten solicitudes de datos masivos. No se permiten acuerdos permanentes. No se permite el acceso de ICE, de acuerdo con las protecciones de ciudad santuario de Denver. (Véase: [Inmigración y Ciudad Santuario](/platform/immigration-sanctuary) y el precedente de las cámaras Flock en [Seguridad Comunitaria y Reforma Policial](/platform/public-safety).)
- **Prohibición del reconocimiento facial:** Los operadores de AV no pueden utilizar las cámaras de a bordo para el reconocimiento facial, la creación de perfiles de comportamiento o la identificación de individuos, ya sea para los propios fines del operador o a petición de terceros.
- **Auditoría anual de privacidad:** Auditoría de privacidad independiente de las prácticas de datos de todos los operadores de AV, financiada con las tarifas de los operadores, con los resultados publicados públicamente.

#### 4. Transición Laboral y Protección de los Trabajadores

Los vehículos autónomos amenazan el sustento de miles de trabajadores de Denver: conductores de viajes compartidos, taxistas, conductores de reparto y operadores de vehículos comerciales. Ninguna ciudad del país ha promulgado un programa integral de transición laboral para los trabajadores desplazados por los AV. Denver debería ser la primera.

- **Evaluación del Operador de AV:** Los operadores de transporte y entrega de AV pagan una tarifa por viaje de $0.50-$1.00 por cada viaje autónomo completado en Denver, que se deposita en el Fondo de Transición para Conductores de Denver.
- **Fondo de Transición para Conductores de Denver:** Proporciona a los conductores desplazados:
  - Hasta 12 meses de apoyo a los ingresos al 80% de los ingresos medios anteriores
  - Programas gratuitos de readiestramiento y certificación (conversión de CDL, mantenimiento de vehículos eléctricos, operaciones de transporte público, gestión de flotas de AV)
  - Contratación prioritaria para puestos de la ciudad de Denver, operaciones de RTD y puestos de operador de AV (monitoreo remoto, mantenimiento de flotas)
  - Continuación del seguro médico durante la transición
- **Requisitos de contratación de operadores de AV:** Las empresas de AV que operan en Denver deben cubrir al menos el 30% de los puestos locales (operadores remotos, técnicos de flota, atención al cliente) con el grupo de trabajadores del transporte desplazados.
- **Compromiso de no pérdida neta de empleos:** Los operadores de AV deben presentar informes anuales sobre el impacto en el empleo. Si el despliegue de AV causa pérdidas netas de empleos en el sector del transporte de Denver que superen el 5% en cualquier año, la evaluación por viaje aumenta automáticamente para financiar un mayor apoyo a la transición.

#### 5. Integración del Transporte Público

Los AV deben complementar el sistema de transporte público de Denver, no socavarlo. En las ciudades sin requisitos de integración, se ha demostrado que el transporte compartido (incluido el autónomo) reduce el número de pasajeros del transporte público y aumenta los kilómetros recorridos por los vehículos (Instituto de Estudios del Transporte de la UC Davis, 2020).

- **Zonas prioritarias de transporte público:** En las zonas situadas a menos de media milla de las estaciones de tren de RTD y de las rutas de autobús de alta frecuencia, el transporte compartido de AV se limita a los viajes que comienzan o terminan en una parada de transporte público (servicio de primera/última milla), no a los viajes directos de punto a punto que compiten con el transporte público.
- **Integración con RTD:** Los operadores de AV deben ofrecer una integración perfecta de las tarifas con RTD, permitiendo a los pasajeros utilizar un único método de pago en los servicios de transporte público y AV.
- **Tarifas de congestión para los AV:** Los vehículos autónomos que circulan sin pasajeros (en vacío) están sujetos a una tarifa de congestión por milla en el centro de Denver y otras zonas de mucho tráfico. Los AV vacíos que circulan para evitar los cargos de estacionamiento empeoran la congestión sin servir a nadie.
- **Asociación de microtránsito:** Los operadores de AV deben pujar por los contratos de microtránsito de RTD (servicio de estilo Denver Connector) en desiertos de transporte público como Montbello, Far Northeast y Green Valley Ranch antes de operar el transporte de primera calidad en zonas de gran demanda. Siguiendo el modelo de la asociación Chandler, Arizona / Waymo / Via, que ofrece viajes de $1-2 con descuentos para personas mayores, personas con discapacidad y viajes gratuitos para estudiantes (Ciudad de Chandler, 2024).

#### 6. Requisitos de Accesibilidad

Los AV tienen el potencial de transformar la movilidad de los 61 millones de estadounidenses con discapacidades, pero sólo si están diseñados para la inclusión desde el principio, no readaptados a posteriori.

- **Vehículos accesibles para sillas de ruedas:** Al menos el 20% de cualquier flota de AV que opere en Denver debe ser accesible para sillas de ruedas desde el primer día de funcionamiento, aumentando al 50% en un plazo de 5 años.
- **Tecnología de asistencia:** Todos los AV deben ser compatibles con la navegación por audio, las interfaces compatibles con Braille y la comunicación con los pasajeros sordos, ciegos o con discapacidades cognitivas.
- **Cumplimiento de la ADA:** Cumplimiento total de la Ley para Estadounidenses con Discapacidades (ADA, por sus siglas en inglés), con Denver realizando auditorías de accesibilidad independientes.
- **Precios equitativos:** Los operadores de AV deben ofrecer tarifas reducidas para los pasajeros con discapacidades, las personas mayores de 65 años y los hogares por debajo del 200% del Nivel Federal de Pobreza (FPL, por sus siglas en inglés), igualando o superando los niveles de descuento de RTD LiVE.

#### 7. Supervisión Democrática y Control Comunitario

- **Junta Asesora de AV de Denver:** Una junta nombrada por el Concejo Municipal que incluye representantes de: organizaciones vecinales (especialmente de los barrios donde operarán los AV), organizaciones de defensa de los derechos de las personas con discapacidad, sindicatos (Teamsters, organizaciones de conductores de taxis/viajes compartidos), defensores del transporte público, grupos de defensa de la privacidad/libertades civiles y personal del DOTI. La junta revisa todas las solicitudes de los operadores de AV, supervisa los datos de seguridad y hace recomendaciones vinculantes sobre las restricciones operativas.
- **Consentimiento vecinal:** Antes de ampliar las operaciones de AV a cualquier nuevo barrio de Denver, los operadores deben celebrar una reunión pública con al menos 30 días de antelación, presentar los datos de seguridad de las operaciones existentes y recibir la aprobación de la Junta Asesora de AV. No al despliegue por decreto.
- **Audiencia pública anual:** El Concejo Municipal celebra una audiencia pública anual sobre las operaciones de AV en Denver, con testimonios de la Junta Asesora de AV, los operadores de AV, los representantes laborales y los miembros de la comunidad.

### Pruebas Internacionales y Nacionales: Cómo Otras Ciudades Están Manejando los AV

| Ciudad/Estado                     | Enfoque                                                                                                                                                    | Resultado                                                                                                               |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **California (AB 1777, 2026)** | Líneas directas de respuesta a emergencias, comunicación bidireccional, cumplimiento del geoperímetro, autoridad para emitir citaciones, responsabilidad del fabricante por las infracciones de tráfico de los AV. | La ley de responsabilidad de AV más completa de cualquier estado de EE.UU. Establece el estándar para la integración de la respuesta a emergencias. |
| **Nueva York**              | Sólo se permiten 8 vehículos de prueba. Se requiere un conductor de seguridad. Reporte regular de datos. Certificación de ciberseguridad. Permisos municipales estrictos.                   | Demuestra que el control local significativo es posible y que las empresas de AV cumplirán con los requisitos estrictos.      |
| **Chandler, AZ / Waymo / Via** | AV integrados en el microtránsito público (Chandler Flex). $1-2/viaje. Descuentos para personas mayores y personas con discapacidad. Gratis para estudiantes.                  | Modelo líder para que los AV complementen en lugar de competir con el transporte público. Precios centrados en la equidad.                   |
| **Austin, TX**                 | Panel de control público de incidentes de AV (122 incidentes desde 2023). Sin autoridad reguladora directa debido a la preferencia estatal, pero transparencia a través de la publicación de datos. | Muestra que la transparencia es alcanzable incluso sin regulación directa.                                                   |
| **Texas (SB 2807, 2025)**      | Se requiere la autorización del DMV estatal. Dispositivos de grabación obligatorios. Se requieren planes de interacción con los servicios de emergencia.                                                  | Pasó de una regulación casi nula a requisitos significativos a nivel estatal.                                                     |
| **Unión Europea**             | El Reglamento Marco de AV (EU 2022/1426) exige la homologación de tipo, la certificación de ciberseguridad y el registro de datos.                                             | Marco regulatorio a escala continental con normas de seguridad obligatorias.                                                         |

**El patrón es claro:** Las ciudades y los estados que regulan proactivamente los AV obtienen mejores resultados que los que permiten un despliegue no regulado. Las empresas cumplen con los requisitos porque necesitan acceder a los mercados. La influencia de Denver son sus más de 700,000 residentes y la creciente demanda de transporte compartido.

## Cómo Lo Financiamos

Se trata principalmente de un marco regulatorio financiado por las empresas que se benefician de la operación de AV en las calles de Denver.

- **Tarifa de Permiso de Operador de AV:** Tarifa de permiso anual de $50,000-$100,000 por operador, más $500/vehículo/año. Cubre la supervisión del DOTI, el panel de control de incidentes y las operaciones de la Junta Asesora de AV.
- **Evaluación por Viaje:** $0.50-$1.00 por viaje autónomo financia el Fondo de Transición para Conductores y los requisitos de integración del transporte público.
- **Tarifa de Congestión:** La tarifa por milla para los AV que circulan en vacío en zonas de mucho tráfico genera ingresos para el mantenimiento del transporte público y las carreteras.
- **Tarifas de Auditoría de Privacidad y Seguridad:** Los operadores de AV financian auditorías independientes de sus prácticas de seguridad y datos.
- **Ingresos totales estimados:** $5-15 millones/año, dependiendo del tamaño de la flota y el volumen de viajes, más que suficiente para financiar la supervisión de la ciudad y el Fondo de Transición para Conductores.
- **Costo neto para los contribuyentes de Denver:** Cero. Los operadores de AV pagan por el privilegio de utilizar las calles de Denver comercialmente.

## Preguntas Frecuentes

**"Colorado impide la regulación local de los AV. ¿Puede Denver hacer esto?"**
La preferencia de Colorado (SB 17-213) es amplia pero no absoluta. La autoridad de autogobierno de Denver en virtud de la Constitución de Colorado (Artículo XX) proporciona un poder significativo para regular las actividades dentro de los límites de la ciudad con fines de salud, seguridad y bienestar. La regulación del tráfico, los permisos para las operaciones comerciales, la privacidad de los datos y las normas laborales son áreas en las que Denver ha ejercido la autoridad local. Algunas disposiciones (notificación de incidentes, permisos) pueden requerir un cambio legislativo estatal. Denver debe implementar lo que pueda ahora, abogar por la reforma estatal y desafiar la preferencia cuando sea necesario. San Francisco ha seguido exactamente esta estrategia en California.

**"¿No ahuyentará esto a las empresas de AV de Denver?"**
Waymo opera en San Francisco bajo el estricto marco regulatorio de California, incluyendo los requisitos de respuesta a emergencias de la AB 1777. Operan en Phoenix bajo requisitos estatales específicos para los AV. Las empresas van donde están los clientes. La creciente población de Denver y la demanda de transporte compartido garantizan el acceso al mercado, y una regulación razonable hace que el despliegue sea más seguro y políticamente sostenible para las propias empresas de AV. Un despliegue no regulado que produce una reacción negativa es peor para las empresas de AV que unas normas claras.

**"¿No son los vehículos autónomos más seguros que los conductores humanos?"**
Las empresas de AV afirman que sus vehículos son más seguros por milla que los conductores humanos, pero los datos son limitados y auto declarados. Waymo publicó un estudio revisado por pares que afirma que hay un 57% menos de choques que causan lesiones (Informe de seguridad de Waymo, 2023), pero la verificación independiente es difícil porque las empresas controlan los datos. Lo que sí sabemos: los AV en San Francisco han bloqueado camiones de bomberos, han pasado por encima de cables de electricidad caídos y han conducido hacia hormigón húmedo (registros de incidentes de la SFMTA, 2023-2024). El hielo y la nieve de Denver presentan desafíos en los que ninguna flota de AV ha operado a gran escala. Las afirmaciones de seguridad deben ser verificadas por auditorías independientes, no dadas por sentadas.

**"¿No reducirán los AV el tráfico y las emisiones?"**
Potencialmente, pero la evidencia es mixta. Los estudios de la UC Davis encontraron que el transporte compartido (incluyendo Uber y Lyft) aumentó los kilómetros recorridos por los vehículos en un 85% en comparación con los viajes que reemplazaron, debido a la circulación en vacío (conducción vacía entre las tarifas) y la demanda inducida (personas que toman viajes en coche en lugar de transporte público, caminar o andar en bicicleta) (Schaller Consulting, 2018; UC Davis ITS, 2020). Sin tarifas de congestión, integración del transporte público y tarifas por circulación en vacío, los AV podrían empeorar el tráfico y las emisiones, no mejorarlos.

**"¿Qué pasa con los empleos? ¿No es esto sólo retrasar lo inevitable?"**
La automatización no es un desastre natural. Es una decisión política sobre quién se beneficia y quién asume los costos. Cuando Denver automatizó los parquímetros, no dejó a los encargados de los parquímetros en la miseria, sino que los trasladó a otros puestos de la ciudad. El Fondo de Transición para Conductores garantiza que los trabajadores que construyeron la economía de transporte compartido y entrega de Denver no sean descartados cuando su trabajo sea automatizado. Cada gran transición tecnológica en la historia ha requerido una política pública para distribuir los beneficios de manera justa. Esto no es diferente.

**"Me preocupa que las cámaras de los AV vigilen mi barrio."**
Debería estarlo. Una flota de 500 AV con cámaras de alta resolución que operan más de 12 horas diarias crea una red de vigilancia más generalizada que cualquier sistema de cámaras de la ciudad. La experiencia de Denver con los lectores de matrículas Flock (más de 1,400 búsquedas de ICE sin conocimiento público) demuestra lo que sucede cuando la tecnología de vigilancia se despliega sin supervisión democrática. Nuestras disposiciones sobre privacidad de datos (límites de retención de 72 horas, requisitos de orden judicial, no acceso de ICE, prohibición del reconocimiento facial) aplican las lecciones del desastre de Flock a la vigilancia de AV antes de que sea demasiado tarde.

## Quién Se Opone A Esto (y Por Qué)

- **Waymo (Alphabet/Google)** y otras empresas de AV prefieren operar con una regulación mínima. Presionan a las legislaturas estatales para que prefieran la autoridad local y contra los requisitos de notificación de incidentes.
- **El gobernador Polis** vetó la HB 25-1122 (requisito de operador humano) y ha señalado su apoyo a una política permisiva de AV. La oficina del gobernador considera que el despliegue de AV es un desarrollo económico.
- **Los grupos de presión de la industria tecnológica de Colorado** argumentan que la regulación llevará a las empresas de AV a otros estados. La evidencia de California (el entorno regulatorio más estricto y el mercado de AV más grande) contradice esto.
- **Algunos defensores del urbanismo y la tecnología** argumentan que los AV reducirán la propiedad de automóviles y mejorarán la movilidad. Esto es posible, pero no está garantizado sin los requisitos de integración y equidad de nuestra propuesta.

## Referencias

- Colorado SB 17-213. (2017). Relativo al Funcionamiento de Vehículos Autónomos. (Marco estatal de AV; disposiciones de preferencia local).
- Colorado HB 25-1122. (2025). Relativo a los Seres Humanos que Operan Ciertos Vehículos de Motor. (Vetada por el gobernador Polis.)
- California AB 1777. (2025, en vigor a partir de julio de 2026). Vehículos autónomos: servicios de emergencia. (Línea directa de respuesta a emergencias, geoperímetro, autoridad para emitir citaciones, requisitos de comunicación bidireccional).
- Texas SB 2807. (2025). Relativo al funcionamiento de vehículos de motor automatizados. (Autorización estatal, dispositivos de grabación, planes de respuesta a emergencias).
- Comisión de Taxis y Limusinas de Nueva York. (2024). Normas de prueba de vehículos autónomos. (Permisos, requisito de conductor de seguridad, notificación de datos).
- Conferencia Nacional de Legislaturas Estatales. (2025). Base de Datos de Legislación de Vehículos Autónomos. (Comparación de la regulación de los AV por estados).
- Waymo. (2023). Informe de Seguridad de Waymo: Comparaciones de Colisiones. (Datos de seguridad auto reportados; reclamación de un 57% menos de choques que causan lesiones).
- Agencia de Transporte Municipal de San Francisco. (2023-2024). Informes de Incidentes de AV. (Interferencia documentada de los AV con los servicios de emergencia, obstrucciones de tráfico).
- Departamento de Transporte de Austin. (2025). Panel de Control de Incidentes de Vehículos Autónomos. (122 incidentes documentados).
- Ciudad de Chandler, AZ. (2024). Asociación de Microtránsito Chandler Flex / Waymo. (Modelo de integración del transporte público; precios equitativos).
- Instituto de Estudios del Transporte de la UC Davis. (2020). "Transporte disruptivo: La adopción, utilización e impactos del transporte compartido en los Estados Unidos." (Aumento de VMT por el transporte compartido).
- Schaller Consulting. (2018). "La Nueva Automovilidad: Lyft, Uber y el Futuro de las Ciudades Americanas". (Estimación de un aumento del 85% del VMT).
- ACLU de Colorado. (2025). Tecnología de vigilancia y preocupaciones sobre la privacidad de los datos de los AV. (Precedente de la cámara Flock para los riesgos de la vigilancia de los AV).
- Unión Europea. (2022). Reglamento 2022/1426. Marco de homologación de tipo de seguridad general y sistemas de conducción automatizada.
- Ley Federal de Accesibilidad de los AV (H.R. 7126). (2024). Requisitos propuestos para la accesibilidad de los AV para las personas con discapacidad.
