const chalk = require('chalk');

exports.orange = function (string) {
  console.log(chalk.hex("#cb4b16").bold(string));
}

exports.magenta = function (string) {
  console.log(chalk.hex('#af005f').bold(string));
}

exports.cyan1 = function (string) {
  console.log(chalk.hex('#2aa198').bold(string));
}

exports.cyan2 = function (string) {
  console.log(chalk.hex('#00afaf').bold(string));
}

exports.blue = function (string) {
  console.log(chalk.hex('#0087ff').bold(string));
}

exports.yellow = function (string) {
  console.log(chalk.hex('#af8700').bold(string));
}

exports.green = function (string) {
  console.log(chalk.rgb(30, 200, 50).bold(string));
}

exports.yellow = function (string) {
  console.log(chalk.hex('#859900').bold(string));
}

exports.sunshine = function (string) {
  console.log(chalk.hex('#b58900').bold(string));
}

exports.purple = function (string) {
  console.log(chalk.hex('#6c71c4').bold(string));
}

exports.pink = function (string) {
  console.log(chalk.hex('#d33682').bold(string));
}

exports.coral = function (string) {
  console.log(chalk.hex('#dc322f').bold(string));
}
