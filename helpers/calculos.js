/**
 * Funciones genericas para calculos 
 */


const calcularValorHora = ({ fecha_ini, fecha_salida, valor_hora, valor_extra }) => {
    console.log(fecha_ini)
  const inicio = new Date(fecha_ini);
  const salida = new Date(fecha_salida);
console.log(inicio,"aaaaaaaaaaa",salida)
  const diferenciaMs = salida - inicio;
  const horas = diferenciaMs / (1000 * 60 * 60);

  let total = 0;

  if (horas <= 1) {
    total = horas * valor_hora;
  } else {
    const horasNormales = 1;
    const horasExtras = horas - 1;

    total = (horasNormales * valor_hora) + (horasExtras * valor_extra);
  }

  return {
    horas: horas.toFixed(2),
    total: Math.round(total)
  };
};


export{
   calcularValorHora 
}
