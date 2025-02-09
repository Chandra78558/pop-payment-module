// Production credentials should be loaded from environment variables
export const CCAVENUE_CONFIG = {
    MERCHANT_ID: process.env.REACT_APP_CCAVENUE_MERCHANT_ID || '4123834',
    ACCESS_CODE: process.env.REACT_APP_CCAVENUE_ACCESS_CODE || 'AVKC52MB23AM06CKMA',
    WORKING_KEY: process.env.REACT_APP_CCAVENUE_WORKING_KEY || 'C81CA24D831C080635E4921231C597CB',
    SUPPORTED_CARDS: {
        VISA: 'visa',
        MASTERCARD: 'mastercard',
        RUPAY: 'rupay',
        AMEX: 'amex'
    }
};