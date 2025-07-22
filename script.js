document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove("container");
});

const wrapper = document.querySelector(".wrapper");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");

let animationTimeout;

function resetAnimations() {
    clearTimeout(animationTimeout);
    letter.classList.remove("letter-expanded", "letter-folding");
    envelope.classList.remove("envelope-disappearing");
    letter.style.animation = "none";
    letter.offsetHeight; // Trigger reflow
    letter.style.animation = null;
}

openBtn.addEventListener("click", () => {
    resetAnimations();
    
    wrapper.classList.add("open");
    openBtn.style.display = "none";
    closeBtn.style.display = "inline-block";
    closeBtn.textContent = "Close";
    
    // Старт анимаций после открытия конверта
    animationTimeout = setTimeout(() => {
        // Исчезновение конверта
        envelope.classList.add("envelope-disappearing");
        
        // Письмо полностью разворачивается
        animationTimeout = setTimeout(() => {
            letter.classList.add("letter-expanded");
            
            // Через 3 секунды письмо сворачивается
            animationTimeout = setTimeout(() => {
                letter.classList.add("letter-folding");
                
                // После сворачивания показываем кнопку Replay
                animationTimeout = setTimeout(() => {
                    closeBtn.textContent = "Replay";
                }, 1500);
            }, 3000);
        }, 1000);
    }, 500);
});

closeBtn.addEventListener("click", () => {
    if (closeBtn.textContent === "Replay") {
        location.reload();
        return;
    }
    
    // Сброс анимаций и возврат в исходное состояние
    resetAnimations();
    wrapper.classList.remove("open");
    closeBtn.style.display = "none";
    openBtn.style.display = "inline-block";
});