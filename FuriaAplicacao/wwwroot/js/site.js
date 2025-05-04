document.getElementById('toggleRegister').addEventListener('click', function (e) {
    e.preventDefault();

    const nameFields = document.getElementById('nameFields');
    const submitLogin = document.getElementById('submitLogin');
    const submitSignUp = document.getElementById('submitSignUp');
    const toggleLink = document.getElementById('toggleRegister');

    // Verifica o estado atual
    if (nameFields.style.display === 'none') {
        // Mostrar campos de cadastro
        nameFields.style.display = 'block';
        submitSignUp.style.display = 'block';
        submitLogin.style.display = 'none';
        toggleLink.textContent = 'Já tem uma conta? Faça login';

        // Tornar campos obrigatórios
        document.getElementById('firstName').required = true;
        document.getElementById('lastName').required = true;
    } else {
        // Esconder campos de cadastro
        nameFields.style.display = 'none';
        submitSignUp.style.display = 'none';
        submitLogin.style.display = 'block';
        toggleLink.textContent = 'Não tem uma conta? Cadastre-se';

        // Remover obrigatoriedade
        document.getElementById('firstName').required = false;
        document.getElementById('lastName').required = false;
    }
});