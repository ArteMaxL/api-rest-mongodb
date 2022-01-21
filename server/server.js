
const express = require('express');
var bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// respond with "hello world" when a GET request is made to the homepage
app.get('/usuario', function (req, res) {
    res.json('GET /usuario');
});

app.post('/usuario', function (req, res) {

    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: "El nombre es requerido."
        });
    } else {
        res.json({
            persona: body
        });
    }
});

//Recibe por parámetro el id del usuario a actualizar
app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    res.json({
        id
    });
});

app.delete('/usuario', function (req, res) {
    res.json('DELETE /usuario');
});

app.listen(3000, () => {
    console.log("Escuchando puerto:", 3000);
})