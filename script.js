const PlayerHolder = document.getElementById("holder-player");
const DealerHolder = document.getElementById("holder-dealer");
const Hit = document.getElementById("hit");
const StandButton = document.getElementById("stand");
const RestartButton = document.getElementById("restart");
const Score = document.getElementById("score");
const ScoreDealer = document.getElementById("dealer-score");

let PlayerCards = "";
let DealerCards = "";
let PlayerScore = [];
let DealerScore = [];

function GetCards(){
    for (let cardCount = 0; cardCount < 2; cardCount++) {
        GetCard();
    }
    for (let cardCount = 0; cardCount < 2; cardCount++) {
        GetCard(false);
    }
    return 0;
}

function GetCard(player=true){
    var value = Math.floor(Math.random() * 9) + 1;
    if(player){
        PlayerScore.push(value);
        PlayerCards += `<iframe src="./card.html?value=${value}"></iframe>`;
    }else{
        DealerScore.push(value);
        DealerCards += `<iframe src="./card.html?value=${value}"></iframe>`;
    }
    RenderCards();
    CalculateScore(DealerScore, false);
    CalculateScore(PlayerScore);
    return 0;
}

function RenderCards(){
    PlayerHolder.innerHTML = PlayerCards;
    DealerHolder.innerHTML = DealerCards;
    return 0;
}

function CalculateScore(array, isPlayer=true, isEnd=false, render=true){
    var total = 0;
    for (let i = 0; i < array.length; i++) {
        total += array[i];
    }
    if(render){
        if(!isEnd){
            if(total < 22){
                Hit.style.display = total != 21 ? "block" : "none";
                RestartButton.style.display = total != 21 ? "none" : "block";
                if(isPlayer){
                    if(total != 21){
                        Score.innerText = `Score: ${total}`;
                    }else{
                        Score.innerText = `Your ideal hit! (${total})`;
                        Stand();
                    }
                }else{
                    ScoreDealer.innerText = total != 21 ? `Score: ${total}` : `Dealer's ideal hit! (${total})`;
                }
            }else{
                RestartButton.style.display = "block";
                Hit.style.display = "none";
                StandButton.style.display = "none";
                if(isPlayer){
                    Score.innerText = `Too many! (${total})`;
                }else{
                    ScoreDealer.innerText = `Dealer bust! (${total})`;
                }
            }
        }else{
            Hit.style.display = "none";
            StandButton.style.display = "none";
            RestartButton.style.display = "block";
            Score.innerText = `Your final score: ${total}`;
        }
    }
    return total;
}

function Restart(){
    StandButton.style.display = "block";
    PlayerCards = "";
    PlayerScore = [];
    DealerCards = "";
    DealerScore = [];
    PlayerHolder.innerHTML = "";
    DealerHolder.innerHTML = "";
    GetCards();
    return 0;
}

function Stand(){
    Hit.style.display = "none";
    StandButton.style.display = "none";
    RestartButton.style.display = "block";
    while(CalculateScore(DealerScore, false, true, false) < 17){
        GetCard(false);
    }
    FinalCalculate();
    return 0;
}

function FinalCalculate(){
    var playerFinal = CalculateScore(PlayerScore, true, true, false);
    var dealerFinal = CalculateScore(DealerScore, false, true, false);
    Hit.style.display = "none";
    StandButton.style.display = "none";
    RestartButton.style.display = "block";
    if(dealerFinal <= 21){
        if(playerFinal > dealerFinal){
            Score.innerText = `You Win! (${playerFinal})`;
        }else if(playerFinal < dealerFinal){
            Score.innerText = `You Lose! (${playerFinal})`;
        }else{
            Score.innerText = `Push (${playerFinal})`;
        }
    }else{
        Score.innerText = `You Win! (${playerFinal})`;
    }
    return 0;
}
