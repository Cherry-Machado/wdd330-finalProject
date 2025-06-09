exports.mostrarTrabajos = (req, res) => {
    res.render('home', {
       title: 'WDD330',
       nombrePagina: 'softdevJobs',
       tagline: 'Find and post jobs for software developers',
       barra: true,
       boton: true
    });
};
