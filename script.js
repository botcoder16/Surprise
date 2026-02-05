const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const proposalCard = document.getElementById('proposal-card');
const successCard = document.getElementById('success-card');

const phrases = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;("
];

let phraseIndex = 0;

// NO BUTTON INTERACTION
// Instead of just random movement, let's make it run away from the cursor
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('click', moveNoButton); // Just in case they manage to click it

function moveNoButton() {
    // Add 'moving' class to let it break free from the flex layout
    if (!noBtn.classList.contains('moving')) {
        noBtn.classList.add('moving');
    }

    // Get the boundaries of the card (the white box)
    const cardRect = proposalCard.getBoundingClientRect();

    // Calculate available space within the card
    // Subtract button dimensions to keep it fully inside
    const maxX = cardRect.width - noBtn.offsetWidth;
    const maxY = cardRect.height - noBtn.offsetHeight;

    // Generate random position relative to the card's top-left corner
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Apply the new position (adding card's offset since we are using fixed/absolute positioning relative to window)
    noBtn.style.left = `${cardRect.left + randomX}px`;
    noBtn.style.top = `${cardRect.top + randomY}px`;
}

// YES BUTTON INTERACTION
yesBtn.addEventListener('click', () => {
    proposalCard.classList.add('hidden');
    successCard.classList.remove('hidden');

    // Trigger confetti or something fun here could be added
});
