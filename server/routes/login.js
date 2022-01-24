const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const app = express();


app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        //Se interpreta como error del server, no tiene que ver con el email o contraseña.
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        //Si no existe el usuario en la BBDD.
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos.'
                }
            });
        }

        //Comparamos la contraseña ingresada con la almacenada con bcrypt.
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos.'
                }
            });
        }

        //Generamos un JWT 
        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN }); 

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });


    });

});


module.exports = app;