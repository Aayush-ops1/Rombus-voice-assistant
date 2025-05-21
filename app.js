const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
});

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

recognition.onresult = (event) => {
    const transcript = event.results[event.resultIndex][0].transcript;
    content.textContent = transcript;
    
    if (transcript.trim() === "") {
        wishMe();
    } else {
        takeCommand(transcript.toLowerCase());
    }
};

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
        speak("This is what I found on the internet regarding " + message);
    } else if (message.includes('wikipedia')) {
        const topic = message.replace("wikipedia", "").trim();
        window.open(`https://en.wikipedia.org/wiki/${encodeURIComponent(topic)}`, "_blank");
        speak("This is what I found on Wikipedia regarding " + topic);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        speak("The current time is " + time);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
        speak("Today's date is " + date);
    } else if (message.includes("search youtube for")) {
        const searchQuery = message.replace("search youtube for", "").trim();
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`, "_blank");
        speak("Searching YouTube for " + searchQuery);
    } else {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
        speak("I found some information for " + message + " on Google");
    }
}
