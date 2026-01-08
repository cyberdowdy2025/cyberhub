// Matrix Rain Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = '01';
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * canvas.height / fontSize;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function initVisitorCounter() {
    const counterElement = document.getElementById('visitor-count');

    let visitorCount = localStorage.getItem('cyberhub-visitors');

    if (!visitorCount) {
        visitorCount = 1;
    } else {
        visitorCount = parseInt(visitorCount) + 1;
    }

    localStorage.setItem('cyberhub-visitors', visitorCount);
    animateCounter(counterElement, visitorCount);
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 1500;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, stepTime);
}

document.addEventListener('DOMContentLoaded', () => {
    initVisitorCounter();
});

console.log('%c🔒 CyberHub Security Training Platform', 'color: #00ff41; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to the matrix...', 'color: #00d9ff; font-size: 14px;');

// Password Protection for Coming Soon Simulations
let targetUrl = '';

function unlockSimulation(url) {
    targetUrl = url;
    document.getElementById('password-modal').style.display = 'block';
    document.getElementById('password-input').value = '';
    document.getElementById('error-message').textContent = '';
    document.getElementById('password-input').focus();
}

function closeModal() {
    document.getElementById('password-modal').style.display = 'none';
    targetUrl = '';
}

function checkPassword() {
    const password = document.getElementById('password-input').value;
    const errorMessage = document.getElementById('error-message');

    if (password === 'windows') {
        errorMessage.textContent = '✅ Access Granted!';
        errorMessage.style.color = '#00ff41';
        setTimeout(() => {
            window.open(targetUrl, '_blank', 'noopener,noreferrer');
            closeModal();
        }, 500);
    } else {
        errorMessage.textContent = '❌ Incorrect Password';
        errorMessage.style.color = '#ff6b6b';
        document.getElementById('password-input').value = '';
        document.getElementById('password-input').focus();
    }
}

// Allow Enter key to submit password
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && document.getElementById('password-modal').style.display === 'block') {
        checkPassword();
    }
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('password-modal');
    if (event.target === modal) {
        closeModal();
    }
}
