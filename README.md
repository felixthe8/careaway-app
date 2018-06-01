# CareAway Treatment Planner Client Side
CECS 491A/491B
This is a repository for the 491A/491B project completed by Team Tangent (Jimmy Chao, Eugene Mesina, Tyler Dao, Crystal Chun, Taylor Tobin, and Felix Huang). The goal of this project was to develop an single-page application to allow medical professionals and their patients to interact with one another without both parties having to be in the same location at the same time. Documentation for the planning of this project will also be included in this repository.  
Deployed Application Link: https://careaway.me/#/


## Project Description
The CareAway Treatment Planner is a single-page application developed using a modified version of the MEAN stack - MongoDB, Express, Vue.js, and NodeJS. The motivation that CareAway Treatment Planner satisfies is the lack of communication between medical professionals and patients outside of the medical facility. The application allows medical professionals to create treatment plans with actionable tasks, set up appointments, and view trends in their patients' condition. In turn, patients are able to interact and provide feedback with their treatment plans as well as schedule appointments with their medical professionals. Furthermore, Troy Hunt's [haveibeenpwned](https://haveibeenpwned.com/Passwords) service to ensure that our users are registering with uncompromised credentials. 

## Getting Started

```
git clone https://github.com/felixthe8/careaway-app.git
git clone https://github.com/felixthe8/careaway-server.git
```

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Development Setup

1. Install MongoDB through Homebrew
   > Install [Homebrew](https://brew.sh/)  
   > Install MongoDB through Homebrew: ```  brew install mongodb ```  
   > Create the local Mongo database: ```  mkdir -p /data/db ```  
   > Run the Mongo database: ```  mongod ```  
   > (Optional) On a separate terminal, run the mongo client: ``` mongo```  
   > For assistance with MongoDB setup, click [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

2. Start the CareAway server locally
``` bash
  cd careaway-server
  npm install
  node services
```
3. View Frontend
``` bash
  cd careaway-app
  npm install
  npm run dev
```

### careaway-app dependencies
``` bash
  axios  
  bulma  
  vue  
  vue-router  
  vuex  
  babel-core  
  babel-loader  
  babel-present-env  
  babel-preset-stage-3  
  cross-env  
  css-fileloader  
  file-loader  
  font-awesome  
  node-sass  
  sass-loader  
  vue-loader  
  vue-template-compiler  
  webpack  
  webpack-dev-server  
```
### careaway-server dependencies
``` bash
  axios  
  body-parser  
  connect-mongo  
  consign  
  cors  
  crypto-js  
  csurf  
  express  
  express-http-proxy  
  express-router  
  express-session  
  helmet  
  http-proxy  
  http-proxy-rules  
  jsonwebtoken  
  module-alias  
  mongodb  
  morgan  
  passport  
  passport-local  
  promise  
  randomstring

```

## Acknowledgments
* [Taylor Tobin](https://github.com/19TT94) 
* [Eugene Mesina](https://github.com/EugeneMesina)
* [Crystal Chun](https://github.com/CrystalChun)
* [Jimmy Chao](https://github.com/Lazer7)
* [Tyler Dao](https://github.com/fireclimbers) 
