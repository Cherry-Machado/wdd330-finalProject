const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const vacantesController = require('../controllers/vacantesController');
const usuarioController= require('../controllers/usuarioController');
const validationMiddleware = require('../middleware/validation');

module.exports = () =>{
    router.get('/', homeController.mostrarTrabajos);

    // Routes for create vacancies
    router.get('/vacancies/new', vacantesController.formularioNuevaVacante);
    router.post('/vacancies/new', vacantesController.agregarVacante);

    // Routes for read a single vacancy
    router.get('/vacancies/:url', vacantesController.mostrarVacante);

    //Edit vacancy
    router.get('/vacancies/edit/:url', vacantesController.formularioEditarVacante);
    router.post('/vacancies/edit/:url', vacantesController.editarVacante);

    // create account
    router.get('/create-account', usuarioController.formularioCrearCuenta);
    router.post('/create-account', 
        validationMiddleware.validarRegistro,
        usuarioController.crearUsuario
    );

    return router;

};
