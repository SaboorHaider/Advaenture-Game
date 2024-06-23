#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// Game Variables
let enemies = ["🧟Zombie monster", "🦹 Fighter","🦁 Loin","💀 Undead skeleton" ];
let maxEnemyHealth = 100;
let enemyAttackDamageToHero = 30;

// Player Variables
let heroHealth = 100;
let attackDamageToEnemy = 50;
let numHealthPotions = 5;
let Painkiller = 25;
let healthPotionDropChance = 50;

let gameRunning = true;

console.clear()
console.log(chalk.magenta("\n\t     Welcome to the world of adventure!"));

GAME: while (gameRunning) {
  console.log(`-`.repeat(50));

  let enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1);
  let enemyIndex = Math.floor(Math.random() * enemies.length);
  let enemy = enemies[enemyIndex];

  console.log(chalk.red(`\t # ${enemy} has appeared! #\n`));

  while (enemyHealth > 0) {
    console.log(chalk.cyan(`\n\t🙎 Your HP: ${heroHealth}`));
    console.log(chalk.redBright(`\t${enemy}'s HP: ${enemyHealth}\n`));

    let options = await inquirer.prompt({
      name: "ans",
      type: "list",
      message: "What would you like to do?",
      choices: ["1. Attack", "2. Painkiller", "3. Run!"],
    });

    if (options.ans === "1. Attack") {
      let damageDealt = Math.floor(Math.random() * attackDamageToEnemy + 1);
      let damageTaken = Math.floor(Math.random() * enemyAttackDamageToHero + 1);

      enemyHealth -= damageDealt;
      heroHealth -= damageTaken;

      console.log(chalk.green(`\n> You strike the ${enemy} for ${damageDealt} damage.`));
      console.log(chalk.red(`> ${enemy} strikes you for ${damageTaken} damage.`));

      if (heroHealth < 1) {
        console.log(chalk.red("You've taken too much damage; it's best to rest and recover before proceeding."));
        break;
      }
    } else if (options.ans === "2. Painkiller") {
      if (numHealthPotions > 0) {
        heroHealth += Painkiller;
        numHealthPotions--;
        console.log(chalk.green(`> You've used a painkiller, healing yourself to get back on track. ${Painkiller}.`));
        console.log(chalk.cyan(`> You now have ${heroHealth} HP.`));
        console.log(chalk.cyan(`> You have ${numHealthPotions} Painkiller(s) left.\n`));
      } else {
        console.log(chalk.red("> You have no health potions left! Defeat enemies for a chance to get one!\n"));
      }
    } else if (options.ans === "3. Run!") {
      console.log(chalk.yellow(`You flee from the ${enemy} to stay safe !`));
      continue GAME;
    } else {
      console.log(chalk.red("Invalid command!"));
    }
  }

  if (heroHealth < 1) {
    console.log(chalk.red("You limp out of the dungeon, weak from battle."));
    break;
  }

  console.log(`-`.repeat(50));
  console.log(chalk.green(`#Victory! The enemy ${enemy} has been defeated! #\n`));
  console.log(chalk.cyan(`# You have ${heroHealth} HP left. #`));

  let randomNumber = Math.floor(Math.random() * 100 + 1);
  if (randomNumber < healthPotionDropChance) {
    numHealthPotions++;
    console.log(chalk.green(`# The ${enemy} dropped a Painkiller! #`));
    console.log(chalk.cyan(`\n# You now have ${numHealthPotions} Painkiller(s). #`));
  }

  console.log(`-` .repeat(50));
  let userOptions = await inquirer.prompt({
    name: "ans",
    type: "list",
    message: "What would you like to do now?",
    choices: ["1. Continue fighting", "2. Exit dungeon"],
  });

  if (userOptions.ans === "1. Continue fighting") {
    console.log(chalk.magenta("\n\t   Keep exploring your adventure!"));
  } else if (userOptions.ans === "2. Exit dungeon") {
    console.log(chalk.magenta("Successfully leaving the Underworld, your journey ends with triumph!"));
    break;
  };
};
