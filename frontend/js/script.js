document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("form-contato").addEventListener("submit", async function (e) {
  e.preventDefault();

  const dados = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    horario: document.getElementById("assunto").value,
    servico: document.getElementById("menssagem").value,
  };

  try {
    const resposta = await fetch("http://192.168.0.105:5000/enviar_msg", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
      document.getElementById("mensagem").innerText = "Menssagem enviado com sucesso!";
    } else {
      document.getElementById("mensagem").innerText = "Erro: " + (resultado.detail || "Erro desconhecido.");
    }
  } catch (erro) {
    console.error(erro);
    document.getElementById("mensagem").innerText = "Erro de conexão com o servidor.";
  }
});

    // Menu mobile
    const menuBtn = document.querySelector('.menu-mobile');
    const nav = document.querySelector('.nav ul');
    
    menuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
    
    //Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efeito de header ao rolar
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Botão voltar ao topo
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
       
    // Animação ao rolar
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.habilidade-card, .projeto-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Configuração inicial para animação
    const animatedElements = document.querySelectorAll('.habilidade-card, .projeto-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executa uma vez ao carregar a página
});
