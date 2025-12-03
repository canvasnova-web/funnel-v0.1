import ReactPixel from 'react-facebook-pixel';

export const PIXEL_ID = '1237712248169466';

let initialized = false;

export const initFacebookPixel = () => {
    if (initialized) return;

    const options = {
        autoConfig: true, // set pixel's autoConfig.
        debug: process.env.NODE_ENV === 'development', // enable logs in dev
    };

    ReactPixel.init(PIXEL_ID, undefined, options);
    ReactPixel.pageView();

    initialized = true;
    console.log('Facebook Pixel initialized');
};
