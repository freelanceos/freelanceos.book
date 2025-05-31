const API_URL = import.meta.env.VITE_NETLIFY_URL || '';

export async function sendContactEmail(data: {
    name: string;
    email: string;
    message: string;
}) {
    try {
        const response = await fetch(`${API_URL}/.netlify/functions/sendEmail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'contact',
                data,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to send email');
        }

        return await response.json();
    } catch (error) {
        console.error('Error sending contact email:', error);
        throw error;
    }
}

export async function sendOrderEmail(data: {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
}) {
    try {
        const response = await fetch(`${API_URL}/.netlify/functions/sendEmail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'order',
                data,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to send email');
        }

        return await response.json();
    } catch (error) {
        console.error('Error sending order email:', error);
        throw error;
    }
} 