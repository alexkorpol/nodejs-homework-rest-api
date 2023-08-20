const express = require('express');

const router = express.Router();

const {
  validation,
  ctrlWrapper,
  auth
} = require('../../middlewares');

const { joiRegisterSchema } = require('../../models/user');

const { users: ctrl } = require('../../controllers');

// const validateMiddleware = validation();

// router.get('/', ctrlWrapper(ctrl.listContacts));

// router.get('/:id', isValidid, ctrlWrapper(ctrl.getById));

// router.post('/', emptyBody, validateMiddleware, ctrlWrapper(ctrl.addContact));
//  !============================================================================
// registration
router.post(
  '/register',
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

// current
router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

// login
router.post('/login', validation(joiRegisterSchema), ctrlWrapper(ctrl.login));

//  logout
router.post('/logout', auth, ctrlWrapper(ctrl.logout));
// !==================================

module.exports = router;

// const express = require('express');+++

// const { auth, ctrlWrapper } = require('../../middlewares');
// const { userCurrent: ctrl } = require('../../controllers');

// const router = express.Router();+++

// router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

// module.exports = router;

