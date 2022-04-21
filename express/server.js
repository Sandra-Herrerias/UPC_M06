const express = require('express')
const app = express()

var mysql = require('mysql');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.delete('/deleteProduct/:id', function (req, res) {
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
    });

    connection.query('DELETE FROM products WHERE id = ?', [req.params.id], function (error, results, field) {
        if (error) throw error;
        res.send(JSON.stringify(results));
        console.log(results);
    });

    connection.end();
})

app.get('/getUsers', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        database: 'campeonato',
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

    connection.query('select * from comentarios', function (error, results, field) {
        if (error) throw error;
        console.log(JSON.stringify(results));
        res.send(JSON.stringify(results));
        console.log('enviado!')
    });

    // jsonData.data.forEach(function (manga) {
    //     connection.query('insert into products values (null,?,?,?,?,?,?,?)', [manga.attributes.canonicalTitle, 
    //         ,manga.type, manga.attributes.synopsis, , 
    //         manga.attributes.posterImage.large, Math.random() * (23 - 6) + 6 ] ,function (error, results, field) {
    //         if (error) throw error;
    //         // res.send(JSON.stringify(results));
    //         console.log('insertado')
    //     });
    // })


    connection.end();
})

app.put('/updateManga', function (req, res) {
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
        [req.body.params.price, req.body.params.releaseDate, req.body.params.synopsis, req.body.params.title, req.body.params.type,req.body.params.id], function (error, results, field) {
            if (error) throw error;
            res.send(JSON.stringify(results));
            console.log('updated!')
        });
    connection.end();
})

app.listen(3000);
