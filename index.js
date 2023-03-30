import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

var app = express();

//conetar a la base de datos
db.authenticate()
.then(() => console.log('Base de datos conectada'))
.catch(error => console.log(error));

var port = process.env.PORT || 4000;

//habilitar pug
app.set('view engine', 'pug');

//obtener el año actual 
/*
req - lo que se envia al servidor
res - lo que responde el servido
next - cuando termina con ese middleware se salta al siguiente
si no funciona el next se forza agregando antes return
*/
app.use((req, res, next) => {
    //pasar una variable a una vista
    const year = new Date();
    res.locals.currentYear = year.getFullYear();
    res.locals.nombresitio = 'Agencia de viajes';
    next();//evita que no se atore en el console y siga ejecutando lo siguientes
});

//agregar bodyparser para leer datos de formularios - esta libreria ya viene con express
app.use(express.urlencoded({extended: true}));

//carpeta publica para assets y estilos
app.use(express.static('public'));

//habilitar las rutas
app.use('/',router);

app.listen(port, () => {
    console.log(`Servidor corriendo: localhost:${port}`);
});