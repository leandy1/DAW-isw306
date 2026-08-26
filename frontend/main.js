//Variables Globales
const botonEnviar = document.getElementById("enviar");
const correo = document.getElementById("correo");

document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("registroForm");
    const camposObligatorios = formulario.querySelectorAll("input[required], select[required]");

    // ==================== VALIDACIONES ====================

    camposObligatorios.forEach((campo) => {
        campo.addEventListener("input", (evento) => validarCampo(evento.target));
        campo.addEventListener("change", (evento) => validarCampo(evento.target));
        campo.addEventListener("blur", (evento) => validarCampo(evento.target));
    });

    correo.addEventListener("input", function () {
        if (validarCorreo()) {
            correo.style.outline = "none";
            correo.style.border = "2px solid green";
        } else {
            correo.style.outline = "none";
            correo.style.border = "2px solid red";
        }
    });

    // ==================== SUBMIT ====================

    formulario.addEventListener("submit", function (evento) {
        let formularioValido = true;

        if (!validarCorreo()) {
            evento.preventDefault();
            correo.style.outline = "none";
            correo.style.border = "2px solid red";
            formularioValido = false;
            mostrarMensaje("Debe ingresar un correo válido", "mensaje-error");
        }

        camposObligatorios.forEach((campo) => {
            const campoEsValido = validarCampo(campo);
            if (!campoEsValido) {
                formularioValido = false;
                mostrarMensaje("Por favor, completa correctamente los campos marcados en rojo.", "mensaje-error");
                evento.preventDefault();
            }
        });

        const serviciosSeleccionados = [...document.querySelectorAll("#tipo-servicio input:checked")];

        if (serviciosSeleccionados.length === 0 && formularioValido) {
            formularioValido = false;
            evento.preventDefault();
            mostrarMensaje("Seleccione al menos un tipo de servicio.", "mensaje-error");
        }

        if (formularioValido) {
            evento.preventDefault();

            // Informacion personal
            const nombre = document.getElementById("nombre").value;
            const apellido = document.getElementById("apellido").value;
            const cedula = document.getElementById("cedula").value;
            let telefono = document.getElementById("telefono").value;
            const correo = document.getElementById("correo").value;

            // Selects
            const marcaSelect = document.getElementById("marca");
            const tecnicoAsignadoSelect = document.getElementById("tecnico-asignado");
            const estadoSelect = document.getElementById("estado");

            // Informacion de vehiculo
            const modelo = document.getElementById("modelo").value;
            const año = document.getElementById("año").value;
            const placa = document.getElementById("placa").value;
            const color = document.getElementById("color").value;
            const marca = marcaSelect.options[marcaSelect.selectedIndex].text;

            // Informacion de cita
            const tiposServicios = serviciosSeleccionados.map(cb => cb.value).join(", ");
            const tecnicoAsignado = tecnicoAsignadoSelect.options[tecnicoAsignadoSelect.selectedIndex].text;
            const estado = estadoSelect.options[estadoSelect.selectedIndex].text;
            const descripcion = document.getElementById("notas").value;
            const spanTotal = Number(document.getElementById("span-total").textContent.trim().replace("$", "").trim());

            if (telefono === "") telefono = "Sin contacto";

            const Cita = {
                nombre, apellido, cedula, telefono, correo,
                marca, modelo, anio: año, placa, color,
                tiposServicios, tecnicoAsignado, estado, descripcion, total: spanTotal
            };

            guardarCita(Cita);
        }
    });

    // ==================== FUNCIONES ====================

    function mostrarMensaje(contenido, clase) {
        const mensaje = document.getElementById("mensaje");
        const span = document.getElementById("span-total");

        mensaje.innerHTML = contenido;
        mensaje.classList.add(clase);

        if (contenido === "Registro guardado correctamente") {
            formulario.reset();
            span.textContent = 0 + "$";
        }

        setTimeout(() => {
            mensaje.innerHTML = "";
            mensaje.classList.remove(clase);
            camposObligatorios.forEach(campo => campo.removeAttribute("style"));
            correo.removeAttribute("style");
        }, 3000);
    }

    function guardarCita(cita) {
        fetch("/api/citas/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre: cita.nombre,
                apellido: cita.apellido,
                cedula: cita.cedula,
                telefono: cita.telefono,
                correo: cita.correo,
                marca: cita.marca,
                modelo: cita.modelo,
                anio: cita.anio,
                placa: cita.placa,
                color: cita.color,
                tiposServicios: cita.tiposServicios,
                tecnicoAsignado: cita.tecnicoAsignado,
                estado: cita.estado,
                descripcion: cita.descripcion,
                total: cita.total
            })
        });
        mostrarMensaje("Registro guardado correctamente", "mensaje-exito");
    }
});

// ==================== VALIDACIONES GLOBALES ====================

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

function validarCorreo() {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(correo.value.trim());
}