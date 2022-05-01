const express = require('express')
const app = express()
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    //res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json());

var config = {
    host: 'localhost',
    database: 'upc_explodingkittens',
    user: 'root',
    password: ''
};

//#region Comments
app.delete('/deleteComment/', function(req, res) {
    let connection = getConnection();

    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
    });

    connection.query('DELETE FROM comentarios WHERE id = ?', [req.params.id], function(error, results, field) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });

    connection.end();
})

app.get('/getComments', function(req, res) {
    var connection = getConnection();
    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
    });
    connection.query('SELECT * FROM comments',
        function(error, results, field) {
            if (error) throw error;
            res.send(JSON.stringify(results));

        });
    connection.end();
})

app.put('/updateComment', function(req, res) {
    console.log(req.body.params.id);
    var connection = getConnection();
    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
    });

    connection.query('update products set price = ?, releaseDate=?,synopsis=?,title=?,type=? WHERE id = ? ', [req.body.params.price, req.body.params.releaseDate, req.body.params.synopsis, req.body.params.title, req.body.params.type, req.body.params.id], function(error, results, field) {
        if (error) throw error;
        res.send(JSON.stringify(results));
        console.log('updated!')
    });
    connection.end();
})

app.post('/addComent', function(req, res) {

    var connection = getConnection();

    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
    });

    connection.query('INSERT INTO comentarios values (?,?,?,?)', [req.body.params.price, req.body.params.releaseDate, req.body.params.synopsis, req.body.params.title], function(error, results, field) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    });
    connection.end();
})

app.get('/checkUser', function(req, res) {
    var connection = getConnection();

    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
    });

    connection.query('SELECT * FROM jugadores WHERE id = ?', [req.body.params.email],
        function(error, results, field) {
            if (error) throw error;
            res.send(JSON.stringify(results));
        });
    connection.end();
})

app.post('/addUser', function(req, res) {
    var connection = getConnection();
    console.log(req)
    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
    });

    connection.end();
})


app.get('/getRanking', function(req, res) {
    var connection = getConnection();

    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
    });

    connection.query('SELECT pl.email, COUNT(*) as victories FROM players pl JOIN participations p on pl.id = p.idP WHERE p.position = 1 GROUP BY pl.id ORDER BY victories DESC',
        function(error, results, field) {
            if (error) throw error;
            res.send(JSON.stringify(results));
        });
    connection.end();
})




function getConnection() {
    return mysql.createConnection(config);
}


app.listen(3000, () => {
    console.log('Server started!')
})

// jsonData.data.forEach(function (manga) {
//     connection.query('insert into products values (null,?,?,?,?,?,?,?)', [manga.attributes.canonicalTitle, 
//         ,manga.type, manga.attributes.synopsis, , 
//         manga.attributes.posterImage.large, Math.random() * (23 - 6) + 6 ] ,function (error, results, field) {
//         if (error) throw error;
//         // res.send(JSON.stringify(results));
//         console.log('insertado')
//     });
// })