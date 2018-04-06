# DEED.IT


## Overview

Three projects:
- server: http and ws server - using [create-react-app](https://github.com/facebook/create-react-app)
- client: for client-side, mobile first - using [create-react-app](https://github.com/facebook/create-react-app)
- wonderwall: for client-side, heavy graphics on big screen 

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

## To Do (currently 20 days minimum)

1. AWS Transfer / Setup (1 day)

    ELB / EC2  + domain
    S3 / RDB  
   
1. Feature detection (1 day)

   modernizr equivalent
   conditional logic
   
1. Client video capture (1 day)

   mechanism  
   red dot  
   binary push  
    
1. Persistence - server (2 days)

   AWS setup - RDB, S3  
   serverside - AWS API's  
   manage S3 URL's  
   
1. Persistence - client (1 day)

   Additional flow pages  
   Error handling  
   
1. Deed selection (1 day)

    client side screens
    server endpoint
    search..?   
   
1. Deed administration (3 days)

    server logic
    client screens
    security - basic auth? 
    
1. Photo/video review (2 days)

    Tile logic
    DB updates
    Review page
    
1. Logging (1 day)

   serverside - endpoint, user agent parsing  
   AWS setup to S3   
   client-side - error event
 
1. UX redesign (3 days ?)

   No spec!  
   Additional pages  
   Reflow client  
   no graphics!
   
1. Wonderwall: Certificates / User accommplishments / MegaDeed progress (2 days)

   server logic  
   new graphics tiles    
   
1. Auto photo/video review (2 days)

    AWS setup (Rekognition)  
    Store results  
    Update review process logic   
    
    
 