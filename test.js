var color = require('./modules/color.js');
var chalk = require('chalk');

var theColors = [
  "#002b36",
  "#1c1c1c",
  "#073642",
  "#262626",
  "#586e75",
  "#585858",
  "#657b83",
  "#626262",
  "#839496",
  "#808080",
  "#93a1a1",
  "#8a8a8a",
  "#eee8d5",
  "#e4e4e4",
  "#fdf6e3",
  "#ffffd7",
  "#b58900",
  "#af8700",
  "#cb4b16",
  "#d75f00",
  "#dc322f",
  "#d70000",
  "#d33682",
  "#af005f",
  "#6c71c4",
  "#5f5faf",
  "#268bd2",
  "#0087ff",
  "#2aa198",
  "#00afaf",
  "#859900",
  "#5f8700"
]

color.orange('test in orange')
color.cyan1('test in cyan1')
color.green('test in green')
color.yellow('test in yellow')
color.cyan2('test in cyan2')

for (var i = 0; i < theColors.length; i++) {
  console.log(chalk.hex(theColors[i]).bold("testing one of the colors: " + theColors[i] + "\n"));

}
