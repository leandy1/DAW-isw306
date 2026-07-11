document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();
    const mensaje = document.getElementById("mensaje-login");

    try {
        const respuesta = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, password }),
            credentials: 'include'
        });

        const data = await respuesta.json();

        if (respuesta.ok) {
            mensaje.style.color = "#155724";
            mensaje.textContent = "Ingreso exitoso, redirigiendo...";
            setTimeout(() => window.location.href = "index.html", 1000);
          
        } else {
            mensaje.style.color = "#721c24";
            mensaje.textContent = data.error || "Usuario o contraseña incorrectos";
        }

    } catch (err) {
        mensaje.style.color = "#721c24";
        mensaje.textContent = "Error al conectar con el servidor";
    }
});