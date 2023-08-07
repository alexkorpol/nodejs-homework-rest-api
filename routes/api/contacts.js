const express = require('express')

const router = express.Router()

const { validation, ctrlWrapper } = require('../../middlewares');
const { contactSchema } = require('../../schemas');
const { contacts: ctrl } = require('../../controllers');

const validateMiddleware = validation(contactSchema);


router.get('/', ctrlWrapper(ctrl.listContacts));

router.get('/:id', ctrlWrapper(ctrl.getById));

router.post('/', validateMiddleware, ctrlWrapper(ctrl.addContact));

router.put('/:id', validation(contactSchema), ctrlWrapper(ctrl.updateContact));

router.delete('/:id', ctrlWrapper(ctrl.removeContact));

module.exports = router;
