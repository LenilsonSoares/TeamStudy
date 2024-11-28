document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    // Limpar o campo de senha ao carregar a página
    const senhaInput = document.getElementById('senha');
    if (senhaInput) {
        senhaInput.value = '';
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const rememberMe = document.getElementById('remember-me').checked;
            const loginError = document.getElementById('login-error');
            const loadingIndicator = document.getElementById('loading');

            // Limpar mensagem de erro anterior
            loginError.textContent = '';

            // Mostrar indicador de carregamento
            loadingIndicator.style.display = 'block';

            try {
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, senha })
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user)); // Armazenar informações do usuário

                    if (rememberMe) {
                        localStorage.setItem('rememberMe', 'true');
                    } else {
                        localStorage.removeItem('rememberMe');
                    }

                    // Redirecionar para a tela de dashboard
                    window.location.href = '/dashboard';
                } else {
                    const errorData = await response.json();
                    loginError.textContent = errorData.message || 'Erro ao realizar login. Por favor, tente novamente.';
                }
            } catch (error) {
                console.error('Erro ao conectar com o servidor:', error);
                loginError.textContent = 'Erro ao conectar com o servidor. Por favor, tente novamente mais tarde.';
            } finally {
                // Ocultar indicador de carregamento
                loadingIndicator.style.display = 'none';
            }
        });
    }

    // Carregar informações do usuário no dashboard
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        const userNameElement = document.getElementById('user-name');
        const profilePictureElement = document.getElementById('profile-picture');

        if (userNameElement && profilePictureElement) {
            userNameElement.innerText = user.nome;
            profilePictureElement.src = user.foto || 'assets/default.png';
        }
    }
});