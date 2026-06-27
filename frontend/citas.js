let citas = [];
document.addEventListener("DOMContentLoaded", async () => {
 
    const respuesta = await fetch("http://localhost:3000/api/citas");
   citas = await respuesta.json();
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
                        <span class="cita-valor cita-info-vehiculo">${cita.marca} ${cita.modelo} — ${cita.anio}</span>
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
        this.editando = false;
    }

    manipularModal(estado, idCita){
        const modal = document.getElementById("modal-Citas");
        const modalContenido = document.getElementById("contenido-modal");
        
        const btnGuardar = document.getElementById("btn-guardar");
        const btnEditar  = document.getElementById("btn-editar");

        let citaSeleccionada = citas.filter(cita => cita.id === idCita);



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
                                    <span class="modal-info-val" data-campo="nombre">${info.nombre}</span>
                                </div>
                                <div class="modal-info-item">
                                    <span class="modal-info-key">Apellido</span>
                                    <span class="modal-info-val" data-campo="apellido">${info.apellido}</span>
                                </div>
                                <div class="modal-info-item">
                                    <span class="modal-info-key">Cédula</span>
                                    <span class="modal-info-val" data-campo="cedula">${info.cedula}</span>
                                </div>
                                <div class="modal-info-item">
                                    <span class="modal-info-key">Teléfono</span>
                                    <span class="modal-info-val" data-campo="telefono">${info.telefono}</span>
                                </div>
                                <div class="modal-info-item">
                                    <span class="modal-info-key">Correo</span>
                                    <span class="modal-info-val" data-campo="correo">${info.correo}</span>
                                </div>
                            </div>
                        </div>

                        <div class="modal-section">
                            <p class="modal-section-title">Vehículo</p>
                            <div class="modal-info-grid">
                                <div class="modal-info-item">
                                    <span class="modal-info-key">Marca</span>
                                    <span class="modal-info-val" data-campo="marca">${info.marca}</span>
                                </div>
                                <div class="modal-info-item">
                                    <span class="modal-info-key">Modelo</span>
                                    <span class="modal-info-val" data-campo="modelo">${info.modelo}</span>
                                </div>
                                <div class="modal-info-item">
                                    <span class="modal-info-key">Año</span>
                                    <span class="modal-info-val" data-campo="año">${info.anio}</span>
                                </div>
                                <div class="modal-info-item">
                                    <span class="modal-info-key">Placa</span>
                                    <span class="modal-info-val" data-campo="placa">${info.placa}</span>
                                </div>
                                <div class="modal-info-item">
                                    <span class="modal-info-key">Color</span>
                                    <span class="modal-info-val" data-campo="color">${info.color}</span>
                                </div>
                                <div class="modal-info-item">
                                    <span class="modal-info-key">Técnico</span>
                                    <span class="modal-info-val" data-campo="tecnicoAsignado">${info.tecnicoAsignado}</span>
                                </div>
                            </div>
                        </div>

                       <div class="modal-section">
                            <p class="modal-section-title">Servicios</p>
                            <div class="modal-services-wrap" id="modal-services-wrap">
                                ${info.tiposServicios.split(',').map(s =>
                                    `<span class="modal-service-tag">
                                        ${s.trim()}
                                    </span>`
                                ).join('')}
                            </div>
                        </div>

                        <div class="modal-section">
                            <p class="modal-section-title">Descripción</p>
                            <div class="modal-desc-box" data-campo="descripcion">${descripcion}</div>
                        </div>

                    </div>
                `;

            });
        
        }else if (estado === "Cerrar"){
            modal.style.display = "none";
            btnGuardar.style.display = "none";

            btnEditar.classList.remove("activo");
            btnEditar.textContent = "Editar";
            this.editando = false;
           
        }
    }

    toggleEditar() {
        const btnEditar  = document.getElementById("btn-editar");
        const btnGuardar = document.getElementById("btn-guardar");

        this.editando = !this.editando;

        const campos = document.querySelectorAll("#contenido-modal .modal-info-val[data-campo]");

        campos.forEach(el => {
            if (this.editando) {
                const input = document.createElement("input");
                input.type = "text";
                input.value = el.textContent.trim();
                input.className = "modal-info-val editable";
                input.dataset.campo = el.dataset.campo;
                el.replaceWith(input);

                document.querySelectorAll(".modal-service-tag").forEach(tag => {
                    if (!tag.querySelector(".modal-service-remove")) {
                        const btn = document.createElement("button");
                        btn.className = "modal-service-remove";
                        btn.textContent = "✕";
                        btn.onclick = () => tag.remove();
                        tag.appendChild(btn);
                    }
                });

                const wrap = document.getElementById("modal-services-wrap");
                if (!wrap.querySelector(".modal-service-add")) {
                    const addBtn = document.createElement("button");
                    addBtn.className = "modal-service-add";
                    addBtn.textContent = "+";
                    addBtn.onclick = () => modal.agregarServicio();
                    wrap.appendChild(addBtn);
                }


            } else {
                const span = document.createElement("span");
                span.className = "modal-info-val";
                span.dataset.campo = el.dataset.campo;
                span.textContent = el.value;
                el.replaceWith(span);

                document.querySelectorAll(".modal-service-remove").forEach(btn => btn.remove());
                const addBtn = document.querySelector(".modal-service-add");
                if (addBtn) addBtn.remove();
            }
        });

        

        btnEditar.textContent = this.editando ? "Cancelar" : "Editar";
        btnEditar.classList.toggle("activo", this.editando);
        btnGuardar.style.display = this.editando ? "flex" : "none";
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
        console.log(datos)
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
       const resultado = citas.filter(cita => cita.tecnicoAsignado === div.textContent);

        this.borrarSelect();
        div.classList.add("selected");
        this.mostrarFiltrado(resultado);
    }

    filtrarEstado(div){
        
       const resultado = citas.filter(cita => cita.estado === div.textContent);

        this.borrarSelect();
        div.classList.add("selected");
        this.mostrarFiltrado(resultado);
    }

    filtrarPersonal(input){
        const div = input.parentElement;

        const campo = div.querySelector('span').textContent.toLowerCase();  
        const valor = input.value.toLowerCase();

        const campoNombre = document.getElementById("f-nombre").value.toLowerCase();  
        const campoApellido = document.getElementById("f-apellido").value.toLowerCase();  
        const campoCedula = document.getElementById("f-cedula").value.toLowerCase();  

      
        let resultado;
        if (campo === "nombre"){
            resultado = citas.filter(cita=> cita[campo].toLowerCase().startsWith(valor) 
            && cita.apellido.toLowerCase(campoApellido).startsWith
            && cita.cedula.toLowerCase(campoCedula).startsWith);
         
        }else if (campo === "apellido"){
             resultado = citas.filter(cita=> cita[campo].toLowerCase().startsWith(valor) 
            && cita.nombre.toLowerCase().startsWith(campoNombre)
            && cita.cedula.toLowerCase().startsWith(campoCedula));
          
        }else if (campo === "cedula"){
            resultado = citas.filter(cita=> cita[campo].toLowerCase().startsWith(valor) 
            && cita.apellido.toLowerCase().startsWith(campoApellido)
            && cita.nombre.toLowerCase().startsWith(campoNombre));
          
        }

        this.mostrarFiltrado(resultado);

    }

    filtrarVehiculo(input){
        const div = input.parentElement;

        const campo = div.querySelector('span').textContent.toLowerCase();  
        const valor = input.value.toLowerCase();

        const campoMarca = document.getElementById("f-marca").value.toLowerCase();  
        const campoModelo = document.getElementById("f-modelo").value.toLowerCase();  
        const campoAño = document.getElementById("f-ano").value.toLowerCase();  
        const campoColor = document.getElementById("f-color").value.toLowerCase();  
        const campoPlaca = document.getElementById("f-placa").value.toLowerCase();  

        
        let resultado;
        if (campo === "marca"){
            resultado = citas.filter(cita=> cita[campo].toLowerCase().startsWith(valor) 
            && cita.modelo.toLowerCase().startsWith(campoModelo)
            && cita.año.toLowerCase().startsWith(campoAño)
            && cita.color.toLowerCase().startsWith(campoColor)
            && cita.placa.toLowerCase().startsWith(campoPlaca));
         
        }else if (campo === "modelo"){
            resultado = citas.filter(cita=> cita[campo].toLowerCase().startsWith(valor) 
            && cita.marca.toLowerCase().startsWith(campoMarca)
            && cita.año.toLowerCase().startsWith(campoAño)
            && cita.color.toLowerCase().startsWith(campoColor)
            && cita.placa.toLowerCase().startsWith(campoPlaca));
          
        }else if (campo === "año"){
            resultado = citas.filter(cita=> cita[campo].toLowerCase().startsWith(valor) 
            && cita.marca.toLowerCase().startsWith(campoMarca)
            && cita.modelo.toLowerCase().startsWith(campoModelo)
            && cita.color.toLowerCase().startsWith(campoColor)
            && cita.placa.toLowerCase().startsWith(campoPlaca));

        }else if (campo === "color"){
            resultado = citas.filter(cita=> cita[campo].toLowerCase().startsWith(valor) 
            && cita.marca.toLowerCase().startsWith(campoMarca)
            && cita.modelo.toLowerCase().startsWith(campoModelo)
            && cita.año.toLowerCase().startsWith(campoAño)
            && cita.placa.toLowerCase().startsWith(campoPlaca));
          
        }else if (campo === "placa"){
          resultado = citas.filter(cita=> cita[campo].toLowerCase().startsWith(valor) 
            && cita.marca.toLowerCase().startsWith(campoMarca)
            && cita.modelo.toLowerCase().startsWith(campoModelo)
            && cita.año.toLowerCase().startsWith(campoAño)
            && cita.color.toLowerCase().startsWith(campoColor));
        }

        this.mostrarFiltrado(resultado);

    }

    btnClear(){
        
        
         this.mostrarFiltrado(citas);
    this.borrarSelect();

    }

    borrarSelect(){
        const chipRowTecnicos = document.getElementById("chips-tecnicos");
        const divChips = chipRowTecnicos.querySelectorAll("div");

        const chipRowEstados = document.getElementById("chips-estados");
        const divChipsEstados = chipRowEstados.querySelectorAll("div");

        const inputNombre = document.getElementById("f-nombre");
        const inputApellido = document.getElementById("f-apellido");
        const inputCedula = document.getElementById("f-cedula");
        const inputMarca = document.getElementById("f-marca");
        const inputModelo = document.getElementById("f-modelo");
        const inputAño = document.getElementById("f-ano");
        const inputColor = document.getElementById("f-color");
        const inputPlaca = document.getElementById("f-placa");


        inputNombre.value = "";
        inputApellido.value = "";
        inputMarca.value = "";
        inputModelo.value = "";
        inputAño.value = "";
        inputColor.value = "";
        inputCedula.value = "";
        inputPlaca.value = "";

        divChips.forEach(div=>{
            div.classList.remove("selected");
        });

         divChipsEstados.forEach(div=>{
            div.classList.remove("selected");
        });

    }

}

class Admin {
    constructor(){


    }

    editarCita(){
       const btnGuardar = document.getElementById("btn-guardar");

       btnGuardar.style.display = "flex";

    }

}

const modal = new Modal();
const filtros = new Filtros();
const admin = new Admin();
function toggleAside() {
  document.querySelector("aside").classList.toggle("cerrado");
}