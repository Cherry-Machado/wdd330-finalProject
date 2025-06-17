const mongoose = require('mongoose');
const Vacante = mongoose.model('vacante');

exports.mostrarTrabajos = async (req, res, next) => {
    try {
        const vacantes = await Vacante.find().lean();

        if(!vacantes) {
            return next(); // If no vacancies found, proceed to the next middleware
        }
        res.render('home', {
            title: 'WDD330',
            nombrePagina: 'softdevJobs',
            tagline: 'Find and post jobs for software developers',
            barra: true,
            boton: true,
            vacantes
        });
    } catch (error) {
        console.error('Error fetching vacancies:', error);
        res.status(500).send('Internal Server Error');
    }
};
