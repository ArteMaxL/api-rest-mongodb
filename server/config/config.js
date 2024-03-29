// ====================================
// Puerto
// ====================================
process.env.PORT = process.env.PORT  || 3000;

// ====================================
// Entorno
// ====================================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// ====================================
// Vencimiento del Token
// ====================================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ====================================
// SEED de autenticación
// ====================================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ====================================
// Base de Datos
// ====================================

/* 
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:<password>@pruebamongodb.nc6th.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
}); */


///
let urlDB;

//if (process.env.NODE_ENV === "dev"){
    urlDB = 'mongodb://127.0.0.1:27017/cafe';
//} else {
//    urlDB = "mongodb+srv://admin:admin@pruebamongodb.nc6th.mongodb.net/PruebaMongoDB?retryWrites=true&w=majority";
//};

process.env.URLDB = urlDB;
