const DEFAULTS = {
  servicios: [
    { nombre: "Cambio de aceite y filtro",precio: 800  },
    { nombre: "Frenos",                           precio: 1500 },
    { nombre: "Suspensión y dirección",           precio: 2000 },
    { nombre: "Transmisión y caja",               precio: 5000 },
    { nombre: "Motor",                            precio: 8000 },
    { nombre: "Correa de distribución",           precio: 3000 },
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
  marcas:   ["RAV4", "HYUNDAI", "HONDA", "TOYOTA", "SUZUKI", "FORD"]
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

    // Uls 
    const ulServicios = document.getElementById("lista-servicios");
    const ulTecnicos = document.getElementById("lista-tecnicos");
    const ulMarcas = document.getElementById("lista-marcas");
    const ulEstados = document.getElementById("lista-estados");
        


// For Each para mostrar las listas
    servicios.forEach(servicio => {
        ulServicios.innerHTML += `
            <li>  
            <span>${servicio.nombre}</span> 
            <span class="precio-badge">RD$ ${Number(servicio.precio)}</span>
            <button onclick="eliminarItem(this, 'servicio')" title="Eliminar">✕</button>
            </li>
        `;
    });

    tecnicos.forEach(tecnico => {
        ulTecnicos.innerHTML += `
            <li>  
            <span>${tecnico}</span>
            <button onclick="eliminarItem(this,'tecnico')" title="Eliminar">✕</button>
            </li>
        `;
    });
    
     marcas.forEach(marca => {
        ulMarcas.innerHTML += `
            <li>  
            <span>${marca}</span>
            <button onclick="eliminarItem(this,'marca')" title="Eliminar">✕</button>
            </li>
        `;
    });

       estados.forEach(estado => {
        ulEstados.innerHTML += `
            <li>  
            <span>${estado}</span>
            <button onclick="eliminarItem(this,'estado')" title="Eliminar">✕</button>
            </li>
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

function eliminarItem (lista, input){
    const li = lista.parentElement;
    const nombre = li.querySelector("span").textContent;

    //Obj
    const obj = JSON.parse(localStorage.getItem("Datos"));

    // Arrays
    const servicios = obj.servicios;
    const tecnicos = obj.tecnicos;
    const marcas = obj.marcas;
    const estados = obj.estados;

    if(input === "servicio"){
        const index = servicios.findIndex(s => s.nombre === nombre);
        
        servicios.splice(index, 1);

        localStorage.setItem("Datos", JSON.stringify(obj));

        mostrarMensaje("Servicio Eliminado correctamente", "exito");

        location.reload();

    }else if(input === "estado"){
        const index = estados.findIndex(e => e.nombre === nombre);
        
        estados.splice(index, 1);

        localStorage.setItem("Datos", JSON.stringify(obj));

        mostrarMensaje("Estado Eliminado correctamente", "exito");

        location.reload();

    }else if (input === "tecnico"){
        const index = tecnicos.findIndex(t => t.nombre === nombre);
        
        tecnicos.splice(index, 1);

        localStorage.setItem("Datos", JSON.stringify(obj));

        mostrarMensaje("Tecnico Eliminado correctamente", "exito");

        location.reload();

    }else if (input === "marca"){
        const index = marcas.findIndex(m => m.nombre === nombre);
        
        marcas.splice(index, 1);

        localStorage.setItem("Datos", JSON.stringify(obj));

        mostrarMensaje("Marcas Eliminado correctamente", "exito");

        location.reload();

    }

  
}


function mostrarMensaje(mensaje, tipo){
    const div = document.getElementById("config-mensaje");

    div.textContent = mensaje;
    div.className = tipo === "exito" ? "mensaje-exito" : "mensaje-error";
    setTimeout(() => { div.textContent = ""; div.className = ""; }, 2500);

}

