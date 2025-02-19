const express = require('express');
const app = express();

// Middleware para permitir JSON
app.use(express.json());

// Ruta de prueba para verificar que el servidor funciona
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando correctamente!');
});

// Rutas de ejemplo
app.get('/pedido', (req, res) => {
    res.json({ mensaje: 'Aquí están los pedidos' });
});

app.post('/pedido', (req, res) => {
    const nuevoPedido = req.body;
    res.json({ mensaje: 'Pedido recibido', datos: nuevoPedido });
});

app.put('/pedido/:id', (req, res) => {
    const id = req.params.id;
    res.json({ mensaje: `Pedido ${id} actualizado` });
});

app.delete('/pedido/:id', (req, res) => {
    const id = req.params.id;
    res.json({ mensaje: `Pedido ${id} eliminado` });
});

// Iniciar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
