Halcón Web App - Sistema de Gestión de Pedidos
📌 Descripción General
Halcón es una aplicación web diseñada para automatizar los procesos internos de un distribuidor de materiales de construcción. El sistema permite a los clientes consultar el estado de sus pedidos y a los empleados gestionar dichos pedidos a través de un panel administrativo.

🛠 Tecnologías Utilizadas
Backend: Node.js con Express

Base de Datos: MySQL (gestionada con Sequelize)

Autenticación: JWT (almacenado en cookie httpOnly)

Vistas: EJS

Control de Versiones: Git & GitHub

🔑 Características
Para Clientes
Seguimiento de Pedidos:
Los clientes pueden consultar el estado de sus pedidos ingresando el número de factura.

Para Empleados
Gestión de Pedidos:
Permite actualizar el estado de los pedidos a través de las siguientes etapas:

Ordered: Estado inicial al registrar el pedido.

In process: Actualizado por el área de Almacén cuando el pedido se prepara.

In route: Actualizado por Almacén (o Route) cuando el pedido sale a distribuirse.

Delivered: Actualizado por el personal de Ruta al confirmar la entrega, subiendo evidencia (imagen).

Panel Administrativo:

Gestión de usuarios con roles (Sales, Warehouse, Route, Purchasing).

Creación y edición de usuarios, con asignación de roles y estados (activo/inactivo).

Búsqueda y Filtros:
Permite buscar órdenes por número de factura, número de cliente, fecha o estado.

📥 Instalación y Configuración
Clonar el repositorio:
git clone https://github.com/Mapka21/halcon-webapp-ev.git
cd halcon-webapp-ev
Instalar las dependencias:
npm install
Configurar la base de datos:

Edita el archivo config/config.json y asegúrate de que los datos (usuario, contraseña, nombre de la base de datos, host y dialect) sean correctos para tu entorno.

Si la base de datos no existe, créala en MySQL (por ejemplo, usando MySQL Workbench o la línea de comandos).

Ejecutar migraciones:
npx sequelize-cli db:migrate

Ejecutar seeders:

Si encuentras errores, primero deshaz los seeders anteriores:
npx sequelize-cli db:seed:undo:all
Luego, ejecuta:
npx sequelize-cli db:seed:all
Iniciar el servidor:
npm start

Acceder a la aplicación:

Abre http://localhost:3000 en tu navegador.

🔐 Uso de la Aplicación
Vista Home
La vista principal permite buscar órdenes por número de factura.

Si el usuario no ha iniciado sesión, se muestra un formulario de login.

Si el usuario está autenticado, se muestra el Dashboard con enlaces a la gestión de usuarios y órdenes.

Autenticación
Login:
Envía un POST a /auth/login con:

email: Por ejemplo, admin@halcon.com

password: Por ejemplo, password123

Al iniciar sesión, el sistema guardará un token JWT en una cookie httpOnly y redirigirá a la vista Home con el Dashboard visible.

Funcionalidades Protegidas
Dashboard:
URL: /dashboard
Muestra una bienvenida y enlaces para gestionar usuarios y órdenes.

Gestión de Usuarios:
URL: /users
Permite listar, crear y editar usuarios (accesible solo para usuarios autenticados).

Gestión de Órdenes:
URL: /orders
Permite crear, actualizar, eliminar (lógicamente) y restaurar órdenes. Las actualizaciones de estado se restringen por roles:

Sales: Puede crear órdenes (status por defecto "Ordered").

Warehouse: Puede actualizar de Ordered a In process y de In process a In route.

Route: Puede actualizar de In route a Delivered y subir evidencia de entrega.

Búsqueda de Órdenes:
El formulario en Home permite buscar órdenes por número de factura y muestra los detalles si se encuentra alguna.

🧪 Flujo de Pruebas
Inicia sesión con las credenciales definidas en los seeders:

Admin User (Sales): admin@halcon.com / password123

También se incluyen usuarios para Warehouse, Route y Purchasing.

Prueba el flujo de órdenes:

Como Sales, crea una orden (se crea con estado "Ordered").

Como Warehouse, inicia sesión y actualiza la orden:

Cambia el estado de Ordered a In process y luego a In route.

Como Route, inicia sesión y actualiza la orden:

Cambia el estado de In route a Delivered, subiendo la evidencia correspondiente (URLs de imagen).

Verifica que las restricciones de roles se respeten. Si se intenta una acción no permitida, el sistema devolverá un error 403.

🔍 Consideraciones Técnicas
JWT y Cookies:
La autenticación se maneja mediante JWT, almacenado en una cookie httpOnly y validado en cada ruta protegida mediante el middleware auth.js.

Middleware de Roles:
Se utiliza un middleware personalizado (roleMiddleware.js) para asegurar que solo los roles autorizados puedan realizar determinadas operaciones.

Migraciones y Seeders:
Se emplean migraciones para crear la estructura de la base de datos y seeders para poblarla con datos de prueba, facilitando la verificación de la funcionalidad.

EJS:
Se utiliza como motor de plantillas para renderizar las vistas, permitiendo que una misma vista (por ejemplo, Home) muestre diferentes contenidos según si el usuario está autenticado o no.

📥 Instrucciones para Ejecutar
Instala las dependencias:
npm install
Configura la base de datos y ejecuta las migraciones y seeders:
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
Inicia el servidor:
npm start
Abre http://localhost:3000 para acceder a la aplicación.

Autor y Licencia
Autor: Marco Zavala Chapa

Matrícula: 2868251

Curso: Diseño de Aplicaciones Web

