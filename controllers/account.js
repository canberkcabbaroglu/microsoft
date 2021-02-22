const User = require('../models/user');
const bcrypt = require('bcrypt');
exports.getLogin = (req, res, next) => {
    // we need to check the message in the getlog
    var errorMessage = req.session.errorMessage;
    delete req.session.errorMessage;

    res.render('account/login', {
        path: '/login',
        title: 'Giriş',
        errorMessage: errorMessage
    });
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    // It says here if a mail is not registered in the system, forward it to your login.
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                req.session.errorMessage = "Bu mail adresi ile bir kayıt bulunamamıştır.";
                req.session.save(function (err) {

                    return res.redirect('/login');
                })
            }
            //Here compares passwords. If password is correct, isSuccess will be true.
            bcrypt.compare(password, user.password)
                .then(isSuccess => {
                    if (isSuccess) {
                        req.session.user = user;
                        req.session.isAuthenticated = true;
                        return req.session.save(function (err) {

                            res.redirect('/');
                        });
                    }
                    res.redirect('/login')
                })
        })
}



exports.getHome = (req, res, next) => {

    res.render('component/myday', {
        path: '/',
        title: 'Ana Sayfa',
        isAuthenticated: req.session.isAuthenticated
    });
}

exports.postHome = (req, res, next) => {
    res.redirect('/');
}



exports.getRegister = (req, res, next) => {
    var errorMessage = req.session.errorMessage;
    delete req.session.errorMessage;
    res.render('account/register', {
        path: '/register',
        title: 'Kayıt Ol',
        errorMessage: errorMessage
    });
}

exports.postRegister = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                req.session.errorMessage = 'Bu mail adresi ile daha önce kayıt olunmuş.';
                req.session.save(function (err) {

                    return res.redirect('/register');
                })
            }

            return bcrypt.hash(password, 10);
        })
        .then(hashedPassword => {


            const newUser = new User({
                name: name,
                email: email,
                password: hashedPassword

            });
            return newUser.save();
        })
        .then(() => {
            res.redirect('/login');
        })
}

exports.getLogout = (req, res, next) => {
    req.session.destroy(err => {

        res.redirect('/')
    })
}



