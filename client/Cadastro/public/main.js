document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Verificar se as senhas coincidem
        if (password !== confirmPassword) {
            alert('As senhas não coincidem. Tente novamente.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, password })
            });

            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                // Redirecionar para a tela de login
                window.location.href = '/entrar';
            } else {
                const errorData = await response.json();
                alert(`Erro ao realizar cadastro: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor:', error);
            alert('Erro ao conectar com o servidor');
        }
    });
});