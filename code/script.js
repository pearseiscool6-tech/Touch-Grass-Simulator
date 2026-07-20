//TODO: add more logging features to make it easier to debug and to see how the player is progressing,
//variables
// Use Number() to turn the stored string back into a real number
// Track permanent efficiency multipliers (defaults to 1x if unpurchased)
var rabbitMultiplier = Number(localStorage.getItem('rabbitMultiplier')) || 1;
var sheepMultiplier = Number(localStorage.getItem('sheepMultiplier')) || 1;
var mowerMultiplier = Number(localStorage.getItem('mowerMultiplier')) || 1;
var rabbitCost = Number(localStorage.getItem('rabbitCost')) || 20;
var sheepCost = Number(localStorage.getItem('sheepCost')) || 50;
var petrolMowerCost = Number(localStorage.getItem('petrolMowerCost')) || 250;
let pushMowerCost = Number(localStorage.getItem('pushMowerCost')) || 100;
let scytheCost = Number(localStorage.getItem('scytheCost')) || 50;
let shearsCost = Number(localStorage.getItem('shearsCost')) || 20;
var grassTouched = Number(localStorage.getItem('score')) || 0;
var clickPower = Number(localStorage.getItem('clickingPower')) || 1;
//get achievment status to prevent repeat achievments
var ach67 = localStorage.getItem('ach67') === 'true';
var ach100 = localStorage.getItem('ach100') === 'true';
var ach1o000 = localStorage.getItem('ach1o000') === 'true';
var ach10o000 = localStorage.getItem('ach10o000') === 'true';
var ach100o000 = localStorage.getItem('ach100o000') === 'true';
var ach1o000o000 = localStorage.getItem('ach1o000o000') === 'true';
var ach1o000o000o000 = localStorage.getItem('ach1o000o000o000') === 'true';
// Trillion to Decillion Achievement Flags
var ach1Tril = localStorage.getItem('ach1Tril') === 'true';
var ach100Tril = localStorage.getItem('ach100Tril') === 'true';
var ach1Quad = localStorage.getItem('ach1Quad') === 'true';
var ach100Quad = localStorage.getItem('ach100Quad') === 'true';
var ach1Quint = localStorage.getItem('ach1Quint') === 'true';
var ach1Sext = localStorage.getItem('ach1Sext') === 'true';
var ach1Sept = localStorage.getItem('ach1Sept') === 'true';
var ach1Oct = localStorage.getItem('ach1Oct') === 'true';
var ach1Non = localStorage.getItem('ach1Non') === 'true';
var ach1Dec = localStorage.getItem('ach1Dec') === 'true';
var rabbits = Number(localStorage.getItem('rabbits')) || 0;
var sheep = Number(localStorage.getItem('sheep')) || 0;
var petrolMowers = Number(localStorage.getItem('petrolMowers')) || 0;
// get sounds and images for use in the game
const clickAudio = new Audio('assets/click.mp3');
const achievementAudio = new Audio('assets/notify.mp3');
const errorAudio = new Audio('assets/error.mp3');
const img = document.getElementById('grass-img');
var income = (rabbits * 1 * rabbitMultiplier) + 
                 (sheep * 5 * sheepMultiplier) + 
                 (petrolMowers * 50 * mowerMultiplier);
var totalGrassTouched = Number(localStorage.getItem('totalGrassTouched')) || 0;
// Update the display immediately on webpage load to reflect saved values
document.getElementById('rabbitTxt').innerText = "Cost: " + formatNumber(rabbitCost);
document.getElementById('sheepTxt').innerText = "Cost: " + formatNumber(sheepCost);
document.getElementById('petrolMowerTxt').innerText = "Cost: " + formatNumber(petrolMowerCost);
document.getElementById('shearsTxt').innerText = "Cost: " + formatNumber(shearsCost);
document.getElementById('scytheTxt').innerText = "Cost: " + formatNumber(scytheCost);
document.getElementById('pushMowerTxt').innerText = "Cost: " + formatNumber(pushMowerCost);
document.getElementById('counter').innerText = "Grass Touched: " + formatNumber(grassTouched);
document.getElementById("total-grass").innerText = "Total Grass Touched: " + formatNumber(totalGrassTouched);
document.getElementById('per-click').innerText = "Per Click: " + formatNumber(clickPower);
document.getElementById('per-second').innerText = "Per Second: " + formatNumber(income);

// checks if player has upgraded their passive income and displays it
if (rabbitMultiplier === 0) {
    document.getElementById('rabbit-desc').innerText = "(+" + formatNumber(1) + " per second)";
} else if (rabbits == 0) {
    document.getElementById('rabbit-desc').innerText = "(+ 1 per second)";
} else {
    document.getElementById('rabbit-desc').innerText = "(+ " + formatNumber(1*rabbitMultiplier) + " per second)";
}
// same for sheep
if (sheepMultiplier === 0) {
    document.getElementById('sheep-desc').innerText = "(+" + formatNumber(5) + " per second)";
} else if (sheep == 0) {
    document.getElementById('sheep-desc').innerText = "(+ 5 per second)";
} else {
    document.getElementById('sheep-desc').innerText = "(+ " + formatNumber(5*sheepMultiplier) + " per second)";
}
// same for mowers
if (mowerMultiplier === 0) {
    document.getElementById('petrolMower-desc').innerText = "(+" + formatNumber(50) + " per second)";
} else if (petrolMowers == 0) {
    document.getElementById('petrolMower-desc').innerText = "(+ 50 per second)";
} else {
    document.getElementById('petrolMower-desc').innerText = "(+ " + formatNumber(50*mowerMultiplier) + " per second)";
}
    // Add this helper function to handle mathematical updates dynamically
function recalculatePassiveIncome() {
    income = (rabbits * 1 * rabbitMultiplier) + 
             (sheep * 5 * sheepMultiplier) + 
             (petrolMowers * 50 * mowerMultiplier);
             
    // This makes sure the score display text is perfectly updated
    if (document.getElementById('per-second')) {
        document.getElementById('per-second').innerText = "Per Second: " + formatNumber(income);
    }
}
    function touch() {
    img.classList.add('grow');
    setTimeout(() => {
        img.classList.remove('grow');
    }, 100);
    //Increases grass by the amount of click power you have, then updates the display and saves the new value to memory
    //this is to keep track of total grass touched
     grassTouched += clickPower; 
    document.getElementById('counter').innerText = "Grass Touched: " + formatNumber(grassTouched);
                localStorage.setItem("score", grassTouched)
                console.log(`You have now touched ${formatNumber(grassTouched)} grass`);
        totalGrassTouched += clickPower; 
    document.getElementById("total-grass").innerText = "Total Grass Touched: " + formatNumber(totalGrassTouched);
                localStorage.setItem("totalGrassTouched", totalGrassTouched)
                console.log(`You have now touched a total of ${formatNumber(totalGrassTouched)} grass`);
                //achievment if statements
                checkAchievements();
                //achievment if statements
                if (grassTouched === 1) {
                    showAchievement("How did it feel?", "You touched grass for the first time");
                    }
                if (grassTouched === 10) {
                    showAchievement("A step in the right direction", "You touched grass ten times");
                    }
                }

        function checkAchievements() {
    if (grassTouched >= 67 && !ach67) {
        showAchievement("Is this meme dead yet?", "SIXXXX SEVENNNNNNN");
        achievementAudio.play();
        ach67 = true;
        localStorage.setItem('ach67', 'true');
    }
    if (grassTouched >= 100 && !ach100) {
        showAchievement("A lasting decision?", "You touched grass 100 times");
        achievementAudio.play();
        ach100 = true;
        localStorage.setItem('ach100', 'true');
    }
    if (grassTouched >= 1000 && !ach1o000) {
        showAchievement("Green Thumb Maniac", "Rumour has it that grass was invented by fortnite");
        achievementAudio.play();
        ach1o000 = true;
        localStorage.setItem('ach1o000', 'true');
    }
    if (grassTouched >= 10000 && !ach10o000) {
        showAchievement("Committed", "You touched grass 10,000 times!");
        achievementAudio.play();
        ach10o000 = true;
        localStorage.setItem('ach10o000', 'true');
    }
    if (grassTouched >= 100000 && !ach100o000) {
        showAchievement("Outdoors Master", "You touched grass 100,000 times");
        achievementAudio.play();
        ach100o000 = true; // Fixed typo here (was ach100000)
        localStorage.setItem('ach100o000', 'true');
    }
    if (grassTouched >= 1000000 && !ach1o000o000) {
        showAchievement("Millionaire", "You touched grass 1,000,000 times");
        achievementAudio.play();
        ach1o000o000 = true;
        localStorage.setItem('ach1o000o000', 'true');
    }
    if (grassTouched >= 1000000000 && !ach1o000o000o000) {
        showAchievement("Billionaire", "You touched grass 1,000,000,000 times!");
        achievementAudio.play();
        ach1o000o000o000 = true;
        localStorage.setItem('ach1o000o000o000', 'true');
    }
    // 1 Trillion
if (grassTouched >= 1000000000000 && !ach1Tril) {
    showAchievement("The Chosen One (of Suburbia)", "You have physically contacted more blades of grass than exist on three Earths. Local lawnmower manufacturers have started hanging your picture in their breakrooms.");
    achievementAudio.play();
    ach1Tril = true;
    localStorage.setItem('ach1Tril', 'true');
}

// 100 Trillion
if (grassTouched >= 100000000000000 && !ach100Tril) {
    showAchievement("Chlorophyll Connoisseur", "Your skin is starting to synthesize sunlight. You haven't blinked in four days because you're afraid a stray shadow might lower your click efficiency.");
    achievementAudio.play();
    ach100Tril = true;
    localStorage.setItem('ach100Tril', 'true');
}

// 1 Quadrillion
if (grassTouched >= 1000000000000000 && !ach1Quad) {
    showAchievement("The Discord Moderator's Nightmare", "An amount of grass touchings so profoundly immense, the fabric of the internet is beginning to tear. Somewhere, an MMO server just crashed from sheer panic.");
    achievementAudio.play();
    ach1Quad = true;
    localStorage.setItem('ach1Quad', 'true');
}

// 100 Quadrillion
if (grassTouched >= 100000000000000000 && !ach100Quad) {
    showAchievement("Global Warming Speedrun Any%", "The sheer heat generated by your rapid clicking has altered local weather patterns. You are now legally classified as a natural disaster by the Department of Agriculture.");
    achievementAudio.play();
    ach100Quad = true;
    localStorage.setItem('ach100Quad', 'true');
}

// 1 Quintillion
if (grassTouched >= 1000000000000000000 && !ach1Quint) {
    showAchievement("Macroscopic Overdose", "You tried explaining this game to your doctor, and they immediately upgraded their malpractice insurance. Your keyboard is literally smoking.");
    achievementAudio.play();
    ach1Quint = true;
    localStorage.setItem('ach1Quint', 'true');
}

// 1 Sextillion
if (grassTouched >= 1e+21 && !ach1Sext) { // Using scientific notation makes writing long zeros safer!
    showAchievement("Lawn Order: Special Clicking Unit", "You have transcended humanity. You don't just touch the grass anymore; you hold diplomatic summits with the mycelium network beneath the soil.");
    achievementAudio.play();
    ach1Sext = true;
    localStorage.setItem('ach1Sext', 'true');
}

// 1 Septillion
if (grassTouched >= 1e+24 && !ach1Sept) {
    showAchievement("Galactic Landscaping Corporation", "NASA has confirmed a localized green nebula expanding from your IP address. Aliens are observing your clicks with a mixture of awe and profound pity.");
    achievementAudio.play();
    ach1Sept = true;
    localStorage.setItem('ach1Sept', 'true');
}

// 1 Octillion
if (grassTouched >= 1e+27 && !ach1Oct) {
    showAchievement("Error 404: Outside Not Found", "The universe tried to render an actual real-world park for you, but your save file is so dense with numerical values that the reality engine gave up and spawned a glitching lawn chair.");
    achievementAudio.play();
    ach1Oct = true;
    localStorage.setItem('ach1Oct', 'true');
}

// 1 Nonillion
if (grassTouched >= 1e+30 && !ach1Non) {
    showAchievement("Cosmic Sod-Father", "Time and space bow before your botanical tyranny. Black holes collapse into beautifully manicured putting greens. The cursor is your sceptre; the universe is your yard.");
    achievementAudio.play();        
    ach1Non = true;
    localStorage.setItem('ach1Non', 'true');
}

// 1 Decillion
if (grassTouched >= 1e+33 && !ach1Dec) {
    showAchievement("Go Inside.", "You did it. You touched the theoretical limit of grass. There is nothing left but atoms and automated rabbits. Please, close the browser window. Your family misses you.");
    achievementAudio.play();
    ach1Dec = true;
    localStorage.setItem('ach1Dec', 'true');
}
}
function buyShears() {
    //increase cost if player is getting too op
    if(grassTouched >= shearsCost && clickPower > 3) {
        shearsCost += clickPower;
        localStorage.setItem('shearsCost', shearsCost)
        const shearsText = document.getElementById('shearsTxt');
        shearsText.innerText = `Cost: ` + formatNumber(shearsCost);
        } 
        if (grassTouched >= shearsCost) {
        grassTouched -= shearsCost; // Spend the grass
        clickPower += 1;      // Increase click power
        localStorage.setItem("clickingPower", clickPower)
        
        // Update display
        document.getElementById('counter').innerText = "Grass Touched: " + formatNumber(grassTouched);
        showAchievement("Bought Garden Shears", "You'll now get 1 more grass per touch");
        clickAudio.play(); 
        document.getElementById('per-click').innerText = "Per Click: " + formatNumber(clickPower);
        document.getElementById('per-second').innerText = "Per Second: " + formatNumber(income);  
    } else {
        showError("Not enough grass!", "Touch some more blud");
        errorAudio.play();
    }
}
function buyScythe() {
    //increase cost if player is getting too op
    if(grassTouched >= scytheCost && clickPower > 10) {
        scytheCost += clickPower;
        localStorage.setItem('scytheCost', scytheCost)
        const scytheText = document.getElementById('scytheTxt');
        scytheText.innerText = `Cost: ` + formatNumber(scytheCost);
        }
    if (grassTouched >= scytheCost) {
        grassTouched -= scytheCost; // Spend the grass
        clickPower += 5;      // Increase click power
        localStorage.setItem("clickingPower", clickPower)
        
        // Update display
        document.getElementById('counter').innerText = "Grass Touched: " + formatNumber(grassTouched);
        showAchievement("Bought Scythe", "You'll now get 5 more grass per touch");
        clickAudio.play(); 
        document.getElementById('per-click').innerText = "Per Click: " + formatNumber(clickPower);
        document.getElementById('per-second').innerText = "Per Second: " + formatNumber(income);
    } else {
        showError("Not enough grass!", "Touch some more blud");
        errorAudio.play();
    }
}
function buyPushmower() {
    if(grassTouched >= pushMowerCost && clickPower > 45) {
        pushMowerCost += clickPower;
        localStorage.setItem('pushMowerCost', pushMowerCost)
        const pushMowerText = document.getElementById('pushMowerTxt');
        pushMowerText.innerText = `Cost: ` + formatNumber(pushMowerCost)
        }
    if (grassTouched >= pushMowerCost) {
        grassTouched -= pushMowerCost; // Spend the grass
        clickPower += 10;      // Increase click power
        localStorage.setItem("clickingPower", clickPower)
        
        // Update display
        document.getElementById('counter').innerText = "Grass Touched: " + formatNumber(grassTouched);
        document.getElementById('per-click').innerText = "Per Click: " + formatNumber(clickPower);
        document.getElementById('per-second').innerText = "Per Second: " + formatNumber(income);
        showAchievement("Bought Push Mower", "You'll now get 10 more grass per touch");
        clickAudio.play(); 
    } else {
        showError("Not enough grass!", "Touch some more blud");
        errorAudio.play();
    }
}
function buyRabbit() {
    if (grassTouched >= rabbitCost && rabbitMultiplier > 0) {
        showAchievement("Rodent Receptionist", `You bought a rabbit! It touches ${1 * rabbitMultiplier} grass per second.`)
    } else if (grassTouched >= rabbitCost && rabbitMultiplier == 0) {
        showAchievement("Hired Help", "You bought a rabbit! It touches 1 grass per second.")
    }
    if(grassTouched >= rabbitCost && rabbits > 3) {
        rabbitCost += (rabbits * 5 * rabbitMultiplier);
        recalculatePassiveIncome();

        //log the new phase 
        console.log("increased rabbit cost due to having more than 3 rabbits")
        //log the new cost and rabbit count       
        console.log(`New rabbit cost: ${rabbitCost}, Rabbits owned: ${formatNumber(rabbits)}`);
        //save to memory to prevent cost reset on refresh
        localStorage.setItem('rabbitCost', rabbitCost)
        localStorage.setItem('income', income)
        //update text
        document.getElementById('per-second').innerText = "Per Second: " + formatNumber(income);
        const rabbitText = document.getElementById('rabbitTxt');
        rabbitText.innerText = `Cost: ` + formatNumber(rabbitCost);
        } else if(rabbitMultiplier > rabbitCost && grassTouched > rabbitCost) {
        rabbitCost += (rabbits * 5 * rabbitMultiplier * 10);
        recalculatePassiveIncome();

        //log the new phase 
        console.log("increased rabbit cost due to price imabalance")
        //log the new cost and rabbit count       
        console.log(`New rabbit cost: ${rabbitCost}, Rabbits owned: ${formatNumber(rabbits)}`);
        //save to memory to prevent cost reset on refresh
        localStorage.setItem('rabbitCost', rabbitCost)
        localStorage.setItem('income', income)
        //update text
        document.getElementById('per-second').innerText = "Per Second: " + formatNumber(income);
        const rabbitText = document.getElementById('rabbitTxt');
        rabbitText.innerText = `Cost: ` + formatNumber(rabbitCost);
        }
    if(grassTouched >= rabbitCost && rabbits > 50) {
        rabbitCost += rabbits * 50;
        localStorage.setItem('rabbitCost', rabbitCost)
        localStorage.setItem('income', income)
        const rabbitText = document.getElementById('rabbitTxt');
        rabbitText.innerText = `Cost: ` + formatNumber(rabbitCost)
        }
    if (grassTouched >= rabbitCost) {
        grassTouched -= rabbitCost;
        rabbits++; 
        // Save the new rabbit count
        localStorage.setItem("rabbits", rabbits);
        
        // Update display
        showAchievement("Bunny Business", `You bought a rabbit! It touches ${formatNumber(1 * rabbitMultiplier)} grass per second.`);
        document.getElementById('rabbit-desc').innerText = "(+" + formatNumber(rabbits * rabbitMultiplier) + " per second)";
        document.getElementById('counter').innerText = "Grass Touched: " + formatNumber(grassTouched);
        clickAudio.play(); 
        document.getElementById("per-second").innerText = "Per Second: " + formatNumber(income);
        document.getElementById('per-click').innerText = "Per Click: " + formatNumber(clickPower);
    } else {
                showError("Not enough grass!", "Touch some more blud");
        errorAudio.play();
    }
}
function buySheep() {
    if(grassTouched >= sheepCost && sheep > 5) {
        sheepCost += sheep * 5 * sheepMultiplier;
        recalculatePassiveIncome();
        localStorage.setItem('income', income)
        //log the new phase 
        console.log("increased sheep cost due to having more than 5 sheep")
        //log the new cost and sheep count       
        console.log(`New sheep cost: ${sheepCost}, Sheep owned: ${formatNumber(sheep)}`);
        //save to memory to prevent cost reset on refresh
        localStorage.setItem('sheepCost', sheepCost)
        //update the cost text
        const sheepText = document.getElementById('sheepTxt');
        sheepText.innerText = `Cost: ` + formatNumber(sheepCost);
        }
    if (grassTouched >= sheepCost) {
        grassTouched -= sheepCost;
        sheep++; 
        
        // Save the new sheep count
        localStorage.setItem("sheep", sheep);
        
        // Update display
        document.getElementById('sheep-desc').innerText = "(+" + formatNumber(5 * sheepMultiplier) + " per second)";
        document.getElementById('counter').innerText = "Grass Touched: " + formatNumber(grassTouched);
        clickAudio.play(); 
        document.getElementById("per-second").innerText = "Per Second: " + formatNumber(income);
        document.getElementById('per-click').innerText = "Per Click: " + formatNumber(clickPower);
    } 
    if (grassTouched >= sheepCost && sheepMultiplier > 0) {
        showAchievement("Don't pull the wool over my eyes", `You bought a sheep! It touches 5 grass per second.`)
    }
    else if (grassTouched >= sheepCost && sheepMultiplier == 0) {
        showAchievement("Don't pull the wool over my eyes", "You bought a sheep! It touches 5 grass per second.")
    }
    else {
                showError("Not enough grass!", "Touch some more blud");
        errorAudio.play();
    }
}
function buyPetrolMower() {
        if(mowerMultiplier * 250 > petrolMowerCost && grassTouched > petrolMowerCost) {
            console.log("price imbalance detected, increasing petrol mower cost")
        petrolMowerCost += (petrolMowers * 50 * mowerMultiplier * 10);
        recalculatePassiveIncome();

        //log the new phase 
        console.log("increased mower cost due to price imabalance")
        //log the new cost and rabbit count       
        console.log(`New mower cost: ${petrolMowerCost}, Petrol mowers owned: ${formatNumber(petrolMowers)}`);
        //save to memory to prevent cost reset on refresh
        localStorage.setItem('petrolMowerCost', petrolMowerCost)
        //update the cost text
        const petrolMowerText = document.getElementById('petrolMowerTxt');
        petrolMowerText.innerText = `Cost: ` + formatNumber(petrolMowerCost);
        } else if(grassTouched >= petrolMowerCost && petrolMowers > 10) {
        petrolMowerCost += petrolMowers * 50;
        recalculatePassiveIncome();
        localStorage.setItem('income', income)
        //log the new phase 
        console.log("increased petrol mower cost due to having more than 10 petrol mowers")
        //log the new cost and petrol mower count       
        console.log(`New petrol mower cost: ${petrolMowerCost}, Petrol mowers owned: ${formatNumber(petrolMowers)}`);
        //save to memory to prevent cost reset on refresh
        localStorage.setItem('petrolMowerCost', petrolMowerCost)
        //update the cost text
        const petrolMowerText = document.getElementById('petrolMowerTxt');
        petrolMowerText.innerText = `Cost: ` + formatNumber(petrolMowerCost);
    if (grassTouched >= petrolMowerCost) {
        grassTouched -= petrolMowerCost;
        petrolMowers++; 
        document.getElementById('petrolMower-desc').innerText = "(+" + formatNumber(50 * mowerMultiplier) + " per second)";
        localStorage.setItem("petrolMowers", petrolMowers);
        document.getElementById('counter').innerText = "Grass Touched: " + formatNumber(grassTouched);
        showAchievement("You automated the one thing that shouldn't be automated", `You bought a petrol mower! It touches ${formatNumber(50 * mowerMultiplier)} grass per second.`);
        clickAudio.play(); 
        document.getElementById("per-second").innerText = "Per Second: " + formatNumber(income);
        document.getElementById('per-click').innerText = "Per Click: " + formatNumber(clickPower);
    } else {
                showError("Not enough grass!", "Touch some more blud");
        errorAudio.play();
    }
}
}
//toast notifications      
//achievmements      
function showAchievement(title, desc) {
    const popup = document.getElementById('achievement-popup');
    const titleEl = document.getElementById('achievement-title');
    const descEl = document.getElementById('achievement-desc');

    // Set the text
    titleEl.innerText = title;
    descEl.innerText = desc;

    // Slide it in
    popup.classList.add('show');

    // Slide it back out after 4 seconds
    setTimeout(() => {
        popup.classList.remove('show');
    }, 4000);
}
//errors
function showError(title, desc) {
    const popup = document.getElementById('error-popup');
    const titleEl = document.getElementById('error-title');
    const descEl = document.getElementById('error-desc');

    // Set the text
    titleEl.innerText = title;
    descEl.innerText = desc;

    // Slide it in
    popup.classList.add('show');

    // Slide it back out after 4 seconds
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);
}

//commands
    window.setGrass = function(newGrass) {
    grassTouched = parseInt(newGrass);
    console.log(`%c Grass touched manually set to: ${grassTouched}`,);
    localStorage.setItem("score", grassTouched)
};  
    window.setClickPower = function(newClickPower) {
    clickPower = parseInt(newClickPower);
    console.log(`%c Click Power manually set to: ${clickPower}`,);
    localStorage.setItem("clickingPower", clickPower)
};  
//autocliker functionality
    setInterval(function() {
    
    if (income > 0) {
        grassTouched += income;
        totalGrassTouched += income;
        // Update display and save
        document.getElementById('counter').innerText = "Grass Touched: " + formatNumber(grassTouched);
        document.getElementById("per-second").innerText = "Per Second: " + formatNumber(income);
        localStorage.setItem("score", grassTouched);
            document.getElementById("total-grass").innerText = "Total Grass Touched: " + formatNumber(totalGrassTouched);
                localStorage.setItem("totalGrassTouched", totalGrassTouched)
                //achievment if statements
                checkAchievements()
    }
}, 1000);

//navbar functionality
// Handles view swapping cleanly 
function switchTab(tabName) {
    // Reset all tab indicators and views
    document.querySelectorAll('.nav-tab').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(view => view.classList.remove('active'));
    
    // Assign active state to the clicked tab selection
    if (tabName === 'game') {
        document.querySelector('.nav-tab[onclick="switchTab(\'game\')"]').classList.add('active');
        document.getElementById('game-tab').classList.add('active');
    } else if (tabName === 'upgrades') {
        document.querySelector('.nav-tab[onclick="switchTab(\'upgrades\')"]').classList.add('active');
        document.getElementById('upgrades-tab').classList.add('active');
    }
}

// Scalable Blueprint system for upgrades
function buyUpgrade(type, baseCost, multiplierValue) {
    // Track level per item type so cost scales up dynamically
    var currentLevel = Number(localStorage.getItem('upLevel_' + type)) || 0;
    var currentCost = baseCost * Math.pow(4, currentLevel); // Scales x4 each level
    
    if (grassTouched >= currentCost) {
        grassTouched -= currentCost;
        currentLevel++;
        
        // Mutate and store corresponding target multipliers
        if (type === 'rabbit') {
            rabbitMultiplier *= multiplierValue;
            localStorage.setItem('rabbitMultiplier', rabbitMultiplier);
        } else if (type === 'sheep') {
            sheepMultiplier *= multiplierValue;
            localStorage.setItem('sheepMultiplier', sheepMultiplier);
        } else if (type === 'mower') {
            mowerMultiplier *= multiplierValue;
            localStorage.setItem('mowerMultiplier', mowerMultiplier);
        }
        
        // Commit new totals to browser save structures
        localStorage.setItem('upLevel_' + type, currentLevel);
        localStorage.setItem("score", grassTouched);
        
        // Refresh display items immediately
        document.getElementById('counter').innerText = "Grass Touched: " + grassTouched;
        document.getElementById('per-second').innerText = "Per Second: " + income;
        updateUpgradeUI(); 
        
        showAchievement("Research Success!", "Upgraded " + type + " speed by " + multiplierValue + "x!");
        document.getElementById('per-second').innerText = "Per Second: " + income;
    } else {
        showError("Insufficient resources!", "Keep touching grass to fund operations.");
        errorAudio.play();
    }
}

// Keeps costs and titles synchronized when purchasing or loading game state
function updateUpgradeUI() {
    var types = ['rabbit', 'sheep', 'mower'];
    var baseCosts = { rabbit: 150, sheep: 500, mower: 2000 };
    
    types.forEach(type => {
        var lvl = Number(localStorage.getItem('upLevel_' + type)) || 0;
        var cost = baseCosts[type] * Math.pow(4, lvl);
        
        var costEl = document.getElementById('up-' + type + '-cost');
        var nameEl = document.getElementById('up-' + type + '-name');
        
        if (costEl && nameEl) {
            costEl.innerText = "Cost: " + formatNumber(cost) + " Grass";
            nameEl.innerText = type.charAt(0).toUpperCase() + type.slice(1) + " Upgrade (Lvl " + lvl + ")";
        }
    });
}

// Initialize interface states on first boot
updateUpgradeUI();

// ==================== NUMBER FORMATTING ENGINE ====================
function formatNumber(num) {
    if (num < 1000000) {
        // For small numbers, just add thousands separator commas (e.g., 150,432)
        return Math.floor(num).toLocaleString();
    }

    // Array of suffixes matching short-scale notation namespaces
    const suffixes = [
        { value: 1e33, symbol: " Decillion" },
        { value: 1e30, symbol: " Nonillion" },
        { value: 1e27, symbol: " Octillion" },
        { value: 1e24, symbol: " Septillion" },
        { value: 1e21, symbol: " Sextillion" },
        { value: 1e18, symbol: " Quintillion" },
        { value: 1e15, symbol: " Quadrillion" },
        { value: 1e12, symbol: " Trillion" },
        { value: 1e9,  symbol: " Billion" },
        { value: 1e6,  symbol: " Million" }
    ];

    // Find the highest threshold matching our current score number
    for (let i = 0; i < suffixes.length; i++) {
        if (num >= suffixes[i].value) {
            // Divide out the threshold and lock down exactly 3 decimal spaces
            return (num / suffixes[i].value).toFixed(3) + suffixes[i].symbol;
        }
    }
    return num;
}