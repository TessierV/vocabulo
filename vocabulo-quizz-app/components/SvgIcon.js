import React from 'react';
import { SvgXml } from 'react-native-svg';

const SvgIcon = ({ icon, fillColor }) => {
  const svgMarkup = {
    help: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 18.4301H13L8.54999 21.39C7.88999 21.83 7 21.3601 7 20.5601V18.4301C4 18.4301 2 16.4301 2 13.4301V7.42999C2 4.42999 4 2.42999 7 2.42999H17C20 2.42999 22 4.42999 22 7.42999V13.4301C22 16.4301 20 18.4301 17 18.4301Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 11.36V11.15C12 10.47 12.42 10.11 12.84 9.82001C13.25 9.54001 13.66 9.18002 13.66 8.52002C13.66 7.60002 12.92 6.85999 12 6.85999C11.08 6.85999 10.34 7.60002 10.34 8.52002" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.9955 13.75H12.0045" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,

    search: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22 22L20 20" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,

    sort: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 7H21" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M6 12H18" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M10 17H14" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    `,
    close: `
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.68393 8.68213L25.9481 25.3539" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.49614 25.9482L25.1679 8.68408" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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

  return <SvgXml xml={selectedSvg} width="18" height="18" />;
};

export default SvgIcon;