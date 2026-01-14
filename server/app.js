import express from 'express';
import con from './bd.js';
import cors from 'cors';

const PORT = 3001
let app = express();


// Allow all domains
app.use(cors())

app.use(express.json());


//ROUTE LIST TASK
app.get('/getList', (req, res) => {

    let sql = "SELECT * FROM tarefas";

    con.query(sql, (error, result) => {
        if (error) {
            res.status(404).json(`Erro: ${error}`);
        } else {
            res.status(200).json(result)
        }
    })

})


app.post('/addTask', (req, res) => {

    const { titulo, descricao, estado, dia } = req.body;

    let sql = "INSERT INTO tarefas(titulo, descricao, estado, data_criacao) values(?, ?, ? , ?)";

    con.query(sql, [titulo, descricao, estado, dia], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).json({ 'erro': 'erro ao inserir a tarefa' });
        }

        res.status(200).json({ 'mensagem': 'adicionado com sucesso' });
    })

})

app.get('/getEdit/:id', (req, res) => {

    const { id } = req.params;

    let sql = "SELECT * FROM tarefas WHERE id = ?";

    con.query(sql, id, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).json({ 'erro': 'erro ao buscar a tarefa' });
        }

        if (result.length == 0) {
            return res.status(404).json({ 'erro': 'nada encontrado' });
        }

        res.json(result[0]);

    })


});





app.listen(PORT, () => {
    console.log("server runing")
    console.log("http://localhost:3001");
})