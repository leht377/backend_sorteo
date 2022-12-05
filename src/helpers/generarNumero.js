const generarNumero = (boletas = []) => {
  const numerosActivos = boletas.map((boleta) => boleta.numero);
  let numeroAleatorio = Math.floor(Math.random() * 50);

  while (numerosActivos.includes(numeroAleatorio)) {
    numeroAleatorio = Math.floor(Math.random() * 50);
  }

  return numeroAleatorio;
};

module.exports = { generarNumero };
