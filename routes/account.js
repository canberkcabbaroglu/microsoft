const express = require('express');
const router = express.Router();

const accountController = require('../controllers/account');
// middleware establishes the connection by defining it. This way, you can add isAuthenticated to the domain you want.
const isAuthenticated = require('../middleware/authentication');

router.get('/login', accountController.getLogin);
router.post('/login', accountController.postLogin);

router.get('/register', accountController.getRegister);
router.post('/register', accountController.postRegister);
// I made it necessary to login here by adding isAuthenticated.
router.get('/',isAuthenticated ,accountController.getHome);
router.post('/', accountController.postHome);

router.get('/logout', accountController.getLogout);
 
 
 

module.exports = router;
