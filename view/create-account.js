/* Info creacion de cuenta*/
let iniciarSesionBtn = document.getElementById('iniciarSesionBtn');
let crearCuentaBtn = document.getElementById('crearCuentaBtn');
let nombreField = document.getElementById('nombreField');
let titulo = document.getElementById('titulo');

/*Cambio de inicar a crear*/
iniciarSesionBtn.onclick = function () {
    nombreField.style.maxHeight = '0';
    titulo.innerHTML = 'Iniciar sesion';
    crearCuentaBtn.classList.add('desabilitado');
    iniciarSesionBtn.classList.remove('desabilitado');
    borrarAlertas();
};

/*Cambiar de crear a inciar*/
crearCuentaBtn.onclick = function () {
    nombreField.style.maxHeight = '60px';
    titulo.innerHTML = 'Crea tu cuenta';
    crearCuentaBtn.classList.remove('desabilitado');
    iniciarSesionBtn.classList.add('desabilitado');

    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let pass = document.getElementById('pwd').value;

    localStorage.setItem('userName', nombre);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPwd', pass);

    borrarDatos();
};


/*Logica de validacion*/
iniciarSesionBtn.addEventListener('click', function () {
        let enterEmail = document.getElementById('email').value;
        let enterPwd = document.getElementById('pwd').value;

        let getEmail = localStorage.getItem('userEmail');
        let getPwd = localStorage.getItem('userPwd');


        if (enterEmail === getEmail && enterPwd === getPwd) {
            Swal.fire("SweetAlert2 is working!");
            window.location.href = '../index.html';
        } else {
            alert('Datos incorrectos')
            borrarDatos();
        }

});

function borrarDatos() {
    document.getElementById('nombre').value = '';
    document.getElementById('email').value = '';
    document.getElementById('pwd').value = '';
};