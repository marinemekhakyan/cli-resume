let box = require("./box.json");
let chalk = require("chalk");

let dividerObject = function (num, defaultColor) {
    this.length = num;
    this.color = defaultColor;
    let {
        vertical,
        horizontal
    } = box;

    this.printTop = function () {
        console.log(
            chalk[`${this.color}`](
                horizontal.repeat(this.length)
            )
        );
    };
    this.printBottom = function () {
        console.log(
            chalk[`${this.color}`](
                horizontal.repeat(this.length)
            )
        );
    };
    this.printLine = function () {
        console.log(
            chalk[`${this.color}`](horizontal.repeat(this.length))
        );
    };
    this.printVertical = function () {
        console.log(chalk[`${this.color}`](vertical.repeat(this.length)));
    };
    this.containString = function (string, color) {
        return (
            chalk[`${this.color}`](vertical) +
            color(string.padEnd(this.length)) +
            chalk[`${this.color}`](vertical)
        );
    };
};

module.exports = dividerObject;