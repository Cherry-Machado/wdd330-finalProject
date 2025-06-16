const mongoose = require('mongoose');
const Vacante = mongoose.model('Vacante');

exports.formularioNuevaVacante = (req, res) => {
    res.render('nueva-vacante', {
        nombrePagina: 'New Vacancy',
        tagline: 'Fill out the form and post your vacancy'
    });
}

exports.agregarVacante = (req, res) => {
    const vacante = new Vacante(req.body);
    // Save the vacancy to the database
    vacante.save()
        .then(() => res.redirect('/'))
        .catch(err => console.error(err));
}