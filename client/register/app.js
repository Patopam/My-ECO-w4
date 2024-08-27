function showRegister() {
    document.getElementById('formContainer').innerHTML = `
        <h2>Registro</h2>
        <form id="registerForm">
            <input type="text" id="user" placeholder="Usuario" required>
            <input type="text" id="name" placeholder="Nombre" required>
            <input type="password" id="password" placeholder="Contraseña" required>
            <button type="submit">Registrarse</button>
        </form>
        <button onclick="backToMain()">Volver</button>
    `;
    document.getElementById('registerForm').addEventListener('submit', register);
}

function showLogin() {
    document.getElementById('formContainer').innerHTML = `
        <h2>Login</h2>
        <form id="loginForm">
            <input type="text" id="user" placeholder="Usuario" required>
            <input type="password" id="password" placeholder="Contraseña" required>
            <button type="submit">Iniciar Sesión</button>
        </form>
        <button onclick="backToMain()">Volver</button>
    `;
    document.getElementById('loginForm').addEventListener('submit', login);
}

function backToMain() {
    document.getElementById('formContainer').innerHTML = `
        <h1>Registro y Login</h1>
        <button onclick="showRegister()">Registro</button>
        <button onclick="showLogin()">Login</button>
    `;
}

async function register(event) {
    event.preventDefault();
    const user = document.getElementById('user').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    try {
        await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user, name, password })
        });
        alert('Usuario registrado');
        backToMain();
    } catch (error) {
        console.error(error);
        alert('Error al registrar usuario');
    }
}

async function login(event) {
    event.preventDefault();
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;
    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user, password })
        });
        const data = await response.json();
        localStorage.setItem('token', data.token);
        alert('Inicio de sesión exitoso');
        window.location.href = '/client/results-screen/index.html';
    } catch (error) {
        console.error(error);
        alert('Error al iniciar sesión');
    }
}
