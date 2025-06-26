const express = require('express');
const { signup, login, userrequest, getUserRequests } = require('../controllers/authController');
// const { userrequest } = require('../controllers/request/request');
// Example: const { protect, authorize } = require('../middleware/authMiddleware');
const { adminrequest, adminupdate, adminapplication, adminapplicationupdate, adminhistory, hospitalinventory, inventoryupdate,
    adminhospitalrequests, hospitalrequest, updateHospitalRequest, organinventory, organinventoryupdate, hospitalorganrequests,
    hospitalrequestsubmit } = require('../controllers/request/adminrequest');

const { pledges, mypledge, bloodRequestDonor, bloodrequestfordonor, upadateBloodrequestdonor, hospitalmypledge, bloodrequestforadmin,
    updatedonorstatus, mypledgetype } = require('../controllers/Donor/request');

const { requestapprove, updateuserprofile, getuser } = require('../controllers/request/requestapprove');
const { bloodsummary, organsummary } = require('../controllers/inventory/inventoryrequest');

const { validateSignup } = require('./validation');

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', login);
router.post('/userrequest', userrequest);
router.get('/userrequest/:id', getUserRequests);
router.put('/updateuserprofile', updateuserprofile);
router.get('/getuser', getuser);
router.put('/updateuserprofile', updateuserprofile);

//admin request
router.patch('/adminrequests/:type/:id/status', adminupdate);
router.get('/adminrequests', adminrequest);
router.get('/adminhospitalrequests', adminhospitalrequests);
router.get('/adminapplication', adminapplication);
router.get('/adminhistory', adminhistory);
router.patch('/adminapplicationupdate', adminapplicationupdate);
router.get('/bloodrequestforadmin', bloodrequestforadmin);
router.patch('/requestapprove/:id', requestapprove);
router.get('/bloodsummary', bloodsummary);
router.get('/organsummary', organsummary);

//hospital request

router.get('/hospitalinventory', hospitalinventory);
router.post('/organinventoryupdate', organinventoryupdate);
router.patch('/updateHospitalRequest', updateHospitalRequest);
router.get('/organinventory', organinventory);
router.post('/inventoryupdate', inventoryupdate);
router.post('/hospitalrequest', hospitalrequest);
router.get('/hospitalorganrequests', hospitalorganrequests);
router.patch('/hospitalrequestsubmit', hospitalrequestsubmit);
router.get('/hospitalmypledge', hospitalmypledge);
router.patch('/updatedonorstatus/:donorId', updatedonorstatus);


// Donor request

router.post('/pledges', pledges);
router.get('/mypledge', mypledge);
router.post('/bloodRequestDonor', bloodRequestDonor);
router.get('/bloodrequestfordonor', bloodrequestfordonor);
router.patch('/upadateBloodrequestdonor', upadateBloodrequestdonor);
router.get('/mypledgetype', mypledgetype);














module.exports = router;