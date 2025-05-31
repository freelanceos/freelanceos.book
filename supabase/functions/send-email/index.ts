import express from 'express';
import { Resend } from 'resend';
import cors from 'cors';

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/send-email', async (req, res) => {
    try {
        const { type, data } = req.body;

        if (!type || !data) {
            return res.status(400).json({
                error: 'Missing required fields: type and data'
            });
        }

        let emailData;
        if (type === 'contact') {
            emailData = {
                from: 'FreelanceOS <contact@freelanceos.com>',
                to: ['freelanceos2025@gmail.com'],
                subject: 'New Contact Form Submission',
                html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Message:</strong> ${data.message}</p>
          <p><strong>Timestamp:</strong> ${data.timestamp}</p>
        `,
            };
        } else if (type === 'order') {
            emailData = {
                from: 'FreelanceOS <orders@freelanceos.com>',
                to: ['freelanceos2025@gmail.com'],
                subject: 'New Order Submission',
                html: `
          <h2>New Order Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Payment Method:</strong> ${data.payment}</p>
          <p><strong>Timestamp:</strong> ${data.timestamp}</p>
        `,
            };
        } else {
            return res.status(400).json({
                error: 'Invalid email type'
            });
        }

        const { data: result, error } = await resend.emails.send(emailData);

        if (error) {
            throw error;
        }

        return res.json({ success: true, data: result });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            error: 'Server error',
            message: error.message
        });
    }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 