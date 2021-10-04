# General Info

## Commands
- npm run dev - builds electron typescript code and runs ui dev server
- *npm run build - builds both electron and ui
- npm run pack - packs into an executable

*NOTE - default Electron file/url config path is for the BUILT version of the UI

This project is a boilerplate that includes Electron (with typescript) and Angular in one package, ready to go, right out of the box.
I havent found any other boilerplates/templates that are to my liking and/or flexible enough so I decided to make one.

The idea is that the Electron part and the UI part are close enough that they are easy to build and pack, but still far enough apart that they are relatively easy to replace with a UI of your liking, and not cause headaches.

ipcRenderer is available by default as a global variable and is not impacted by any UI changes.


# Legal

This project - MIT licence

Included projects - Their own respective licences

*if you end up using this template for an app - a shoutout would be apreciated but is by no means required.

# UI
Located in ./src
Its a run-of-the-mill Angular app - all the regular Angular rules and commands apply (ng serve, ng build etc).

## Replacing Angular with React or whatever else

Simply delete angular from /src and put whatever you'd like in there.
Edit the build process in package.json accordingly.

*note - if you are changing the UI framework, also check dev.server.js for any extra commands that might be required


### Replaing Angular with React example

- Remove everything from /src folder
- Generate a new React application inside of the /src folder (as in, package.json of the react application is in the /src folder), yes, you can also use typescript, its basically plug and play.
- Make sure that React app is built into dist/app/ui (use whatever build process you like)
- Edit package.json to run the correct commands for building and/or running your React app
- edit dev.server.js to use the correct commands, based on package.json
- in /app/main/Main.ts -> change the port from 4200 to 3000 for the dev version. (from Angular default port to React default port)
- type npm run dev, press enter.

# Electron part

By default its typescript that NEEDS to be turned into JS before the app is run. The idea is taken from Dave Bush (https://davembush.medium.com/) and his article (https://davembush.medium.com/typescript-and-electron-the-right-way-141c2e15e4e1)

## Building

Typescript generates a JS output of App.js at /dist/app, the rest of the Electron app is contained in /dist/app/main, and all other classes/functions/files/whatever that relate to Electron should be in there.

Electron can then be run with the App.js file, just point it in the right direction

* Eg: electron ./dist/app/App.js

## Packing

electron-packager is used with built files from /dist. This includes both Main folder and UI folder. App signing and/or licencing of any sort is not implemented - use whatever you like.

ipcRenderer is enabled in preload.ts and will be always available regardless of the UI.

# Problems/Bugs/Issues

Create an issue here.

# Pull Requests

PR's are welcome, if you want to add something to the repo, feel free to make a PR.
