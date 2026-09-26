function evaluarCategoria(precio) {
    const precioNum = Number(precio);

    if (precioNum > 400) {
        return 'Premium';
    } else {
        return 'Estándar';
    }
}

module.exports = evaluarCategoria;