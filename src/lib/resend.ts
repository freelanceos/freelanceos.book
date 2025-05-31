import { Resend } from 'resend';

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export const sendContactEmail = async (data: {
    name: string;
    email: string;
    phone: string;
    message: string;
    timestamp: string;
}) => {
    try {
        const { data: result, error } = await resend.emails.send({
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
        });

        if (error) {
            throw error;
        }

        return result;
    } catch (error) {
        console.error('Email Error:', error);
        throw error;
    }
};

export const sendOrderEmail = async (data: {
    name: string;
    email: string;
    phone: string;
    payment: string;
    timestamp: string;
}) => {
    try {
        const { data: result, error } = await resend.emails.send({
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
        });

        if (error) {
            throw error;
        }

        return result;
    } catch (error) {
        console.error('Email Error:', error);
        throw error;
    }
}; 