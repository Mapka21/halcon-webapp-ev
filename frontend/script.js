async function obtenerPedidos() {
    try {
        const respuesta = await fetch('http://localhost:3000/pedido');
        const data = await respuesta.json(); // Recibe el objeto JSON

        const lista = document.getElementById('lista-pedidos');
        lista.innerHTML = '';

        // Verificar si data es un array o un objeto
        if (Array.isArray(data)) {
            // Si es un array, recorremos normalmente
            data.forEach(pedido => {
                const item = document.createElement('li');
                item.textContent = `Pedido: ${pedido.mensaje}`;
                lista.appendChild(item);
            });
        } else {
            // Si es un objeto, solo mostramos el mensaje
            const item = document.createElement('li');
            item.textContent = `Pedido: ${data.mensaje}`;
            lista.appendChild(item);
        }
    } catch (error) {
        console.error('Error al obtener pedidos:', error);
    }
    
    // Función para enviar el nuevo pedido
async function enviarPedido(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma tradicional
    
    const mensajeInput = document.getElementById('mensaje');
    const nuevoPedido = { mensaje: mensajeInput.value };

    try {
        const respuesta = await fetch('http://localhost:3000/pedido', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoPedido)
        });
        
        const data = await respuesta.json();
        console.log('Respuesta del servidor:', data);
        
        // Puedes agregar código aquí para actualizar la lista de pedidos, por ejemplo:
        obtenerPedidos();
        
        // Limpiar el formulario
        mensajeInput.value = '';
    } catch (error) {
        console.error('Error al enviar el pedido:', error);
    }
}

// Asociar la función al evento submit del formulario
const formPedido = document.getElementById('form-pedido');
if (formPedido) {
    formPedido.addEventListener('submit', enviarPedido);
}

}
