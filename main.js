// Número total de alunos
const totalStudents = 4; // Altere para o número total de alunos

// Criação do array de alunos
const students = Array.from({ length: totalStudents }, (_, index) => (index + 1).toString());

let currentIndex = 0;
const studentImage = document.getElementById("student-image");
const studentName = document.getElementById("student-name");
const nextButton = document.getElementById("next-button");

// Carregar o mapeamento de números para nomes de um arquivo CSV
function loadCSV() {
    fetch("base.csv")  // Substitua pelo caminho correto para o seu arquivo CSV
        .then(response => response.text())
        .then(data => {
            const lines = data.split("\n");
            const mapping = {};

            for (let i = 1; i < lines.length; i++) {
                const parts = lines[i].split(",");
                if (parts.length === 2) {
                    const numero = parts[0].trim();
                    const nome = parts[1].trim();
                    mapping[numero] = nome;
                }
            }

            // Função para selecionar um aluno aleatoriamente
            function selectRandomStudent() {
                if (currentIndex === students.length) {
                    currentIndex = 0; // Reinicia o índice para sortear novamente
                }

                const randomIndex = Math.floor(Math.random() * students.length);
                const studentNumero = students[randomIndex];
                studentImage.src = `img/${studentNumero}.jpeg`;
                studentName.textContent = `${mapping[studentNumero]}`;
                students.splice(randomIndex, 1);
                currentIndex++;
            }

            // Event listener para o botão "Próximo Aluno"
            nextButton.addEventListener("click", selectRandomStudent);

            // Inicializa o sorteio do primeiro aluno
            selectRandomStudent();
        });
}

// Carrega o mapeamento de números para nomes a partir do CSV
loadCSV();
