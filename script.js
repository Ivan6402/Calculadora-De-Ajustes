let planilla = document.getElementById('planilla');
let warning  = document.getElementById('warning');

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  resetearFormulario();

  let datos = new FormData(formulario);
  let importe = datos.get('importe');
  let motivo  = datos.get('motivo');
  let servicio = datos.get('servicio')
  let diaDesde = String(datos.get('fechaDesde')).substring(8, 10);
  let diaHasta = String(datos.get('fechaHasta')).substring(8, 10); 
  let mes = String(datos.get('fechaHasta')).substring(5, 7);
  let anio = String(datos.get('fechaHasta')).substring(0, 4);

  let validacion = validarFormulario(importe,motivo,servicio,diaDesde,diaHasta); 

  if (validacion) {
    let division = ultimaDiaDelAnio(anio, mes);
    let diasDeAjuste = diaHasta - diaDesde + 1;
    let ajuste = calcularAjuste(diasDeAjuste, division, importe);

    planilla.value = `N° de Ft:
Importe: ${importe}
Motivo: ${motivo}
Serv. afectado:${servicio}
Cant. de días descontados:${diasDeAjuste}
Plazo de días ajustados (desde-hasta):${diaDesde}/${mes} hasta ${diaHasta}/${mes}
Total del ajuste:${ajuste}
`
  }

});

copiar.addEventListener('click', () => {
  navigator.clipboard.writeText(planilla.value);
  copiar.value = 'Copiado!';
  copiar.style['background-color'] = '#800000';
});

function validarFormulario(importe, motivo, servicio,diaDesde, diaHasta){
	let patron = /,\d{1,2}/
  if (!patron.test(importe)) {
    warning.innerHTML += "[!] Importe invalido, falta la coma decimal<br>";
  }
  if (diaDesde == '' || diaHasta == '') {
    warning.innerHTML += "[!] Complete la fecha desde/hasta<br>";
  }
  if (!warning.innerHTML == "") {
    return false; 
  } else {
    return true;
  }
}

function resetearFormulario(){
  copiar.value = 'Copiar Planilla';
  copiar.style['background-color'] = '#154360';
  planilla.value = '';
  warning.innerHTML = "";
  iva.innerHTML = "";
}

function calcularAjuste(dias, division, importe){
  importe = importe.split(".").join("").replace(/,/, '.');
  let resultado = ((importe/division) * dias) / 1.21;
  let resultadoIva = ((importe/division) * dias);
  iva.innerHTML += "valor con iva: " + resultadoIva.toFixed(2);
  return resultado.toFixed(2);
}

function ultimaDiaDelAnio(anio, mes) {
  let fechaActual = new Date(anio, mes, 0);
  return fechaActual.getDate();
}

