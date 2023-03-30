import {Testimoniales} from '../models/Testimoniales.js';

const guardarTestimonial = async (req, res) => {
    const {nombre, correo, mensaje} = req.body;
    const errores = [];

    if(nombre.trim() === '') {
        errores.push({mensaje: 'el nombre esta vácio'});
    } 
    
    if(correo.trim() === '') {
        errores.push({mensaje: 'el correo esta vácio'});
    } 
    
    if(mensaje.trim() === '') {
        errores.push({mensaje: 'el mensaje esta vácio'});
    }

    if(errores.length > 0) {
        //consultar testimoniales exitentes
        const testimoniales = await Testimoniales.findAll();
        //retornar la vista de testimoniales pero con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        });
    } else {
        //almacenar en la BD
        try {
            await Testimoniales.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    guardarTestimonial
}