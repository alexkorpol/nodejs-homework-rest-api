const express = require('express')

const router = express.Router()

const { validation, ctrlWrapper } = require('../../middlewares');
const { contactSchema } = require('../../schemas');
const { contacts: ctrl } = require('../../controllers');

const validateMiddleware = validation(contactSchema);

// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// module.exports = router

// !=====================
// const express = require('express');+++


/*
validateMiddleware = (req, res, next)=> {
        const {error} = productSchema.validate(req.body);
        if(error){
            error.status = 400;
            next(error);
        }
        next()
    }
*/
// const router = express.Router();+++
console.log("ctrlWrapper", ctrlWrapper);
console.log("ctrl.listContacts", ctrl.listContacts);
router.get('/', ctrlWrapper(ctrl.listContacts));

router.get('/:id', ctrlWrapper(ctrl.getById));

router.post('/', validateMiddleware, ctrlWrapper(ctrl.addContact));

router.put('/:id', validation(contactSchema), ctrlWrapper(ctrl.updateContact));

router.delete('/:id', ctrlWrapper(ctrl.removeContact));

module.exports = router;
