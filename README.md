# FamixTypeScriptImporter

[![Node.js CI](https://github.com/fuhrmanator/FamixTypeScriptImporter/actions/workflows/node.js.yml/badge.svg)](https://github.com/fuhrmanator/FamixTypeScriptImporter/actions/workflows/node.js.yml)

Create a [FamixTypeScript](https://github.com/fuhrmanator/FamixTypeScript) model in JSON of TypeScript files.

## Installation

```sh
npm install
```

## Usage

Instructions for using the command-line importer :

```sh
ts-node src/ts2famix-tsconfig.ts --help
```

Run tests :
```sh
npm test
```

Generate coverage :
```sh
npm run coverage
```

Then, open "```coverage/lcov-report/index.html```" with your favorite browser : 
```sh
firefox coverage/lcov-report/index.html &
```

Generate documentation :
```sh
npm run doc
```

Then, open "```docs/index.html```" with your favorite browser : 
```sh
firefox docs/index.html &
```

Generate plantuml and svg of the metamodel :
```sh
npm run uml
```

Then, open "```doc-uml/metamodel.svg```" with your favorite image viewer :
```sh
eog doc-uml/metamodel.svg &
```

## Parse a full project

```sh
ts-node src/ts2famix-tsconfig.ts -i ../path/to/project/tsconfig.json -o JSONModels/projectName.json
```

### Parsing a full project

On Windows:

```sh
ts-node .\src\ts2famix-cli.ts -i ..\path\to\project\**\*.ts -o output.json
```

> this command allows to parse all TS files and ignore the HTML or CSS one (which is particulary interesting to avoid HTML files in Angular-like projects)

## Generate an object diagram of the JSON model

```sh
ts-node src/famix2puml.ts -i JSONModels/projectName.json -o PUMLModels/projectName.puml
```

## Import the JSON model into Moose 🫎

You need to copy the "```JSONModels/projectName.json```" into your "```Pharo/images/[imageName]```" directory.

For a Moose Suite 10 (stable) user with the Pharo directory in the root directory, do : 
```sh
cp JSONModels/projectName.json ~/Pharo/images/Moose\ Suite\ 10\ \(stable\)/.
```

Then, in a Moose Playground, do :
```st
Metacello new 
  githubUser: 'fuhrmanator' project: 'FamixTypeScript' commitish: 'master' path: 'src';
  baseline: 'FamixTypeScript';
  load
```

This command installs the TypeScript metamodel into Moose.

Then, generate the metamodel with :  
```Library > Famix > Manage metamodels > Regenerate all metamodels```

Then, in a Moose Playground, do :
```st
'projectName.json' asFileReference readStreamDo:
  [ :stream | model := FamixTypeScriptModel new 
    importFromJSONStream: stream. model install ].
```

This command imports the JSON model into Moose.

## TypeScript Metamodel API documentation (visualization)

The following was generated by CI using [tplant](https://github.com/bafolts/tplant), in a similar fashion described [here](https://modularmoose.org/2021/07/19/automatic-metamodel-documentation-generation.html).

![FamixTypeScript API Metamodel](https://raw.githubusercontent.com/fuhrmanator/FamixTypeScriptImporter/v1/doc/metamodel.svg)
