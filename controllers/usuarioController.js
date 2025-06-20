// controllers/usuarioController.js
const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');


exports.formularioCrearCuenta = (req, res) => {
    res.render('crear-cuenta', {
       nombrePagina: 'Create your account in softdebJobs',
       tagline: 'Start posting your jobs for free. Just create an account.'
    });
};


exports.crearUsuario = async (req, res, next) => {
    const usuario = req.body;
    const nuevoUsuario = new Usuarios(usuario);

    try {
        await nuevoUsuario.save();

        req.flash('correcto', 'Account created successfully, now you can log in');

        return res.redirect('/login');
    } catch (error) {
       
        req.flash('error', [errorMessage]);
        //console.log('Contenido de res.locals.mensajes (en usuarioController.js)', rres.locals.mensajes);


        return res.redirect('/create-account');
    }
};