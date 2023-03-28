const dice1 = document.getElementById('dice-1')
const dice2 = document.getElementById('dice-2')
const dice3 = document.getElementById('dice-3')
const dice4 = document.getElementById('dice-4')
const monsterName = document.getElementById('monster-name')
const playerScore = document.getElementById('player-score')
const playerTotalScore = document.getElementById('player-total-score')
const monsterScore = document.getElementById('monster-score')
const monsterTotalScore = document.getElementById('monster-total-score')
const rollButton = document.getElementById('roll-button')
const newGameButton = document.getElementById('new-game-button')
const gameOver = document.getElementById('game-over')
const closeGameOverWindows = document.getElementById('close-game-over')
const nextLevel = document.getElementById('next-level')
const continueButton = document.getElementById('continue')
const victoryScreen = document.getElementById('victory-screen')
const monsterImage = document.getElementById('monster-image');
const src = document.getElementById('monster-image')
const close = document.getElementById('close')


class six_figure_dice{
    constructor(){
        this.values = [1, 2, 3, 4, 5, 6];
    }
}

class monster{
    constructor(name, level){
        this.name = name;
        this.level = level;
    }
}

monster.prototype.description = function(name, level){
        monsterName.textContent = `${name}`;
        src.src = `images/monster-${level}-rsz.jpg`;
}

six_figure_dice.prototype.roll = function(){
    let j, x, i;
    for (i = this.values.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = this.values[i];

        this.values[i] = this.values[j];
        this.values[j] = x;
        
        const number = this.values[Math.floor(Math.random()*this.values.length)];

        return number;
    
    }
}

const maxRound = 3
let round = 0
let indexMonster = 1;
let playerScoreArray = []
let monsterScoreArray = []


rollButton.addEventListener('click', function(){
    
    
    if(round < maxRound + 1){
        const newDice = new six_figure_dice()
        let dice1Player = newDice.roll();
        let dice2Player = newDice.roll();
        let dice3Monster = newDice.roll();
        let dice4Monster = newDice.roll();
        dice1.innerHTML = `<img src="images/dice-value-${dice1Player}.jpg" alt="dice-value-${dice1Player}.jpg">`
        dice2.innerHTML = `<img src="images/dice-value-${dice2Player}.jpg" alt="dice-value-${dice2Player}.jpg">`
        dice3.innerHTML = `<img src="images/dice-value-${dice3Monster}.jpg" alt="dice-value-${dice3Monster}.jpg">`
        dice4.innerHTML = `<img src="images/dice-value-${dice4Monster}.jpg" alt="dice-value-${dice4Monster}.jpg">`
        
        if(dice1Player == 1 || dice2Player == 1 ){
            dice1Player = 0;
            dice2Player = 0;
            playerScore.innerHTML = 0;
            playerScoreArray.push(dice1Player + dice2Player)
        }else if( dice1Player == dice2Player ){
            playerScore.innerHTML = (dice1Player + dice1Player)*2;
            playerScoreArray.push((dice1Player + dice2Player)*2);
        }else{
            playerScore.innerHTML = dice1Player + dice2Player;
            playerScoreArray.push(dice1Player + dice2Player);
        }
        if(dice3Monster == 1 || dice4Monster == 1){
            dice3Monster = 0;
            dice4Monster = 0;
            monsterScore.innerHTML = 0;
            monsterScoreArray.push(dice3Monster + dice3Monster);
        }else if(dice3Monster == dice4Monster){
            monsterScore.innerHTML = (dice3Monster + dice4Monster)*2;
            monsterScoreArray.push((dice3Monster + dice4Monster)*2)
        }
        else{
            
            monsterScore.innerHTML = dice3Monster + dice4Monster;
            monsterScoreArray.push(dice3Monster + dice4Monster);
        }
        
        let totalPlayer = 0;
        playerScoreArray.forEach(function(playerNumber){
            
            totalPlayer += playerNumber;
            playerTotalScore.innerHTML = totalPlayer;
        
        })


        let totalMonster = 0;
        monsterScoreArray.forEach(function (monsterNumber){
            totalMonster += monsterNumber;
            monsterTotalScore.innerHTML = totalMonster;

        })
        
        round++;

        if(round == maxRound){
            rollButton.disabled = true;
        }
        
        if(round == maxRound && totalMonster > totalPlayer){
            requestAnimationFrame(function(){
                gameOver.style.position = "absolute"
                gameOver.style.display = "block"
                nextLevel.style.display = 'none'
                victoryScreen.style.display = 'none'
                gameOver.classList.add('fade-in')
                newGameButton.disabled = true;

            })
        }else if(round == maxRound && totalMonster <= totalPlayer && indexMonster != 5){
                nextLevel.style.position = "absolute"
                nextLevel.style.display = "block"
                victoryScreen.style.display = 'none'
                gameOver.style.display = "none"
                nextLevel.classList.add('fade-in')

        }
        
        if(round == maxRound && totalMonster <= totalPlayer && indexMonster == 5){
            victoryScreen.style.position = "absolute"
            victoryScreen.style.display = "block"
            gameOver.style.display = "none"
            nextLevel.style.display = "none"
            victoryScreen.classList.add('fade-in')
    }
    }
})

close.addEventListener('click', function(){
    victoryScreen.style.display = 'none';
})

closeGameOverWindows.addEventListener('click', function(){
    gameOver.style.display = 'none';
    newGameButton.disabled = false;
})

newGameButton.addEventListener('click', function(){
    src.src = "images/monster-1-rsz.jpg";
    monsterName.textContent = 'Brakdrak, The Insane';

    resetGame()
    indexMonster = 1;
})



continueButton.addEventListener('click', function(){
    
    newMonster = new monster();
    
    if(indexMonster == 1){
        
        newMonster.description("Radolf, Of The Vengeful Web Hounds", 2)
        resetGame()
        nextLevel.style.display = 'none';
        

    }
    if(indexMonster == 2){
        newMonster.description("Yserienne, The Witch", 3)
        resetGame()
        nextLevel.style.display = 'none';
        
        
        
        
    }if(indexMonster == 3){
        newMonster.description("Az'qeq, The Fallen King", 4)
        resetGame()
        nextLevel.style.display = 'none';
        
        
        
    
    }if(indexMonster == 4){
        newMonster.description("Chrorius, The Darkmaster", 5)
        resetGame()
        nextLevel.style.display = 'none';
        
        
    }
    indexMonster++
})

function resetGame(){
    playerScoreArray = []
    monsterScoreArray = []
    round = 0
    dice1.textContent = "";
    dice2.textContent = "";
    dice3.textContent = "";
    dice4.textContent = "";
    playerScore.textContent = 0;
    monsterScore.textContent = 0;
    playerTotalScore.textContent = 0;
    monsterTotalScore.textContent = 0;
    rollButton.disabled = false;
}