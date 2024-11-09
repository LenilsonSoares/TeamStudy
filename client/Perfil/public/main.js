document.getElementById('profile-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var fullName = document.getElementById('full-name').value;
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var confirmEmail = document.getElementById('confirm-email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;
    
    document.getElementById('success-message').style.display = 'block';
});
