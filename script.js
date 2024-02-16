let form = document.getElementById('formulario');
let fechaDesde = document.getElementById('fechaDesde');
let fechaHasta = document.getElementById('fechaHasta');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let resultado = new FormData(formulario);
  let miPlanilla = document.getElementById('miPlanilla');
  let diaDesde = String(fechaDesde.value).substring(8, 10);
  let diaHasta = String(fechaHasta.value).substring(8, 10); 
  let diasAjustados = diaHasta - diaDesde + 1;
  let mes = String(fechaHasta.value).substring(5, 7);
  let anio = String(fechaHasta.value).substring(0, 4);
  let division = ultimaDiaDelAnio(anio, mes);
  let ajuste = calcularAjuste(diasAjustados, division, resultado.get('importe'));

  console.log('division: ', division);
  console.log('ajuste: ', ajuste);
  
  miPlanilla.value = `N° de Ft:
Importe: ${resultado.get('importe')}
Motivo: ${resultado.get('motivo')}
Serv. afectado:${resultado.get('servicio')}
Cant. de días descontados:${diasAjustados}
Plazo de días ajustados (desde-hasta):${diaDesde}/${mes} hasta ${diaHasta}/${mes}
Total del ajuste:${ajuste}
`
});

function calcularAjuste(dias, division, importe){
  importe = importe.split(".").join("").replace(/,/, '.');
  let resultado = ((importe/division) * dias);
  return resultado.toFixed(2);
}

function ultimaDiaDelAnio(anio, mes) {
  let fechaActual = new Date(anio, mes, 0);
  return fechaActual.getDate();
}
