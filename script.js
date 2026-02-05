// --- ELEMENTS ---
const loadingScreen = document.getElementById('loading-screen');
const secCards = document.getElementById('sec-cards');
const secReasons = document.getElementById('sec-reasons');
const secProposal = document.getElementById('sec-proposal');

const btnNextCards = document.getElementById('btn-next-cards');
const btnNextReasons = document.getElementById('btn-next-reasons');

// Proposal Elements
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const proposalCard = document.getElementById('proposal-card');
const successCard = document.getElementById('success-card');

// --- STATE ---
let flippedCards = 0;
const totalCards = 3;

// --- INITIALIZATION (LOADING SCREEN) ---
window.addEventListener('load', () => {
    // Simulate loading time (e.g., 3 seconds)
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            // Show first section
            secCards.classList.remove('hidden');
            secCards.classList.add('section-enter');
        }, 1000); // Wait for fade out
    }, 2500);
});

// --- SECTION 1: CARDS ---
function flipCard(cardId) {
    const cardInner = document.getElementById(`card-${cardId}`);

    // Only flip if not already flipped
    if (!cardInner.classList.contains('flipped')) {
        cardInner.classList.add('flipped');
        flippedCards++;

        // Check if all cards are flipped
        if (flippedCards === totalCards) {
            setTimeout(() => {
                btnNextCards.classList.remove('hidden');
                btnNextCards.classList.add('section-enter'); // Re-use animation
            }, 500);
        }
    }
}

// Next Button: Cards -> Reasons
btnNextCards.addEventListener('click', () => {
    secCards.classList.add('hidden');
    secReasons.classList.remove('hidden');
    secReasons.classList.add('section-enter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// --- SECTION 2: 5 THINGS I LIKE ---
function revealReason(element) {
    if (!element.classList.contains('visible')) {
        element.classList.remove('hidden-item'); // Helper if needed
        element.classList.add('visible');

        // check if all reasons are visible to show next button
        const allReasons = document.querySelectorAll('.reason-item');
        const visibleReasons = document.querySelectorAll('.reason-item.visible');

        if (allReasons.length === visibleReasons.length) {
            setTimeout(() => {
                btnNextReasons.classList.remove('hidden');
                btnNextReasons.classList.add('section-enter');
            }, 500);
        }
    }
}

// Next Button: Reasons -> Proposal
btnNextReasons.addEventListener('click', () => {
    // We want to "move up" or just switch sections. 
    // The user said "the page should just move up and these contents should load on the next page"
    // We can swap them cleanly.
    secReasons.classList.add('hidden');
    secProposal.classList.remove('hidden');
    secProposal.classList.add('section-enter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// --- SECTION 3: PROPOSAL (Existing Logic) ---

// NO BUTTON INTERACTION
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('click', moveNoButton);

function moveNoButton() {
    if (!noBtn.classList.contains('moving')) {
        noBtn.classList.add('moving');
    }

    const cardRect = proposalCard.getBoundingClientRect();
    const maxX = cardRect.width - noBtn.offsetWidth;
    const maxY = cardRect.height - noBtn.offsetHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.left = `${cardRect.left + randomX}px`;
    noBtn.style.top = `${cardRect.top + randomY}px`;
}

// YES BUTTON INTERACTION
yesBtn.addEventListener('click', () => {
    proposalCard.classList.add('hidden');
    successCard.classList.remove('hidden');
    successCard.classList.add('section-enter');
});

// Expose functions to global scope for HTML onclick attributes
window.flipCard = flipCard;
window.revealReason = revealReason;
