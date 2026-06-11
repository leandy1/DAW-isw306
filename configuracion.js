class Parametros {

    constructor() {
        this.obj = JSON.parse(localStorage.getItem("Datos"));
    }

    guardar() {
        localStorage.setItem("Datos", JSON.stringify(this.obj));
    }

    agregarServicio(){
        const nombre = document.getElementById("input-servicio").value;
        const precio = document.getElementById("input-precio").value;

        if (nombre === '' || precio === ''){
            mostrarMensaje("No puedes enviar un elemento vacio", "mensaje-error")
            return;
        }else{
            this.obj.servicios.push({nombre, precio})
            this.guardar();
            mostrarMensaje("Servicio agregado correctamente", "exito");
        }
       
    }

    agregarTecnico(){
        const nombre = document.getElementById("input-tecnico").value;
        
        if (nombre === ''){
            mostrarMensaje("No puedes enviar un elemento vacio", "mensaje-error")
            return;
        }else{
            this.obj.tecnicos.push(nombre)
            this.guardar();
            mostrarMensaje("Servicio agregado correctamente", "exito");
        }
       
    }

    agregarEstado(){
        const nombre = document.getElementById("input-estado").value;
        
        if (nombre === ''){
            mostrarMensaje("No puedes enviar un elemento vacio", "mensaje-error")
            return;
        }else{
            this.obj.estados.push(nombre)
            this.guardar();
            mostrarMensaje("Servicio agregado correctamente", "exito");
        }
       
    }

    agregarMarca(){
        const nombre = document.getElementById("input-marca").value;
        
        if (nombre === ''){
            mostrarMensaje("No puedes enviar un elemento vacio", "mensaje-error")
            return;
        }else{
            this.obj.marcas.push(nombre)
            this.guardar();
            mostrarMensaje("Servicio agregado correctamente", "exito");
        }
       
    }

    agregarGrupo(){
        const nombre = document.getElementById("input-grupo").value;
        
        if (nombre === ''){
            mostrarMensaje("No puedes enviar un elemento vacio", "mensaje-error")
            return;
        }else{
            this.obj.grupos.push({nombre, servicios: ""})
            this.guardar();
            mostrarMensaje("Servicio agregado correctamente", "exito");
        }
       
    }

    eliminarItem(item, input){
        const servicios = this.obj.servicios;
        const tecnicos = this.obj.tecnicos;
        const marcas = this.obj.marcas;
        const estados = this.obj.estados;
        const grupos = this.obj.grupos;

        if(input === "servicio"){
            const index = servicios.findIndex(s => s.nombre === item);
            servicios.splice(index, 1);
            this.guardar();
            mostrarMensaje("Servicio Eliminado correctamente", "exito");
           

        }else if(input === "estado"){
            const index = estados.findIndex(e => e.nombre === item);
            estados.splice(index, 1);
            this.guardar();
            mostrarMensaje("Estado Eliminado correctamente", "exito");
           

        }else if (input === "tecnico"){
            const index = tecnicos.findIndex(t => t.nombre === item);
            tecnicos.splice(index, 1);
            this.guardar();
            mostrarMensaje("Tecnico Eliminado correctamente", "exito");
            

        }else if (input === "marca"){
            const index = marcas.findIndex(m => m.nombre === item);
            marcas.splice(index, 1);
            this.guardar();
            mostrarMensaje("Marcas Eliminado correctamente", "exito");
           

        }else if (input === "grupos"){
            const index = grupos.findIndex(g => g.nombre === item);
            grupos.splice(index, 1);
            this.guardar();
            mostrarMensaje("Grupo Eliminado correctamente", "exito");
           
        }
    }
    mostrarListas(){
    this.obj = JSON.parse(localStorage.getItem("Datos"));

        // Arrays
        const servicios = this.obj.servicios;
        const tecnicos = this.obj.tecnicos;
        const marcas = this.obj.marcas;
        const estados = this.obj.estados;
        const grupos = this.obj.grupos;

        // Uls 
        const ulServicios = document.getElementById("lista-servicios");
        const ulTecnicos = document.getElementById("lista-tecnicos");
        const ulMarcas = document.getElementById("lista-marcas");
        const ulEstados = document.getElementById("lista-estados");
        const divGrupo = document.getElementById("lista-grupos");
        
        ulServicios.innerHTML = "";
        ulTecnicos.innerHTML = "";
        ulMarcas.innerHTML = "";
        ulEstados.innerHTML = "";
        divGrupo.innerHTML = "";

        // For Each para mostrar las listas
            servicios.forEach(servicio => {
                ulServicios.innerHTML += `
                    <li>  
                    <span>${servicio.nombre}</span> 
                    <span class="precio-badge">RD$ ${Number(servicio.precio)}</span>
                    <button onclick="parametros.eliminarItem('${servicio.nombre}', 'servicio')" title="Eliminar">✕</button>
                    </li>
                `;


            });

            tecnicos.forEach(tecnico => {
                ulTecnicos.innerHTML += `
                    <li>  
                    <span>${tecnico}</span>
                    <button onclick="parametros.eliminarItem('${tecnico}','tecnico')" title="Eliminar">✕</button>
                    </li>
                `;
            });
            
            marcas.forEach(marca => {
                ulMarcas.innerHTML += `
                    <li>  
                    <span>${marca}</span>
                    <button onclick="parametros.eliminarItem('${marca}','marca')" title="Eliminar">✕</button>
                    </li>
                `;
            });

            estados.forEach(estado => {
                ulEstados.innerHTML += `
                    <li>  
                    <span>${estado}</span>
                    <button onclick="parametros.eliminarItem('${estado}','estado')" title="Eliminar">✕</button>
                    </li>
                `;
            });

            grupos.forEach(grupo => {
            divGrupo.innerHTML += `
                <div class="grupo-item cerrado">
                    <div class="grupo-header" onclick="toggleGrupo(this)">
                        <span>${grupo.nombre}</span>
                        <div class="grupo-actions">
                            <span class="grupo-arrow">▼</span>
                            <button onclick="parametros.eliminarItem('${grupo.nombre}','grupos')">✕</button>
                        </div>
                    </div>
                    <div class="grupo-body">
                        <ul class="grupo-servicios" id="ul-servicios-${grupo.nombre}">
                            ${grupo.servicios.length === 0
                                ? `<li style="color:#aaa;">Sin servicios agregados</li>`
                                : grupo.servicios.map(s => `
                                <li>
                                    <span>${s}</span>
                                    <button onclick="parametros.eliminarItemGrupo('${grupo.nombre}',this)">✕</button>
                                </li>
                            `).join("")}
                        </ul>
                        <button class="btn-outline" onclick="modal.manipularModal('Abrir','${grupo.nombre}')">+ Agregar Servicio</button>
                    </div>
                </div>
            `;
        });    
    }
    eliminarItemGrupo (grupo, service){
        const li = service.parentElement;
        const servicio = li.querySelector("span").textContent;

        const obj = JSON.parse(localStorage.getItem("Datos"));
        const grupos = obj.grupos;

        const indexGrupo = grupos.findIndex(g =>g.nombre === grupo );
        const indexServicio = grupos[indexGrupo].servicios.findIndex(s => s === servicio)
      
        grupos[indexGrupo].servicios.splice(indexServicio, 1);

        localStorage.setItem("Datos", JSON.stringify(obj));

        mostrarMensaje("Marcas Eliminado correctamente", "exito");


    }
}


class Modal{
    constructor(){
        this.grupo;
    }

    manipularModal(estado, grupo){
        const obj = JSON.parse(localStorage.getItem("Datos"));
        const modal = document.getElementById("modal-servicios");
        const servicios = obj.servicios;
        const ul = document.getElementById("modal-lista-servicios");
       
        if(estado === "Abrir"){

            // obtener servicios dentro de la categoria 
        const ulServicios = document.getElementById(`ul-servicios-${grupo}`);
        const spans = [...ulServicios.querySelectorAll("li span")];;
        const valores = spans.map(s => s.textContent);
      

            modal.style.display = "flex";

            servicios.forEach(servicio => {
                if(!valores.includes(servicio.nombre)){
                    ul.innerHTML += `
                        <li>
                            <input type="checkbox" value="${servicio.nombre}">
                            <span>${servicio.nombre}</span>
                        </li>
                    `;
                }
            });

            return this.grupo = grupo;

        }else if (estado === "Cerrar"){

            ul.querySelectorAll("li").forEach(li => li.remove());
            modal.style.display = "none";
        }
    }

    confirmarServicios(){
        const obj = JSON.parse(localStorage.getItem("Datos"));
        const ul = document.getElementById("modal-lista-servicios");
        const li = [...ul.querySelectorAll("li input")].filter(input => input.checked);;
        let valores = li.map(i=>i.value);

        const grupos = obj.grupos;
        const indexGrupo = grupos.findIndex(g=> g.nombre === this.grupo);

      grupos[indexGrupo].servicios = [
            ...new Set([
            ...(grupos[indexGrupo].servicios || []),
            ...valores
            ])
        ];

        
        // Guardar todo el objeto Datos actualizado
        localStorage.setItem("Datos",JSON.stringify(obj));

        this.manipularModal("Cerrar", "");

        mostrarMensaje("Servicio Agregado Perfectamente","exito");

        

    }
}

const parametros = new Parametros();
const modal = new Modal();
const DEFAULTS = {
  servicios: [
    { nombre: "Cambio de aceite y filtro",precio: 800 },
    { nombre: "Frenos",                           precio: 1500},
    { nombre: "Suspensión y dirección",           precio: 2000},
    { nombre: "Transmisión y caja",               precio: 5000},
    { nombre: "Motor",                            precio: 8000},
    { nombre: "Correa de distribución",           precio: 3000},
    { nombre: "Diagnóstico eléctrico",            precio: 600  },
    { nombre: "Sistema de arranque y batería",    precio: 1200 },
    { nombre: "Luces y señales",                  precio: 500  },
    { nombre: "Sistema de carga",                 precio: 1800 },
    { nombre: "Hojalatería y pintura",            precio: 4000 },
    { nombre: "Vidrios y plásticos",              precio: 2500 },
    { nombre: "Aire acondicionado",               precio: 3500 },
    { nombre: "Alineación y balanceo",            precio: 900  },
    { nombre: "Cambio de gomas",                  precio: 700  },
    { nombre: "Inspección general",               precio: 400  },
  ],
  tecnicos: ["Técnico 1", "Técnico 2", "Técnico 3"],
  estados:  ["Completado", "Pendiente", "Esperando Pieza"],
  marcas:   ["RAV4", "HYUNDAI", "HONDA", "TOYOTA", "SUZUKI", "FORD"],
  grupos: [{nombre: "Mecanica", servicios:["Cambio de aceite y filtro","Frenos","Suspensión y dirección","Transmisión y caja","Motor","Correa de distribución"]},
  {nombre:"Electricidad", servicios:["Diagnóstico eléctrico","Sistema de arranque y batería","Luces y señales","Sistema de carga"]},
  {nombre: "Carroceria", servicios:["Hojalatería y pintura","Vidrios y plásticos"]},
  {nombre: "Otros", servicios:["Aire acondicionado","Alineación y balanceo","Cambio de gomas","Inspección general"]}]
};


document.addEventListener("DOMContentLoaded", () => {
    let datos = JSON.parse(localStorage.getItem("Datos")) || [];
    if(datos.length === 0){
       localStorage.setItem("Datos", JSON.stringify(DEFAULTS));
    }
    
   parametros.mostrarListas();

});



function toggleGrupo(header) {
    header.parentElement.classList.toggle("cerrado");
}


function mostrarMensaje(mensaje, tipo){
    const div = document.getElementById("config-mensaje");

    div.textContent = mensaje;
    div.className = tipo === "exito" ? "mensaje-exito" : "mensaje-error";
    setTimeout(() => { div.textContent = ""; div.className = ""; parametros.mostrarListas();},1500);
}

function toggleAside() {
  document.querySelector("aside").classList.toggle("cerrado");
}

