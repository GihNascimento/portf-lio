document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animation on scroll for sections
    const sections = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // viewport as root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Unobserve after animation to prevent re-triggering
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove class if element goes out of view (for repeat animations)
                // entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Lógica para Dark Mode
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Função para aplicar o tema salvo
    function applySavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.textContent = '☀️'; // Ícone para modo claro
        } else {
            body.classList.remove('dark-mode');
            themeToggle.textContent = '🌙'; // Ícone para modo escuro
        }
    }

    // Aplica o tema salvo ao carregar a página
    applySavedTheme();

    // Event listener para o botão de alternar tema
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode'); // Alterna a classe 'dark-mode'
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark'); // Salva a preferência
            themeToggle.textContent = '☀️'; // Muda o ícone
        } else {
            localStorage.setItem('theme', 'light'); // Salva a preferência
            themeToggle.textContent = '🌙'; // Muda o ícone
        }
    });
});