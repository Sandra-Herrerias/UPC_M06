const express = require('express')
const app = express()
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.listen(3000);

//#region Comments
app.delete('/deleteComment/', function (req, res) {
    let connection = getConnection();

    connection.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
    });

    connection.query('DELETE FROM comentarios WHERE id = ?', [req.params.id], function (error, results, field) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });

    connection.end();
})

app.get('/getComments', function (req, res) {
    var connection = getConnection();
    connection.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
    });
    connection.query('SELECT * FROM comentarios', function (error, results, field) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
    connection.end();
})

app.put('/updateComent', function (req, res) {
    console.log(req.body.params.id);

    var connection = mysql.createConnection({
        host: 'localhost',
        database: 'm06_pt2',
        user: 'root',
        password: ''
    });
    connection.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
        // console.log('Connected as id ' + connection.threadId);
    });

    connection.query('update products set price = ?, releaseDate=?,synopsis=?,title=?,type=? WHERE id = ? ',
        [req.body.params.price, req.body.params.releaseDate, req.body.params.synopsis, req.body.params.title, req.body.params.type, req.body.params.id], function (error, results, field) {
            if (error) throw error;
            res.send(JSON.stringify(results));
            console.log('updated!')
        });
    connection.end();
})

app.post('/addComent', function (req, res) {

    var connection = getConnection();

    connection.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
    });

    connection.query('INSERT INTO comentarios values (?,?,?,?)',
        [req.body.params.price, req.body.params.releaseDate, req.body.params.synopsis, req.body.params.title], function (error, results, field) {
            if (error) throw error;
            res.send(JSON.stringify(results));
        });
    connection.end();
})
//#endregion

//#region Users
app.get('/checkUser', function (req, res) {
    var connection =getConnection();

    connection.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
    });

    connection.query('SELECT * FROM jugadores WHERE id = ?', [req.body.params.email], 
    function (error, results, field) {
            if (error) throw error;
            res.send(JSON.stringify(results));
        });
    connection.end();
})

app.post('/addUser', function (req, res) {
    var connection =getConnection();
console.log(req)
    connection.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
    });

    // connection.query('INSERT  INTO jugadores (email, Contrasena,rol) VALUES (?,?,?)',
    //  [req.body.params.email, req.body.params.password, 'jugador'], 
    // function (error, results, field) {
    //         if (error) throw error;
    //         res.send(JSON.stringify(results));
    //     });
    connection.end();
})

//#endregion

//#region Ranking
app.get('/getRanking', function (req, res) {
    var connection = getConnection();

    connection.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
    });

    connection.query('SELECT * FROM participacion', 
    function (error, results, field) {
            if (error) throw error;
            res.send(JSON.stringify(results));
        });
    connection.end();
})
//#endregion



function getConnection() {
    return mysql.createConnection({
        host: 'localhost',
        database: 'campeonato',
        user: 'root',
        password: ''
    });
}

   // jsonData.data.forEach(function (manga) {
    //     connection.query('insert into products values (null,?,?,?,?,?,?,?)', [manga.attributes.canonicalTitle, 
    //         ,manga.type, manga.attributes.synopsis, , 
    //         manga.attributes.posterImage.large, Math.random() * (23 - 6) + 6 ] ,function (error, results, field) {
    //         if (error) throw error;
    //         // res.send(JSON.stringify(results));
    //         console.log('insertado')
    //     });
    // })