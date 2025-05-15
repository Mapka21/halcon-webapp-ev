
# Halcón Web App – Sistema de Gestión de Pedidos

**Halcon** es una aplicación web para un distribuidor de materiales de construcción que permite a:

- **Clientes**: Consultar el estado de sus pedidos (número de cliente + factura).
- **Empleados**: Gestionar usuarios y pedidos con roles y permisos.

---

## 🛠 Tecnologías

- **Backend**: Node.js, Express  
- **ORM**: Sequelize (MySQL)  
- **Autenticación**: JWT + cookies httpOnly  
- **Plantillas**: EJS  
- **Estilos**: Bootstrap 5  
- **Notificaciones**: Toastr + jQuery  

---

## 🚀 Instalación

1. **Clonar repo**  
   ```bash
   git clone https://github.com/Mapka21/halcon-webapp-ev.git
   cd halcon-webapp-ev
   ```

2. **Instalar dependencias**  
   ```bash
   npm install
   ```

3. **Configurar base de datos**  
   - Edita `config/config.json` con tus credenciales de MySQL.  
   - Crea la base de datos `halcon_db` si no existe.

4. **Migraciones y seeders**  
   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```

5. **Iniciar servidor**  
   ```bash
   npm start
   ```
   Abre `http://localhost:3000` en tu navegador.

---

## 🔑 Funcionalidades

### 1. Home / Vista Pública

- Formulario de búsqueda de órdenes por número de factura.  
- Muestra estado e imagen de evidencia si está **Delivered**.  
- Login para empleados.

### 2. Dashboard

- Bienvenida con nombre y rol.  
- Enlaces a:  
  - **Usuarios** (`/users`)  
  - **Órdenes** (`/orders`)  
  - **Órdenes Archivadas** (`/orders/archived`)

### 3. Gestión de Usuarios

- **Lista** activa/inactiva.  
- **Crear** usuario con asignación de rol: Sales, Warehouse, Route, Purchasing.  
- **Editar** datos, rol o estado.

### 4. Gestión de Órdenes

- **Lista** de todas las órdenes (no borradas) con filtros por estado.  
- **Crear** nuevas órdenes (Sales).  
- **Ver** detalle de orden y cambiar estado según rol:  
  - **Warehouse**: Ordered → In process → In route  
  - **Route**: In route → Delivered  
- **Archivar** (soft delete) y **Restaurar** órdenes.

### 5. Órdenes Archivadas

- Listado de órdenes con `isDeleted = true`.  
- Restauración individual.

---

## 🔒 Seguridad y Permisos

- Rutas protegidas por middleware `auth` (JWT).  
- Middleware `roleMiddleware` controla accesos según rol.  
- Mensajes de error JSON:  
  - `No token provided` si no hay sesión.  
  - `Forbidden` si el rol no tiene permiso.

---

## 💬 Experiencia de Usuario

- **Bootstrap** para diseño limpio.  
- **Toastr** para notificaciones tras cada acción (creación, actualización, archivo, restauración).  
- **Navbar** constante en todas las vistas.

---

## 🖼 Capturas

En `/docs/capturas.docx` encontrarás todas las capturas que demuestran:

1. Home antes y después de login  
2. Creación de orden y notificación Toastr  
3. Dashboard con enlaces  
4. Gestión de Usuarios y Toastr  
5. Gestión de Órdenes, archivo y restauración con Toastr  
6. Rutas protegidas y mensajes JSON  
7. Navegación fluida entre secciones  

---

## 📦 Estructura del Proyecto

```
halcon-webapp-ev/
├── app.js
├── package.json
├── config/
│   └── config.json
├── controllers/
├── middleware/
├── migrations/
├── models/
├── routes/
├── seeders/
└── views/
    ├── partials/
    │   ├── header.ejs
    │   └── footer.ejs
    ├── home.ejs
    ├── dashboard.ejs
    ├── orders.ejs
    ├── ordersArchived.ejs
    ├── orderView.ejs
    ├── users.ejs
    └── userEdit.ejs
```

---

## 📤 Cómo actualizar en GitHub

En tu carpeta del proyecto:

1. **Añade cambios**  
   ```bash
   git add .
   ```

2. **Commit**  
   ```bash
   git commit -m "Evidencia 1, 2 y 3: vistas corregidas, Toastr funcional, README final"
   ```

3. **Sincroniza con remoto**  
   ```bash
   git pull --rebase origin main
   ```

4. **Resuelve conflictos** (si los hay), luego:

5. **Push**  
   ```bash
   git push origin main
   ```

¡Y listo! Tu repositorio quedará actualizado con el README final y todas las correcciones.
