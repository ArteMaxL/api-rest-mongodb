const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//Definimos roles válidos 
let rolesValidos = {
    values: ["ADMIN_ROLE", "USER_ROLE"],
    message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es requerido."]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El email es requerido."]
    },
    password: {
        type: String,
        required: [true, "La contraseña es requerida."]
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: "USER_ROLE",
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//Elimina del JSON de respuesta el campo password.
usuarioSchema.methods.toJSON = function () {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
};

//Para validar si existe un usuario con ese email en la BBDD
usuarioSchema.plugin(uniqueValidator, {
    message : '{PATH} ya hay un Usuario registrado con ese email.'
});

module.exports = mongoose.model("Usuario", usuarioSchema);