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
 
    citas.forEach((cita) => {
 
        let claseEstado = "";
        if (cita.estado === "Completado")       claseEstado = "activo-estado";
        else if (cita.estado === "Pendiente")   claseEstado = "pendiente-estado";
        else if (cita.estado === "Esperando Pieza") claseEstado = "espera-pieza-estado";
 
        contenedor.innerHTML += `
            <div class="cita-card">
 
                <div class="cita-card-top">
                    <div class="cita-numero">#${cita.id}</div>
                    <span class="${claseEstado}">${cita.estado}</span>
                </div>
 
                <div class="cita-card-body">
 
                    <div class="cita-seccion">
                        <span class="cita-label">Cliente</span>
                        <span class="cita-valor cita-info-personal">${cita.nombre} ${cita.apellido}</span>
                    </div>
 
                    <div class="cita-seccion">
                        <span class="cita-label">Cédula</span>
                        <span class="cita-valor cita-info-personal">${cita.cedula}</span>
                    </div>
 
                    <div class="cita-seccion">
                        <span class="cita-label">Teléfono</span>
                        <span class="cita-valor cita-info-personal">${cita.telefono}</span>
                    </div>
 
                    <div class="cita-seccion">
                        <span class="cita-label">Correo</span>
                        <span class="cita-valor cita-info-personal">${cita.correo}</span>
                    </div>
 
                    <div class="cita-seccion">
                        <span class="cita-label">Vehículo</span>
                        <span class="cita-valor cita-info-vehiculo">${cita.marca} ${cita.modelo} — ${cita.año}</span>
                    </div>
 
                    <div class="cita-seccion">
                        <span class="cita-label">Placa</span>
                        <span class="cita-valor cita-info-vehiculo">${cita.placa}</span>
                    </div>
 
                    <div class="cita-seccion cita-seccion--full">
                        <span class="cita-label">Servicios</span>
                        <span class="cita-valor cita-info-servicio">${cita.tiposServicios}</span>
                    </div>
 
                    <div class="cita-seccion">
                        <span class="cita-label">Técnico</span>
                        <span class="cita-valor cita-info-servicio">${cita.tecnicoAsignado}</span>
                    </div>
 
                </div>
 
                <div class="cita-card-footer">
                    <span class="cita-total">RD$ ${Number(cita.total).toLocaleString()}</span>
                    <button class="btn-ver" onclick="modal.manipularModal('Abrir', ${cita.id})">Ver detalle</button>
                </div>
 
            </div>
        `;
    });
 
    // Total de ingresos
    const total = citas.reduce((acc, c) => acc + Number(c.total), 0);
    document.getElementById("badge-total-ingresos").textContent = `Total: RD$ ${total.toLocaleString()}`;
    document.getElementById("badge-total").textContent = `${citas.length} citas`;

});


class Modal{
    constructor(){
        
    }

    manipularModal(estado, idCita){
        const modal = document.getElementById("modal-Citas");
        const modalContenido = document.getElementById("contenido-modal");
        const obj = JSON.parse(localStorage.getItem("Citas"));
    
        let citaSeleccionada = obj.filter(cita =>  cita.id === idCita);



        modalContenido.innerHTML = "";
        if(estado === "Abrir"){
            
            modal.style.display = "flex";
            
            citaSeleccionada.forEach(info=>{
                let descripcion;
                if(info.descripcion === ""){
                    descripcion = "Sin Descripcion";
                }else{
                    descripcion = info.descripcion;

                }

                modalContenido.innerHTML += `
                    <div class="modal-card">

                        <div class="modal-section">
                            <p class="modal-section-title">Cliente</p>
                            <div class="modal-info-grid">
                                <div class="modal-info-item">
                                    <span class="modal-info-key">Nombre</span>
                                    <span class="modal-info-val">${info.nombre} ${info.apellido}</span>
                                </div>
                                <div class="modal-info-item">
                                    <span class="modal-info-key">Cédula</span>
                                    <span class="modal-info-val">${info.cedula}</span>
                                </div>
                                <div class="modal-info-item">
                                    <span class="modal-info-key">Teléfono</span>
                                    <span class="modal-info-val">${info.telefono}</span>
                                </div>
                                <div class="modal-info-item">
                                    <span class="modal-info-key">Correo</span>
                                    <span class="modal-info-val">${info.correo}</span>
                                </div>
                            </div>
                        </div>

                        <div class="modal-section">
                        <p class="modal-section-title">Vehículo</p>
                            <div class="modal-info-grid">
                                <div class="modal-info-item">
                                    <span class="modal-info-key">Marca / Modelo</span>
                                    <span class="modal-info-val">${info.marca} ${info.modelo} — ${info.año}</span>
                                </div>
                                <div class="modal-info-item">
                                    <span class="modal-info-key">Placa</span>
                                    <span class="modal-info-val" style="font-family:monospace;letter-spacing:1px">${info.placa}</span>
                                </div>
                                <div class="modal-info-item">
                                    <span class="modal-info-key">Color</span>
                                    <span class="modal-info-val">${info.color}</span>
                                </div>
                                <div class="modal-info-item">
                                    <span class="modal-info-key">Técnico</span>
                                    <span class="modal-info-val">${info.tecnicoAsignado}</span>
                                </div>
                            </div>
                        </div>

                        <div class="modal-section">
                            <p class="modal-section-title">Servicios</p>
                                <div class="modal-services-wrap">
                                    ${info.tiposServicios.split(',').map(s => 
                                    `<span class="modal-service-tag">${s.trim()}</span>`
                                    ).join('')}
                                </div>
                        </div>

                        <div class="modal-section">
                            <p class="modal-section-title">Descripción</p>
                            <div class="modal-desc-box">${descripcion}</div>
                        </div>

                    </div>
                `;

            });
        
        }else if (estado === "Cerrar"){
            modal.style.display = "none";
        }
    }
}

class Filtros {

    constructor(){


    }

    manipularPanel(){
        const panel = document.getElementById("filters-panel");
        const btn = document.getElementById("btn-clear");

        if(panel.style.display == "none"){
            panel.style.display = "flex";
            btn.style.display = "flex";
        }else{
            panel.style.display = "none";
            btn.style.display = "none";
        }
    }

    mostrarFiltrado(datos){
        // contenedor de citas
        const divCitas = document.getElementById("tbody-citas");

        // mensaje de no hay citas
        const divVacio = document.getElementById("empty-state");
        const pVacio = divVacio.querySelector('p');
        const aVacio = divVacio.querySelector('a');
        
        //limpia el div para mostrar las filtradas
        divCitas.innerHTML= "";


        if(!datos.length){
            divVacio.style.display = "flex";
            aVacio.style.display = "none";
            pVacio.textContent = "No Hay Ninguna Cita Que Coincida";

        }else{
          
            divVacio.style.display = "none";

            datos.forEach(dato=>{
                let claseEstado = "";
                if (dato.estado === "Completado")       claseEstado = "activo-estado";
                else if (dato.estado === "Pendiente")   claseEstado = "pendiente-estado";
                else if (dato.estado === "Esperando Pieza") claseEstado = "espera-pieza-estado";


                divCitas.innerHTML += `
                    <div class="cita-card">
        
                        <div class="cita-card-top">
                            <div class="cita-numero">#${dato.id}</div>
                            <span class="${claseEstado}">${dato.estado}</span>
                        </div>
        
                        <div class="cita-card-body">
        
                            <div class="cita-seccion">
                                <span class="cita-label">Cliente</span>
                                <span class="cita-valor cita-info-personal">${dato.nombre} ${dato.apellido}</span>
                            </div>
        
                            <div class="cita-seccion">
                                <span class="cita-label">Cédula</span>
                                <span class="cita-valor cita-info-personal">${dato.cedula}</span>
                            </div>
        
                            <div class="cita-seccion">
                                <span class="cita-label">Teléfono</span>
                                <span class="cita-valor cita-info-personal">${dato.telefono}</span>
                            </div>
        
                            <div class="cita-seccion">
                                <span class="cita-label">Correo</span>
                                <span class="cita-valor cita-info-personal">${dato.correo}</span>
                            </div>
        
                            <div class="cita-seccion">
                                <span class="cita-label">Vehículo</span>
                                <span class="cita-valor cita-info-vehiculo">${dato.marca} ${dato.modelo} — ${dato.año}</span>
                            </div>
        
                            <div class="cita-seccion">
                                <span class="cita-label">Placa</span>
                                <span class="cita-valor cita-info-vehiculo">${dato.placa}</span>
                            </div>
        
                            <div class="cita-seccion cita-seccion--full">
                                <span class="cita-label">Servicios</span>
                                <span class="cita-valor cita-info-servicio">${dato.tiposServicios}</span>
                            </div>
        
                            <div class="cita-seccion">
                                <span class="cita-label">Técnico</span>
                                <span class="cita-valor cita-info-servicio">${dato.tecnicoAsignado}</span>
                            </div>
        
                        </div>
        
                        <div class="cita-card-footer">
                            <span class="cita-total">RD$ ${Number(dato.total).toLocaleString()}</span>
                            <button class="btn-ver" onclick="modal.manipularModal('Abrir', ${dato.id})">Ver detalle</button>
                        </div>
        
                    </div>
                `;
            })
        }
    }

    filtrarTecnico(div){
        const obj =  JSON.parse(localStorage.getItem("Citas"));
        const valor = div.textContent;
        let citas = obj.filter(cita => cita.tecnicoAsignado === valor)

        this.mostrarFiltrado(citas);
    }

    filtrarEstado(div){

        const obj =  JSON.parse(localStorage.getItem("Citas"));
        const valor = div.textContent;
        let citas = obj.filter(cita => cita.estado === valor)
        
        this.mostrarFiltrado(citas);
    }

    btnClear(){
        const obj =  JSON.parse(localStorage.getItem("Citas"));
        this.mostrarFiltrado(obj);

    }



}


const modal = new Modal();
const filtros = new Filtros();

function toggleAside() {
  document.querySelector("aside").classList.toggle("cerrado");
}