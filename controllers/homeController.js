exports.mostrarTrabajos = (req, res) => {
    res.render('home', {
       nombrePagina: 'softdevJobs',
       tagline: 'Find and post jobs for software developers',
       barra: true,
       boton: true
    })
}
