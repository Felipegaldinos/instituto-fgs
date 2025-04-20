const courses = [
    "CiberSegurança", "Lógica de Programação" , "Introdução a Programação", "Python", "Java", "JavaScript",
    "PHP", "Desenvolvimento BackEnd", "Design Gráfico", "Algoritimo", "Análise de Dados", "Inteligência Artificial",
    "Desenvolvimento Web", "UX-UI Design", "Power BI", "Digitação", "Banco de Dados", "Inglês para Tecnologia",
    "Informática", "Desenvolvimento Front-End"
];


function loadCourses() {
    let container = document.getElementById("course-list");
    container.innerHTML = "";
    courses.forEach((course, index) => {
        let div = document.createElement("div");
        div.className = "course-card";
        setTimeout(() => div.classList.add("show"), index * 100);
        div.innerHTML = `
            <img src="/imagens/cursos/${course.replace(/\s+/g, '-').toLowerCase()}.jpg" alt="${course}">

            <h3>${course}</h3>
            <a href="#">Acessar Curso</a>
        `;
        container.appendChild(div);
    });
}

function filterCourses() {
    let searchInput = document.getElementById("search").value.toLowerCase();
    document.querySelectorAll(".course-card").forEach(card => {
        let title = card.querySelector("h3");
        title.innerHTML = title.innerText.replace(/<span class="highlight">|<\/span>/g, "-");
        if (title.innerText.toLowerCase().includes(searchInput)) {
            card.style.display = "block";
            title.innerHTML = title.innerText.replace(new RegExp(searchInput, "gi"), match => `<span class="highlight">${match}</span>`);
        } else {
            card.style.display = "none";
        }
    });
}

document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const button = document.getElementById("theme-toggle");
    button.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

function toggleMenu() {
    document.querySelector(".menu").classList.toggle("active");
}



window.onload = loadCourses;

