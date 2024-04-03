const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Sample array of affirmations
const affirmations = [
    "You are loved.",
    "You are capable of great things.",
    "You are worthy of happiness.",
    "You are stronger than you think.",
    "You are exactly where you need to be.",
    "I give myself permission to take pride in my accomplishments big and small.",
    "I am at peace with myself I release the need to judge myself and others.",
    "I am worthy of all the rest I need today.",
    "I am allowed to do things differently.",
    "I choose to let go of my doubts and believe in myself.",
    "My worth is not dependent on what I accomplish today .",
    "I am allowed to take up space.",
    "I am worthy of the time it takes to find what brings me joy.",
    "If I can't control it, I won't let it control me.",
    "I am not defined by my pain or my past.",
    "I can change my mind if something no longer aligns with the life I want to lead.",
    "My potenital is endless.",
    "I am allowed to prioritise my needs.",
    "I can change my mind if something no longer aligns with the life I want to lead.",
    "My potential is endless.",
    "I am allowed to prioritise my needs.",
    "I embrace the journey as much as the destination.",
    "I am worthy of my dreams and goals.",
    "My challenges help me grow.",
    "I am resilient, strong, and brave.",
    "I give myself permission to go after what I want.",
    "I choose to see the good in others.",
    "I am in charge of how I feel and today I choose happiness.",
    "I am loved, loving, and lovable.",
    "I trust myself to make the right decisions.",
    "I am enough just as I am.",
    "I am deserving of compassion from myself and others.",
    "I let go of what I cannot change.",
    "I have the power to create change.",
    "I am a magnet for positivity and good opportunities.",
    "My mind is full of brilliant ideas.",
    "I radiate confidence and grace.",
    "Every day, in every way, I am becoming better and better.",
    "I am grateful for the abundance that I have and the abundance on its way.",
    "I find joy in the little things and celebrate my small victories.",
    "I am open to new adventures and experiences.",
    "I am patient and calm and greet the day with ease.",
    "I am focused on my goals and feel passionate about my work.",
    "I am surrounded by love.",
    "I treat myself with kindness and respect.",
    "I have the courage to create positive change in my life.",
    "I release doubt and welcome faith.",
    "I am guided in my every step by love and positivity.",
    "I am a unique and valuable individual.",
    "I am capable of overcoming any hurdles.",
    "I have the freedom & power to create the life I desire.",
    "I choose to fill my mind with positive thoughts.",
    "I am deserving of my dreams and goals.",
    "I am open and receptive to all the wealth life offers me.",
    "I am constantly growing and evolving.",
    "I trust the timing of my life.",
    "I easily find solutions to challenges and roadblocks.",
    "I radiate beauty, charm, and grace.",
    "I enjoy the process of learning and growing.",
    "I am at peace with who I am as a person.",
    "I choose to rise above negative feelings and discard all judgments of others.",
    "I am soft, gentle, and loving to myself and others.",
    "I believe in my abilities and express my true self with ease.",
    "I give myself space to grow and learn.",
    "I allow myself to be who I am without judgment.",
    "I listen to my intuition and trust my inner guide.",
    "I accept my emotions and let them serve their purpose.",
    "I give myself the care and attention that I deserve.",
];

function getRandomAffirmation() {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    return affirmations[randomIndex];
}

app.use(express.static('public'));

app.get('/affirmation', (req, res) => {
    const affirmation = getRandomAffirmation();
    res.status(200).json({ text: affirmation });
});

// Route to handle 'favicon.ico' request
app.get('/favicon.ico', (req, res) => {
    res.status(204); // No Content
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});