
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
                <td>${cita.marca} ${cita.modelo}</td>
                <td>${cita.placa}</td>
                <td>${cita.tiposServicios}</td>
                <td>${cita.tecnicoAsignado}</td>
                <td>
                    <span class="${claseEstado}">
                        ${cita.estado}
                    </span>
                </td>
                <td>Ver</td>
            </tr>
        `;
    });

    document.getElementById("badge-total").textContent =
        `${citas.length} citas`;

});

