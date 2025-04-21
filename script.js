console.log("Page loaded successfully!");

let petState = {
    mood: "Happy",
    hunger: 0, // 0 to 100
    energy: 100, // 0 to 100
    sleepiness: 0 // 0 to 100
};

// Update the pet status on the page
function updatePetDisplay() {
    document.getElementById("pet-mood").textContent = `Mood: ${petState.mood}`;
    document.getElementById("pet-hunger").textContent = `Hunger: ${petState.hunger}%`;
    document.getElementById("pet-energy").textContent = `Energy: ${petState.energy}%`;
    document.getElementById("pet-sleepiness").textContent = `Sleepiness: ${petState.sleepiness}%`;
    const petFace = document.getElementById("pet");

    if (petState.sleepiness <= 20) {
        petFace.textContent = "o_0";
    } else if (petState.sleepiness < 80) {
        petFace.textContent = "^_^";
    } else {
        petFace.textContent = "-.- zzz";
    }

    // Update sleepy bar length and color
    const sleepyBar = document.getElementById("sleepy-bar");

    // Width: scale from 100% to 0% (300px max width in CSS)
    sleepyBar.style.width = `${300 - (petState.sleepiness * 3)}px`; // 3px per 1% sleepiness

    // Color
    if (petState.sleepiness <= 20) {
        sleepyBar.style.backgroundColor = "green"; // Awake
    } else if (petState.sleepiness <= 80) {
        sleepyBar.style.backgroundColor = "yellow"; // Sleepy
    } else {
        sleepyBar.style.backgroundColor = "red"; // Very tired
    }
}

function triggerShake() {
    const petFace = document.getElementById("pet");
    petFace.classList.add("shake");
    setTimeout(() => {
        petFace.classList.remove("shake");
    }, 500);
}

function saveState() {
    localStorage.setItem("petState", JSON.stringify(petState));
}

function loadState() {
    const saved = localStorage.getItem("petState");
    if (saved) {
        petState = JSON.parse(saved);
    }
    updatePetDisplay();
}

window.addEventListener("load", () => {
    loadState();
});

setInterval(() => {
    petState.hunger = Math.min(100, petState.hunger + 1);
    petState.sleepiness = Math.min(100, petState.sleepiness + 1);
    petState.energy = Math.max(0, petState.energy - 1);
    updatePetDisplay();
    
}, 3000); // every 3 seconds

document.getElementById("feed-pet").addEventListener("click", () => {
    petState.hunger = Math.max(0, petState.hunger - 20);
    petState.energy = Math.min(100, petState.energy + 10);
    petState.sleepiness = Math.min(100, petState.sleepiness + 10);
    if (petState.sleepiness <= 30) {
        petState.mood = "Rested";
    } else if (petState.sleepiness >= 80) {
        petState.mood = "Sleepy";
    }
    updatePetDisplay();
    triggerShake();
    saveState();
});

document.getElementById("play-pet").addEventListener("click", () => {
    petState.hunger = Math.min(100, petState.hunger + 20); // increase hunger
    petState.energy = Math.max(0, petState.energy - 20);
    petState.sleepiness = Math.min(100, petState.sleepiness + 20);

    if (petState.sleepiness <= 30) {
        petState.mood = "Rested";
    } else if (petState.sleepiness >= 80) {
        petState.mood = "Sleepy";
    }
    updatePetDisplay();
    triggerShake();
    saveState();
});

document.getElementById("pet-sleep").addEventListener("click", () => {
    petState.sleepiness = Math.max(0, petState.sleepiness - 20);
    petState.energy = Math.min(100, petState.energy + 20);
    petState.hunger = Math.min(100, petState.hunger + 10);

    if (petState.sleepiness <= 30) {
        petState.mood = "Rested";
    } else if (petState.sleepiness >= 80) {
        petState.mood = "Sleepy";
    }
    updatePetDisplay();
    triggerShake();
    saveState();
});

