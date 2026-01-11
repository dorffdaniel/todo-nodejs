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


app.listen(PORT, () => {
    console.log("server runing")
    console.log("http://localhost:3001");
})