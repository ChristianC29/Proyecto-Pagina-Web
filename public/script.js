document.addEventListener('DOMContentLoaded', () => {
    
    const clientNameInput = document.getElementById('client-name');
    const greetButton = document.getElementById('greet-btn');
    const greetingOutput = document.getElementById('greeting-output');
    const charCountOutput = document.getElementById('char-count-output');

    if (greetButton) {
        greetButton.addEventListener('click', () => {
            const nombre = clientNameInput.value.trim();

            if (nombre === '') {
                greetingOutput.textContent = '';
                charCountOutput.textContent = 'El campo está vacío. Por favor, ingresa tu nombre.';
                charCountOutput.style.color = '#d9534f';
            } else {
                const cantidadCaracteres = nombre.length;
                greetingOutput.textContent = `¡Hola, ${nombre}! Bienvenido/a a IRRIGOLF, C.A.`;
                charCountOutput.textContent = `Tu nombre contiene ${cantidadCaracteres} caracter${cantidadCaracteres === 1 ? '' : 'es'}.`;
                charCountOutput.style.color = '#2e7d32';
            }
        });
    }

    const btnEvaluar = document.getElementById('btn-evaluar');
    if (btnEvaluar) {
        btnEvaluar.addEventListener('click', async () => {
            const precioInput = document.getElementById('precio-input');
            const resElem = document.getElementById('resultado-evaluacion');
            const precio = precioInput ? precioInput.value : '';

            if (!precio || isNaN(precio)) {
                resElem.innerText = 'Por favor ingresa un precio válido.';
                resElem.style.color = '#d9534f';
                return;
            }

            try {
                const respuesta = await fetch('/api/evaluar-categoria', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ precio })
                });

                const data = await respuesta.json();
                resElem.innerText = `Categoría del servicio: ${data.categoria}`;
                resElem.style.color = '#2e7d32';
            } catch (error) { 
                console.error('Error al evaluar categoría:', error);
                resElem.innerText = 'Error al conectar con el servidor.';
                resElem.style.color = '#d9534f';
            }
        });
    }

    const btnGenerar = document.getElementById('btn-generar');
    if (btnGenerar) {
        btnGenerar.addEventListener('click', async () => {
            const selectProducto = document.getElementById('gen-producto');
            const opcionSeleccionada = selectProducto.options[selectProducto.selectedIndex];
        
            const nombre = opcionSeleccionada.getAttribute('data-nombre');
            const precio = selectProducto.value;
            const resElem = document.getElementById('resultado-generador');

            try {
                const respuesta = await fetch('/api/generar-ficha', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, precio })
                }); 
            
                const data = await respuesta.json();

                const detallesHTML = data.detallesTecnicos
                    .map(item => `<li>${item}</li>`)
                    .join('');

                resElem.innerHTML = `
                    <div class="card-ficha">
                        <div class="ficha-info">
                            <h4>Ficha Técnica: ${data.producto}</h4>
                            <p><strong>Precio del Producto:</strong> $${data.precio} USD</p>
                            <p><strong>Categoría de Servicio:</strong> ${data.categoria}</p>
                            <p><strong>Especificaciones Técnicas:</strong></p>
                            <ul>
                                ${detallesHTML}
                            </ul>
                            <small>Fecha de consulta: ${data.fechaGeneracion}</small>
                        </div>
                        <div class="ficha-img-container">
                            <img src="${data.imagen}" alt="${data.producto}" class="img-ficha">                    
                        </div>
                    </div>
                `;
            } catch (error) {
                console.error('Error al generar la ficha:', error);
                resElem.innerText = 'Error al conectar con el servidor.';
            }
        });
    }
});