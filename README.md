# FamixTypeScriptImporter

[![Node.js CI](https://github.com/maelpaul/FamixTypeScriptImporter/actions/workflows/node.js.yml/badge.svg)](https://github.com/maelpaul/FamixTypeScriptImporter/actions/workflows/node.js.yml)

Create a [FamixTypeScript](https://github.com/fuhrmanator/FamixTypeScript) model in JSON of TypeScript files.

## Installation

```sh
npm install
```

## Usage

Instructions for using the command-line importer :

```sh
ts-node src/ts2famix-cli.ts --help
```

Run tests :
```sh
npm test
```

Generate coverage :
```sh
npm run coverage
```

Then open "```coverage/lcov-report/index.html```" with your favorite browser : 
```sh
firefox coverage/lcov-report/index.html &
```

Generate documentation :
```sh
npm run doc
```

Then open "```docs/index.html```" with your favorite browser : 
```sh
firefox docs/index.html &
```

Generate plantuml and svg of the metamodel :
```sh
npm run uml
```
Then open "```doc-uml/metamodel.svg```" with your favorite image viewer :
```sh
eog doc-uml/metamodel.svg &
```

## Parse a full project

```sh
ts-node src/ts2famix-cli.ts -i "../path/to/project/**/*.ts" -o JSONModels/projectName.json
```

This command allows to parse all TypeScript files and ignores the HTML or CSS ones (which is particularly interesting to avoid HTML files in Angular-like projects).

## Generate an object diagram of the JSON model

```sh
ts-node src/famix2puml.ts -i JSONModels/projectName.json -o PUMLModels/projectName.puml
```

## Import the JSON model into Moose 🫎

You need to copy the "```JSONModels/projectName.json```" into your "```Pharo/images/[imageName]```" directory.
For a Moose Suite 10 (stable) user with Pharo directory in root directory, do : 
```sh
cp JSONModels/projectName.json ~/Pharo/images/Moose\ Suite\ 10\ \(stable\)/.
```
Then in a playground, do :
```st
'projectName.json' asFileReference readStreamDo:
  [ :stream | model := FamixTypeScriptModel new 
    importFromJSONStream: stream. model install ].
```

## TypeScript Metamodel API documentation (visualization)

The following was generated by CI using [tplant](https://github.com/bafolts/tplant), in a similar fashion described [here](https://modularmoose.org/2021/07/19/automatic-metamodel-documentation-generation.html).

![FamixTypeScript API Metamodel](https://raw.githubusercontent.com/maelpaul/FamixTypeScriptImporter/v1/doc/metamodel.svg)
