const DEFAULT_ATTACK = 5;
const DEFAULT_MONSTER_ATTACK = 5


let DEFAULT_HEALTH = 10;

let $player_Health = DEFAULT_HEALTH;
let $monster_Health = DEFAULT_HEALTH;

adjustHealthBars(DEFAULT_HEALTH);   

function turn (){
const damage = dealMonsterDamage(DEFAULT_ATTACK);
$monster_Health -= damage;
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

attackBtn.addEventListener('click', turn);


