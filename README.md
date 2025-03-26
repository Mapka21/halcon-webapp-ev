Halcon Webapp
Esta es una aplicación web para el distribuidor de materiales Halcon, desarrollada con Node.js, Express, Sequelize (MySQL), JWT y EJS. La aplicación automatiza el flujo de pedidos y la gestión de usuarios, cumpliendo con los siguientes requerimientos:

Búsqueda de órdenes: La vista principal (Home) permite buscar órdenes por número de factura.

Gestión de órdenes: Se pueden crear, actualizar (cambiando estados), eliminar (lógicamente) y restaurar órdenes.

Gestión de usuarios: Se pueden crear y editar usuarios, asignándoles roles (Sales, Warehouse, Route, Purchasing).

Roles y permisos:

Sales puede crear órdenes (status por defecto "Ordered").

Warehouse puede actualizar el estado de las órdenes (de Ordered a In process y de In process a In route).

Route es el único rol autorizado para pasar la orden de In route a Delivered, subiendo la evidencia de entrega.

Purchasing (y otros roles) pueden visualizar la información pero no modificarla, según la configuración.

Autenticación: Se utiliza JWT para la autenticación. El token se guarda en una cookie httpOnly, y se valida en las rutas protegidas mediante un middleware personalizado que además verifica el rol del usuario.

Vistas: Se utilizan plantillas EJS para renderizar las vistas:

Home: Vista pública con el formulario de búsqueda y, dependiendo de si el usuario está autenticado, se muestra el formulario de login o el dashboard con enlaces a la gestión de usuarios y órdenes.

Dashboard: Pantalla de bienvenida y acceso a las demás funcionalidades protegidas.

Users & Orders: Vistas para listar, crear, editar y gestionar los usuarios y órdenes (accesibles solo a usuarios autenticados).

Estructura del Proyecto
bash
Copiar
Editar
halcon-webapp/
├── app.js
├── package.json
├── config/
│   └── config.json          # Configuración de la base de datos
├── controllers/
│   ├── authController.js    # Lógica de autenticación y login
│   ├── orderController.js   # Lógica para gestionar órdenes (CRUD, búsquedas, actualización de estado)
│   └── userController.js    # Lógica para gestionar usuarios
├── migrations/              # Migraciones de Sequelize
│   ├── 202503200001-create-user.js
│   └── 202503200002-create-order.js
├── middleware/
│   ├── auth.js              # Middleware para validar JWT (busca token en header o cookie)
│   └── roleMiddleware.js    # Middleware para validar que el usuario tenga el rol permitido para la acción
├── routes/
│   ├── authRoutes.js        # Rutas de autenticación (login)
│   ├── dashboard.js         # Ruta para el dashboard (vista protegida)
│   ├── orderRoutes.js       # Rutas para la gestión de órdenes (búsqueda, creación, actualización, eliminación, restauración)
│   └── userRoutes.js        # Rutas para la gestión de usuarios (listar, crear, editar)
├── seeders/                 # Seeders para poblar la base de datos con datos de prueba
│   ├── 202503200003-demo-users.js
│   └── 202503200004-demo-orders.js
└── views/
    ├── dashboard.ejs        # Vista del Dashboard (para usuarios autenticados)
    ├── home.ejs             # Vista principal pública: búsqueda de órdenes e inicio de sesión
    ├── orderView.ejs        # Detalle de una orden y formulario para actualizar estado/evidencias
    ├── orders.ejs           # Listado y creación de órdenes
    ├── ordersArchived.ejs   # Órdenes archivadas y opción para restaurar
    ├── users.ejs            # Lista de usuarios y creación de nuevos usuarios
    └── userEdit.ejs         # Formulario para editar los datos de un usuario
Instalación y Configuración
Clonar el repositorio:

bash
Copiar
Editar
git clone https://github.com/Mapka21/halcon-webapp-ev.git
cd halcon-webapp-ev
Instalar las dependencias:

bash
Copiar
Editar
npm install
Configurar la base de datos:

Edita el archivo config/config.json y verifica que los datos (usuario, contraseña, nombre de la base de datos, host y dialect) sean correctos para tu entorno.

Si la base de datos no existe, créala en MySQL (por ejemplo, usando MySQL Workbench o línea de comandos).

Ejecutar migraciones:

bash
Copiar
Editar
npx sequelize-cli db:migrate
Ejecutar seeders:

Si encuentras errores, primero deshaz los seeders anteriores:

bash
Copiar
Editar
npx sequelize-cli db:seed:undo:all
Luego, ejecuta:

bash
Copiar
Editar
npx sequelize-cli db:seed:all
Uso de la Aplicación
Acceso a la Vista Home
URL: http://localhost:3000
En esta vista, verás:

Un formulario para buscar órdenes por número de factura.

Si el usuario no está autenticado, se mostrará el formulario de login.

Si el usuario ya inició sesión, se mostrarán los enlaces al Dashboard y a la gestión de Usuarios y Órdenes.

Autenticación
Login:
Envía un POST a /auth/login con los campos:

email: (por ejemplo, admin@halcon.com)

password: (por ejemplo, password123)

Al iniciar sesión, el sistema guardará un token JWT en una cookie httpOnly y redirigirá a la vista Home, donde se mostrará el Dashboard.

Funcionalidades Protegidas
Dashboard:
URL: /dashboard
Muestra una bienvenida y enlaces para gestionar usuarios y órdenes.

Gestión de Usuarios:
URL: /users
Permite listar, crear y editar usuarios. Solo es accesible a usuarios autenticados.

Gestión de Órdenes:
URL: /orders
Permite crear, actualizar, eliminar (lógicamente) y restaurar órdenes. Las actualizaciones de estado están protegidas según el rol:

Sales: Puede crear órdenes.

Warehouse: Puede actualizar el estado de "Ordered" a "In process" y de "In process" a "In route".

Route: Puede actualizar el estado de "In route" a "Delivered" y subir evidencia de entrega.

Búsqueda de Órdenes:
El formulario en la vista Home permite buscar órdenes por el número de factura y muestra detalles si se encuentra alguna.

Flujo de Pruebas
Inicia sesión con las credenciales de ejemplo definidas en los seeders:

Admin User (Sales): admin@halcon.com / password123

También se incluyen usuarios de Warehouse, Route y Purchasing para probar roles.

Prueba el flujo de órdenes:

Como Sales, crea una orden (la orden se crea con estado "Ordered").

Como Warehouse, inicia sesión y actualiza la orden:

Cambia el estado de Ordered a In process y luego a In route.

Como Route, inicia sesión y actualiza la orden:

Cambia el estado de In route a Delivered, subiendo la evidencia correspondiente (URLs de imagen).

Verifica que las restricciones de roles se respeten (por ejemplo, si intentas actualizar la orden a un estado no permitido para tu rol, recibirás un error 403).

Consideraciones Técnicas
JWT y Cookies:
La autenticación se maneja mediante JWT. El token se almacena en una cookie httpOnly y se valida en cada ruta protegida.

Middleware de Roles:
Se utiliza un middleware personalizado (roleMiddleware.js) para asegurar que solo los roles autorizados puedan realizar determinadas operaciones.

Migraciones y Seeders:
Se utilizan migraciones para crear las tablas y seeders para poblar la base de datos con datos de prueba. Esto facilita la verificación de la funcionalidad sin tener que insertar datos manualmente.

EJS como Motor de Plantillas:
Se emplea EJS para renderizar las vistas de la aplicación, permitiendo que la misma vista (por ejemplo, Home) muestre diferentes contenidos dependiendo de si el usuario está autenticado o no.

Instrucciones de Ejecución
Instalar dependencias:

bash
Copiar
Editar
npm install
Configurar la base de datos y ejecutar migraciones y seeders:

bash
Copiar
Editar
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
Iniciar el servidor:

bash
Copiar
Editar
npm start
Acceder a la aplicación:

Navega a http://localhost:3000 para ver la vista Home.