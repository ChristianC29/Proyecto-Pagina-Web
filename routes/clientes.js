const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/clientes.json');

router.get('/', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo de registros' });
        }
        const clientes = JSON.parse(data || '[]');
        res.json(clientes);
    });
});

router.post('/', (req, res) => {
    const { nombre, edad, ciudad } = req.body;

    if (!nombre || edad === undefined || !ciudad) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }
    
    const edadNum = Number(edad);
    if (isNaN(edadNum) || edadNum <= 0) {
        return res.status(400).json({ error: 'La edad debe ser un número positivo.' });
    }
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al acceder a los datos.' });
        }
        
        const clientes = JSON.parse(data || '[]');
        const nuevoCliente = { nombre, edad: edadNum, ciudad };
        clientes.push(nuevoCliente);

        fs.writeFile(filePath, JSON.stringify(clientes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al guardar el registro.' });
            }
            
            let mensaje = `Hola ${nombre} de ${ciudad}, tienes ${edadNum} años.`;
            if (edadNum < 18) {
                mensaje += ' Este producto es solo para mayores de edad.';
            } else {
                mensaje += ' Registro completado con éxito.';
            }
                
            res.status(201).json({ mensaje, cliente: nuevoCliente });
        });
    });
});

module.exports = router;