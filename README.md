# Remove commands from vs code palette

Visual studio code extensions often have loads of commands used for menus and similar which makes little sense to invoke from the command palette

To avoid them showing up we need to add them to the commandPalette menu with a dummy when clause to hide them

This little program rewrites your package.json, leaving alone commands that were in the palette and adding the others with a dummy when clause.

so this file:
contributes.commands

```json
{
  "contributes": {
    "commands": [
      {
        "command": "myCommand"
      }
    ]
  }
}
```

becomes this:

```json
{
  "contributes": {
    "commands": [
      {
        "command": "myCommand"
      }
    ],
    "menus": {
      "commandPalette": [
        {
          "command": "myCommand",
          "when": "hideCommands.never"
        }
      ]
    }
  }
}
```
