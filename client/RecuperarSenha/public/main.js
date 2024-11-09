document.getElementById('recover-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/recover', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            const data = await response.json();
            alert('E-mail de recuperação enviado com sucesso!');
        } else {
            const errorData = await response.json();
            alert(`Erro ao enviar e-mail de recuperação: ${errorData.msg}`);
        }
    } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
        alert('Erro ao conectar com o servidor');
    }
});