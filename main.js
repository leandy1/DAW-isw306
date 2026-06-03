const btnEnviar = document.getElementById("enviar");


document.addEventListener('submit', 
    function(){

            // Variables
                // Datos personales
            const nombre = document.getElementById("nombre").value;
            const apellido = document.getElementById("apellido").value;
            const cedula = document.getElementById("cedula").value;
            const telefono = document.getElementById("telefono").value;

                //Selects
            const marcaSelect = document.getElementById("marca");
            const tipoServicioSelect = document.getElementById("tipo-servicio");
            const tecnicoAsignadoSelect = document.getElementById("tecnico-asignado");
            const estadoSelect = document.getElementById("estado");
            
                //Datos del Vehiculo 
            const modelo = document.getElementById("modelo").value;
            const año = document.getElementById("año").value;
            const placa = document.getElementById("placa").value;
            const color = document.getElementById("color").value;
            const marca = marcaSelect.options[marcaSelect.selectedIndex].text;

                // Orden del servicio
            const tipoServicio = tipoServicioSelect.options[tipoServicioSelect.selectedIndex].text;
            const tecnicoAsignado = tecnicoAsignadoSelect.options[tecnicoAsignadoSelect.selectedIndex].text;
            const estado = estadoSelect.options[estadoSelect.selectedIndex].text;
            const descripcion = document.getElementById("notas").value;

        

            let Cita = {
                nombre: nombre,
                apellido: apellido,
                cedula: cedula,
                telefono: telefono,
                marca: marca,
                modelo : modelo,
                año : año,
                placa: placa,
                color: color,
                tipoServicio: tipoServicio,
                tecnicoAsignado: tecnicoAsignado,
                estado: estado,
                descripcion: descripcion
            }

          guardarLocalStorage(Cita);


    }
)




function guardarLocalStorage(cita){

    let citas = JSON.parse(localStorage.getItem("Citas")) || [];
    
    console.log(citas);
     debugger;
    cita.id = citas.length + 1;
    
    citas.push(cita);
    

    localStorage.setItem("Citas", JSON.stringify(citas));

}