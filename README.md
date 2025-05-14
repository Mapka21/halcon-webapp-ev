# Halcón Web App - Sistema de Gestión de Pedidos

## 📌 Descripción General  
Halcón es una aplicación web diseñada para automatizar los procesos internos de un distribuidor de materiales de construcción. El sistema permite a los clientes consultar el estado de sus pedidos y a los empleados gestionar dichos pedidos a través de un panel administrativo.

## 🛠 Tecnologías Utilizadas  
- **Backend:** Node.js con Express  
- **Base de Datos:** MySQL (gestionada con Sequelize)  
- **Autenticación:** JWT (almacenado en cookie httpOnly)  
- **Vistas:** EJS  
- **Control de Versiones:** Git & GitHub

## 🔑 Características  
### Para Clientes  
- **Seguimiento de Pedidos:**  
  Los clientes pueden consultar el estado de sus pedidos ingresando el número de factura.

### Para Empleados  
- **Gestión de Pedidos:**  
  Permite actualizar el estado de los pedidos a través de las siguientes etapas:  
  - **Ordered:** Estado inicial al registrar el pedido.  
  - **In process:** Actualizado por el área de Almacén cuando el pedido se prepara.  
  - **In route:** Actualizado por Almacén (o Route) cuando el pedido sale a distribuirse.  
  - **Delivered:** Actualizado por el personal de Ruta al confirmar la ent

rega, subiendo evidencia (imagen).  
- **Panel Administrativo:**  
  - Gestión de usuarios con roles (Sales, Warehouse, Route, Purchasing).  
  - Creación y edición de usuarios, con asignación de roles y estados (activo/inactivo).  
- **Búsqueda y Filtros:**  
  Permite buscar órdenes por número de factura, número de cliente, fecha o estado.

## 🚀 Estructura del Proyecto

```
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
│   └── roleMiddleware.js    # Middleware para validar que el usuario tenga el rol permitido
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
```

## 📥 Instalación y Configuración

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/Mapka21/halcon-webapp-ev.git
   cd halcon-webapp-ev
   ```

2. **Instalar las dependencias:**

   ```bash
   npm install
   ```

3. **Configurar la base de datos:**

   - Edita el archivo `config/config.json` con tus credenciales.
   - Crea la base de datos en MySQL si no existe.

4. **Migraciones y Seeders:**

   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```

5. **Iniciar el servidor:**

   ```bash
   npm start
   ```

## 🔐 Uso de la Aplicación

1. Accede a [http://localhost:3000](http://localhost:3000).
2. Busca órdenes, inicia sesión, gestiona usuarios y órdenes.
3. Las notificaciones se muestran con Toastr.

## 🧪 Pruebas de Roles

- **Sales:** Crea órdenes.
- **Warehouse:** Actualiza de Ordered a In process / In route.
- **Route:** Actualiza de In route a Delivered (sube evidencias).

---

## Autor

Marco Zavala Chapa (2868251)
