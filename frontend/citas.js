let citas = [];
const contenedorCompletados = document.getElementById("col-completado");
const contenedorPendientes = document.getElementById("col-pendiente");
const contenedorEsperando = document.getElementById("col-espera");
const spanCoteoCompletadas = document.getElementById("contador-completado");
const spanCoteoPendientes = document.getElementById("contador-pendiente");
const spanCoteoEsperando = document.getElementById("contador-espera");


document.addEventListener("DOMContentLoaded", async () => {
 
    await actualizarInfo();
    if (!contenedorCompletados) return;
    await filtros.mostrarOpcionesFiltrado();
    await mostrarCitas();
    
    
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
                                        <button class="modal-service-remove" style="display:none" onclick="admin.eliminarServicioCita('${s.trim()}')">✕</button>
                                    </span>`
                                ).join('')}
                                <button class="modal-service-add" style="display:none" onclick="modal.manipularServiciosCita()">+</button>
                            </div>
                        </div>

                        <div class="modal-section">
                            <p class="modal-section-title">Descripción</p>
                            <div class="modal-desc-box modal-info-val" data-campo="descripcion">${descripcion}</div>
                        </div>

                    </div>
                    <div class="modal-custom-footer">
                        <button class="btn-eliminar-modal" onclick="admin.eliminarCita(${idCita})">Eliminar</button>
                        <div style="display:flex; gap:8px;">
                        <button class="btn-editar-modal" id="btn-editar" onclick="modal.toggleEditar(${idCita})">Editar</button>
                        <button class="btn-secondary"onclick="modal.manipularModal('Cerrar')" >Cerrar</button>
                        <button class="btn-primary"     id="btn-guardar" onclick="admin.guardarCambios(${idCita})" style="display:none">Guardar</button>
                    </div>
                `;

            });
        
        }else if (estado === "Cerrar"){
            modal.style.display = "none";
            btnGuardar.style.display = "none";

            btnEditar.classList.remove("activo");
            btnEditar.textContent = "Editar";
            this.editando = false;
            mostrarCitas();
           
        }
    }

   async manipularServiciosCita(){

  
        const modalServicios = document.getElementById("modal-servicios");
        const lista = document.getElementById("modal-servicios-lista");

        
        const respuesta = await fetch("http://localhost:3000/api/configuracion");
        const raw = await respuesta.json();
        const servicios = raw.servicios;

        
        const serviciosEnCita = [...document.querySelectorAll(".modal-service-tag")]
            .map(tag => tag.firstChild.textContent.trim());

        lista.innerHTML = "";

        servicios.forEach(servicio => {
            if (!serviciosEnCita.includes(servicio.nombre)) {
                lista.innerHTML += `
                    <label class="servicio-opcion">
                        <input type="checkbox" value="${servicio.nombre}">
                        <span>${servicio.nombre}</span>
                        <span class="servicio-precio">RD$ ${Number(servicio.precio)}</span>
                    </label>
                `;
            }
        });

        modalServicios.style.display = "flex";
  
    
}

    async toggleEditar(idCita) {
        const btnEditar  = document.getElementById("btn-editar");
        const btnGuardar = document.getElementById("btn-guardar");

        this.editando = !this.editando;
        this.idCita = idCita;

        // Traer marcas y tecnicos
        const respuesta = await fetch("http://localhost:3000/api/configuracion");
        const config = await respuesta.json();
        const marcas = config.marcas;
        const tecnicos = config.tecnicos;

        const campos = document.querySelectorAll("#contenido-modal .modal-info-val[data-campo]");

        campos.forEach(el => {
            if (this.editando) {
                const campo = el.dataset.campo;
                    
                if (campo === "marca") {
                    const select = document.createElement("select");
                    select.className = "modal-info-val editable";
                    select.dataset.campo = campo;
                    marcas.forEach(m => {
                        select.innerHTML += `<option value="${m.nombre}" ${el.textContent.trim() === m.nombre ? "selected" : ""}>${m.nombre}</option>`;
                    });
                    el.replaceWith(select);

                } else if (campo === "tecnicoAsignado") {
                    const select = document.createElement("select");
                    select.className = "modal-info-val editable";
                    select.dataset.campo = campo;
                    tecnicos.forEach(t => {
                        select.innerHTML += `<option value="${t.nombre}" ${el.textContent.trim() === t.nombre ? "selected" : ""}>${t.nombre}</option>`;
                    });
                    el.replaceWith(select);

                } else {
                    const input = document.createElement("input");
                    input.type = "text";
                    input.value = el.textContent.trim();
                    input.className = "modal-info-val editable";
                    input.dataset.campo = campo;
                    el.replaceWith(input);
                }

            } else {
                const span = document.createElement("span");
                span.className = "modal-info-val";
                span.dataset.campo = el.dataset.campo;
                span.textContent = el.tagName === "SELECT" ? el.value : el.value;
                el.replaceWith(span);
            }
        });

        document.querySelectorAll(".modal-service-remove").forEach(btn => {
            btn.style.display = this.editando ? "flex" : "none";
        });

        const addBtn = document.querySelector(".modal-service-add");
        if (addBtn) addBtn.style.display = this.editando ? "flex" : "none";

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
        let contenedor;
        //limpia el contenedor para mostrar las citas filtradas
        contenedorCompletados.innerHTML= "";
        contenedorEsperando.innerHTML= "";
        contenedorPendientes.innerHTML= "";

        //limpia el conteo de citas
        spanCoteoCompletadas.textContent = 0;
        spanCoteoEsperando.textContent = 0;
        spanCoteoPendientes.textContent = 0;

        if(!datos.length){
            emptyCompletada.style.display = "flex";
            emptyPendiente.style.display = "flex";
            emptyEsperando.style.display = "flex";
        }else{
            
            emptyCompletada.style.display = "none";
            emptyPendiente.style.display = "none";
            emptyEsperando.style.display = "none";

            datos.forEach(dato=>{
                let claseEstado = "";
                if (dato.estado === "Completado")   {
                    let conteo = 0;
                    contenedor = contenedorCompletados
                    claseEstado = "activo-estado";

                    conteo++;
                    spanCoteoCompletadas.textContent = conteo;
                }
                     
                else if (dato.estado === "Pendiente") { 
                    let conteo = 0; 
                    contenedor = contenedorPendientes
                    claseEstado = "pendiente-estado";

                    conteo++;
                    spanCoteoPendientes.textContent = conteo;
                }
                else if (dato.estado === "Esperando Pieza") { 
                    let conteo = 0;
                    contenedor = contenedorEsperando
                    claseEstado = "espera-pieza-estado";

                    conteo++;
                    spanCoteoEsperando.textContent = conteo;
                }
                else{claseEstado = "chip"}


                contenedor.innerHTML += `
                    <div class="cita-card">
        
                        <div class="cita-card-top">
                            <div class="cita-numero">#${dato.id}</div>
                            <span class="${claseEstado}" ondblclick="admin.cambiarEstado(this, ${dato.id})">${dato.estado}</span>
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
                                <span class="cita-valor cita-info-vehiculo">${dato.marca} ${dato.modelo} — ${dato.anio}</span>
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

    filtrarPersonal(input){
        const div = input.parentElement;
      
        const campo = div.querySelector('label').textContent.toLowerCase();  
          
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

        const campo = div.querySelector('label').textContent.toLowerCase();  
        const valor = input.value.toLowerCase();

        const campoMarca = document.getElementById("f-marca").value.toLowerCase();  
        const campoModelo = document.getElementById("f-modelo").value.toLowerCase();  
        const campoAño = document.getElementById("f-ano").value.toLowerCase();  
        const campoColor = document.getElementById("f-color").value.toLowerCase();  
        const campoPlaca = document.getElementById("f-placa").value.toLowerCase();  
        
        
        let resultado;
        if (campo === "marca"){
            console.log(citas);
            resultado = citas.filter(cita=> cita[campo].toLowerCase().startsWith(valor) 
            && cita.modelo.toLowerCase().startsWith(campoModelo)
            && String(cita.anio).toLowerCase().startsWith(campoAño)
            && cita.color.toLowerCase().startsWith(campoColor)
            && cita.placa.toLowerCase().startsWith(campoPlaca));
         
        }else if (campo === "modelo"){
            resultado = citas.filter(cita=> cita[campo].toLowerCase().startsWith(valor) 
            && cita.marca.toLowerCase().startsWith(campoMarca)
            && String(cita.anio).toLowerCase().startsWith(campoAño)
            && cita.color.toLowerCase().startsWith(campoColor)
            && cita.placa.toLowerCase().startsWith(campoPlaca));
          
        }else if (campo === "año"){
            resultado = citas.filter(cita=> String(cita.anio).toLowerCase().startsWith(valor) 
            && cita.marca.toLowerCase().startsWith(campoMarca)
            && cita.modelo.toLowerCase().startsWith(campoModelo)
            && cita.color.toLowerCase().startsWith(campoColor)
            && cita.placa.toLowerCase().startsWith(campoPlaca));

        }else if (campo === "color"){
            resultado = citas.filter(cita=> cita[campo].toLowerCase().startsWith(valor) 
            && cita.marca.toLowerCase().startsWith(campoMarca)
            && cita.modelo.toLowerCase().startsWith(campoModelo)
            && String(cita.año).toLowerCase().startsWith(campoAño)
            && cita.placa.toLowerCase().startsWith(campoPlaca));
          
        }else if (campo === "placa"){
          resultado = citas.filter(cita=> cita[campo].toLowerCase().startsWith(valor) 
            && cita.marca.toLowerCase().startsWith(campoMarca)
            && cita.modelo.toLowerCase().startsWith(campoModelo)
            && String(cita.año).toLowerCase().startsWith(campoAño)
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


    }

    async mostrarOpcionesFiltrado(){
        const chipsTecnicos = document.getElementById("chips-tecnicos");
        

          // Traer estados y tecnicos
        const respuesta = await fetch("http://localhost:3000/api/configuracion");
        const config = await respuesta.json();
        const tecnicos = config.tecnicos;

        chipsTecnicos.innerHTML = "";

         tecnicos.forEach(tecnico=>{
    
            chipsTecnicos.innerHTML += `
                    <div class="chip" onclick="filtros.filtrarTecnico(this)">${tecnico.nombre}</div>
                `;
        })

    }

}

class Admin {
    constructor(){
    }


   eliminarServicioCita(servicio){
        const idCita = modal.idCita;

        fetch(`http://localhost:3000/api/citas/${idCita}/servicio`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ servicio })
        })
        .then(async () => {
            await actualizarInfo();
            modal.manipularModal('Cerrar');
            modal.manipularModal('Abrir', idCita);
        });
    }

    agregarServicioCita(){
        const lista = document.getElementById("modal-servicios-lista");
        const checks = [...lista.querySelectorAll("input:checked")];
        const idCita = modal.idCita;
     
        
        const promesas = checks.map(input =>
            
            fetch(`http://localhost:3000/api/citas/${idCita}/servicio/add`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ servicio: input.value })
            })
            
        );

        Promise.all(promesas).then(async () => {
            await actualizarInfo();
            document.getElementById("modal-servicios").style.display = "none";
            modal.manipularModal('Cerrar');
            modal.manipularModal('Abrir', idCita);
        });
    }

    eliminarCita(id){
        const modal = document.getElementById("modal-Citas");

        fetch(`http://localhost:3000/api/citas/${id}`,{method:"DELETE"})
        .then(async () => {
            modal.style.display = "none";
            await actualizarInfo();
            filtros.mostrarFiltrado(citas);
        })

    }

    guardarCambios(idCita){
        const campos = document.querySelectorAll("#contenido-modal .modal-info-val[data-campo]");
        
        const data = {};
        campos.forEach(el => {
            data[el.dataset.campo] = el.tagName === "SELECT" ? el.value : el.value;
        });

        // anio viene como "año" en el data-campo, corregir
        if (data["año"]) {
            data.anio = data["año"];
            delete data["año"];
        }
        // Tomar el total de la cita actual
        const citaActual = citas.find(c => c.id === idCita);
        data.total = citaActual.total;

        fetch(`http://localhost:3000/api/citas/${idCita}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(async () => {
            await actualizarInfo();
            mostrarCitas();
            modal.manipularModal('Cerrar');
            modal.editando = false;
        });

    
    }
    
   async cambiarEstado(span, idCita) {
    const respuesta = await fetch("http://localhost:3000/api/configuracion");
    const config = await respuesta.json();
    const estados = config.estados;

    const select = document.createElement("select");
    select.className = span.className;

    estados.forEach(e => {
        select.innerHTML += `<option value="${e.nombre}" ${e.nombre === span.textContent.trim() ? "selected" : ""}>${e.nombre}</option>`;
    });

    select.addEventListener("change", async () => {
        // Modifica el numero de citas dentro de la columna
        if (span.textContent == "Completado"){
            let valor = parseInt(spanCoteoCompletadas.textContent);
            if (valor != 0){spanCoteoCompletadas.textContent = valor - 1}

        }else if (span.textContent == "Pendiente"){
            let valor = parseInt(spanCoteoPendientes.textContent);
            if (valor != 0){spanCoteoPendientes.textContent = valor - 1}

        }else if (span.textContent == "Esperando Pieza"){
            let valor = parseInt(spanCoteoEsperando.textContent);
            if (valor != 0){spanCoteoEsperando.textContent = valor - 1}
           
        }

        await fetch(`http://localhost:3000/api/citas/${idCita}/estado`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ estado: select.value })
        });
        await actualizarInfo();
        mostrarCitas(); 
    });

    select.addEventListener("blur", () => {
        select.replaceWith(span);
    });

    span.replaceWith(select);
    select.focus();
}

}

const modal = new Modal();
const filtros = new Filtros();
const admin = new Admin();

async function actualizarInfo(){
    const respuesta = await fetch("http://localhost:3000/api/citas");
    const raw = await respuesta.json(); 

    citas = raw;
}
function toggleAside() {
  document.querySelector("aside").classList.toggle("cerrado");
}

function toggleColumna(columna){
    const section = columna.parentElement;
    const conteoCita = parseInt(columna.querySelector(".columna-contador").textContent);
    const empty = section.querySelector(".empty-state");
    const vacio = conteoCita === 0;

    section.classList.toggle("colapsada");
    const estaColapsada = section.classList.contains("colapsada");

    empty.classList.toggle("oculto", estaColapsada || !vacio);
   
    
  
}
function mostrarCitas(){
 
        contenedorCompletados.innerHTML = "";
        contenedorEsperando.innerHTML = "";
        contenedorPendientes.innerHTML = "";
        let contenedor;
        spanCoteoCompletadas.textContent = 0;
        spanCoteoPendientes.textContent = 0;
        spanCoteoEsperando.textContent = 0;
    
    citas.forEach((cita) => {
        
        let claseEstado = "";

        if (cita.estado === "Completado"){
            let conteo = 0;
            
            claseEstado = "activo-estado";

            contenedor = contenedorCompletados;
            
            spanCoteoCompletadas.textContent = Number(spanCoteoCompletadas.textContent) + 1;

     
        }       
        else if (cita.estado === "Pendiente"){
            let conteo = 0;
            claseEstado = "pendiente-estado";
            contenedor = contenedorPendientes;

            conteo++;
            spanCoteoPendientes.textContent = Number(spanCoteoPendientes.textContent) + 1;
          
        }  
        else if (cita.estado === "Esperando Pieza"){
            let conteo = 0;
            claseEstado = "espera-pieza-estado";
            contenedor = contenedorEsperando;

            conteo++;
            spanCoteoEsperando.textContent = Number(spanCoteoEsperando.textContent) + 1;
           
        } 
        else{claseEstado = "chip"};
        
         contenedor.innerHTML += `
                <div class="cita-card">
    
                    <div class="cita-card-top">
                        <div class="cita-numero">#${cita.id}</div>
                        <span class="${claseEstado}" ondblclick="admin.cambiarEstado(this, ${cita.id})">${cita.estado}</span>
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

    emptyState();
}

function emptyState(){

     const columnas = [
        { contenedor: contenedorPendientes, empty: document.getElementById("empty-pendiente") },
        { contenedor: contenedorEsperando,   empty: document.getElementById("empty-esperando") },
        { contenedor: contenedorCompletados, empty: document.getElementById("empty-completadas") },
    ];

    columnas.forEach(({ contenedor, empty }) => {
        const vacio = contenedor.children.length === 0;
        empty.classList.toggle("oculto", !vacio);
        contenedor.classList.toggle("oculto", vacio);
    });
    
    
}