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
    
    mostrarListas();

});

function mostrarListas(){
    const obj = JSON.parse(localStorage.getItem("Datos"));

    // Arrays
    const servicios = obj.servicios;
    const tecnicos = obj.tecnicos;
    const marcas = obj.marcas;
    const estados = obj.estados;
    const grupos = obj.grupos;

    // Uls 
    const ulServicios = document.getElementById("lista-servicios");
    const ulTecnicos = document.getElementById("lista-tecnicos");
    const ulMarcas = document.getElementById("lista-marcas");
    const ulEstados = document.getElementById("lista-estados");
    const divGrupo = document.getElementById("lista-grupos");
        


// For Each para mostrar las listas
    servicios.forEach(servicio => {
        ulServicios.innerHTML += `
            <li>  
            <span>${servicio.nombre}</span> 
            <span class="precio-badge">RD$ ${Number(servicio.precio)}</span>
            <button onclick="eliminarItem('${servicio.nombre}', 'servicio')" title="Eliminar">✕</button>
            </li>
        `;


    });

    tecnicos.forEach(tecnico => {
        ulTecnicos.innerHTML += `
            <li>  
            <span>${tecnico}</span>
            <button onclick="eliminarItem('${tecnico.nombre}','tecnico')" title="Eliminar">✕</button>
            </li>
        `;
    });
    
     marcas.forEach(marca => {
        ulMarcas.innerHTML += `
            <li>  
            <span>${marca}</span>
            <button onclick="eliminarItem('${marca.nombre}','marca')" title="Eliminar">✕</button>
            </li>
        `;
    });

       estados.forEach(estado => {
        ulEstados.innerHTML += `
            <li>  
            <span>${estado}</span>
            <button onclick="eliminarItem('${estado.nombre}','estado')" title="Eliminar">✕</button>
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
                    <button onclick="eliminarItem('${grupo.nombre}','grupos')">✕</button>
                </div>
            </div>
            <div class="grupo-body">
                <ul class="grupo-servicios">
                    ${grupo.servicios.length === 0
                        ? `<li style="color:#aaa;">Sin servicios agregados</li>`
                        : grupo.servicios.map(s => `
                        <li>
                            <span>${s}</span>
                            <button onclick="eliminarServicioGrupo(this, '${grupo.nombre}')">✕</button>
                        </li>
                    `).join("")}
                </ul>
                <button class="btn-outline" onclick="abrirModal('${grupo.nombre}')">+ Agregar Servicio</button>
            </div>
        </div>
    `;
});
    
}


function agregarServicio(){
    const nombre = document.getElementById("input-servicio").value;
    const precio = document.getElementById("input-precio").value;

    if (nombre === '' || precio === ''){
        mostrarMensaje("No puedes enviar un elemento vacio", "mensaje-error")
        return;
    }else{
        let obj = JSON.parse(localStorage.getItem("Datos"));
    
        obj.servicios.push({nombre, precio})
    
        localStorage.setItem("Datos", JSON.stringify(obj));

        mostrarMensaje("Servicio agregado correctamente", "exito");
    }

    location.reload();
}


function agregarTecnico(){
    const nombre = document.getElementById("input-tecnico").value;
    
    if (nombre === ''){
        mostrarMensaje("No puedes enviar un elemento vacio", "mensaje-error")
        return;
    }else{
        let obj = JSON.parse(localStorage.getItem("Datos"));
    
        obj.tecnicos.push(nombre)
    
        localStorage.setItem("Datos", JSON.stringify(obj));

        mostrarMensaje("Servicio agregado correctamente", "exito");
    }

    location.reload();
}

function agregarEstado(){
    const nombre = document.getElementById("input-estado").value;
    
    if (nombre === ''){
        mostrarMensaje("No puedes enviar un elemento vacio", "mensaje-error")
        return;
    }else{
        let obj = JSON.parse(localStorage.getItem("Datos"));
    
        obj.estados.push(nombre)
    
        localStorage.setItem("Datos", JSON.stringify(obj));

        mostrarMensaje("Servicio agregado correctamente", "exito");
    }

    location.reload();
}

function agregarMarca(){
    const nombre = document.getElementById("input-marca").value;
    
    if (nombre === ''){
        mostrarMensaje("No puedes enviar un elemento vacio", "mensaje-error")
        return;
    }else{
        let obj = JSON.parse(localStorage.getItem("Datos"));
    
        obj.marcas.push(nombre)
    
        localStorage.setItem("Datos", JSON.stringify(obj));

        mostrarMensaje("Servicio agregado correctamente", "exito");
    }

    location.reload();
}

function agregarGrupo(){
    const nombre = document.getElementById("input-grupo").value;
    
    if (nombre === ''){
        mostrarMensaje("No puedes enviar un elemento vacio", "mensaje-error")
        return;
    }else{
        let obj = JSON.parse(localStorage.getItem("Datos"));
    
        obj.grupos.push({nombre, servicios: ""})
    
        localStorage.setItem("Datos", JSON.stringify(obj));

        mostrarMensaje("Servicio agregado correctamente", "exito");
    }

    location.reload();
    
}

function eliminarItem (item, input){

    //Obj
    const obj = JSON.parse(localStorage.getItem("Datos"));

    // Arrays
    const servicios = obj.servicios;
    const tecnicos = obj.tecnicos;
    const marcas = obj.marcas;
    const estados = obj.estados;
    const grupos = obj.grupos;

    if(input === "servicio"){
        const index = servicios.findIndex(s => s.nombre === item);
        
        servicios.splice(index, 1);

        localStorage.setItem("Datos", JSON.stringify(obj));

        mostrarMensaje("Servicio Eliminado correctamente", "exito");

        location.reload();

    }else if(input === "estado"){
        const index = estados.findIndex(e => e.nombre === item);
        
        estados.splice(index, 1);

        localStorage.setItem("Datos", JSON.stringify(obj));

        mostrarMensaje("Estado Eliminado correctamente", "exito");

        location.reload();

    }else if (input === "tecnico"){
        const index = tecnicos.findIndex(t => t.nombre ===item);
        
        tecnicos.splice(index, 1);

        localStorage.setItem("Datos", JSON.stringify(obj));

        mostrarMensaje("Tecnico Eliminado correctamente", "exito");

        location.reload();

    }else if (input === "marca"){
        const index = marcas.findIndex(m => m.nombre === item);
        
        marcas.splice(index, 1);

        localStorage.setItem("Datos", JSON.stringify(obj));

        mostrarMensaje("Marcas Eliminado correctamente", "exito");

        location.reload();

    }else if (input === "grupos"){
        const index = grupos.findIndex(g => g.nombre === item);
        
        grupos.splice(index, 1);

        localStorage.setItem("Datos", JSON.stringify(obj));

        mostrarMensaje("Marcas Eliminado correctamente", "exito");

        location.reload();

    }
  
}

function toggleGrupo(header) {
    console.log(header);
    header.parentElement.classList.toggle("cerrado");
}





function mostrarMensaje(mensaje, tipo){
    const div = document.getElementById("config-mensaje");

    div.textContent = mensaje;
    div.className = tipo === "exito" ? "mensaje-exito" : "mensaje-error";
    setTimeout(() => { div.textContent = ""; div.className = ""; }, 2500);

}

