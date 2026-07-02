const formulario = document.getElementById("registroForm");
let citas = [];


document.addEventListener("DOMContentLoaded", async () => {

    const tbody = document.querySelector("#ordenesRecientes tbody");
    await actualizarInfo();

  

    if (citas.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5">No hay órdenes registradas</td></tr>`;
        return;
    }

    citas.forEach(cita => {

        let claseEstado;
        if (cita.estado === "Completado")      claseEstado = "activo-estado";
        else if (cita.estado === "Esperando Pieza") claseEstado = "espera-pieza-estado";
        else if (cita.estado === "Pendiente") claseEstado = "pendiente-estado";
        else{claseEstado = "chip"}
        
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

async function actualizarInfo(){
    const respuesta = await fetch("http://localhost:3000/api/citas");
    const raw = await respuesta.json(); 

    citas = raw;
}