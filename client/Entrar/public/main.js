function login(event) {
    event.preventDefault(); // Evita o envio do formulário para processar com JavaScript

    // Captura os valores de email e senha
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Verifica as credenciais (Aqui você poderia usar uma API de backend para verificar)
    if (email === "usuario@exemplo.com" && password === "senha123") {
        // Login bem-sucedido - redireciona para o dashboard
        window.location.href = "dashboard.html"; // Altere para o caminho do seu dashboard
    } else {
        alert("Email ou senha incorretos.");
    }
}
