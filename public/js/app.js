document.addEventListener('DOMContentLoaded', () => {
  const skillsList = document.querySelector('.lista-conocimientos');
  let alertasContainer = document.querySelector('.alertas'); // Obtiene el contenedor principal de alertas

    if (alertasContainer) { // Solo llama a limpiarAlertas si el contenedor existe
         limpiarAlertas(alertasContainer);
    }

    if (skillsList) {
        skillsList.addEventListener('click', agregarSkills);
        skillsSeleccionados();
    }
});


const limpiarAlertas = (contenedorAlertas) => {
    if (!contenedorAlertas) {
        return;
    }

    // `querySelectorAll` devuelve un NodeList estático. Si los elementos son removidos,
    // el NodeList original no se actualiza, por eso se usa un contador.
    const alertasIndividuales = contenedorAlertas.querySelectorAll('.alerta');
    const totalAlertas = alertasIndividuales.length;
    let alertasRemovidas = 0;

    // Si no hay alertas individuales dentro del contenedor, no iniciamos el intervalo
    if (totalAlertas === 0) {
        return;
    }

    const interval = setInterval(() => {
        if (alertasRemovidas < totalAlertas) {
            const alertaARemover = alertasIndividuales[alertasRemovidas];
            // Asegúrate de que el elemento a remover aún es hijo del contenedor antes de intentar removerlo
            if (alertaARemover && contenedorAlertas.contains(alertaARemover)) {
                contenedorAlertas.removeChild(alertaARemover);
            }
            alertasRemovidas++;
        } else {
            if (contenedorAlertas.parentNode) {
                contenedorAlertas.parentNode.removeChild(contenedorAlertas);
            }
            clearInterval(interval); 
        }
    }, 3000); // 3 segundos es un buen tiempo para ver las alertas.
}