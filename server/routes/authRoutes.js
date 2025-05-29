const express = require('express');
const { signup, login, userrequest, getUserRequests } = require('../controllers/authController');
// const { userrequest } = require('../controllers/request/request');
// Example: const { protect, authorize } = require('../middleware/authMiddleware');
const { adminrequest, adminupdate, adminapplication, adminapplicationupdate, adminhistory, hospitalinventory, inventoryupdate } = require('../controllers/request/adminrequest');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/userrequest', userrequest);
router.get('/userrequest/:id', getUserRequests);

//admin request
router.patch('/adminrequests/:type/:id/status', adminupdate);
router.get('/adminrequests', adminrequest);

router.get('/adminapplication', adminapplication);
router.get('/adminhistory', adminhistory);
router.patch('/adminapplicationupdate', adminapplicationupdate);

//hospital request

router.get('/hospitalinventory', hospitalinventory);
router.patch('/inventoryupdate', inventoryupdate);






module.exports = router;