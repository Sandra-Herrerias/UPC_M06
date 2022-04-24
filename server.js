//1- En nuestra primera línea de código, estamos 
//usando la función require para incluir el “módulo express”.
const express = require('express');
//2- Create an object of module 'express'
const app = express();

var mysql = require('mysql');

const config = {
    host: 'localhost',
    database: 'upc_explodingkittens',
    user: 'root',
    password: ''
};



//Per dir-li que les peticions que m'arriben seràn de 
//tipus json
app.use(express.json());
//app.use(express.urlencoded({extended: true}));

/*******************/
/****   CORS    ****/
/*******************/

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    //res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

/*******************/
/****   GET    *****/
/*******************/

//3- Aquí estamos creando una función de devolución de llamada. 
//Esta función se llamará cada vez que alguien navegue a la raíz de nuestra 
//aplicación web que es http://localhost:3000. La función de devolución de llamada se 
//utilizará para enviar la cadena ‘Hello World’ a la página web.
app.get('/', function(req, res) { // ruta predeterminada (/)
    //4 - Enviar resposta 'Hello World'. En la función de devolución de llamada,
    //estamos enviando la cadena “Hello World” al cliente. El parámetro ‘res’ se usa 
    //para enviar contenido de vuelta a la página web. Este parámetro ‘res’ es algo que 
    //proporciona el módulo ‘solicitud’ para permitir que uno envíe contenido de vuelta 
    //a la página web. 
    res.send(JSON.stringify('Home'));
})

/***RUTAS 
 * 
 * /--> Ruta predeterminada
 * 
 * El enrutamiento se refiere para determinar la forma en que una aplicación responde a
 * una solicitud del cliente a un punto final en particular.
 * 
 * Por ejemplo, un cliente puede hacer una solicitud HTTP GET, POST, PUT o DELETE para varias URL, como la que se muestra a continuación;
 *
 *	  http://localhost:3000/Books
 *    http://localhost:3000/Students
 *
 * Si se realiza una solicitud GET para la primera URL, la respuesta ideal sería una lista de libros.
 * Si la solicitud GET se realiza para la segunda URL, la respuesta ideal sería una lista de Estudiantes.
 * Por lo tanto, en función de la URL a la que se accede, se invocará una funcionalidad diferente en el servidor web y, 
 * en consecuencia, la respuesta se enviará al cliente. Este es el concepto de enrutamiento.
 * Cada ruta puede tener una o más funciones de controlador, que se ejecutan cuando la ruta se corresponde.
 */

/**
 * SINTAXIS general RUTA:
 * 
 * app.METHOD(PATH, HANDLER)
 * 
 * 1) aplicación es una instancia del módulo express
 * 2) METHOD es un método de solicitud HTTP (GET, POST, PUT o DELETE)
 * 3) PATH es una ruta en el servidor.
 * 4) HANDLER es la función ejecutada cuando la ruta se corresponde.
 * 
 * El parámetro principal que usaremos es el parámetro ‘res’ que se puede usar para enviar información al cliente.
 * El parámetro ‘req’ tiene información sobre la solicitud que se está realizando.
 * 
 */

/*
//DISPLAY a single shirt by ID
app.get('/shirts/:id', (request, response) => {
    var connection = mysql.createConnection(config);
    const id = request.params.id;
    connection.query('SELECT * FROM shirts WHERE id = ?', id, (error, result) => {
        if (error) throw error;
        response.send(result);
    });
    connection.end();
});*/

//DISPLAY ALL SHIRTS
app.get("/get-all-shirts", (request, response) => {
    var connection = mysql.createConnection(config);
    connection.query('SELECT * FROM shirts', (err, rows) => {
        if (err) throw err;
        response.json({
            data: rows
        })
    });
    connection.end();
});


/*******************/
/****   POST    ****/
/*******************/

//UPDATE an existing shirt
app.put('/update-shirts', (request, response) => {
    var connection = mysql.createConnection(config);
    const id = request.body.id;
    const color = request.body.color;
    const size = request.body.size;
    const price = request.body.price;
    const brand = request.body.brand;

    connection.query('UPDATE shirts SET color=?, size=?, price=?, brand=? WHERE id =?', [color, size, price, brand, id], (error, result, fields) => {
        if (error) throw error;
        //response.send(request.body.brand);
        //response.send('Shirt updated successfully.');
        response.send(result);
    });
    connection.end();
});

//DELETE a shirt
app.delete('/delete-shirts', (request, response) => {
    var connection = mysql.createConnection(config);
    const id = request.body.id;

    connection.query('DELETE FROM shirts WHERE id = ?', id, (error, result) => {
        if (error) throw error;
        response.send(result);
    });
    connection.end();
});


//5- Fer que el servidor escolti el port 3000. Estamos utilizando la función de 
//escuchar para hacer que nuestra aplicación de servidor escuche las solicitudes 
//de los clientes en el puerto no 3000.
app.listen(3000, () => {
    console.log('Server started!')
})