document.addEventListener("DOMContentLoaded", () => {
 
    const citas = JSON.parse(localStorage.getItem("Citas")) || [];
    const contenedor = document.getElementById("tbody-citas");
    const emptyState = document.getElementById("empty-state");
 
    if (!contenedor) return;
 
    if (citas.length === 0) {
        emptyState.style.display = "block";
        contenedor.style.display = "none";
        return;
    }
 
    citas.forEach((cita, index) => {
 
        let claseEstado = "";
        if (cita.estado === "Completado")       claseEstado = "activo-estado";
        else if (cita.estado === "Pendiente")   claseEstado = "pendiente-estado";
        else if (cita.estado === "Esperando Pieza") claseEstado = "espera-pieza-estado";
 
        contenedor.innerHTML += `
            <div class="cita-card">
 
                <div class="cita-card-top">
                    <div class="cita-numero">#${index + 1}</div>
                    <span class="${claseEstado}">${cita.estado}</span>
                </div>
 
                <div class="cita-card-body">
 
                    <div class="cita-seccion">
                        <span class="cita-label">Cliente</span>
                        <span class="cita-valor">${cita.nombre} ${cita.apellido}</span>
                    </div>
 
                    <div class="cita-seccion">
                        <span class="cita-label">Cédula</span>
                        <span class="cita-valor">${cita.cedula}</span>
                    </div>
 
                    <div class="cita-seccion">
                        <span class="cita-label">Teléfono</span>
                        <span class="cita-valor">${cita.telefono}</span>
                    </div>
 
                    <div class="cita-seccion">
                        <span class="cita-label">Correo</span>
                        <span class="cita-valor">${cita.correo}</span>
                    </div>
 
                    <div class="cita-seccion">
                        <span class="cita-label">Vehículo</span>
                        <span class="cita-valor">${cita.marca} ${cita.modelo} — ${cita.año}</span>
                    </div>
 
                    <div class="cita-seccion">
                        <span class="cita-label">Placa</span>
                        <span class="cita-valor cita-placa">${cita.placa}</span>
                    </div>
 
                    <div class="cita-seccion cita-seccion--full">
                        <span class="cita-label">Servicios</span>
                        <span class="cita-valor">${cita.tiposServicios}</span>
                    </div>
 
                    <div class="cita-seccion">
                        <span class="cita-label">Técnico</span>
                        <span class="cita-valor">${cita.tecnicoAsignado}</span>
                    </div>
 
                </div>
 
                <div class="cita-card-footer">
                    <span class="cita-total">RD$ ${Number(cita.total).toLocaleString()}</span>
                    <button class="btn-ver">Ver detalle</button>
                </div>
 
            </div>
        `;
    });
 
    // Total de ingresos
    const total = citas.reduce((acc, c) => acc + Number(c.total), 0);
    document.getElementById("badge-total-ingresos").textContent = `Total: RD$ ${total.toLocaleString()}`;
    document.getElementById("badge-total").textContent = `${citas.length} citas`;
 
});

function toggleAside() {
  document.querySelector("aside").classList.toggle("cerrado");
}