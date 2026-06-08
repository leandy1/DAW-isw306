document.addEventListener("DOMContentLoaded", ()=>{
    const obj = JSON.parse(localStorage.getItem("Datos"));
    const grupos = obj.grupos;
    const servicios = obj.servicios;
    const tecnicos = obj.tecnicos;
    const estados = obj.estados;
    
    const div = document.getElementById("tipo-servicio");
    const selectTecnico = document.getElementById("tecnico-asignado");
    const selectEstado = document.getElementById("estado");

    grupos.forEach(grupo => {

        div.innerHTML += `
            <p class="grupo-label ">${grupo.nombre}</p>
        `;

        grupo.servicios.forEach(nombreServicio => {

            const servicioObj = servicios.find(
                s => s.nombre === nombreServicio
            );

            div.innerHTML += `
                <label class="servicios-form">
                    <input type="checkbox" value="${nombreServicio}">
                    <span class"nombre-servicio">${nombreServicio}</span>
                    <span class="precio-badge ">
                        RD$ ${servicioObj ? servicioObj.precio : 0}
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



})