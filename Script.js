const questions = [
    {
        question: "Your friend hasn't replied for 5 hours. What do you do?",
        answers: [
            { text: "They're probably busy.", trait: "calm" },
            { text: "I'll wait patiently.", trait: "independent" },
            { text: "They're ignoring me 😭", trait: "overthinker" },
            { text: "I'll check their last seen 👀", trait: "investigator" }
        ]
    },

    {
        question: "Your perfect weekend sounds like...",
        answers: [
            { text: "Staying home and relaxing.", trait: "calm" },
            { text: "Going out with friends.", trait: "social" },
            { text: "Doing something completely spontaneous.", trait: "chaotic" },
            { text: "Gaming or watching movies.", trait: "independent" }
        ]
    },

    {
        question: "Someone cancels plans at the last minute. You...",
        answers: [
            { text: "No problem, things happen.", trait: "calm" },
            { text: "I'm disappointed but okay.", trait: "loyal" },
            { text: "Immediately make another plan.", trait: "chaotic" },
            { text: "Wonder why they cancelled.", trait: "overthinker" }
        ]
    },

    {
        question: "When you enter a room full of strangers...",
        answers: [
            { text: "I find a quiet corner.", trait: "independent" },
            { text: "I'll introduce myself eventually.", trait: "calm" },
            { text: "I'll probably start talking to someone.", trait: "social" },
            { text: "I'll observe everyone first.", trait: "investigator" }
        ]
    },

    {
        question: "When you have an important decision to make...",
        answers: [
            { text: "I carefully think it through.", trait: "investigator" },
            { text: "I ask someone I trust.", trait: "loyal" },
            { text: "I go with my gut.", trait: "chaotic" },
            { text: "I overthink every possible outcome.", trait: "overthinker" }
        ]
    },

    {
        question: "Your friend is having a terrible day. You...",
        answers: [
            { text: "Give them space if they need it.", trait: "calm" },
            { text: "Stay with them no matter what.", trait: "loyal" },
            { text: "Try to make them laugh.", trait: "social" },
            { text: "Analyze what went wrong and help fix it.", trait: "investigator" }
        ]
    },

    {
        question: "Someone suddenly says: 'Let's go on an adventure!'",
        answers: [
            { text: "Absolutely. Let's go! 🔥", trait: "chaotic" },
            { text: "Where are we going first?", trait: "investigator" },
            { text: "Maybe... I'll think about it.", trait: "overthinker" },
            { text: "I'd rather stay home.", trait: "independent" }
        ]
    },

    {
        question: "What matters most in a friendship?",
        answers: [
            { text: "Trust and loyalty.", trait: "loyal" },
            { text: "Having fun together.", trait: "social" },
            { text: "Understanding each other.", trait: "calm" },
            { text: "Being able to be completely yourself.", trait: "independent" }
        ]
    }
];


// =============================
// SCORE SYSTEM
// =============================

let scores = {
    calm: 0,
    independent: 0,
    overthinker: 0,
    investigator: 0,
    social: 0,
    chaotic: 0,
    loyal: 0
};

let currentQuestion = 0;
let currentVibe = null;

// =============================
// START
// =============================

function startQuiz() {

    currentQuestion = 0;

    scores = {
        calm: 0,
        independent: 0,
        overthinker: 0,
        investigator: 0,
        social: 0,
        chaotic: 0,
        loyal: 0
    };

    showQuestion();
}


// =============================
// SHOW QUESTION
// =============================

function showQuestion() {

    const app = document.querySelector(".app");

    const question = questions[currentQuestion];

    app.innerHTML = `
        <p class="progress">
            Question ${currentQuestion + 1} of ${questions.length}
        </p>

        <h2>${question.question}</h2>

        <div class="answers">

            ${question.answers.map((answer, index) => `
                <button onclick="selectAnswer(${index})">
                    ${answer.text}
                </button>
            `).join("")}

        </div>
    `;
}


// =============================
// SELECT ANSWER
// =============================


function selectAnswer(answerIndex) {
    // Prevent answers after the quiz has finished.
    if (currentQuestion >= questions.length) {
        return;
    }

    const question = questions[currentQuestion];

    // Safety check: make sure the question and answer exist.
    if (!question || !question.answers[answerIndex]) {
        console.error("Question or answer not found.", {
            currentQuestion,
            answerIndex
        });
        return;
    }

    const selectedAnswer = question.answers[answerIndex];
    scores[selectedAnswer.trait] += 1;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}


// =============================
// FIND TOP TWO TRAITS
// =============================

function getTopTraits() {

    const sortedTraits = Object.entries(scores)
        .sort((a, b) => b[1] - a[1]);

    return [
        sortedTraits[0][0],
        sortedTraits[1][0]
    ];
}


// =============================
// VIBE DATABASE
// =============================

const vibes = {

    "calm-independent": {
        name: "The Peaceful Lone Wolf",
        emoji: "🌙🐺",
        description:
            "You enjoy peace, personal space and doing things your own way. You don't need constant attention to be happy."
    },

    "calm-overthinker": {
        name: "The Quiet Overthinker",
        emoji: "🌙🧠",
        description:
            "You look calm on the outside while your brain is running approximately 47 simulations."
    },

    "calm-investigator": {
        name: "The Silent Strategist",
        emoji: "🌙🕵️",
        description:
            "You observe first, think carefully and usually notice things everyone else missed."
    },

    "calm-social": {
        name: "The Chill Social Butterfly",
        emoji: "🦋😌",
        description:
            "You can enjoy a crowd without letting the crowd control you. You bring relaxed energy wherever you go."
    },

    "calm-chaotic": {
        name: "The Calm Chaos",
        emoji: "😌🔥",
        description:
            "You somehow remain calm while making decisions that would make a normal person nervous."
    },

    "calm-loyal": {
        name: "The Gentle Protector",
        emoji: "🕊️❤️",
        description:
            "You're peaceful by nature, but extremely protective of the people you genuinely care about."
    },

    "independent-overthinker": {
        name: "The Independent Overthinker",
        emoji: "🐺🧠",
        description:
            "You like handling things yourself, but your brain occasionally turns simple decisions into entire research projects."
    },

    "independent-investigator": {
        name: "The Lone Detective",
        emoji: "🐺🕵️",
        description:
            "You prefer figuring things out yourself and you rarely accept the first explanation you hear."
    },

    "independent-social": {
        name: "The Selective Socialite",
        emoji: "🐺🦋",
        description:
            "You enjoy people, but only when they're YOUR people. Your social battery has strict quality control."
    },

    "independent-chaotic": {
        name: "The Wild Card",
        emoji: "🐺🔥",
        description:
            "You don't need a crowd to have fun. Give you freedom and one questionable idea and you're good to go."
    },

    "independent-loyal": {
        name: "The Ride-or-Die",
        emoji: "🐺❤️",
        description:
            "You're independent, but once someone earns your trust, you'll stand beside them through almost anything."
    },

    "overthinker-investigator": {
        name: "The Human Detective",
        emoji: "🧠🕵️",
        description:
            "You notice everything, analyze everything and occasionally discover problems that didn't even exist."
    },

    "overthinker-social": {
        name: "The Social Overthinker",
        emoji: "🧠🦋",
        description:
            "You love people but may replay a conversation from three weeks ago at 2 AM."
    },

    "overthinker-chaotic": {
        name: "The Chaotic Thinker",
        emoji: "🧠🔥",
        description:
            "You think about every possible outcome and then sometimes choose the most chaotic option anyway."
    },

    "loyal-overthinker": {
        name: "The Emotional Detective",
        emoji: "❤️🧠",
        description:
            "You care deeply about people, which means you also notice every tiny change in their behaviour."
    },

    "investigator-social": {
        name: "The Social Detective",
        emoji: "🕵️🦋",
        description:
            "You can talk to almost anyone, but you're also quietly collecting information while doing it."
    },

    "investigator-chaotic": {
        name: "The Curious Menace",
        emoji: "🕵️🔥",
        description:
            "You want answers, adventures and probably a little trouble along the way."
    },

    "investigator-loyal": {
        name: "The Protective Detective",
        emoji: "🕵️❤️",
        description:
            "You pay close attention to the people you care about and you're usually the first to notice when something is wrong."
    },

    "social-chaotic": {
        name: "The Chaos Magnet",
        emoji: "🦋🔥",
        description:
            "You bring energy, jokes and questionable ideas wherever you go. Somehow people keep following you."
    },

    "social-loyal": {
        name: "The Party Protector",
        emoji: "🦋❤️",
        description:
            "You're fun to be around, but beneath the jokes you're fiercely loyal to your people."
    },

    "chaotic-loyal": {
        name: "The Chaotic Softie",
        emoji: "🔥❤️",
        description:
            "You may make questionable decisions, but your heart is usually in the right place."
    },

    "overthinker-loyal": {
        name: "The Soft Overthinker",
        emoji: "🧠❤️",
        description:
            "You care deeply, remember tiny details and probably think about your friends more than they realize."
    }
};


// =============================
// GET VIBE
// =============================

    
function getVibe(trait1, trait2) {
    const key = [trait1, trait2]
        .sort()
        .join("-");

    const vibe = vibes[key] || {
        name: "The Mysterious One",
        emoji: "✨",
        description:
            "Your personality refuses to fit neatly into one box. Honestly, that's pretty interesting."
    };

    const vibeId = key;

    return {
        ...vibe,
        id: vibeId
    };
}

// =============================
// SHOW RESULT
// =============================


function showResult() {
    const app = document.querySelector(".app");
    const topTraits = getTopTraits();

    currentVibe = getVibe(
        topTraits[0],
        topTraits[1]
    );

    const resultUrl = new URL(window.location.href);
    resultUrl.searchParams.set("vibe", currentVibe.id);

    app.innerHTML = `
        <div class="result-card">
            <p class="small-title">🧪 VIBEMATCH RESULT</p>

            <div class="vibe-emoji">
                ${currentVibe.emoji}
            </div>

            <h1>${currentVibe.name}</h1>

            <p class="description">
                ${currentVibe.description}
            </p>

            <div class="score-box">
                <p>😌 Calm: ${scores.calm}</p>
                <p>🐺 Independent: ${scores.independent}</p>
                <p>🧠 Overthinker: ${scores.overthinker}</p>
                <p>🕵️ Investigator: ${scores.investigator}</p>
                <p>🦋 Social: ${scores.social}</p>
                <p>🔥 Chaotic: ${scores.chaotic}</p>
                <p>❤️ Loyal: ${scores.loyal}</p>
            </div>

            <button onclick="shareVibe()">
                📤 Share My Vibe
            </button>

            <button onclick="startQuiz()">
                🔄 Take It Again
            </button>
        </div>
    `;
}


function shareVibe() {
    if (!currentVibe) {
        alert("Take the quiz first! 🧪");
        return;
    }

    const resultUrl = new URL(window.location.href);
    resultUrl.searchParams.set("vibe", currentVibe.id);

    const shareText =
        `🧪 My VibeMatch result is ${currentVibe.name} ${currentVibe.emoji}!\n\n` +
        `What's your vibe? Take the quiz here:\n${resultUrl.href}`;

    if (navigator.share) {
        navigator.share({
            title: "My VibeMatch Result 🧪",
            text: shareText,
            url: resultUrl.href
        }).catch(() => {
            // Sharing was cancelled or unavailable.
        });
    } else if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(shareText)
            .then(() => alert("Your Vibe and link have been copied! 📋"))
            .catch(() => alert("Sharing failed. Please try again."));
    } else {
        prompt("Copy your VibeMatch result and link:", shareText);
    }
}

function openSharedVibe() {
    const params = new URLSearchParams(window.location.search);
    const sharedVibeId = params.get("vibe");

    if (!sharedVibeId) {
        return;
    }

    const sharedVibe = vibes[sharedVibeId];

    if (!sharedVibe) {
        return;
    }

    currentVibe = {
        ...sharedVibe,
        id: sharedVibeId
    };

    const app = document.querySelector(".app");

    app.innerHTML = `
        <div class="result-card">
            <p class="small-title">🧪 VIBEMATCH RESULT</p>
            <div class="vibe-emoji">${currentVibe.emoji}</div>
            <h1>${currentVibe.name}</h1>
            <p class="description">${currentVibe.description}</p>

            <p>Someone shared their vibe with you!</p>

            <button onclick="shareVibe()">📤 Share This Vibe</button>
            <button onclick="startNewQuiz()">🧪 Discover Your Own Vibe</button>
        </div>
    `;
}


function openSharedVibe() {
    const params = new URLSearchParams(window.location.search);
    const sharedVibeId = params.get("vibe");

    if (!sharedVibeId) {
        return;
    }

    const sharedVibe = vibes[sharedVibeId];

    if (!sharedVibe) {
        return;
    }

    currentVibe = {
        ...sharedVibe,
        id: sharedVibeId
    };

    const app = document.querySelector(".app");

    app.innerHTML = `
        <div class="result-card">
            <p class="small-title">🧪 VIBEMATCH RESULT</p>
            <div class="vibe-emoji">${currentVibe.emoji}</div>
            <h1>${currentVibe.name}</h1>
            <p class="description">${currentVibe.description}</p>

            <p>Someone shared their vibe with you!</p>

            <button onclick="shareVibe()">📤 Share This Vibe</button>
            <button onclick="startNewQuiz()">🧪 Discover Your Own Vibe</button>
        </div>
    `;
}

function openSharedVibe() {
    const params = new URLSearchParams(window.location.search);
    const sharedVibeId = params.get("vibe");

    if (!sharedVibeId) {
        return;
    }

    const sharedVibe = vibes[sharedVibeId];

    if (!sharedVibe) {
        return;
    }

    currentVibe = {
        ...sharedVibe,
        id: sharedVibeId
    };

    const app = document.querySelector(".app");

    app.innerHTML = `
        <div class="result-card">
            <p class="small-title">🧪 VIBEMATCH RESULT</p>
            <div class="vibe-emoji">${currentVibe.emoji}</div>
            <h1>${currentVibe.name}</h1>
            <p class="description">${currentVibe.description}</p>

            <p>Someone shared their vibe with you!</p>

            <button onclick="shareVibe()">📤 Share This Vibe</button>
            <button onclick="startNewQuiz()">🧪 Discover Your Own Vibe</button>
        </div>
    `;
}

function openSharedVibe() {
    const params = new URLSearchParams(window.location.search);
    const sharedVibeId = params.get("vibe");

    if (!sharedVibeId) {
        return;
        }

    const sharedVibe = vibes[sharedVibeId];

    if (!sharedVibe) {
        return;
    }

    currentVibe = {
        ...sharedVibe,
        id: sharedVibeId
    };
    const app = document.querySelector(".app");

    app.innerHTML = `
        <div class="result-card">
            <p class="small-title">🧪 VIBEMATCH RESULT</p>
            <div class="vibe-emoji">${currentVibe.emoji}</div>
            <h1>${currentVibe.name}</h1>
            <p class="description">${currentVibe.description}</p>

            <p>Someone shared their vibe with you!</p>

            <button onclick="shareVibe()">📤 Share This Vibe</button>
            <button onclick="startNewQuiz()">🧪 Discover Your Own Vibe</button>
        </div>
    `;
}

function startNewQuiz() {
    window.history.replaceState({}, "", window.location.pathname);
    currentVibe = null;
    startQuiz();
}

openSharedVibe();