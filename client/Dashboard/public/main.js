document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/api/dashboard', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Dados do Dashboard:', data);
            // Atualize a interface do usuário com os dados do dashboard
        } else {
            console.error('Erro ao buscar dados do dashboard:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
    }
});