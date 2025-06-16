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
        skills.add(e.target.textContent);
        
    }
    console.log(skills);
}