const nodemailer = require('nodemailer');
const { connectDB } = require('../database');

exports.processForm = async ({ email, message }) => {
    console.log('Email:', email, 'Message:', message);

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: 'trashformersproject@gmail.com', 
                pass: 'zxkg ntom wufn cshj'  
            }
        });

        

        const mailOptions = {
            from: 'lewisvillamor26@gmail.com', 
            to: email, 
            subject: 'Message Received', 
            text: `We have received your message: "${message}" and will be in touch soon.`,
            html: `<b>We have received your message:</b> "${message}" <br><b>and will be in touch soon.</b>` 
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');

        // Proceed to save message to MongoDB only if email sending is successful
        const db = await connectDB();
        const collection = db.collection('messages'); 
        await collection.insertOne({ email, message, timestamp: new Date() });
        console.log('Message saved to MongoDB');

    } catch (error) {
        console.error('Error in processing form:', error);
    }
};
