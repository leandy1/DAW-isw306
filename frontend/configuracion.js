let datos = [];

document.addEventListener("DOMContentLoaded", async () => {
    await actualizarInfo();
    parametros.mostrarListas();
});

class Parametros {

    constructor() {
     
    }

    guardar() {
        localStorage.setItem("Datos", JSON.stringify(this.obj));
    }

  agregarServicio() {

    const nombre = document.getElementById("input-servicio").value.trim();
    const precio = document.getElementById("input-precio").value;

    if (nombre === "" || precio === "") {
        mostrarMensaje("No puedes enviar un elemento vacio", "mensaje-error");
        return;
    }

    fetch("http://localhost:3000/api/configuracion/servicio", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre,
            precio,
            grupo_id: null
        })
    })
    .then(async (respuesta) => {

        if (!respuesta.ok) {
            throw new Error("Error al agregar el servicio");
        }

        document.getElementById("input-servicio").value = "";
        document.getElementById("input-precio").value = "";

        mostrarMensaje("Servicio agregado correctamente", "exito");

        await actualizarInfo();
        parametros.mostrarListas();

    })
    .catch(error => {
        console.error(error);
        mostrarMensaje("Error al agregar el servicio", "mensaje-error");
    });

}

  agregarTecnico() {

    const nombre = document.getElementById("input-tecnico").value.trim();

    if (nombre === "") {
        mostrarMensaje("No puedes enviar un elemento vacio", "mensaje-error");
        return;
    }

    fetch("http://localhost:3000/api/configuracion/tecnico", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre })
    })
    .then(async (respuesta) => {

        if (!respuesta.ok) {
            throw new Error("Error al agregar el técnico");
        }

        document.getElementById("input-tecnico").value = "";

        mostrarMensaje("Técnico agregado correctamente", "exito");

        await actualizarInfo();
        parametros.mostrarListas();

    })
    .catch(error => {
        console.error(error);
        mostrarMensaje("Error al agregar el técnico", "mensaje-error");
    });

}

    agregarEstado() {

    const nombre = document.getElementById("input-estado").value.trim();

    if (nombre === "") {
        mostrarMensaje("No puedes enviar un elemento vacio", "mensaje-error");
        return;
    }

    fetch("http://localhost:3000/api/configuracion/estado", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre })
    })
    .then(async (respuesta) => {

        if (!respuesta.ok) {
            throw new Error("Error al agregar el estado");
        }

        document.getElementById("input-estado").value = "";

        mostrarMensaje("Estado agregado correctamente", "exito");

        await actualizarInfo();
        parametros.mostrarListas();

    })
    .catch(error => {
        console.error(error);
        mostrarMensaje("Error al agregar el estado", "mensaje-error");
    });

}

   agregarMarca() {

    const nombre = document.getElementById("input-marca").value.trim();

    if (nombre === "") {
        mostrarMensaje("No puedes enviar un elemento vacio", "mensaje-error");
        return;
    }

    fetch("http://localhost:3000/api/configuracion/marca", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre })
    })
    .then(async (respuesta) => {

        if (!respuesta.ok) {
            throw new Error("Error al agregar la marca");
        }

        document.getElementById("input-marca").value = "";

        mostrarMensaje("Marca agregada correctamente", "exito");

        await actualizarInfo();
        parametros.mostrarListas();

    })
    .catch(error => {
        console.error(error);
        mostrarMensaje("Error al agregar la marca", "mensaje-error");
    });

}

    agregarGrupo(){
        const nombre = document.getElementById("input-grupo").value;
        
        if (nombre === ''){
            mostrarMensaje("No puedes enviar un elemento vacio", "mensaje-error")
            return;
        }else{
            fetch("http://localhost:3000/api/configuracion/grupo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre })
            })
            .then(async () => {
              
                document.getElementById("input-grupo").value = "";
                await actualizarInfo();
                parametros.mostrarListas();
                mostrarMensaje("Grupo agregado correctamente", "exito");
            })
        }
       
    }

    eliminarItem(item, input){
        const servicios = datos.servicios;
        const tecnicos = datos.tecnicos;
        const marcas = datos.marcas;
        const estados = datos.estados;
        const grupos = datos.grupos;

        if(input === "servicio"){
            const servicio = servicios.find(s => s.nombre === item);
            const id = servicio.id;
          

            fetch(`http://localhost:3000/api/configuracion/servicio/${id}`, {method: "DELETE"})
            .then(async () => {
                
                await actualizarInfo();     
                parametros.mostrarListas();  
                mostrarMensaje("Servicio Eliminado correctamente", "exito");
            })
           

        }else if(input === "estado"){
            const estado = estados.find(e => e.nombre === item);
            const id = estado.id;
          

            fetch(`http://localhost:3000/api/configuracion/estado/${id}`, {method: "DELETE"})
            .then(async () => {
                
                await actualizarInfo();     
                parametros.mostrarListas();  
                mostrarMensaje("Estado Eliminado correctamente", "exito");
            })
           

        }else if (input === "tecnico"){
            const tecnico = tecnicos.find(t => t.nombre === item);
            const id = tecnico.id;
          

            fetch(`http://localhost:3000/api/configuracion/tecnico/${id}`, {method: "DELETE"})
            .then(async () => {
                
                await actualizarInfo();     
                parametros.mostrarListas();  
                mostrarMensaje("Tecnico Eliminado correctamente", "exito");
            })
            

        }else if (input === "marca"){
            const marca = marcas.find(s => s.nombre === item);
            const id = marca.id;
          

            fetch(`http://localhost:3000/api/configuracion/marca/${id}`, {method: "DELETE"})
            .then(async () => {
                
                await actualizarInfo();     
                parametros.mostrarListas();  
                mostrarMensaje("Marca Eliminado correctamente", "exito");
            })
           

        }else if (input === "grupos"){
            const grupo = grupos.find(s => s.nombre === item);
            const id = grupo.id;
          

            fetch(`http://localhost:3000/api/configuracion/grupo/${id}`, {method: "DELETE"})
            .then(async () => {
                
                await actualizarInfo();     
                parametros.mostrarListas();  
                mostrarMensaje("Grupo Eliminado correctamente", "exito");
            })
           
        }
    }
    mostrarListas(){
    

        // Arrays
        const servicios = datos.servicios;
        const tecnicos = datos.tecnicos;
        const marcas = datos.marcas;
        const estados = datos.estados;
        const grupos = datos.grupos;

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
                    <span>${tecnico.nombre}</span>
                    <button onclick="parametros.eliminarItem('${tecnico.nombre}','tecnico')" title="Eliminar">✕</button>
                    </li>
                `;
            });
            
            marcas.forEach(marca => {
                ulMarcas.innerHTML += `
                    <li>  
                    <span>${marca.nombre}</span>
                    <button onclick="parametros.eliminarItem('${marca.nombre}','marca')" title="Eliminar">✕</button>
                    </li>
                `;
            });

            estados.forEach(estado => {
                ulEstados.innerHTML += `
                    <li>  
                    <span>${estado.nombre}</span>
                    <button onclick="parametros.eliminarItem('${estado.nombre}','estado')" title="Eliminar">✕</button>
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
                                            <span>${s.nombre}</span>
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

        const grupoObj = datos.grupos.find(g => g.nombre === grupo);
        const servicioObj = grupoObj.servicios.find(s => s.nombre === servicio);

        const grupoId = grupoObj.id;
        const servicioId = servicioObj.id;

            fetch(`http://localhost:3000/api/configuracion/grupo/${grupoId}/servicio/${servicioId}`, {method: "DELETE"})
            .then(async () => {
                
                await actualizarInfo();     
                parametros.mostrarListas();  
                mostrarMensaje("Grupo Eliminado correctamente", "exito");
            })


    }
}


class Modal{
    constructor(){
        this.grupo;
    }

    manipularModal(estado, grupo){
        
        const modal = document.getElementById("modal-servicios");
        const servicios = datos.servicios;
        const ul = document.getElementById("modal-lista-servicios");
       
        if(estado === "Abrir"){

            // obtener servicios dentro de la categoria 
        const ulServicios = document.getElementById(`ul-servicios-${grupo}`);
        const spans = [...ulServicios.querySelectorAll("li span")];;
        const valores = spans.map(s => s.textContent);
        modal.classList.add("abierto");

    

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
        
            modal.classList.remove("abierto");
        }
    }

    confirmarServicios(){
        const ul = document.getElementById("modal-lista-servicios");
        const inputs = [...ul.querySelectorAll("li input")].filter(i => i.checked);
        const nombres = inputs.map(i => i.parentElement.querySelector("span").textContent);

        const servicioIds = nombres.map(nombre => {
            const servicio = datos.servicios.find(s => s.nombre === nombre);
            return servicio.id;
        });

        const grupo = datos.grupos.find(g => g.nombre === this.grupo);
        const grupoId = grupo.id;
       

        fetch(`http://localhost:3000/api/configuracion/grupo/${grupo.id}/servicios`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ servicios: servicioIds })
        })
        .then(async () => {
            await actualizarInfo();
            parametros.mostrarListas();
            mostrarMensaje("Servicios agregados correctamente", "exito");
            this.manipularModal("Cerrar", "");
        });
    }
}

const parametros = new Parametros();
const modal = new Modal();



async function actualizarInfo(){
    const respuesta = await fetch("http://localhost:3000/api/configuracion");
    const raw = await respuesta.json(); 

    datos = {
        servicios: raw.servicios || [],
        tecnicos: raw.tecnicos || [],
        estados: raw.estados || [],
        marcas: raw.marcas || [],
        grupos: raw.grupos.map(g => ({ ...g, servicios: g.servicios || [] }))  
    };
}

function toggleGrupo(header) {
    header.parentElement.classList.toggle("cerrado");
}


function mostrarMensaje(mensaje, tipo){
    const div = document.getElementById("config-mensaje");

    div.textContent = mensaje;
    div.className = tipo === "exito" ? "mensaje-exito" : "mensaje-error";
    setTimeout(() => { div.textContent = ""; div.className = "";},1500);
}

function toggleAside() {
  document.querySelector("aside").classList.toggle("cerrado");
}

