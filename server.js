const express = require('express');
const path = require('path');
const clientesRouter = require('./routes/clientes');
const evaluarCategoria = require('./scripts/evaluador');
const generarFichaProducto = require('./scripts/generador');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/clientes', clientesRouter);

app.post('/api/evaluar-categoria', (req, res) => {
    const { precio } = req.body;
    const categoria = evaluarCategoria(Number(precio));
    res.json({ categoria });
});

app.post('/api/generar-ficha', (req, res) => {
    const { nombre, precio } = req.body;
    const ficha = generarFichaProducto(nombre, Number(precio));
    res.json(ficha);
});

app.listen(PORT, () => {
    console.log(`Servidor Express ejecutándose en http://localhost:${PORT}`);
});