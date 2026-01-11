import dotenv from 'dotenv'
dotenv.config();

import mysql from 'mysql2';


const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASS,
    database: 'projetotodo'
})


con.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('sucess conection')
    }
})

export default con; 