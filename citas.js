
document.addEventListener("DOMContentLoaded", () => {

    const citas = JSON.parse(localStorage.getItem("Citas")) || [];
    
    const tabla = document.getElementById("tbody-citas");

    if (!tabla) return;

    citas.forEach((cita, index) => {

        let claseEstado = "";

        if (cita.estado === "Completado") {
            claseEstado = "activo-estado";
        } else if (cita.estado === "Pendiente") {
            claseEstado = "pendiente-estado";
        } else if (cita.estado === "Esperando Pieza") {
            claseEstado = "espera-pieza-estado";
        }

        tabla.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${cita.nombre} ${cita.apellido}</td>
                <td>${cita.cedula}</td>
                <td>${cita.telefono}</td>
                <td>${cita.correo}</td>
                <td>${cita.marca} ${cita.modelo}</td>
                <td>${cita.placa}</td>
                <td>${cita.tiposServicios}</td>
                <td>${cita.tecnicoAsignado}</td>
                <td>
                    <span class="${claseEstado}">
                        ${cita.estado}
                    </span>
                </td>
                <td>
                    <span class="precio-badge"> 
                        ${cita.total}$
                    </span>
                </td>
                <td>Ver</td>
            </tr>
        `;

        // Asignacion de total a zona de citas
       const total = citas.reduce((acc, cita) => acc + Number(cita.total), 0);
       document.getElementById("badge-total-ingresos").textContent= `Total: RD$${total} `;
    });
    
    document.getElementById("badge-total").textContent =
        `${citas.length} citas`;

});

function toggleAside() {
  document.querySelector("aside").classList.toggle("cerrado");
}