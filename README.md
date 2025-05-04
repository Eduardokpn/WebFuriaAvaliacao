# 🔥 Projeto ASP.NET + Firebase – Autenticação, Firestore, Níveis e Questionário

Este projeto é uma aplicação web desenvolvida com ASP.NET Core e Firebase, que oferece autenticação via Google e Twitter, gerenciamento de usuários com Firestore, um sistema de níveis e emblemas, além de um módulo interativo de questionários.

---

## 🎯 Objetivo

Fornecer uma plataforma moderna e segura para login social, com coleta de informações de usuários, gamificação por meio de pontuação e níveis, e uma experiência personalizada com base nos dados armazenados no Firebase.

---

## 🚀 Funcionalidades Principais

- **Autenticação com Google e Twitter:** Os usuários podem fazer login de forma rápida e segura através das plataformas sociais.
- **Armazenamento no Firestore:** Dados dos usuários, pontuações e respostas de questionários são armazenados de forma organizada e escalável.
- **Sistema de Níveis e Emblemas:** Com base nas ações e desempenho nos questionários, os usuários sobem de nível e recebem emblemas de destaque.
- **Questionários Dinâmicos:** Cada usuário pode responder a perguntas customizadas que influenciam seu progresso e engajamento.

---

## 🧰 Tecnologias Utilizadas

- **ASP.NET Core (.NET 8)** – Backend e APIs
- **Firebase Authentication** – Login com Google e Twitter
- **Cloud Firestore** – Banco de dados NoSQL em nuvem
- **JavaScript (Firebase Web SDK)** – Autenticação no cliente e interação com o Firestore
- **Hospedagem** – Suporte a execução em IIS, Azure, ou ambientes locais

---

## 🔐 Segurança

- Uso de tokens JWT do Firebase para validar a identidade do usuário no backend.
- Regras de segurança configuradas no Firestore para permitir acesso apenas aos dados do próprio usuário autenticado.
- Nenhuma informação sensível é exposta no cliente.

---

## 🧠 Estrutura de Dados

- Cada usuário possui um documento único no Firestore com seu UID, nome, email, foto, pontuação, nível e emblemas.
- As respostas dos questionários são salvas em uma subcoleção específica por usuário.

---

## 📌 Casos de Uso

- Um fã de e-sports pode se cadastrar com sua conta Google ou Twitter.
- O sistema salva seus dados e apresenta questionários personalizados.
- Ao responder corretamente, o usuário acumula pontos, sobe de nível e ganha emblemas.

---

## 🔧 Como Executar o Projeto

1. Execute o projeto localmente.
2. Acesse a aplicação, faça login e explore os recursos.

---

## ✨ Possíveis Expansões Futuras

- Adição de rankings entre usuários.
- Perfil público com visualização de conquistas.
- Integração com APIs externas para dados personalizados.

---

## 👨‍💻 Autores

Desenvolvido por Eduardo Kauê Pereira Novais.

---
