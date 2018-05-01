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

## PABLO TODO
* Cloud Stub
* S3 stub
* S3 for real (STS workflow)
* S3 for static assets < require TLS + cloudfront
* Lambda
 - wonderwall get latest first
 - wonderwall get individuals
 - wonderwall get unapproved
 - approval lambda(s) - deed completion, S3 move, assign points, assign badges
 - add user (username, country of origin)
 - update user (append extra info..?) 
 - get Deeds heirarchy
 - create instance of deed
 - update deed status
 - get user profile - 
 - kill user / update status



  
    
 
