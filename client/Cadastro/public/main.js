document.getElementById('register-form').addEventListener('submit', async (e) => {
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
            body: JSON.stringify({ email, nome_usuario: username, senha: password })
        });

        if (response.ok) {
            const data = await response.json();
            alert('Cadastro realizado com sucesso!');
            // Redirecionar para a tela de login ou dashboard
            window.location.href = '/entrar';
        } else {
            const errorData = await response.json();
            alert(`Erro ao realizar cadastro: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor');
    }
});