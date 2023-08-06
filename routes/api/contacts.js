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

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:id', ctrlWrapper(ctrl.getById));

router.post('/', validateMiddleware, ctrlWrapper(ctrl.add));

router.put('/:id', validation(contactSchema), ctrlWrapper(ctrl.updateById));

router.delete('/:id', ctrlWrapper(ctrl.removeById));

module.exports = router;
