import ReactPixel from 'react-facebook-pixel';

export const PIXEL_ID = '708580685303880';

let initialized = false;

export const initFacebookPixel = () => {
    if (initialized) return;

    const advancedMatching = {}; // Optional advanced matching data
    const options = {
        autoConfig: true, // set pixel's autoConfig.
        debug: process.env.NODE_ENV === 'development', // enable logs in dev
    };

    ReactPixel.init(PIXEL_ID, advancedMatching, options);
    ReactPixel.pageView();

    initialized = true;
    console.log('Facebook Pixel initialized');
};
