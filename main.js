document.addEventListener('DOMContentLoaded', () => {
    // Usamos el id que vimos en tu HTML: "registroForm"
    const formulario = document.getElementById('registroForm');

    formulario.addEventListener('submit', function(event) {
        // Obtenemos todos los inputs, selects y textareas dentro del form
        const campos = formulario.querySelectorAll('input[required], select[required]');
        let esValido = true;

        campos.forEach(campo => {
            // Si el valor está vacío o es "null" (que es el valor de tus opciones por defecto)
            if (campo.value.trim() === "" || campo.value === "null") {
                alert(`El campo ${campo.name} es obligatorio.`);
                campo.focus(); // Pone el cursor en el campo que falta
                esValido = false;
            }
        });

        if (!esValido) {
            event.preventDefault(); // Detiene el envío si algo falla
        } else {
            alert("Registro guardado con éxito.");
        }
    });
});
