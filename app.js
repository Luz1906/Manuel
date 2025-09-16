document.addEventListener('DOMContentLoaded', () => {
  const registroForm = document.getElementById('registroForm');
  const loginForm = document.getElementById('loginForm');
  const mensajeRegistro = document.getElementById('mensajeRegistro');
  const mensajeLogin = document.getElementById('mensajeLogin');

  // Guardar usuario en localStorage
  registroForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = registroForm.nombre.value.trim();
    const email = registroForm.email.value.trim();
    const password = registroForm.password.value;

    if (!nombre || !email || password.length < 6) {
      mostrarMensaje(mensajeRegistro, 'Por favor completa los campos correctamente.', 'error');
      return;
    }

    const usuario = { nombre, email, password };
    localStorage.setItem(email, JSON.stringify(usuario));

    mostrarMensaje(mensajeRegistro, `Usuario ${nombre} registrado correctamente.`, 'success');
    registroForm.reset();
  });

  // Login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm.loginEmail.value.trim();
    const password = loginForm.loginPassword.value;

    if (!email || !password) {
      mostrarMensaje(mensajeLogin, 'Ingresa correo y contraseña.', 'error');
      return;
    }

    const datos = localStorage.getItem(email);
    if (!datos) {
      mostrarMensaje(mensajeLogin, 'Usuario no encontrado.', 'error');
      return;
    }

    const usuario = JSON.parse(datos);
    if (usuario.password === password) {
      mostrarMensaje(mensajeLogin, `Bienvenido, ${usuario.nombre}.`, 'success');
      loginForm.reset();
    } else {
      mostrarMensaje(mensajeLogin, 'Contraseña incorrecta.', 'error');
    }
  });

  // Función para mostrar mensajes
  function mostrarMensaje(elemento, texto, tipo) {
    elemento.textContent = '';
    elemento.className = 'mensaje ' + tipo;
    elemento.textContent = (tipo === 'success' ? '✅ ' : '⚠️ ') + texto;
    elemento.classList.remove('hidden');
  }
});