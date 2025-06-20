// middleware/validation.js
const { body, validationResult } = require('express-validator');

exports.validarRegistro = async (req, res, next) => {
    await body('nombre', 'Name is required').notEmpty().escape().run(req);
    await body('email', 'Email is required').notEmpty().isEmail().withMessage('Invalid email format').escape().run(req);
    await body('password', 'Password is required').notEmpty().escape().run(req);
    await body('confirmar', 'Confirm Password is required').notEmpty().equals(req.body.password).withMessage('Passwords do not match').escape().run(req);
    
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        req.flash('error', errores.array().map(error => error.msg));
        res.render('crear-cuenta', {
            nombrePagina: 'Create your account in softdebJobs',
            tagline: 'Start posting your jobs for free. Just create an account.',
            mensajes: req.flash()
        });
        
        return;
    }
    next();
};