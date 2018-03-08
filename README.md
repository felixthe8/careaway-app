# careaway-home

> This is the CareAway Homepage vue which contains information about the CareAway Web Application, the Registration for Medical Professionals and Patients,and the Login for Registered Users.
> The CareAway Homepage will also contain the requests to send Registration information or Login Credentials to the server.

## Build Setup

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
   > Install MongoDB through Homebrew: **brew install mongodb**  
   > Create the local Mongo database: **mkdir -p /data/db**  
   > Run the Mongo database: **mongod**  
   > On a separate terminal, run the mongo client: **mongo**  
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


