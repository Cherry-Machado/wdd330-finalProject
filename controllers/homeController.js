const mongoose = require('mongoose');
const Vacante = mongoose.model('vacante');

exports.mostrarTrabajos = async (req, res, next) => {
    
    const vacantes = await Vacante.find();

    if(!vacantes) {
        return next(); // If no vacancies found, proceed to the next middleware
    }
    res.render('home', {
       title: 'WDD330',
       nombrePagina: 'softdevJobs',
       tagline: 'Find and post jobs for software developers',
       barra: true,
       boton: true,
       vacantes,
    });
};
