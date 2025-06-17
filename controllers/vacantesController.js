const mongoose = require('mongoose');
const Vacante = mongoose.model('vacante');

exports.formularioNuevaVacante = (req, res) => {
    res.render('nueva-vacante', {
        nombrePagina: 'New Vacancy',
        tagline: 'Fill out the form and post your vacancy'
    });
}


// Add vacancies to the database
exports.agregarVacante = async (req, res) => {
    const vacante = new Vacante(req.body);

    // Array of skills
    vacante.skills = req.body.skills.split(',');
  
    // Save to the database
    const nuevaVacante = await vacante.save()

    // Redirect
    res.redirect(`/vacancies/${nuevaVacante.url}`);

}


// Read a single vacancy
exports.mostrarVacante = async (req, res, next) => {
    try {
        const vacante = await Vacante.findOne({ url: req.params.url }).lean();
        
        if (!vacante) {
            return next();
        }

        res.render('vacante', {
            vacante,
            nombrePagina: vacante.titulo,
            barra: true
        });
    } catch (error) {
        console.error('Error fetching vacancy:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.formularioEditarVacante = async (req, res, next) => {
    try {
        const vacante = await Vacante.findOne({ url: req.params.url }).lean();
        //console.log(vacante);
        //alert(vacante);
        if (!vacante) {
            return next();
        }

        res.render('editar-vacante', {
            vacante,
            nombrePagina: `Editing: ${vacante.titulo}`
        });
    } catch (error) {
        console.error('Error fetching vacancy for edit:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.editarVacante = async (req, res) => {
    const vacanteActualizada = req.body;

    // Array of skills
    vacanteActualizada.skills = req.body.skills.split(',');

    try {
        const vacante = await Vacante.findOneAndUpdate({ url: req.params.url }, vacanteActualizada, {
            new: true,
            runValidators: true
        });
        res.redirect(`/vacancies/${req.params.url}`);
    } catch (error) {
        console.error('Error updating vacancy:', error);
        res.status(500).send('Internal Server Error');
    }
};
