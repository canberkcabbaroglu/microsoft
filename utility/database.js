const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://microsoft:123456todo@canberk.qwhr7.mongodb.net/connect?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})
        .then(client => {
            console.log('connected');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

const getdb = () => {
    if (_db) {
        return _db;
    }
    throw 'No Database';
}


exports.mongoConnect = mongoConnect;
exports.getdb = getdb;