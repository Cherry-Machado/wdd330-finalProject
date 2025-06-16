document.addEventListener('DOMContentLoaded', () => {
  const skills = document.querySelector('.lista-conocimientos');
  
    if (skills) {
        skills.addEventListener('click', agregarSkills);
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