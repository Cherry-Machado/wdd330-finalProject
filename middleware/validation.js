const { body, validationResult } = require('express-validator');

exports.validarRegistro = async (req, res, next) => {
    await body('nombre', 'Name is required').notEmpty().escape().run(req);
    await body('email', 'Email is required').notEmpty().isEmail().withMessage('Invalid email format').escape().run(req);
    await body('password', 'Password is required').notEmpty().escape().run(req);
    await body('confirmar', 'Confirm Password is required').notEmpty().equals(req.body.password).withMessage('Passwords do not match').escape().run(req);
    
    const errores = validationResult(req);
    console.log('Estos son los errores: ', errores);
   
    if (errores) {
        req.flash('error', errores.array().map(error => error.msg))

         res.render('crear-cuenta', {
            nombrePagina: 'Create your account in softdebJobs',
            tagline: 'Start posting your jobs for free. Just create an account.',
            mensajes: req.flash()

         });

    /* if (!errores.isEmpty()) {
        req.flash('mensajes', errores.array().map(error => error.msg));
        console.log('Contenido de res.locals.mensajes (en el middleware de res.locals):', res.locals.mensajes);
        res.render('crear-cuenta', {
            nombrePagina: 'Create your account in softdebJobs',
            tagline: 'Start posting your jobs for free. Just create an account.',
            mensajes: req.flash()
        }); */
        
        return;
    }
    next();
};