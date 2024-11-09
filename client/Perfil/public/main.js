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
            document.getElementById('profile-name').textContent = data.nome;
            document.getElementById('profile-username').textContent = data.nome_usuario;
            document.getElementById('profile-email').textContent = data.email;
        } else {
            const errorData = await response.json();
            alert(`Erro ao obter perfil: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor');
    }
});