const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');

router.get('/myday', indexController.getDay);
router.post('/myday', indexController.postDay);

router.get('/important', indexController.getImp);
router.post('/important', indexController.postImp);

router.get('/planned', indexController.getPln);
router.post('/planned', indexController.postPln);

router.get('/assigned', indexController.getAsg);
router.post('/assigned', indexController.postAsg);

router.get('/flagged', indexController.getFlg);
router.post('/flagged', indexController.postFlg);

router.get('/inbox', indexController.getInb);
router.post('/inbox', indexController.postInb);
module.exports = router;