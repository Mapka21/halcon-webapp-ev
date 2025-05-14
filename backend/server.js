const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Order = require('./models/Order');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/halconDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error conectando a MongoDB:", err));

// Crear usuario admin por defecto
async function crearAdmin() {
    const adminExiste = await User.findOne({ username: 'admin' });
    if (!adminExiste) {
        await User.create({ username: 'admin', password: 'admin123', role: 'Admin' });
        console.log("Usuario admin creado");
    }
}
crearAdmin();

// Endpoint para registrar nuevos usuarios
app.post('/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        if (!['Admin', 'Sales', 'Purchasing', 'Warehouse', 'Route'].includes(role)) {
            return res.status(400).json({ message: "Rol inválido" });
        }
        const newUser = await User.create({ username, password, role });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error creando usuario", error });
    }
});

// Endpoint para obtener pedidos
app.get('/pedido', async (req, res) => {
    const pedidos = await Order.find();
    res.json(pedidos);
});

// Endpoint para crear un pedido
app.post('/pedido', async (req, res) => {
    try {
        const newOrder = await Order.create(req.body);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: "Error creando pedido", error });
    }
});

// Endpoint para cambiar el estado de un pedido
app.put('/pedido/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Ordered', 'In process', 'In route', 'Delivered'].includes(status)) {
            return res.status(400).json({ message: "Estado inválido" });
        }
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: "Error actualizando pedido", error });
    }
});

// Endpoint para eliminar un pedido (eliminación lógica)
app.delete('/pedido/:id', async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndUpdate(req.params.id, { status: "Deleted" }, { new: true });
        res.json(deletedOrder);
    } catch (error) {
        res.status(500).json({ message: "Error eliminando pedido", error });
    }
});

// Endpoint para ver pedidos eliminados
app.get('/pedido/eliminados', async (req, res) => {
    const deletedOrders = await Order.find({ status: "Deleted" });
    res.json(deletedOrders);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
