document.addEventListener('DOMContentLoaded', () => {
  const skills = document.querySelector('.lista-conocimientos');
  
    if (skills) {
        skills.addEventListener('click', agregarSkills);

        // Initialize the skills set from the input field
        skillsSeleccionados();
    }
});

const skills = new Set();
// Function to add skills to the input field    
const agregarSkills = (e) => {
    if (e.target.tagName === 'LI') {
       if (e.target.classList.contains('activo')) {
           skills.delete(e.target.textContent);
           e.target.classList.remove('activo');
           
       } else {
           skills.add(e.target.textContent);
           e.target.classList.add('activo');
           
       }
    }
    // Convert the Set to an Array and join with commas
    const skillsArray = [...skills];
    document.querySelector('#skills').value = skillsArray.join(',');  // Convert Set to Array and join with commas
}

const skillsSeleccionados = () => {
   const seleccionadas = Array.from(document.querySelectorAll('.lista-conocimientos .activo'));
 
   seleccionadas.forEach(seleccionada => {
        skills.add(seleccionada.textContent);
    })

    
    // Inyect the selected skills into the Set Hidden Input
   const skillsArray = [...skills];
   document.querySelector('#skills').value = skillsArray.join(',');
}
