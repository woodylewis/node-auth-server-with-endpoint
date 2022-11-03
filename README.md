Coded for a JetBlue project in 2018
## POC for UI rules mapping

### Node Server
```bash
$ cd server
$ npm install
$ npm start
```
For restart during dev
```bash
$ npm run start-dev
```
Server runs on port 3000

### Angular Client
```bash
$ cd endpoint
$ npm install
$ npm start
```
Client runs on port 4200

### App Flow
Server exposes /auth prefix for /login and /register
On connection to mongo database, server checks for passenger and rules collections, seeds both if empty or nonexistent

On successful login, server creates JWT, sets cookie with the token, and then searches the rules collection on passenger points, home city and favorite city.

If rule found, server returns rule, along with token  and passenger fields, to browser.

Server also exposes /cms GET route that takes token as query string paramter, returns just the rule if found.

localhost:3000/cms?token=xxxxxxxxxxxxxxxxxxxxxxxxx
