
function toggleLogout() {
    const dropdown = document.getElementById("dropdown-logout");
    dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
}


async function logout() {
    await fetch("http://localhost:3000/api/login/logout", { method: "POST",  credentials: 'include' });
    window.location.href = "login.html";
}

async function verificarSesion() {
    const respuesta = await fetch("http://localhost:3000/api/login/verificar", {
        credentials: 'include'
    });
    if (!respuesta.ok) window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", async () => {
    await verificarSesion();

    const usuario = localStorage.getItem('Usuario');
    const spanUsuario = document.getElementById("spanPerfil");
    const spanLetra = document.getElementById("letraPerfil");
    const letra = usuario.charAt(0).toUpperCase();

    spanUsuario.textContent = usuario;
    spanLetra.textContent = letra;
});


function toggleAside() {
    document.querySelector("aside").classList.toggle("cerrado");
}