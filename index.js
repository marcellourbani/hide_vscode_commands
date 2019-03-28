#!/usr/bin/env node
var fs = require("fs")
var rl = require("readline")
var never = "hideCommands.never"

function ask(question, callback) {
  var r = rl.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  r.question(question + "\n", answer => {
    r.close()
    if (answer && answer.toUpperCase() === "Y") callback()
  })
}

ask("Process and overwrite package.json Y/N? ", () => {
  try {
    var pkgJson = JSON.parse(fs.readFileSync("package.json"))
    var commands = pkgJson.contributes && pkgJson.contributes.commands
    if (!commands) {
      console.log("No command found")
      return
    }
    if (!pkgJson.contributes.menus) pkgJson.contributes.menus = {}
    var palette = pkgJson.contributes.menus.commandPalette
    if (!palette) pkgJson.contributes.menus.commandPalette = palette = {}
    var added = 0

    for (var candidate of commands) {
      var other = palette.find(pc => pc.command === candidate.command)
      if (!other) {
        added++
        palette.push({ command: candidate.command, when: never })
      }
    }

    if (added) {
      fs.writeFileSync("package.json", JSON.stringify(pkgJson, null, 2))
      console.log("All done," + added + " new commands ignored")
    } else console.log("No new command found")
  } catch (e) {
    console.log(e.toString())
  }
})
