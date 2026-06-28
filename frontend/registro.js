let datos = [];
document.addEventListener("DOMContentLoaded", async ()=>{
    await apiInformacion();

    const grupos = datos.grupos;
    const servicios = datos.servicios;
    const tecnicos = datos.tecnicos;
    const estados = datos.estados;
    const marcas = datos.marcas;
  
    const div = document.getElementById("tipo-servicio");
    const selectTecnico = document.getElementById("tecnico-asignado");
    const selectEstado = document.getElementById("estado");
    const selectMarca = document.getElementById("marca");

    grupos.forEach(grupo => {
        console.log(grupo)
        div.innerHTML += `
            <p class="grupo-label ">${grupo.nombre}</p>
        `;

        grupo.servicios.forEach(servicio => {
              
            div.innerHTML += `
                <label class="servicios-form">
                    <input type="checkbox" value="${servicio.nombre}">
                    <span class="nombre-servicio">${servicio.nombre}</span>
                    <span class="precio-badge ">
                        RD$ ${servicio.precio}
                    </span>
                </label>
            `;
        });

    });


    tecnicos.forEach(tecnico=>{
         selectTecnico.innerHTML += `
                <option value="${tecnico}">${tecnico}</option>   
            `;

    })

     estados.forEach(estado=>{
         selectEstado.innerHTML += `
                <option value="${estado}">${estado}</option>   
            `;

    })

    marcas.forEach(marca=>{
        selectMarca.innerHTML += `
                <option value="${marca}">${marca}</option>   
            `;
    });
     
})

// actualiza el total de registro
document.getElementById("tipo-servicio").addEventListener("change", function(e) {
    if (e.target.type === "checkbox") {
        if (e.target.checked) {
            const precio = Number(e.target.parentElement.querySelector(".precio-badge").textContent.trim().replace("RD$", "").trim());
            const span = document.getElementById("span-total");
            const spanTotal = Number(document.getElementById("span-total").textContent.trim().replace("$","").trim());
            let total = spanTotal + precio;

            span.textContent = total + "$";

        } else {
            const precio = Number(e.target.parentElement.querySelector(".precio-badge").textContent.trim().replace("RD$", "").trim());
            const span = document.getElementById("span-total");
            const spanTotal = Number(document.getElementById("span-total").textContent.trim().replace("$","").trim());
            let total = spanTotal - precio;

            span.textContent = total + "$";
        }
    }
});

function toggleAside() {
  document.querySelector("aside").classList.toggle("cerrado");
}

async function apiInformacion() {
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