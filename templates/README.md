# The <%= params.extensionName %> Extension
<%= description %>

## Getting started

Install [nvm](https://github.com/creationix/nvm#install-script).

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash

Install npm and node.

    nvm install 8
    nvm use 8

Install yarn.

    npm install -g yarn

<%if (params.languageContribution) { %>
## Creating the grammar
Create a XText project in root folder using the XText Eclipse plugin.

Follow this guidelines:
- Project name: `<YOUR PACKAGE>.<%= params.extensionName %>
- Location: <THIS FOLDER>`
- Name: `<YOUR PACKAGE>.<%= params.extensionName %>.<YOUR LANGUAGE NAME CAPITALIZED>`. Example: mx.infotec.dads.kukulkan.Kukulkan
- Extensions: <%= params.languageExtension %> 

**Click next**  

- Facets: 
- [x] Generic IDE Support
- [x] Testing Support

- Preferred Build System: **Gradle**
- Build Language Server: **Fat Jar**
- Source Layout: **Maven/Gradle**  

**Click Finish**

## Generating the language server

    cd <YOUR XText PROJECT>
    ./gradlew shadowJar

A jar will be generated in `<YOUR XText PROJECT>/<YOUR XText PROJECT>.ide/build/libs`.  

- Copy the relative jar path in the copy-ls script in `<YOUR EXTENSION FOLDER>.package.json`

- Copy the relative jar path in `<YOUR EXTENSION FOLDER>/node/<%= params.extensionName %>-backend-module.ts`

<% } %>

## Running the browser example

    yarn rebuild:browser
    cd browser-app
    yarn start

Open http://localhost:3000 in the browser.

## Running the Electron example

    yarn rebuild:electron
    cd electron-app
    yarn start

## Developing with the browser example

Start watching of the hello world extension.

    cd <%= params.extensionName %>-extension
    yarn watch

Start watching of the browser example.

    yarn rebuild:browser
    cd browser-app
    yarn watch

Launch `Start Browser Backend` configuration from VS code.

Open http://localhost:3000 in the browser.

## Developing with the Electron example

Start watching of the hello world extension.

    cd <%= params.extensionName %>-extension
    yarn watch

Start watching of the electron example.

    yarn rebuild:electron
    cd electron-app
    yarn watch

Launch `Start Electron Backend` configuration from VS code.

## Publishing <%= params.extensionName %>-extension

Create a npm user and login to the npm registry, [more on npm publishing](https://docs.npmjs.com/getting-started/publishing-npm-packages).

    npm login

Publish packages with lerna to update versions properly across local packages, [more on publishing with lerna](https://github.com/lerna/lerna#publish).

    npx lerna publish
