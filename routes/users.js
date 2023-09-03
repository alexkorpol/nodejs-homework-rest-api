const express = require('express');

const router = express.Router();

const {
  validation,
  ctrlWrapper,
  auth,
  upload,
} = require('../middlewares');

const { joiRegisterSchema, joiEmailSchema } = require('../models/user');

const { users: ctrl } = require('../controllers');

// registration
router.post(
  '/register',
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

// current
router.get(
  '/current',
  auth,
  ctrlWrapper(ctrl.getCurrent));

// login
router.post(
  '/login',
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.login));

//  logout
router.post('/logout',
  auth,
  ctrlWrapper(ctrl.logout));

// update avatar 
router.patch('/avatars',
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar));

router.get('/verify/:verificationToken',
  ctrlWrapper(ctrl.verifyEmail));

router.post('/verify',
  validation(joiEmailSchema),
  ctrlWrapper(ctrl.verify));

module.exports = router;