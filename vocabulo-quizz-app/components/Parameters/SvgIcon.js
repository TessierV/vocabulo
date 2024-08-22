import React from 'react';
import { SvgXml } from 'react-native-svg';

const ParameterSvg = ({ icon, fillColor }) => {
  const svgMarkup = {
    user: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.2101 15.74L15.67 19.2801C15.53 19.4201 15.4 19.68 15.37 19.87L15.18 21.22C15.11 21.71 15.45 22.05 15.94 21.98L17.29 21.79C17.48 21.76 17.75 21.63 17.88 21.49L21.42 17.95C22.03 17.34 22.32 16.63 21.42 15.73C20.53 14.84 19.8201 15.13 19.2101 15.74Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 21.8101C10.18 21.8101 8.37005 21.3501 6.99005 20.4301C4.57005 18.8101 4.57005 16.1701 6.99005 14.5601C9.74005 12.7201 14.25 12.7201 17 14.5601" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,

    edit: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.26 3.59997L5.04997 12.29C4.73997 12.62 4.43997 13.27 4.37997 13.72L4.00997 16.96C3.87997 18.13 4.71997 18.93 5.87997 18.73L9.09997 18.18C9.54997 18.1 10.18 17.77 10.49 17.43L18.7 8.73997C20.12 7.23997 20.76 5.52997 18.55 3.43997C16.35 1.36997 14.68 2.09997 13.26 3.59997Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.89 5.05005C12.32 7.81005 14.56 9.92005 17.34 10.2" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 22H21" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,

    key: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15.9965 16H16.0054" stroke="${fillColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.9955 16H12.0045" stroke="${fillColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7.99451 16H8.00349" stroke="${fillColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,



    sliders: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.81 3.94012C20.27 7.78012 16.41 13.0001 13.18 15.5901L11.21 17.1701C10.96 17.3501 10.71 17.5101 10.43 17.6201C10.43 17.4401 10.42 17.2401 10.39 17.0501C10.28 16.2101 9.90002 15.4301 9.23002 14.7601C8.55002 14.0801 7.72002 13.6801 6.87002 13.5701C6.67002 13.5601 6.47002 13.5401 6.27002 13.5601C6.38002 13.2501 6.55002 12.9601 6.76002 12.7201L8.32002 10.7501C10.9 7.52012 16.14 3.64012 19.97 2.11012C20.56 1.89012 21.13 2.05012 21.49 2.42012C21.87 2.79012 22.05 3.36012 21.81 3.94012Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.43 17.6201C10.43 18.7201 10.01 19.77 9.22003 20.57C8.61003 21.18 7.78003 21.6001 6.79003 21.7301L4.33003 22.0001C2.99003 22.1501 1.84003 21.01 2.00003 19.65L2.27003 17.1901C2.51003 15.0001 4.34003 13.6001 6.28003 13.5601C6.48003 13.5501 6.69003 13.56 6.88003 13.57C7.73003 13.68 8.56003 14.0701 9.24003 14.7601C9.91003 15.4301 10.29 16.21 10.4 17.05C10.41 17.24 10.43 17.4301 10.43 17.6201Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14.24 14.47C14.24 11.86 12.12 9.73999 9.51001 9.73999" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

    `,

    sun: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M19.14 19.14L19.01 19.01M19.01 4.99L19.14 4.86L19.01 4.99ZM4.86 19.14L4.99 19.01L4.86 19.14ZM12 2.08V2V2.08ZM12 22V21.92V22ZM2.08 12H2H2.08ZM22 12H21.92H22ZM4.99 4.99L4.86 4.86L4.99 4.99Z" stroke="${fillColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,

    moon: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.03009 12.42C2.39009 17.57 6.76009 21.76 11.9901 21.99C15.6801 22.15 18.9801 20.43 20.9601 17.72C21.7801 16.61 21.3401 15.87 19.9701 16.12C19.3001 16.24 18.6101 16.29 17.8901 16.26C13.0001 16.06 9.00009 11.97 8.98009 7.13996C8.97009 5.83996 9.24009 4.60996 9.73009 3.48996C10.2701 2.24996 9.62009 1.65996 8.37009 2.18996C4.41009 3.85996 1.70009 7.84996 2.03009 12.42Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,

    paperclip: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.3299 12.15L9.85993 14.62C8.48993 15.99 8.48993 18.2 9.85993 19.57C11.2299 20.94 13.4399 20.94 14.8099 19.57L18.6999 15.68C21.4299 12.95 21.4299 8.51004 18.6999 5.78004C15.9699 3.05004 11.5299 3.05004 8.79993 5.78004L4.55993 10.02C2.21993 12.36 2.21993 16.16 4.55993 18.51" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,

    faq: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 18.4301H13L8.54999 21.39C7.88999 21.83 7 21.3601 7 20.5601V18.4301C4 18.4301 2 16.4301 2 13.4301V7.42999C2 4.42999 4 2.42999 7 2.42999H17C20 2.42999 22 4.42999 22 7.42999V13.4301C22 16.4301 20 18.4301 17 18.4301Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 11.36V11.15C12 10.47 12.42 10.11 12.84 9.82001C13.25 9.54001 13.66 9.18002 13.66 8.52002C13.66 7.60002 12.92 6.85999 12 6.85999C11.08 6.85999 10.34 7.60002 10.34 8.52002" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.9955 13.75H12.0045" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,

    send: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 6.25V11.35C22 12.62 21.58 13.69 20.83 14.43C20.09 15.18 19.02 15.6 17.75 15.6V17.41C17.75 18.09 16.99 18.5 16.43 18.12L15.46 17.48C15.55 17.17 15.59 16.83 15.59 16.47V12.4C15.59 10.36 14.23 9 12.19 9H5.39999C5.25999 9 5.13 9.01002 5 9.02002V6.25C5 3.7 6.7 2 9.25 2H17.75C20.3 2 22 3.7 22 6.25Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15.59 12.4V16.47C15.59 16.83 15.55 17.17 15.46 17.48C15.09 18.95 13.87 19.87 12.19 19.87H9.47L6.45 21.88C6 22.19 5.39999 21.86 5.39999 21.32V19.87C4.37999 19.87 3.53 19.53 2.94 18.94C2.34 18.34 2 17.49 2 16.47V12.4C2 10.5 3.18 9.19002 5 9.02002C5.13 9.01002 5.25999 9 5.39999 9H12.19C14.23 9 15.59 10.36 15.59 12.4Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,

    layer: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.01 2.92007L18.91 5.54007C20.61 6.29007 20.61 7.53007 18.91 8.28007L13.01 10.9001C12.34 11.2001 11.24 11.2001 10.57 10.9001L4.66999 8.28007C2.96999 7.53007 2.96999 6.29007 4.66999 5.54007L10.57 2.92007C11.24 2.62007 12.34 2.62007 13.01 2.92007Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 11C3 11.84 3.63 12.81 4.4 13.15L11.19 16.17C11.71 16.4 12.3 16.4 12.81 16.17L19.6 13.15C20.37 12.81 21 11.84 21 11" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 16C3 16.93 3.55 17.77 4.4 18.15L11.19 21.17C11.71 21.4 12.3 21.4 12.81 21.17L19.6 18.15C20.45 17.77 21 16.93 21 16" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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

    arrowRight: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.90991 19.92L15.4299 13.4C16.1999 12.63 16.1999 11.37 15.4299 10.6L8.90991 4.07996" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,


  };

  const selectedSvg = svgMarkup[icon] || svgMarkup['default'];

  return <SvgXml xml={selectedSvg} width="18" height="18" />;
};

export default ParameterSvg;