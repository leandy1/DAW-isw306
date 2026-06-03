const botonEnviar = document.getElementById("enviar");

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("registroForm");
  const camposObligatorios = formulario.querySelectorAll(
    "input[required], select[required]",
  );

  function validarCampo(campo) {
    const valorEscrito = campo.value.trim();
    campo.style.outline = "none";
    let esValido = false;

    if (valorEscrito === "" || valorEscrito === "null") {
      campo.style.border = "2px solid red";
      esValido = false;
    } else if (campo.tagName !== "SELECT" && valorEscrito.length < 3) {
      campo.style.border = "2px solid red";
      esValido = false;
    } else {
      campo.style.border = "2px solid green";
      esValido = true;
    }
    return esValido;
  }

  camposObligatorios.forEach((campo) => {
    campo.addEventListener("input", (evento) => validarCampo(evento.target));
    campo.addEventListener("change", (evento) => validarCampo(evento.target));
    campo.addEventListener("blur", (evento) => validarCampo(evento.target));
  });

  document.addEventListener("submit", function (evento) {
   
    let formularioValido = true;

    camposObligatorios.forEach((campo) => {
      const campoEsValido = validarCampo(campo);

      if (!campoEsValido) {
        formularioValido = false;
         evento.preventDefault();
      }
    });

    if (formularioValido) {
      // Agregar: parrafo con timer color verde que diga agregado

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
      const tipoServicio =
        tipoServicioSelect.options[tipoServicioSelect.selectedIndex].text;
      const tecnicoAsignado =
        tecnicoAsignadoSelect.options[tecnicoAsignadoSelect.selectedIndex].text;
      const estado = estadoSelect.options[estadoSelect.selectedIndex].text;
      const descripcion = document.getElementById("notas").value;

      let Cita = {
        nombre: nombre,
        apellido: apellido,
        cedula: cedula,
        telefono: telefono,
        marca: marca,
        modelo: modelo,
        año: año,
        placa: placa,
        color: color,
        tipoServicio: tipoServicio,
        tecnicoAsignado: tecnicoAsignado,
        estado: estado,
        descripcion: descripcion,
      };

      guardarLocalStorage(Cita);
    } else {
      alert("Por favor, completa correctamente los campos marcados en rojo.");
    }
  });
});

function guardarLocalStorage(cita) {
  let citas = JSON.parse(localStorage.getItem("Citas")) || [];

  cita.id = citas.length + 1;

  citas.push(cita);

  localStorage.setItem("Citas", JSON.stringify(citas));
}
