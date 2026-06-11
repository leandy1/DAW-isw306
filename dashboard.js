const formulario = document.getElementById("registroForm");



document.addEventListener("DOMContentLoaded", () => {

    const tbody = document.querySelector("#ordenesRecientes tbody");
    const citas = JSON.parse(localStorage.getItem("Citas")) || [];

  

    if (citas.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5">No hay órdenes registradas</td></tr>`;
        return;
    }

    citas.forEach(cita => {

        let claseEstado = "pendiente-estado";
        if (cita.estado === "Completado")      claseEstado = "activo-estado";
        if (cita.estado === "Esperando Pieza") claseEstado = "espera-pieza-estado";

        tbody.innerHTML += `
            <tr>
                <td>${cita.nombre} ${cita.apellido}</td>
                <td>${cita.marca} ${cita.modelo}</td>
                <td>${cita.placa}</td>
                <td>${cita.tiposServicios}</td>
                <td><span class="${claseEstado}">${cita.estado}</span></td>
            </tr>
        `;
        const total = citas
        .filter(cita => cita.estado === "Completado")
        .reduce((acc, cita) => acc + Number(cita.total), 0);
       document.getElementById("p-ingresos").textContent= `RD$${total} `;

    });

});

document.addEventListener("DOMContentLoaded", () => {
  const citas = JSON.parse(localStorage.getItem("Citas")) || [];

  // Vehículos en el taller
  document.getElementById("vehiculosTaller").textContent = citas.length;

  // Órdenes abiertas
  const ordenesAbiertas = citas.filter(
    cita => cita.estado !== "Completado"
  ).length;

  document.getElementById("ordenesAbiertas").textContent = ordenesAbiertas;

  // Completadas
  const completadas = citas.filter(
    cita => cita.estado === "Completado"
  ).length;

  document.getElementById("completadasHoy").textContent = completadas;
});

function toggleAside() {
  document.querySelector("aside").classList.toggle("cerrado");
}