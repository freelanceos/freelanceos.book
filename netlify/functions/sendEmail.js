const { Resend } = require('resend');

exports.handler = async function (event, context) {
    // Handle CORS
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: ''
        };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { type, data } = JSON.parse(event.body);

        if (!type || !data) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing required fields' })
            };
        }

        const resend = new Resend(process.env.VITE_RESEND_API_KEY);

        if (type === 'contact') {
            const { name, email, message } = data;

            if (!name || !email || !message) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: 'Missing required contact fields' })
                };
            }

            const { data: emailData, error } = await resend.emails.send({
                from: 'FreelanceOS <onboarding@resend.dev>',
                to: ['freelanceos2025@gmail.com'],
                subject: 'New Contact Form Submission',
                html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `
            });

            if (error) {
                throw error;
            }

            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ success: true, data: emailData })
            };
        }

        if (type === 'order') {
            const { name, email, phone, service, message } = data;

            if (!name || !email || !phone || !service || !message) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: 'Missing required order fields' })
                };
            }

            const { data: emailData, error } = await resend.emails.send({
                from: 'FreelanceOS <onboarding@resend.dev>',
                to: ['freelanceos2025@gmail.com'],
                subject: 'New Order Submission',
                html: `
          <h2>New Order Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Message:</strong> ${message}</p>
        `
            });

            if (error) {
                throw error;
            }

            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ success: true, data: emailData })
            };
        }

        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid email type' })
        };

    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to send email' })
        };
    }
}; 