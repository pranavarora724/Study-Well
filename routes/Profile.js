
const express = require('express');
const router = express.Router();

const{getProfile , updateProfile , updateProfilePic , deleteAccount} = require('../controllers/Profile');

const {isValid} = require('../middlewares/auth');
// Profile Routes
// These routes are accessible by everyone 
// We just need 'isValid' middleware


router.put('/updateProfile' , isValid , updateProfile);
router.put('/updateProfilePic' , isValid , updateProfilePic);
router.get('/getUserDetails' , isValid , getProfile);
router.delete('/deleteProfile' , isValid , deleteAccount);


module.exports = router;