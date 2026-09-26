const fs = require('fs');
const evaluarCategoria = require('./evaluador');

const detallesPorProducto = {
    'Aspersores de Riego': [
        'Alcance de radio: 15 a 30 metros',
        'Presión de trabajo: 3.5 a 5.0 bar',
        'Boquilla de bronce de alto impacto regulable'
    ],
    'Swing-joints': [
        'Diámetro nominal: 1 1/2 pulgadas',
        'Presión nominal: PN16',
        'Articulación flexible de doble codo autorroscante'
    ],
    'Tubería PVC MOM': [
        'Diámetro exterior: 110 mm (longitud 6 metros)',
        'Presión de trabajo: 10 bar (145 PSI)',
        'Sistema de junta rápida con anillo de goma R-R'
    ],
    'Válvulas Clayton': [
        'Válvula de control hidráulico operada por diafragma',
        'Cuerpo de hierro dúctil revestido en epoxi',
        'Conexión bridada bajo norma ANSI Class 150'
    ],
    'Quick Coupling': [
        'Válvula de acople rápido en latón reforzado',
        'Rosca de entrada: 1" NPT hembra',
        'Incluye tapa de protección integrada'
    ]
};

const imagenesPorProducto = {
    'Aspersores de Riego': '/images/aspersor-riego.jpg',
    'Swing-joints': '/images/swing-joint.jpg',
    'Tubería PVC MOM': '/images/tuberia-pvc.jpg',
    'Válvulas Clayton': '/images/valvula-clayton.jpg',
    'Quick Coupling': '/images/quick-coupling.jpg'
};

function generarFichaProducto(nombreProducto = 'Válvulas Clayton', precioProducto = 600) {
    const precioNum = Number(precioProducto);
    const categoria = evaluarCategoria(precioNum);

    const detalles = detallesPorProducto[nombreProducto] || [
        'Producto hidráulico de alta calidad para riego agrícola e industrial',
        'Garantía de fábrica IRRIGOLF C.A.'
    ];

    const imagen = imagenesPorProducto[nombreProducto] || '/images/valvula-clayton.jpg';

    const ficha = {
        producto: nombreProducto,
        precio: precioNum,
        categoria: categoria,
        detallesTecnicos: detalles,
        imagen: imagen,
        fechaGeneracion: new Date().toLocaleString()
    };

    return ficha;
}

module.exports = generarFichaProducto;