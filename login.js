function login(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

    // Usuario y contraseña de ejemplo
    const validUsername = "mensajerosdeesperanza"; 
    const validPassword = "todossomosuno"; 

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === validUsername && password === validPassword) {
        sessionStorage.setItem("loggedIn", "true"); // Establece el estado de inicio de sesión
        window.location.href = "pages/home.html"; // Redirige a la página principal
    } else {
        alert("Usuario o contraseña incorrectos. Inténtalo de nuevo.");
    }
}
