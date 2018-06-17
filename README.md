# DEED.IT


## Overview

Three projects:
- server: http and ws server - using [create-react-app](https://github.com/facebook/create-react-app)
- client: for client-side, mobile first - using [create-react-app](https://github.com/facebook/create-react-app)
- wonderwall: for client-side, heavy graphics on big screen 

## Installation
```shell
git clone https://github.com/fintechbydesign/betterfuture.git
cd betterfuture/deed.it
npm run install-all
npm run build-all
```

## Usage
### Server

To start, from deed.it root directory:
```shell
$ npm start
``` 
Note this uses `sudo` as this starts on protected ports 443 and (optionally) 80 

To stop:
```shell
$ npm stop
``` 

## Client
Runtime, served from root: `https://localhost` 

Dev mode (hot  module replacement etc.), from client root diractory:
```shell
$ npm start
``` 

## Wonderwall
Runtime, served from: `https://localhost/wonderwall` 

Dev mode (hot  module replacement etc.), from wonderwall root diractory:
```shell
$ npm start
``` 

## Tuesday 19th TODO

### Server
* pledge completion error
* location fields for deed type
* location coordinates for deed type?
* all address options: http[s]://[wwww].deedit.org

### Client
* refresh for Do Deed Again
* click on home page call to action
* Navbar - remove option and add icons
* deed photo - pre/post approval
* icons
  - deed type (remove white background)
  - avatar
  - handy wavey
  - nav bar
* click area size
* map/directions for Social Bite deed type
* build optimisation

### UX / Icons
* expand/contract icons
* right arrow or '>'
* Deedit difference links (about page?)

### Wonderwall
* popup content
  - deed details
  - location
  
### Nice to have
* client error logging (client/server)
* client device logging (client/server)
* wonderwall stats..?
* wonderwall videos (wonderwall/server)
* wonderwall manual push content







  
    
 
