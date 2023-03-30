import {Viaje} from '../models/Viaje.js';
import {Testimoniales} from '../models/Testimoniales.js';

const paginaInicio = async (req, res) => {
    const promiseDB = [];

    promiseDB.push(Viaje.findAll({limit: 3}));
    promiseDB.push(Testimoniales.findAll({limit: 3}));
    //consultar 3 viajes
    try {
        const resultado = await Promise.all(promiseDB); //ejecutar ambos promises o más al mismo tiempo
        res.render('Inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }
}

const paginaNosotros = (req, res) => {
    res.render('nosotros',{
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => {
    //consultar a la BD
    try {
        const viajes = await Viaje.findAll();
        res.render('viajes',{
            pagina: 'Viajes',
            viajes
        });
    } catch (error) {
        console.log(error);
    }
}

const paginaTestimoniales = async(req, res) => {
    try {
        const testimoniales = await Testimoniales.findAll();
        res.render('testimoniales',{
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }
}

//muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    const {slug} = req.params;
    try {
        const viaje = await Viaje.findOne({where: {slug: slug}});
        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}