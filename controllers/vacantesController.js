const mongoose = require('mongoose');
const Vacante = mongoose.model('vacante');

exports.formularioNuevaVacante = (req, res) => {
    res.render('nueva-vacante', {
        nombrePagina: 'New Vacancy',
        tagline: 'Fill out the form and post your vacancy'
    });
}

exports.agregarVacante = async(req, res) => {
    const vacante = new Vacante(req.body);
    // Save the vacancy to the database
   
    // create array of skills from the string input
    vacante.skills = req.body.skills.split(',');

    // save vacancy to the database and redirect to the new vacancy page
    const nuevaVacante = await vacante.save();
    res.redirect(`/vacancies/${nuevaVacante.url}`);
    console.log(vacante);
}