const express = require('express');

const bcrypt = require("bcrypt");

const _ = require("underscore");

const Usuario = require("../models/usuario");

const app = express();



// respond with "hello world" when a GET request is made to the homepage
app.get('/usuario', function (req, res) {

    //Que solo devuelva los usuarios que estan activos : estado: true
    let estado = {
        estado: true
    };

    let desde = req.query.desde || 0;
    desde = Number(desde); //Opcional por si da error

    let limite = req.query.limite || 5;
    limite = Number(limite); //Opcional por si da error

    Usuario.find(estado, 'nombre email role estado google img') //Entre llaves {} se utiliza para filtrar.
        .skip(desde)
        .limit(5)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.count(estado, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cantidad: conteo
                });
            });
        })
});

app.post('/usuario', function (req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

    /* if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: "El nombre es requerido."
        });
    } else {
        res.json({
            persona: body
        });
    } */
});

//Recibe por parámetro el id del usuario a actualizar
app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

    //delete body.password;
    //delete body.google;

    //Ver doc mongoose, el tercer parámetro {new: true} me devuelve el nuevo json con la modificación.
    //runValidators valida la actualización de la operación con respecto al modelo Schema.
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        //usuarioDB.save
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })

});

app.delete('/usuario/:id', function (req, res) {

    let id = req.params.id;

    //Usuario.findByIdAndRemove(id, (err, usuarioBorrado)=>{

    let cambiaEstado = {
        estado: false
    };

    //Para no borrar el usuario de la BBDD, solo le cambiamos el estado a false
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true, runValidators: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        //Si el usuario no existe devuelve un mensaje
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario no encontrado."
                }
            });
        };

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });


});

module.exports = app;