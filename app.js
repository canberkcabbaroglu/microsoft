const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
 
app.set('view engine', 'pug');
app.set('views', './views');
 
const accountRoutes = require('./routes/account');
const indexRoutes = require('./routes/index');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoDbStore = require('connect-mongodb-session')(session);
const errorController = require('./controllers/errors');
const User = require('./models/user');
const ConnectionString = 'mongodb+srv://microsoft:123456todo@canberk.qwhr7.mongodb.net/connect?retryWrites=true&w=majority';
// Sends Session Information to mongodb
var store = new mongoDbStore({
    uri: ConnectionString,
    collection: 'login'
});
 
 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Session Information is stored here.
app.use(session({
    secret: 'canberk cabbaroglu',
    resave: false,
    saveUninitialized: false,
    store: store

}))

 

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => { console.log(err) });
})

//I have set two separate routes for login and panel
app.use(accountRoutes);
app.use(indexRoutes); 
app.use(errorController.get404Page);

mongoose.connect(ConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3000);
    })

 