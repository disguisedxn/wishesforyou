// Enhanced interactivity for the birthday website
document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript loaded successfully!');
    
    // Create confetti effect
    createConfetti();
    
    // Add click effects to boxes
    addBoxInteractions();
    
    // Add typing effect to messages
    addTypingEffect();
    
    // Add parallax effect to floating elements
    addParallaxEffect();
});

function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    if (!confettiContainer) {
        console.log('Confetti container not found');
        return;
    }
    
    const colors = ['#ff6b9d', '#ffb3d1', '#8b5a96', '#d8b4e2', '#ffffff'];
    const shapes = ['🎉', '🎊', '✨', '⭐', '💖', '💕', '💗'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
            confetti.style.position = 'absolute';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.fontSize = Math.random() * 20 + 10 + 'px';
            confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            
            confettiContainer.appendChild(confetti);
            
            // Animate confetti falling using CSS animations
            const fallDuration = Math.random() * 3 + 2;
            const horizontalDrift = (Math.random() - 0.5) * 200;
            
            confetti.style.animation = `confettiFall ${fallDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
            confetti.style.setProperty('--drift', horizontalDrift + 'px');
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, fallDuration * 1000);
        }, i * 100);
    }
}

function addBoxInteractions() {
    const boxes = document.querySelectorAll('.message-box');
    if (boxes.length === 0) {
        console.log('No message boxes found');
        return;
    }
    
    boxes.forEach((box, index) => {
        box.addEventListener('click', function() {
            // Check if it's a blind box and not yet revealed
            if (this.classList.contains('blind-box') && !this.classList.contains('revealed')) {
                // Reveal the blind box
                this.classList.add('revealed');
                
                // Add sparkle effect
                createSparkleEffect(this);
                
                // Add confetti burst
                createConfettiBurst(this);
                
                // Add typing effect to revealed content
                setTimeout(() => {
                    addTypingEffectToBox(this);
                }, 500);
                
                console.log(`Blind box ${index + 1} revealed!`);
            } else {
                // Regular click animation for already revealed boxes
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Add sparkle effect
                createSparkleEffect(this);
                
                // Add sound effect (visual feedback)
                addClickFeedback(this);
            }
        });
        
        // Add hover sound effect
        box.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });
}

function createSparkleEffect(element) {
    const sparkles = ['✨', '⭐', '💫', '🌟'];
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.position = 'absolute';
            sparkle.style.left = Math.random() * element.offsetWidth + 'px';
            sparkle.style.top = Math.random() * element.offsetHeight + 'px';
            sparkle.style.fontSize = '1.5rem';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '10';
            
            element.appendChild(sparkle);
            
            // Use CSS animation instead of Web Animations API
            sparkle.style.animation = 'sparkleEffect 1s ease-out forwards';
            
            // Remove sparkle after animation
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.remove();
                }
            }, 1000);
        }, i * 50);
    }
}

function addClickFeedback(element) {
    element.style.boxShadow = '0 0 30px rgba(255, 107, 157, 0.6)';
    setTimeout(() => {
        element.style.boxShadow = '';
    }, 300);
}

function addTypingEffect() {
    // Only apply typing effect to already visible content
    const messageTexts = document.querySelectorAll('.message-text:not(.hidden-content .message-text)');
    
    messageTexts.forEach((text, index) => {
        const originalText = text.textContent;
        text.textContent = '';
        
        setTimeout(() => {
            typeText(text, originalText, 30);
        }, index * 500);
    });
}

function createConfettiBurst(element) {
    const colors = ['#ff6b9d', '#ffb3d1', '#8b5a96', '#d8b4e2', '#ffffff'];
    const shapes = ['🎉', '🎊', '✨', '⭐', '💖', '💕', '💗'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
            confetti.style.position = 'absolute';
            confetti.style.left = (element.offsetLeft + Math.random() * element.offsetWidth) + 'px';
            confetti.style.top = (element.offsetTop + Math.random() * element.offsetHeight) + 'px';
            confetti.style.fontSize = Math.random() * 15 + 10 + 'px';
            confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            
            document.body.appendChild(confetti);
            
            // Animate confetti burst
            const burstDuration = Math.random() * 2 + 1;
            const horizontalDrift = (Math.random() - 0.5) * 100;
            const verticalDrift = -Math.random() * 100;
            
            confetti.style.animation = `confettiBurst ${burstDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
            confetti.style.setProperty('--drift-x', horizontalDrift + 'px');
            confetti.style.setProperty('--drift-y', verticalDrift + 'px');
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, burstDuration * 1000);
        }, i * 50);
    }
}

function addTypingEffectToBox(box) {
    const messageTexts = box.querySelectorAll('.message-text');
    
    messageTexts.forEach((text, index) => {
        const originalText = text.textContent;
        text.textContent = '';
        
        setTimeout(() => {
            typeText(text, originalText, 30);
        }, index * 300);
    });
}

function typeText(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

function addParallaxEffect() {
    const floatingElements = document.querySelectorAll('.floating-heart, .floating-star, .floating-sparkle, .floating-balloon, .floating-cake, .floating-gift, .floating-confetti, .floating-rainbow, .floating-flower, .floating-butterfly, .floating-cupcake, .floating-heart2, .floating-kiss, .floating-diamond');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Add keyboard interactions
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const boxes = document.querySelectorAll('.message-box');
        const randomBox = boxes[Math.floor(Math.random() * boxes.length)];
        randomBox.click();
    }
});

// Add touch interactions for mobile
let touchStartY = 0;
document.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    const touchEndY = e.changedTouches[0].clientY;
    const touchDiff = touchStartY - touchEndY;
    
    if (Math.abs(touchDiff) > 50) {
        createConfetti();
    }
});