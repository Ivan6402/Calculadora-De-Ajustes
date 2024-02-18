let planilla = document.getElementById('planilla');

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  resetearCopiado();

  let resultado = new FormData(formulario);
  let diaDesde = String(resultado.get('fechaDesde')).substring(8, 10);
  let diaHasta = String(resultado.get('fechaHasta')).substring(8, 10); 
  let mes = String(resultado.get('fechaHasta')).substring(5, 7);
  let anio = String(resultado.get('fechaHasta')).substring(0, 4);
  let division = ultimaDiaDelAnio(anio, mes);
  let diasDeAjuste = diaHasta - diaDesde + 1;
  let ajuste = calcularAjuste(diasDeAjuste, division, resultado.get('importe'));

  planilla.value = `N° de Ft:
Importe: ${resultado.get('importe')}
Motivo: ${resultado.get('motivo')}
Serv. afectado:${resultado.get('servicio')}
Cant. de días descontados:${diasDeAjuste}
Plazo de días ajustados (desde-hasta):${diaDesde}/${mes} hasta ${diaHasta}/${mes}
Total del ajuste:${ajuste}
`
});

copiar.addEventListener('click', () => {
  navigator.clipboard.writeText(planilla.value);
  copiar.value = 'Copiado!';
  copiar.style['background-color'] = '#ff6961';
});

function resetearCopiado(){
  copiar.value = 'Copiar';
  copiar.style['background-color'] = '#fff';
}

function calcularAjuste(dias, division, importe){
  importe = importe.split(".").join("").replace(/,/, '.');
  let resultado = ((importe/division) * dias) / 1.21;
  return resultado.toFixed(2);
}

function ultimaDiaDelAnio(anio, mes) {
  let fechaActual = new Date(anio, mes, 0);
  return fechaActual.getDate();
}

