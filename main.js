document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('registroForm');
    
    // 1. Atrapamos los campos que nos importan (inputs y selects que son requeridos)
    const camposObligatorios = formulario.querySelectorAll('input[required], select[required]');

    // 2. Tu función maestra de validación adaptada
    function validarCampo(campo) {
        const valorEscrito = campo.value.trim();
        campo.style.outline = 'none';

        let esValido = false;

        // REGLA A: Revisar si está vacío o si tiene el valor por defecto ("null")
        // Nota: En tu HTML, los selects tienen value="null" cuando dicen "-Seleccione-"
        if (valorEscrito === '' || valorEscrito === 'null') {
            campo.style.border = '2px solid red';
            esValido = false;
        } 
        // REGLA B: Si NO es un desplegable (select) y tiene menos de 3 letras
        else if (campo.tagName !== 'SELECT' && valorEscrito.length < 3) {
            campo.style.border = '2px solid red';
            esValido = false;
        } 
        // SI PASÓ TODAS LAS TRAMPAS: Lo ponemos en verde
        else {
            campo.style.border = '2px solid green';
            esValido = true;
        }

        return esValido;
    }

    // 3. Conectamos los eventos para que valide en tiempo real (tu código original)
    camposObligatorios.forEach(campo => {
        campo.addEventListener('input', (e) => validarCampo(e.target)); 
        campo.addEventListener('change', (e) => validarCampo(e.target)); 
        campo.addEventListener('blur', (e) => validarCampo(e.target));  
    });

    // 4. Protegemos el botón de Guardar (Lo que pidió Leandy)
    formulario.addEventListener('submit', (e) => {
        e.preventDefault(); // Detenemos el envío para revisar todo

        let formularioValido = true;

        // Revisamos todos los campos uno por uno al darle clic
        camposObligatorios.forEach(campo => {
            const campoEsValido = validarCampo(campo); // Reutilizamos tu función maestra
            if (!campoEsValido) {
                formularioValido = false;
            }
        });

        // Si todo está en verde, se envía
        if (formularioValido) {
            alert("¡Registro validado y guardado correctamente!");
            formulario.submit(); 
        } else {
            // Si hay algo en rojo, no hace nada más que avisar
            alert("Por favor, completa correctamente los campos marcados en rojo.");
        }
    });
});