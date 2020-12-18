var express = require('express');
var router = express.Router();

var controller = require('../controllers/students');

router.get('/', controller.home );
router.get('/groupe1/', controller.countGroupe1 );
router.get('/groupe2/', controller.countGroupe2 );
router.get('/groupe3/', controller.countGroupe3 );
router.get('/groupe4/', controller.countGroupe4 );
router.get('/groupe5/', controller.countGroupe5 );
router.get('/groupe6/', controller.countGroupe6 );
router.get( '/:studentId', controller.getStudent );
router.post( '/', controller.createNewStudent );

router.put( '/:studentId', controller.updateStudent );
router.delete( '/:studentId', controller.deleteStudent );
router.get('/groupe/:groupe', controller.groupe );
router.get('/name/:name', controller.searchByName );

module.exports = router;
