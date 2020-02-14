#!/usr/bin/env node
"use strict";

let inquirer = require("inquirer");
let chalk = require("chalk");

const response = chalk.white;
const title = chalk.bold.green;

let resume = require("./resume.json");
let dividerConstructor = require("./divider.js");
let divider = new dividerConstructor(70, "cyan");

let resumePrompts = {
  type: "list",
  name: "resumeOptions",
  message: "What would you like to know about me?",
  choices: [...Object.keys(resume), "Exit"]
};

function main() {
  console.log("Hello, my name is Marine. Welcome to my resume!");
  resumeHandler();
}

function resumeHandler() {
  inquirer.prompt(resumePrompts).then(answer => {
    if (answer.resumeOptions == "Exit") {
      return;
    }
    let option = answer.resumeOptions;

    divider.printTop();

    resume[`${option}`].forEach((info, ind) => {
      if (typeof info === "string") {
        console.log(divider.containString(` ${info}`, response));
      } else {
        Object.values(info).forEach((value, ind) => {
          if (ind > 1) {
            console.log(divider.containString(` ${value}`, response));
          } else if (ind === 1) {
            console.log(divider.containString(` ${value}`, chalk.cyan.bold));
          } else {
            console.log(divider.containString(` ${value.padEnd(78)}`, title));
          }
        });
        ind !== resume[`${option}`].length - 1 && divider.printLine();
      }
    });
    divider.printBottom();

    inquirer
      .prompt({
        type: "list",
        name: "exitBack",
        message: "Go back or Exit?",
        choices: ["Back", "Exit"]
      })
      .then(choice => {
        if (choice.exitBack == "Back") {
          resumeHandler();
        } else {
          return;
        }
      });
  });
}

main();