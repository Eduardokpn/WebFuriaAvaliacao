import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

function showSuccessAlert() {
    const successAlert = document.getElementById('successAlert');
    successAlert.classList.remove('d-none'); // Remove a classe que esconde o alerta

    // Opcional: Esconder o alerta após 5 segundos
    setTimeout(() => {
        successAlert.classList.add('d-none');
    }, 10000);
}





console.log("Funciona");
// Config do seu Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDizcBUOhqDpkUdVTgEmQ3r16GEUxV_uk4",
    authDomain: "furiaaval.firebaseapp.com",
    projectId: "furiaaval",
    storageBucket: "furiaaval.firebasestorage.app",
    messagingSenderId: "709082438355",
    appId: "1:709082438355:web:63cbce4c9d05ac9f999226",
    measurementId: "G-FLDZBZGGH3"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();

// Função para fazer login com o Google
const googleLoginButton = document.getElementById("googleLogin");
googleLoginButton.addEventListener("click", (e) => {
    e.preventDefault();

    signInWithPopup(auth, providerGoogle)
        .then((result) => {
            const user = result.user;
            localStorage.setItem('loggedInUserId', user.uid);
            console.log("Usuário logado com sucesso:", user);
            window.location.href = "./Home/Home";
        })
        .catch((error) => {
            console.error("Erro ao fazer login com o Google:", error);
        });
});


// Escutar clique no botão
document.getElementById("submitLogin").addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem('loggedInUserId', user.uid);
            console.log("Usuário logado com sucesso:", user);
            window.location.href = "./Home/Home";
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/invalid-credential") {
                alert("Acesso negado! Verifique seu e-mail e senha.");
            }
            else {
                alert("Conta não Existe, Registre-se")
            }
        });

});

const signUpButton = document.getElementById("submitSignUp");
signUpButton.addEventListener("click",  (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    var nivel = 0;

   
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user =  userCredential.user;
            const data = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                nivel: nivel
            };
            const db = getFirestore();
            const docRef = doc(db, "users", user.uid);        
            setDoc(docRef, data); 
        })
        .then(() => {
            showSuccessAlert(); 
            window.location.href = "/Home/Home";
            console.log("Usuário cadastrado com sucesso!");
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/email-already-in-use") {
                alert("Acesso negado! Email já existe");
            }
            else {
                alert("Algo Inesperado aconteceu, tente novamente mais tarde.")
            }
        });
});
console.log("Firebase Initialized");
