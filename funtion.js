const milestones = document.querySelectorAll('.milestone');
        
function checkScroll() {
    milestones.forEach(milestone => {
        const milestoneTop = milestone.getBoundingClientRect().top;
        if (milestoneTop < window.innerHeight * 0.8) {
            milestone.classList.add('active');
        }
    });
}  

window.addEventListener('scroll', checkScroll);
checkScroll(); // Initial check

// Subscription Pop-up Functions
function showSubscription() {
    const overlay = document.getElementById('subscriptionOverlay');
    const box = document.getElementById('subscriptionBox');
    overlay.style.display = 'flex';
    setTimeout(() => box.classList.add('active'), 10);
}

function closeSubscription() {
    const box = document.getElementById('subscriptionBox');
    box.classList.remove('active');
    setTimeout(() => {
        document.getElementById('subscriptionOverlay').style.display ='none';
    }, 300);
}

function handleSubscription(e) {
    e.preventDefault();
    const successMessage = document.getElementById('subscriptionSuccess');
    successMessage.style.display = 'block';
    setTimeout(() => {
        closeSubscription();
        successMessage.style.display = 'none';
    }, 2000);
}

// Show pop-up after 5 seconds
setTimeout(showSubscription, 5000);

// Close when clicking outside
document.getElementById('subscriptionOverlay').addEventListener('click', (e) => {
    if(e.target === document.getElementById('subscriptionOverlay')) {
        closeSubscription();
    }
});

// Chat Bot Functionality
let chatOpen = false;

function toggleChat() {
    const container = document.getElementById('chatContainer');
    chatOpen = !chatOpen;
    container.classList.toggle('active');
}

async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    userInput.value = '';

    // Show typing indicator
    document.getElementById('typingIndicator').style.display = 'block';
    
    // Simulate AI response delay
    setTimeout(() => {
        document.getElementById('typingIndicator').style.display = 'none';
        const response = generateResponse(message);
        addMessage(response, 'bot');
    }, 1000);
}

function addMessage(text, sender) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function generateResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    const responses = {
        'hello': 'Hello! How can I assist you with your smart home?',
        'lights': 'I can help control your lights. Which room would you like to adjust?',
        'temperature': 'Current home temperature is 72°F. Would you like to adjust it?',
        'security': 'All security systems are currently active. Would you like to view camera feeds?',
        'default': 'I can help with: \n- Light control \n- Temperature adjustment \n- Security status \n- Energy usage \nHow can I assist you?'
    };

    for (const [key, value] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
            return value;
        }
    }
    return responses['default'];
}

// Handle Enter key
document.getElementById('userInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
// Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}
setInterval(nextSlide, 5000);

// Mouse Trailer
const trailer = document.querySelector(".mouse-trailer");
window.addEventListener("mousemove", e => {
    trailer.animate({
        left: `${e.clientX - 10}px`,
        top: `${e.clientY - 10}px`
    }, { duration: 500, fill: "forwards" });
});

// Particle System
function createParticles() {
    const container = document.querySelector('.particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5}px;
            height: ${Math.random() * 5}px;
            background: rgba(255,69,0,${Math.random()});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: particleMove ${5 + Math.random() * 10}s linear infinite;
        `;
        container.appendChild(particle);
    }
}
createParticles();

// 3D Card Effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${-(y - rect.height/2)/10}deg)
            rotateY(${(x - rect.width/2)/10}deg)
            scale(1.05)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});
document.getElementById('hamburger-button').addEventListener('click', function() {
    document.getElementById('nav-menu').classList.toggle('active');
});