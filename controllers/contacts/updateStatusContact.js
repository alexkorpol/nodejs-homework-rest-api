const { NotFound } = require("http-errors");

const {Contact} = require("../../models/contacts");


const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    // const {status} = req.body;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw new NotFound(`Contact with id=${id} not found`);
    }
   res.json(result);
}

module.exports = updateStatusContact;
