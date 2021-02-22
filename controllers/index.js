const User = require('../models/user'); 
exports.getDay = (req, res) => {
    res.render('component/myday', {
        path: '/myday',
        title: 'DAY'
    });
}

exports.postDay = (req, res, next) => {
    res.redirect('/myday');
}

exports.getImp = (req, res) => {
    res.render('component/important', {
        path: '/important',
        title: 'Important'
    });
}

exports.postImp = (req, res, next) => {
    res.redirect('/important');
}

exports.getPln = (req, res) => {
    res.render('component/planned', {
        path: '/planned',
        title: 'Planned'
    });
}

exports.postPln = (req, res, next) => {
    res.redirect('/planned');
}

exports.getAsg = (req, res) => {
    res.render('component/assigned', {
        path: '/assigned',
        title: 'Assigned'
    });
}

exports.postAsg = (req, res, next) => {
    res.redirect('/assigned');
}
exports.getFlg = (req, res) => {
    res.render('component/flagged', {
        path: '/flagged',
        title: 'Flagged'
    });
}

exports.postFlg = (req, res, next) => {
    res.redirect('/flagged');
}
 
exports.getInb = (req, res) => {
    res.render('component/inbox', {
        path: '/inbox',
        title: 'Inbox'
    });
}

exports.postInb = (req, res, next) => {
    res.redirect('/inbox');
}
  