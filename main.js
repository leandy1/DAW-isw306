const botonEnviar = document.getElementById("enviar");

const correo = document.getElementById("correo");
const mensajeCorreo = document.getElementById("mensajeCorreo");

const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("registroForm");

  //selecciona todos los campos que tienen required
  const camposObligatorios = formulario.querySelectorAll(
    "input[required], select[required]",
  );

  // validarCampo valida si un campo es valido o no para enviar
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
  // itera sobre cada campo para aplicar la validacion
  camposObligatorios.forEach((campo) => {
    campo.addEventListener("input", (evento) => validarCampo(evento.target));
    campo.addEventListener("change", (evento) => validarCampo(evento.target));
    campo.addEventListener("blur", (evento) => validarCampo(evento.target));
  });

  correo.addEventListener("input", function () {
  if (regexCorreo.test(correo.value.trim())) {
    mensajeCorreo.textContent = "Correo válido";
    mensajeCorreo.style.color = "green";
  } else {
    mensajeCorreo.textContent = "Correo inválido";
    mensajeCorreo.style.color = "red";
  }
});
  // utilizado para mostrar los mensajes de error y exito
  function mostrarMensaje(contenido, clase) {
    const mensaje = document.getElementById("mensaje");
    mensaje.innerHTML = contenido;
    mensaje.classList.add(clase);
    if(contenido == "Registro guardado correctamente"){formulario.reset();}
   
    setTimeout(() => {
      mensaje.innerHTML = "";
      mensaje.classList.remove(clase);

      //itera sobre todos los campos y elimina el style al finalizar el envio
     camposObligatorios.forEach(campo => campo.removeAttribute("style"))
    }, 3000);
  }

  //guarda todos los datos de la cita en la local storage
  function guardarLocalStorage(cita) {
    let citas = JSON.parse(localStorage.getItem("Citas")) || [];
    cita.id = citas.length + 1;
    citas.push(cita);
    localStorage.setItem("Citas", JSON.stringify(citas));
  }

  document.addEventListener("submit", function (evento) {
    let formularioValido = true;
    if (!regexCorreo.test(correo.value.trim())) {
  formularioValido = false;
  mensajeCorreo.textContent = "Debe ingresar un correo válido";
  mensajeCorreo.style.color = "red";
  evento.preventDefault();
}

    // valida si todos los campos son correctos antes de enviar
    camposObligatorios.forEach((campo) => {
      const campoEsValido = validarCampo(campo);
      if (!campoEsValido) {
        formularioValido = false;
        mostrarMensaje("Por favor, completa correctamente los campos marcados en rojo.", "mensaje-error");
        evento.preventDefault();
      }
    });

    if (formularioValido) {
      evento.preventDefault();
     
      
      //informacion personal
      const nombre = document.getElementById("nombre").value;
      const apellido = document.getElementById("apellido").value;
      const cedula = document.getElementById("cedula").value;
      const telefono = document.getElementById("telefono").value;
      const correo = document.getElementById("correo").value;

      //selects
      const marcaSelect = document.getElementById("marca");
      const tipoServicioSelect = document.getElementById("tipo-servicio");
      const tecnicoAsignadoSelect = document.getElementById("tecnico-asignado");
      const estadoSelect = document.getElementById("estado");

      //informacion de vehiculo 
      const modelo = document.getElementById("modelo").value;
      const año = document.getElementById("año").value;
      const placa = document.getElementById("placa").value;
      const color = document.getElementById("color").value;
      const marca = marcaSelect.options[marcaSelect.selectedIndex].text;

      //informacion de cita
      const tipoServicio = tipoServicioSelect.options[tipoServicioSelect.selectedIndex].text;
      const tecnicoAsignado = tecnicoAsignadoSelect.options[tecnicoAsignadoSelect.selectedIndex].text;
      const estado = estadoSelect.options[estadoSelect.selectedIndex].text;
      const descripcion = document.getElementById("notas").value;

      let Cita = {
        nombre, apellido, cedula, telefono,correo,
        marca, modelo, año, placa, color,
        tipoServicio, tecnicoAsignado, estado, descripcion,
      };

      guardarLocalStorage(Cita);
      mostrarMensaje("Registro guardado correctamente", "mensaje-exito");
    } 
  });
});




