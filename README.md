## Build process

To build this repo, make shure you have:

- [NodeJS](https://nodejs.org/en/) installed.
- [Ionic frameowrk](https://ionicframework.com/getting-started/) and Cordava globally installed on your machine.
```bash
$ npm i -g ionic cordova
```
- Install all dependencies
```bash
$ npm i
```
- Then run it on the browser for debugging proproses.
```bash
$ ionic serve
```
- To run the app on the phone simulator, add your platform of choise and run it.
```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```
Substitute ios for android if not on a Mac.
- To run the app on an Android phone with livereload run:
```bash
$ ionic cordova run android --device --livereload
```
- To build an android debug version run:
```bash
$ ionic cordova build android
```
- To write cloud functions install firebase-tools:
```bash
$ npm install -g firebase-tools
```
- To publish cloud functions run (inside /smart-firebase-function folder):
```bash
$ firebase deploy --only functions
```



