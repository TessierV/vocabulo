import React from 'react';
import { SvgXml } from 'react-native-svg';

const HeaderSvg = ({ icon, fillColor }) => {
  const svgMarkup = {
    settings: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2 12.8799V11.1199C2 10.0799 2.85 9.21994 3.9 9.21994C5.71 9.21994 6.45 7.93994 5.54 6.36994C5.02 5.46994 5.33 4.29994 6.24 3.77994L7.97 2.78994C8.76 2.31994 9.78 2.59994 10.25 3.38994L10.36 3.57994C11.26 5.14994 12.74 5.14994 13.65 3.57994L13.76 3.38994C14.23 2.59994 15.25 2.31994 16.04 2.78994L17.77 3.77994C18.68 4.29994 18.99 5.46994 18.47 6.36994C17.56 7.93994 18.3 9.21994 20.11 9.21994C21.15 9.21994 22.01 10.0699 22.01 11.1199V12.8799C22.01 13.9199 21.16 14.7799 20.11 14.7799C18.3 14.7799 17.56 16.0599 18.47 17.6299C18.99 18.5399 18.68 19.6999 17.77 20.2199L16.04 21.2099C15.25 21.6799 14.23 21.3999 13.76 20.6099L13.65 20.4199C12.75 18.8499 11.27 18.8499 10.36 20.4199L10.25 20.6099C9.78 21.3999 8.76 21.6799 7.97 21.2099L6.24 20.2199C5.33 19.6999 5.02 18.5299 5.54 17.6299C6.45 16.0599 5.71 14.7799 3.9 14.7799C2.85 14.7799 2 13.9199 2 12.8799Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    `,
    arrowLeft: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.0001 19.92L8.48009 13.4C7.71009 12.63 7.71009 11.37 8.48009 10.6L15.0001 4.07996" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    `,
    default: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.37 20.1C2.43 18.97 2 17.31 2 15V9C2 4 4 2 9 2H15C17.19 2 18.8 2.38 19.92 3.23" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M21.97 7.98999C21.99 8.30999 22 8.64999 22 8.99999V15C22 20 20 22 15 22H8.99996C8.25996 22 7.57996 21.96 6.95996 21.86" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22 2L2 22" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.4299 16.45C11.7299 16.75 12.2199 16.75 12.5199 16.45L17.5499 11.41C18.3299 10.63 19.5899 10.63 20.3699 11.41L21.9999 13.05" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,
  };

  const selectedSvg = svgMarkup[icon] || svgMarkup['default'];

  return <SvgXml xml={selectedSvg} width="24" height="24"  />;
};

export default HeaderSvg;
