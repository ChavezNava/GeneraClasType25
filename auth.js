// Sistema de Autenticación
class AuthSystem {
    constructor() {
        this.storageKey = 'type25_users';
        this.currentUserKey = 'type25_current_user';
        this.init();
    }

    init() {
        // Inicializar usuarios si no existen
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify({}));
        }
        
        // Verificar si hay sesión activa
        this.checkAutoLogin();
        
        // Configurar event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Tabs de autenticación
        const tabs = document.querySelectorAll('.auth-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.getAttribute('data-tab');
                this.switchAuthTab(tabName);
            });
        });

        // Formulario de login
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.login();
            });
        }

        // Formulario de registro
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.register();
            });
        }

        // Botón de logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.logout();
            });
        }
    }

    switchAuthTab(tabName) {
        // Actualizar tabs
        const tabs = document.querySelectorAll('.auth-tab');
        tabs.forEach(tab => {
            if (tab.getAttribute('data-tab') === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Actualizar formularios
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        
        if (tabName === 'login') {
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        } else {
            loginForm.classList.remove('active');
            registerForm.classList.add('active');
        }
    }

    register() {
        const nombre = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        // Validaciones
        if (!nombre || !email || !password) {
            this.showMessage('Por favor, completa todos los campos', 'error');
            return;
        }

        if (password.length < 6) {
            this.showMessage('La contraseña debe tener al menos 6 caracteres', 'error');
            return;
        }

        if (password !== confirmPassword) {
            this.showMessage('Las contraseñas no coinciden', 'error');
            return;
        }

        if (!this.validateEmail(email)) {
            this.showMessage('Ingresa un correo electrónico válido', 'error');
            return;
        }

        // Verificar si el usuario ya existe
        const users = JSON.parse(localStorage.getItem(this.storageKey));
        if (users[email]) {
            this.showMessage('Este correo ya está registrado', 'error');
            return;
        }

        // Registrar usuario
        users[email] = {
            nombre: nombre,
            password: this.hashPassword(password),
            email: email,
            fechaRegistro: new Date().toISOString()
        };

        localStorage.setItem(this.storageKey, JSON.stringify(users));
        
        this.showMessage('¡Registro exitoso! Ahora inicia sesión', 'success');
        
        // Cambiar a login
        this.switchAuthTab('login');
        
        // Limpiar formulario
        document.getElementById('registerForm').reset();
    }

    login() {
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            this.showMessage('Por favor, ingresa tu correo y contraseña', 'error');
            return;
        }

        const users = JSON.parse(localStorage.getItem(this.storageKey));
        const user = users[email];

        if (!user || user.password !== this.hashPassword(password)) {
            this.showMessage('Correo o contraseña incorrectos', 'error');
            return;
        }

        // Guardar sesión
        const session = {
            email: email,
            nombre: user.nombre,
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem(this.currentUserKey, JSON.stringify(session));
        
        this.showMessage(`¡Bienvenido ${user.nombre}!`, 'success');
        
        // Mostrar dashboard
        this.showDashboard(session);
    }

    logout() {
        localStorage.removeItem(this.currentUserKey);
        this.showAuthScreen();
        this.showMessage('Sesión cerrada correctamente', 'success');
    }

    checkAutoLogin() {
        const session = localStorage.getItem(this.currentUserKey);
        if (session) {
            const userSession = JSON.parse(session);
            this.showDashboard(userSession);
        } else {
            this.showAuthScreen();
        }
    }

    showDashboard(session) {
        // Ocultar pantalla de auth
        const authScreen = document.getElementById('authScreen');
        const mainApp = document.getElementById('mainApp');
        
        if (authScreen) authScreen.style.display = 'none';
        if (mainApp) {
            mainApp.style.display = 'block';
            
            // Actualizar nombre de usuario
            const userNameSpan = document.getElementById('userName');
            if (userNameSpan) {
                userNameSpan.textContent = session.nombre;
            }
        }
        
        // Disparar evento de autenticación exitosa
        window.dispatchEvent(new Event('authSuccess'));
    }

    showAuthScreen() {
        const authScreen = document.getElementById('authScreen');
        const mainApp = document.getElementById('mainApp');
        
        if (authScreen) authScreen.style.display = 'flex';
        if (mainApp) mainApp.style.display = 'none';
    }

    showMessage(message, type) {
        // Crear elemento de mensaje
        const messageDiv = document.createElement('div');
        messageDiv.className = `auth-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            z-index: 2000;
            animation: slideIn 0.3s ease;
            background-color: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    hashPassword(password) {
        // Nota: En producción, usa un hash más seguro como bcrypt
        // Este es un hash simple para demostración
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString();
    }
}

// Inicializar sistema de autenticación
const auth = new AuthSystem();
