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
            document.getElementById('success-message').style.display = 'block';
        } else {
            const errorData = await response.json();
            alert(`Erro ao enviar e-mail de recuperação: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor');
    }
});