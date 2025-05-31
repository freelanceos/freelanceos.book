import { supabase } from './supabase';

export const sendContactEmail = async (data: {
    name: string;
    email: string;
    phone: string;
    message: string;
    timestamp: string;
}) => {
    try {
        const { data: result, error } = await supabase.functions.invoke('send-email', {
            body: {
                type: 'contact',
                data
            }
        });

        if (error) {
            throw error;
        }

        return result;
    } catch (error) {
        console.error('Resend Error:', error);
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
        const { data: result, error } = await supabase.functions.invoke('send-email', {
            body: {
                type: 'order',
                data
            }
        });

        if (error) {
            throw error;
        }

        return result;
    } catch (error) {
        console.error('Resend Error:', error);
        throw error;
    }
}; 