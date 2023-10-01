const DEFAULT_ATTACK = 10;
const DEFAULT_STRONG_ATTACK = 20;
const DEFAULT_MONSTER_ATTACK = 20;
const DEFAULT_HEAL = 10;
const DEFAULT_HEALTH = 100;
let hasBonusLife = true;
const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG ATTACK";
const LOG_E_ATTACK = "PLAYER ATTACKS";
const LOG_E_STRONG_ATTACK = "PLAYER STRONG ATTACKS";
const LOG_E_HEAL = "PLAYER HEALS";
const LOG_E_BONUS = "USED A BONUS LIFE";
const LOG_E_MONSTER_ATTACK = "MONSTER ATTACKS";
const LOG_E_GAME_OVER = "GAME OVER";
const chosenLife = prompt("Set the life for you and baddie", "100");
let chosenLifeNum = parseInt(chosenLife);

let $player_Health = chosenLifeNum;
let $monster_Health = chosenLifeNum;
let $battleLog = [];

if (isNaN(chosenLifeNum) || chosenLifeNum <= 0) {
  alert("U R SO F-ING STOOPID");
  $player_Health = DEFAULT_HEALTH;
  $monster_Health = DEFAULT_HEALTH;
}

adjustHealthBars(chosenLifeNum);

//  ^^ VARIABLES AND PREAMBLE  VV FUNCTIONS

function doLog(whatHappened, howMuch, monsterHealth, playerHealth, who) {
  let logEntry;

  logEntry = {
    event: whatHappened,
    value: howMuch,
    endMonsterHealth: monsterHealth,
    endPlayerHealth: playerHealth,
    target: who,
  };

  $battleLog.push(logEntry);
}
function reset() {
  $player_Health = chosenLifeNum;
  $monster_Health = chosenLifeNum;
  resetGame(chosenLifeNum);
}
function turn(mode) {
  const maxDamage =
    mode === MODE_ATTACK ? DEFAULT_ATTACK : DEFAULT_STRONG_ATTACK;
  const logE = mode === MODE_ATTACK ? LOG_E_ATTACK : LOG_E_STRONG_ATTACK;
  const damage = dealMonsterDamage(maxDamage);
  $monster_Health -= damage;
  doLog(logE, damage, $monster_Health, $player_Health, "MONSTER");
}

function endRound() {
  const roundHealth = $player_Health;
  const hurt = dealPlayerDamage(DEFAULT_MONSTER_ATTACK);
  $player_Health -= hurt;
  doLog(LOG_E_MONSTER_ATTACK, hurt, $monster_Health, $player_Health, "PLAYER");
  if ($player_Health <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    $player_Health = roundHealth;
    setPlayerHealth(roundHealth);
    alert("BUT BY THE GRACE OF GOD... AND A BONUS LIFE!");
  }
  if ($monster_Health >= 0 && $player_Health <= 0) {
    alert("you lose");
    doLog(LOG_E_GAME_OVER, "LOSER", $monster_Health, $player_Health, "YOU");
  } else if ($player_Health > 0 && $monster_Health <= 0) {
    alert("you wun!");
    doLog(LOG_E_GAME_OVER, "WINNER", $monster_Health, $player_Health, "YOU");
  } else if ($player_Health <= 0 && $monster_Health <= 0) {
    alert("you both died. Tragic.");
    doLog(
      LOG_E_GAME_OVER,
      "TRAGIC",
      $monster_Health,
      $player_Health,
      "EVERYONE"
    );
  }

  if ($player_Health <= 0 || $monster_Health <= 0) {
    reset();
  }
}
//BUTTON HANDLERS
function attack() {
  turn(MODE_ATTACK);
  endRound();
}
function strongAttack() {
  turn(MODE_STRONG_ATTACK);
  endRound();
}
function heal() {
  let healValue;
  if ($player_Health >= chosenLifeNum - DEFAULT_HEAL) {
    alert("you cant have more that 100 health dum dum");
    healValue = chosenLifeNum - $player_Health;
  } else {
    healValue = DEFAULT_HEAL;
    increasePlayerHealth(DEFAULT_HEAL);
    $player_Health += healValue;
    doLog(LOG_E_HEAL, healValue, $monster_Health, $player_Health, "PLAYER");
    endRound();
  }
}
function printLog() {
  console.log($battleLog);
}

attackBtn.addEventListener("click", attack);
strongAttackBtn.addEventListener("click", strongAttack);
healBtn.addEventListener("click", heal);
logBtn.addEventListener("click", printLog);
