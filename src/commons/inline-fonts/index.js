import React from 'react';

const InlineFonts = () => {
  const html = `
    @font-face {
      font-family: 'OpenSans';
      src: url('/static/fonts/OpenSans-Light.eot'); /* IE9 Compat Modes */
      src: url('/static/fonts/OpenSans-Light.eot?#iefix') format('embedded-opentype'),
        /* IE6-IE8 */ url('/static/fonts/OpenSans-Light.otf') format('opentype'),
        /* Open Type Font */ url('/static/fonts/OpenSans-Light.svg') format('svg'),
        /* Legacy iOS */ url('/static/fonts/OpenSans-Light.ttf') format('truetype'),
        /* Safari, Android, iOS */ url('/static/fonts/OpenSans-Light.woff') format('woff'),
        /* Modern Browsers */ url('/static/fonts/OpenSans-Light.woff2') format('woff2'); /* Modern Browsers */
      font-weight: 300;
      font-style: normal;
      font-display: swap;
    }
    
    @font-face {
      font-family: 'OpenSans';
      src: url('/static/fonts/OpenSans-Regular.eot'); /* IE9 Compat Modes */
      src: url('/static/fonts/OpenSans-Regular.eot?#iefix') format('embedded-opentype'),
        /* IE6-IE8 */ url('/static/fonts/OpenSans-Regular.otf') format('opentype'),
        /* Open Type Font */ url('/static/fonts/OpenSans-Regular.svg') format('svg'),
        /* Legacy iOS */ url('/static/fonts/OpenSans-Regular.ttf') format('truetype'),
        /* Safari, Android, iOS */ url('/static/fonts/OpenSans-Regular.woff') format('woff'),
        /* Modern Browsers */ url('/static/fonts/OpenSans-Regular.woff2') format('woff2'); /* Modern Browsers */
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }
    
    @font-face {
      font-family: 'OpenSans';
      src: url('/static/fonts/OpenSans-SemiBold.eot'); /* IE9 Compat Modes */
      src: url('/static/fonts/OpenSans-SemiBold.eot?#iefix') format('embedded-opentype'),
        /* IE6-IE8 */ url('/static/fonts/OpenSans-SemiBold.otf') format('opentype'),
        /* Open Type Font */ url('/static/fonts/OpenSans-SemiBold.svg') format('svg'),
        /* Legacy iOS */ url('/static/fonts/OpenSans-SemiBold.ttf') format('truetype'),
        /* Safari, Android, iOS */ url('/static/fonts/OpenSans-SemiBold.woff') format('woff'),
        /* Modern Browsers */ url('/static/fonts/OpenSans-SemiBold.woff2') format('woff2'); /* Modern Browsers */
      font-weight: 600;
      font-style: normal;
      font-display: swap;
    }
    
    @font-face {
      font-family: 'OpenSans';
      src: url('/static/fonts/OpenSans-Bold.eot'); /* IE9 Compat Modes */
      src: url('/static/fonts/OpenSans-Bold.eot?#iefix') format('embedded-opentype'),
        /* IE6-IE8 */ url('/static/fonts/OpenSans-Bold.otf') format('opentype'),
        /* Open Type Font */ url('/static/fonts/OpenSans-Bold.svg') format('svg'),
        /* Legacy iOS */ url('/static/fonts/OpenSans-Bold.ttf') format('truetype'),
        /* Safari, Android, iOS */ url('/static/fonts/OpenSans-Bold.woff') format('woff'),
        /* Modern Browsers */ url('/static/fonts/OpenSans-Bold.woff2') format('woff2'); /* Modern Browsers */
      font-weight: bold;
      font-style: normal;
      font-display: swap;
    }
  `;

  // eslint-disable-next-line react/jsx-filename-extension
  return <style dangerouslySetInnerHTML={{ __html: html }} />;
};

export default InlineFonts;
