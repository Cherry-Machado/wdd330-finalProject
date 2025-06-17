const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');


exports.formularioCrearCuenta = (req, res) => {
    res.render('crear-cuenta', {
       nombrePagina: 'Create your account in softdebJobs',
       tagline: 'Start posting your jobs for free. Just create an account.'
    });
};

exports.crearUsuario = async (req, res, next) => {
    // Read the data from the form
    const usuario = req.body;

    // Create a new user
    const nuevoUsuario = new Usuarios(usuario);

    // Save the user in the database
    try {
        await nuevoUsuario.save();
        if (!nuevoUsuario) {
            return next();
        }
        res.redirect('/login');
    } catch (error) {
        // Handle errors, such as duplicate email
        res.render('crear-cuenta', {
            nombrePagina: 'Create your account in softdebJobs',
            tagline: 'Start posting your jobs for free. Just create an account.',
            errores: error.errors
        });
    }
}   