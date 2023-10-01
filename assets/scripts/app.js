const DEFAULT_ATTACK = 10;
const DEFAULT_STRONG_ATTACK = 20
const DEFAULT_MONSTER_ATTACK = 10
const DEFAULT_HEAL = 10

let DEFAULT_HEALTH = 100;

let $player_Health = DEFAULT_HEALTH;
let $monster_Health = DEFAULT_HEALTH;

adjustHealthBars(DEFAULT_HEALTH);   


function turn(mode){
let maxDamage
    if (mode === 'ATTACK') {
        maxDamage = DEFAULT_ATTACK 
    } else if (mode === 'STRONG ATTACK'){
        maxDamage = DEFAULT_STRONG_ATTACK
    } 
const damage = dealMonsterDamage(maxDamage);
    $monster_Health -= damage;
}

function endRound(){
    const hurt = dealPlayerDamage(DEFAULT_MONSTER_ATTACK);
    $player_Health -= hurt;
    if ($monster_Health  >= 0 && $player_Health <= 0) {
        alert('you lose')
    } else if ($player_Health > 0 && $monster_Health <= 0){
        alert('you wun!')
    } else if ($player_Health <= 0 && $monster_Health <= 0){
        alert('you both died. Tragic.')
    }   
}
//BUTTON HANDLERS
function attack (){
turn('ATTACK');
endRound()
}
function strongAttack(){
 turn('STRONG ATTACK');
 endRound()
}
function heal(){
increasePlayerHealth(DEFAULT_HEAL);
}        

attackBtn.addEventListener('click', attack);
strongAttackBtn.addEventListener('click', strongAttack);
healBtn.addEventListener('click', heal);
