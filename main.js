document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('registroForm');
    
    
    const camposObligatorios = formulario.querySelectorAll('input[required], select[required]');

    
    function validarCampo(campo) {
        const valorEscrito = campo.value.trim();
        campo.style.outline = 'none';

        let esValido = false;

        
        if (valorEscrito === '' || valorEscrito === 'null') {
            campo.style.border = '2px solid red';
            esValido = false;
        } 
        
        else if (campo.tagName !== 'SELECT' && valorEscrito.length < 3) {
            campo.style.border = '2px solid red';
            esValido = false;
        } 
        
        else {
            campo.style.border = '2px solid green';
            esValido = true;
        }

        return esValido;
    }

    
    camposObligatorios.forEach(campo => {
        campo.addEventListener('input', (e) => validarCampo(e.target)); 
        campo.addEventListener('change', (e) => validarCampo(e.target)); 
        campo.addEventListener('blur', (e) => validarCampo(e.target));  
    });

    
    formulario.addEventListener('submit', (e) => {
        e.preventDefault(); 

        let formularioValido = true;

        
        camposObligatorios.forEach(campo => {
            const campoEsValido = validarCampo(campo); 
            if (!campoEsValido) {
                formularioValido = false;
            }
        });

        
        if (formularioValido) {
            alert("¡Registro validado y guardado correctamente!");
            formulario.submit(); 
        } else {
            
            alert("Por favor, completa correctamente los campos marcados en rojo.");
        }
    });
});