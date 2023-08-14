const express = require('express')

const router = express.Router()

const { validation, ctrlWrapper, emptyBody, isValidid } = require('../../middlewares');
const { contactJoiSchema, favoriteJoiSchema} = require('../../models/contacts');
const { contacts: ctrl } = require('../../controllers');

const validateMiddleware = validation(contactJoiSchema);


router.get('/', ctrlWrapper(ctrl.listContacts));

router.get('/:id', ctrlWrapper(ctrl.getById));

router.post('/', emptyBody, validateMiddleware, ctrlWrapper(ctrl.addContact));

router.put('/:id', emptyBody, validateMiddleware, ctrlWrapper(ctrl.updateContact));

router.patch('/:id/favorite', isValidid, validation(favoriteJoiSchema),    
            ctrl.updateStatusContact
);

router.delete('/:id', ctrlWrapper(ctrl.removeContact));

module.exports = router;
