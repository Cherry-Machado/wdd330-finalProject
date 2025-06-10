exports.formularioNuevaVacante = (req, res) => {
    res.render('nueva-vacante', {
        nombrePagina: 'New Vacancy',
        tagline: 'Fill out the form and post your vacancy'
    });
}