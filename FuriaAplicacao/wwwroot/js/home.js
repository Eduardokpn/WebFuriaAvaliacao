// Importação dos módulos necessários do Firebase
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    TwitterAuthProvider,
    signInWithPopup,
    signOut
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
    getFirestore,
    getDoc,
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

console.log("Funciona");

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDizcBUOhqDpkUdVTgEmQ3r16GEUxV_uk4",
    authDomain: "furiaaval.firebaseapp.com",
    projectId: "furiaaval",
    storageBucket: "furiaaval.firebasestorage.app",
    messagingSenderId: "709082438355",
    appId: "1:709082438355:web:63cbce4c9d05ac9f999226",
    measurementId: "G-FLDZBZGGH3"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

// Monitorando a autenticação do usuário
onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    console.log("User ID:", loggedInUserId);

    // Se o usuário estiver logado
    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    console.log(userData);

                    // Atualiza as informações do usuário na interface
                    document.getElementById('userName').innerText = userData.firstName;
                    document.getElementById('nivel').innerText = userData.nivel.toString();
                    updateEmblem(userData.nivel);

                    if (userData.providerId === 'twitter.com') {

                        console.log("Usuário autenticado via Twitter");
                        document.getElementById('submitTwitter').textContent = '✅ CONTA TWITTER VINCULADA';
                        document.getElementById('submitTwitter').style.backgroundColor = '#555555';
                        document.getElementById('submitTwitter').disabled = true;

                    }
                    
                } else {
                    console.log("Você não está logado!");
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
            });
    }
});

// Função para atualizar o emblema do usuário com base no nível
function updateEmblem(nivel) {
    const emblemElement = document.getElementById('emblem');


    if (nivel >= 1900) {
        emblemElement.src = "/css/emblemaOuro.png";
    } else if (nivel < 1900 && nivel >= 1000) {
        emblemElement.src = "/css/emblemaPrata.png";
    } else {
        emblemElement.src = "/css/emblemaBronze.png";
    }
}

// Configuração do provedor de autenticação do Twitter
const provider = new TwitterAuthProvider();

// Evento de clique para login com Twitter
document.getElementById("submitTwitter").addEventListener("click", (e) => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            const xButton = document.getElementById('submitTwitter');

            if (user) {
                const userData = {
                    uid: user.uid,
                    email: user.email || null,
                    firstName: user.displayName,
                    photoURL: user.photoURL,
                    providerId: user.providerData[0]?.providerId,
                    nivel: 1000
                };

                const db = getFirestore();
                const userRef = doc(db, "users", user.uid);

                // Salvando o usuário no Firestore
                setDoc(userRef, userData, { merge: true })
                    .then(() => {
                        console.log("Usuário salvo no Firestore com sucesso!");
                        localStorage.setItem('loggedInUserId', user.uid);

                        updateEmblem(userData.nivel);
                        submitTwitter.textContent = '✅ CONTA TWITTER VINCULADA';
                        submitTwitter.disabled = true;
                        submitTwitter.style.backgroundColor = '#555555';
                        alert("VOCÊ RECEBEU 1000 PONTOS");
                        location.reload();

                    })
                    .catch((error) => {
                        console.error("Erro ao salvar usuário:", error);
                    });
            }
        })
        .catch((error) => {
            console.error("Erro ao fazer login com Twitter:", error);
        });
});

// Lógica para o questionário
document.addEventListener('DOMContentLoaded', function () {
    const quizButton = document.getElementById('quizButton');
    const quizModal = document.getElementById('quizModal');
    const closeBtn = document.querySelector('.close-btn');
    const submitBtn = document.getElementById('submitBtn');

    const loggedInUserId = localStorage.getItem('loggedInUserId');

    // Verifica se o usuário já respondeu ao questionário
    if (loggedInUserId) {
        const docRef = doc(db, "quizResponses", loggedInUserId);
        getDoc(docRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    quizModal.style.display = 'none';
                    quizButton.disabled = true;
                    quizButton.textContent = 'Questionário Já Respondido';
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
            });
    }

    // Abre o modal do questionário
    quizButton.addEventListener('click', function () {
        quizModal.style.display = 'block';
    });

    // Fecha o modal do questionário
    closeBtn.addEventListener('click', function () {
        quizModal.style.display = 'none';
    });

    // Fecha o modal ao clicar fora dele
    window.addEventListener('click', function (event) {
        if (event.target === quizModal) {
            quizModal.style.display = 'none';
        }
    });

    // Envia as respostas do questionário
    document.getElementById('furiaQuiz').addEventListener('submit', function (e) {
        e.preventDefault(); // evita reload da página

        const ondeConhece = document.querySelector('input[name="q1"]:checked')?.value;
        const atFuria2024 = document.querySelector('input[name="q2"]:checked')?.value;
        const compraProduto = document.querySelector('input[name="q3"]:checked')?.value;
        const ondeAssite = document.querySelector('input[name="q4"]:checked')?.value;
        const jogosQueJoga = document.querySelector('input[name="q5"]:checked')?.value;
        const loggedInUserId = localStorage.getItem('loggedInUserId');

        const docRefUsers = doc(db, "users", loggedInUserId);

        // Recupera dados do usuário e salva as respostas
        getDoc(docRefUsers)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();

                    const dataQuiz = {
                        userId: loggedInUserId,
                        userName: userData.firstName,
                        userEmail: userData.email,
                        ondeConhece: ondeConhece,
                        atFuria2024: atFuria2024,
                        compraProduto: compraProduto,
                        ondeAssite: ondeAssite,
                        jogosQueJoga: jogosQueJoga
                    };

                    const docRefQuiz = doc(db, "quizResponses", loggedInUserId);
                    setDoc(docRefQuiz, dataQuiz)
                        .then(() => {
                            console.log("Respostas enviadas com sucesso!");

                            // Atualiza o nível do usuário
                            const nivelAtual = userData.nivel || 0;
                            const novoNivel = nivelAtual + 1000;

                            const updateNivel = {
                                nivel: novoNivel
                            };

                            setDoc(docRefUsers, updateNivel, { merge: true })
                                .then(() => {
                                    console.log("Nível atualizado com sucesso!");
                                    updateEmblem(novoNivel);
                                })
                                .catch((error) => {
                                    console.error("Erro ao atualizar o nível:", error);
                                });

                            // Fecha o modal e desabilita o botão
                            quizModal.style.display = 'none';
                            quizButton.disabled = true;
                            alert("VOCÊ RECEBEU 1000 PONTOS");
                            quizButton.textContent = 'QUE BOM QUE VOCÊ RESPONDEU, VAMOS PRA CIMA PANTERAS';
                        })
                        .catch((error) => {
                            console.error("Erro ao enviar respostas:", error);
                        });

                } else {
                    console.warn("Usuário não encontrado.");
                }
            })
            .catch((error) => {
                console.error("Erro ao buscar dados do usuário:", error);
            });

    });
});

// Botao de premio 
document.addEventListener('DOMContentLoaded', function () {
    const awardButton = document.getElementById('awardButton');
    const couponModal = document.getElementById('couponModal');
    const closeModalCumpom = document.getElementById('closeModalCumpom');
    const loggedInUserId = localStorage.getItem('loggedInUserId');

    // Verifica se o usuário já recebeu o prêmio
    const docRefUsers = doc(db, "users", loggedInUserId);
    getDoc(docRefUsers)
        .then((docSnapshot) => {
            if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                if (userData.premioRecebido === true) {

                    awardButton.disabled = true;
                    awardButton.style.backgroundColor = '#555555';
                    awardButton.textContent = 'Prêmio Já Recebido';
                    
                }
                }
            }
        )
        .catch((error) => {
            console.error("Error getting document:", error);
        });


    // Abre o modal do prêmio
    awardButton.addEventListener('click', () => {

        getDoc(docRefUsers)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {

                    const userData = docSnapshot.data();
                    const nivelAtual = userData.nivel || 0;
                    if (nivelAtual >= 1000) {
                        const novoNivel = nivelAtual - 1000;
                        const updateNivel = {
                            nivel: novoNivel,
                            premioRecebido: true
                        };

                        setDoc(docRefUsers, updateNivel, { merge: true })
                            .then(() => {
                                console.log("Nível atualizado com sucesso!");
                                updateEmblem(novoNivel);                                
                                couponModal.style.display = 'flex';
                            })
                            .catch((error) => {
                                console.error("Erro ao atualizar o nível:", error);
                            });

                    }
                    else {
                        alert("Você não tem pontos suficientes para receber o prêmio.");
                    };

                }
            })
            .catch((error) => {
                console.error("Erro ao buscar dados do usuário:", error);
            });
        
    });

    // Fecha o modal do prêmio
    closeModalCumpom.addEventListener('click', function () {
        couponModal.style.display = 'none';
    });

    // Fecha o modal ao clicar fora dele
    window.addEventListener('click', function (event) {
        if (event.target === couponModal) {
            couponModal.style.display = 'none';
        }
    });

});
