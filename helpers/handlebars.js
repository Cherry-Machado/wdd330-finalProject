module.exports = {
    seleccionarSkills : (seleccionadas = [], opciones) => {
       const skills = ['HTML5', 'CSS3', 'CSSGrid', 'Flexbox',
         'JavaScript', 'jQuery', 'Node', 'Angular', 'VueJS', 'ReactJS',
         'React Hooks', 'Redux', 'Apollo', 'GraphQL', 'TypeScript', 'PHP',
         'Laravel', 'Symfony', 'Python', 'Django', 'ORM', 'Sequelize',
         'Mongoose', 'SQL', 'MVC', 'SASS', 'WordPress'];

         let html = '';
         skills.forEach(skill => {
            html += `
               <li ${seleccionadas.includes(skill) ? ' class="activo"' : ''}>${skill}</li>
             `;
           });

            return opciones.fn().html = html;
      },
      tipoContrato: (seleccionado, opciones) => {
         return opciones.fn(this).replace(
            new RegExp(`value="${seleccionado}"`), '$& selected="selected"')
      },
      mostrarAlertas: (mensajes, opciones) => {
        const categorias = Object.keys(mensajes);
        let html = '';

        categorias.forEach(categoria => {
            if (Array.isArray(mensajes[categoria])) {
                mensajes[categoria].forEach(mensaje => {
                    html += `<div class="alerta ${categoria}">${mensaje}</div>`;
                });
            } else if (mensajes[categoria]) { // Si es un string directamente (un solo mensaje)
                html += `<div class="alerta ${categoria}">${mensajes[categoria]}</div>`;
            }
        });

        return opciones.fn(html); // Devuelve el HTML para que Handlebars lo inserte
      }
};