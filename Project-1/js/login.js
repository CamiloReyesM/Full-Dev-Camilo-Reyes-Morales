const users = [
    { id: 1, usuario: 'usuario1', clave: '1234' },
    { id: 2, usuario: 'usuario2', clave: '5678' },
    { id: 3, usuario: 'usuario3', clave: '9101' },
    { id: 4, usuario: 'usuario4', clave: '1121' },
    { id: 5, usuario: 'usuario5', clave: '3141' }
];


const attempts = JSON.parse(localStorage.getItem('attempts')) || {};
const blockedUsers = JSON.parse(localStorage.getItem('blockedUsers')) || {};

function saveState() {
    localStorage.setItem('attempts', JSON.stringify(attempts));
    localStorage.setItem('blockedUsers', JSON.stringify(blockedUsers));
}

function isBlocked(username) {
    return blockedUsers[username] || false;
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = users.find(u => u.usuario === username);

    if (isBlocked(username)) {
        alert('El usuario esta bloqueado');
        return;
    }

    if (user && user.clave === password) {
        alert('Login successful');
        attempts[username] = 0; // 
        document.getElementById('message').textContent = '';
    } else {
        attempts[username] = (attempts[username] || 0) + 1;
        if (attempts[username] >= 3) {
            blockedUsers[username] = true;
            alert('Demaciados intentos fallidos, usuario bloqueado');
        } else {
            alert('Usuario o contraseña incorrecta');
        }
    }

    saveState();
});
