document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = '/entrar';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/profile/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('full-name').value = data.nome;
            document.getElementById('username').value = data.nome_usuario;
            document.getElementById('email').value = data.email;
        } else {
            const errorData = await response.json();
            alert(`Erro ao obter perfil: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor');
    }
});

document.getElementById('profile-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const fullName = document.getElementById('full-name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const confirmEmail = document.getElementById('confirm-email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (email !== confirmEmail) {
        alert('Os endereços de e-mail não coincidem.');
        return;
    }

    if (password !== confirmPassword) {
        alert('As senhas não coincidem.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ nome: fullName, nome_usuario: username, email, senha: password })
        });

        if (response.ok) {
            document.getElementById('success-message').style.display = 'block';
        } else {
            const errorData = await response.json();
            alert(`Erro ao atualizar perfil: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor');
    }
});