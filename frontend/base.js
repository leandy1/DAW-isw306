function toggleLogout() {
    const dropdown = document.getElementById("dropdown-logout");
    dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
}

document.addEventListener("click", function(e) {
    if (!e.target.closest(".header-user")) {
        const dropdown = document.getElementById("dropdown-logout");
        if (dropdown) dropdown.style.display = "none";
    }
});

async function logout() {
    await fetch("http://localhost:3000/api/auth/logout", { method: "POST" });
    window.location.href = "login.html";
}

async function verificarSesion() {
    try {
        const respuesta = await fetch("http://localhost:3000/api/auth/verificar");
        if (!respuesta.ok) window.location.href = "login.html";
    } catch {
        window.location.href = "login.html";
    }
}

function toggleAside() {
    document.querySelector("aside").classList.toggle("cerrado");
}