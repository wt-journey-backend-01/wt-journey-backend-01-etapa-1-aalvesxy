const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.get('/api/lanches', (req, res) => {
    const lanches = [
        { id: 1, nome: 'Sanduíche', ingredientes: 'Pão, Carne, Queijo' },
        { id: 2, nome: 'Salada', ingredientes: 'Alface, Tomate, Cenoura' },
        { id: 3, nome: 'Suco', ingredientes: 'Laranja, Água' }
    ];
    res.json(lanches);
});

app.get('/sugestao', (req, res) => {
    const nomeLanche = req.query.nome;
    const ingredientesLanche = req.query.ingredientes;

    res.send(`
        <html lang="pt-br">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Sugestão</title>
                <link rel="stylesheet" href="/css/style.css">
            </head>

            <body>
                <nav class="navbar">
                    <div class="navdiv">
                        <div class="logo"><img src="/images/logoA.png" alt="Logo"></div>
                        <div class="logo-title"><a href="/">DevBurguer</a></div>
                        <ul>
                            <li><a href="/api/lanches">Cardápio</a></li>
                            <button type="submit"><a id="contact-text" href="/contato">Contato</a></button>
                        </ul>
                    </div>
                </nav>
                <section id=agradecimento">
                    <h2 id="suggestion-title">Obrigado</h2>
                    <p id="suggestion-p">Sua sugestão foi recebida!</p>
                    <div class="div-label"><bold>Nome: ${nomeLanche}</bold></div>
                    <div class="div-label"><bold>Ingredientes: ${ingredientesLanche}</bold></div>
                </section>
            </body>

        </html>
    `);
});

app.post('/contato', (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;

    res.send(`
       <html lang="pt-br">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Contato</title>
                <link rel="stylesheet" href="/css/style.css">
            </head>

            <body>
                <nav class="navbar">
                    <div class="navdiv">
                        <div class="logo"><img src="/images/logoA.png" alt="Logo"></div>
                        <div class="logo-title"><a href="/">DevBurguer</a></div>
                        <ul>
                            <li><a href="/api/lanches">Cardápio</a></li>
                            <button type="submit"><a id="contact-text" href="/contato">Contato</a></button>
                        </ul>
                    </div>
                </nav>
                <section id=agradecimento">
                    <h2 id="suggestion-title">Mensagem Recebida</h2>
                    <p id="suggestion-p">Muito obrigado por sua mensagem, ${nome}!</p>
                    <div class="div-label"><bold>Nome: ${nome}</bold></div>
                    <div class="div-label"><bold>E-mail: ${email}</bold></div>
                    <div class="div-label"><bold>Assunto: ${assunto}</bold></div>
                    <div class="div-label"><bold>Mensagem: ${mensagem}</bold></div>
                </section>
            </body>

        </html> 
    `);
});

app.listen(PORT, () => {
    console.log(`Server running in: ${PORT}`);
});