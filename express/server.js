const express = require('express')
const app = express()
const mysql = require('mysql');
const cors = require('cors');

app.use(cors({
    origin: '*'
}));

app.use(express.json());

var config = {
    host: 'localhost',
    database: 'upc_explodingkittens',
    user: 'root',
    password: ''
};



app.get('/getComments', function(req, res) {
    var connection = getConnection();
    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
    });
    connection.query('SELECT comments.id as id, comments.comment as comment, players.nickname as nickname, players.email as email FROM players INNER JOIN comments ON players.id=comments.id_player;',
        function(error, results, field) {
            if (error) throw error;
            res.send(JSON.stringify(results));

        });
    connection.end();
})

app.post('/addComment', function(request, res) {

    var connection = getConnection();

    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
    });

    const comment = request.body.comment;
    const id_player = request.body.id_player;
    const created_at = request.body.created_at;
    const updated_at = request.body.updated_at;

    console.log("ID: " + id_player);

    connection.query("INSERT INTO comments (comment, id_player, created_at, updated_at) values (?,?,?,?)", [comment, id_player, created_at, updated_at], function(error, results, field) {
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

    connection.query('SELECT * FROM players WHERE id = ?', [req.body.params.email],
        function(error, results, field) {
            if (error) throw error;
            res.send(JSON.stringify(results));
        });
    connection.end();
})

app.post('/login', function(req, res) {
    var connection = getConnection();

    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
    });

    connection.query('SELECT * FROM players WHERE email = ? and password = ?', [req.body._email, req.body._password],
        function(error, results, field) {
            if (error) {
                res.send(null);
            };

            if (results.length > 0) {
                res.send(JSON.stringify(results));
            } else {
                res.send(null);
            }
        });
    connection.end();
})

app.post('/findByNickname', function(req, res) {
    var connection = getConnection();

    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
    });

    console.log(req.body.nickname);

    connection.query('SELECT * FROM players WHERE nickname = ?', [req.body.nickname],
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

//DELETE a comment
app.delete('/delete-comment', (request, response) => {
    var connection = mysql.createConnection(config);
    const id = request.body.id;
    console.log(request.body);
    connection.query('DELETE FROM comments WHERE id = ?', [id], (error, result) => {
        if (error) throw error;
        response.send(result);
    });
    connection.end();
});


//UPDATE an existing comment
app.put('/update-comment', (request, response) => {
    var connection = mysql.createConnection(config);
    const id = request.body.id;
    const comment = request.body.comment;

    connection.query('UPDATE comments SET comment=? WHERE id =?', [comment, id], (error, result, fields) => {
        if (error) throw error;
        response.send(result);
    });
    connection.end();
});


function getConnection() {
    return mysql.createConnection(config);
}


app.listen(3000, () => {
    console.log('Server started!')
})