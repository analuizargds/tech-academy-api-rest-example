import express from 'express';
import { StatusCodes } from 'http-status-codes';

const app = express(); // criando o server
const PORT = process.env.PORT || 3000; // a porta em que vai ser executado
let users = [
    { id: 1, name: 'Rafael Ribeiro', age: 31},
    { id: 2, name: 'Gabriel Custódio', age: 27},
];

app.use(express.json()); // garante que todos os requests serão enviados em formato json

//primeiro parâmetro = porta, segundo = função de callback 
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// rota para acessar a aplicação
app.get('/', (request, response) => {
    return response.send(`<h1>Trabalhando com servidor express.</h1>`)
})


                //////////// TRABALHANDO COM GET ///////////////////

// pega a lista de usuários
app.get('/users', (request, response) => {
    return response.send(users);
})

// pega um usuário específico

app.get('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    // find retorna o primeiro elemento que encontrar com base na condição informada
    const user = users.find(user => {
        return (user.id === Number(userId)) // compara o user.id da lista com o userId da rota
    })
    return response.send(user);
});



                //////////// TRABALHANDO COM POST ///////////////////


app.post('/users', (request, response) => {
    // post recebe a entidade a ser cadastrada a través do corpo da requisição
    const newUser = request.body; 

    users.push(newUser); // fez um push de um novo usuário

    return response.status(StatusCodes.CREATED).send(newUser) // retornou com status 201(created)
});


                //////////// TRABALHANDO COM POST ///////////////////


app.put('/users/:userId', (request, response) => {
    const userId = request.params.userId; //id
    const updatedUser = request.body; // usuário atualizado

    users = users.map(user => {
        if (Number(userId) === user.id) {
            return updatedUser;
        }

        return user;
    });

    return response.send(updatedUser);
});


                //////////// TRABALHANDO COM DELETE ///////////////////


app.delete('/users/:userId', (request, response) => {
    const userId = request.params.userId;

    users = users.filter((user) => user.id !== Number(userId)); // todos os id que são diferentes do informado serão adicionados a nova lista

    return response.status(StatusCodes.NO_CONTENT).send();
});