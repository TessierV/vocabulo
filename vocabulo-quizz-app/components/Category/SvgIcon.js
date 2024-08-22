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

    random: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.11 13.6501L13.69 10.0601" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,

    custom: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 20.4999C4.33 21.3299 5.67 21.3299 6.5 20.4999L19.5 7.49994C20.33 6.66994 20.33 5.32994 19.5 4.49994C18.67 3.66994 17.33 3.66994 16.5 4.49994L3.5 17.4999C2.67 18.3299 2.67 19.6699 3.5 20.4999Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18.01 8.98999L15.01 5.98999" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9.24282 2.74371L10.6212 3.48097L9.2562 4.24271L8.51893 5.62113L7.75719 4.25609L6.37877 3.51882L7.74382 2.75708L8.48108 1.37866L9.24282 2.74371Z" stroke="${fillColor}" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M5.24421 8.74507L6.6213 9.48482L5.25489 10.2441L4.51515 11.6212L3.75586 10.2548L2.37877 9.51504L3.74518 8.75575L4.48492 7.37866L5.24421 8.74507Z" stroke="${fillColor}" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M20.2857 13.7886L21.6187 14.6052L20.2115 15.2858L19.3949 16.6188L18.7142 15.2115L17.3813 14.395L18.7885 13.7143L19.6051 12.3813L20.2857 13.7886Z" stroke="${fillColor}" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,

    category: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 19.77V15.73C2 14.14 2.64 13.5 4.23 13.5H8.27C9.86 13.5 10.5 14.14 10.5 15.73V19.77C10.5 21.36 9.86 22 8.27 22H4.23C2.64 22 2 21.36 2 19.77Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M13.5 8.52V3.98C13.5 2.57 14.14 2 15.73 2H19.77C21.36 2 22 2.57 22 3.98V8.51C22 9.93 21.36 10.49 19.77 10.49H15.73C14.14 10.5 13.5 9.93 13.5 8.52Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 8.98528 8.98528 11 6.5 11Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14.9752 22H20.5248C21.6433 22 22.3562 20.7248 21.8154 19.6784L20.3835 16.9056L19.0437 14.3093C18.4844 13.2302 17.0217 13.2302 16.4625 14.3093L15.1165 16.9056L14.4712 18.1546L13.6846 19.6784C13.1438 20.7248 13.8567 22 14.9752 22Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,

    dictionary: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 16.7399V4.66994C22 3.46994 21.02 2.57994 19.83 2.67994H19.77C17.67 2.85994 14.48 3.92994 12.7 5.04994L12.53 5.15994C12.24 5.33994 11.76 5.33994 11.47 5.15994L11.22 5.00994C9.44 3.89994 6.26 2.83994 4.16 2.66994C2.97 2.56994 2 3.46994 2 4.65994V16.7399C2 17.6999 2.78 18.5999 3.74 18.7199L4.03 18.7599C6.2 19.0499 9.55 20.1499 11.47 21.1999L11.51 21.2199C11.78 21.3699 12.21 21.3699 12.47 21.2199C14.39 20.1599 17.75 19.0499 19.93 18.7599L20.26 18.7199C21.22 18.5999 22 17.6999 22 16.7399Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 5.48999V20.49" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7.75 8.48999H5.5" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.5 11.49H5.5" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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

  return <SvgXml xml={selectedSvg} width="35" height="35" />;
};

export default SvgIcon;