document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const usuarioId = localStorage.getItem('usuario_id'); // Assumindo que o ID do usuário está armazenado no localStorage

    if (!token) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = '/entrar';
        return;
    }

    // Função para buscar e exibir o progresso
    const fetchProgress = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/progress/${usuarioId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const progressData = await response.json();
                const progressList = document.getElementById('progress-list');
                progressList.innerHTML = '';

                progressData.forEach(progress => {
                    const progressItem = document.createElement('div');
                    progressItem.className = 'progress-item';
                    progressItem.innerHTML = `
                        <h3>Curso ID: ${progress.curso_id}</h3>
                        <p>Progresso: ${progress.progresso}%</p>
                        <div class="progress-bar">
                            <div style="width: ${progress.progresso}%;"></div>
                        </div>
                    `;
                    progressList.appendChild(progressItem);
                });
            } else {
                const errorData = await response.text();
                console.error(`Erro ao obter progresso: ${errorData}`);
                alert(`Erro ao obter progresso: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor:', error);
            alert('Erro ao conectar com o servidor');
        }
    };

    // Inicializar a página
    fetchProgress();
});