const contactService = require('../services/contactService');

exports.submitForm = async (req, res) => {
    try {
        const { email, message } = req.body;
        await contactService.processForm({ email, message });
        res.status(200).send({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error submitting form' });
    }
};
