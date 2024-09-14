import React from 'react';
import { SvgXml } from 'react-native-svg';

const svgMarkup = {

  //Parametres | Parameters
  user: (fillColor) => `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M19.2101 15.74L15.67 19.2801C15.53 19.4201 15.4 19.68 15.37 19.87L15.18 21.22C15.11 21.71 15.45 22.05 15.94 21.98L17.29 21.79C17.48 21.76 17.75 21.63 17.88 21.49L21.42 17.95C22.03 17.34 22.32 16.63 21.42 15.73C20.53 14.84 19.8201 15.13 19.2101 15.74Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 21.8101C10.18 21.8101 8.37005 21.3501 6.99005 20.4301C4.57005 18.8101 4.57005 16.1701 6.99005 14.5601C9.74005 12.7201 14.25 12.7201 17 14.5601" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
    `,

  edit: (fillColor) => `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M13.26 3.59997L5.04997 12.29C4.73997 12.62 4.43997 13.27 4.37997 13.72L4.00997 16.96C3.87997 18.13 4.71997 18.93 5.87997 18.73L9.09997 18.18C9.54997 18.1 10.18 17.77 10.49 17.43L18.7 8.73997C20.12 7.23997 20.76 5.52997 18.55 3.43997C16.35 1.36997 14.68 2.09997 13.26 3.59997Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.89 5.05005C12.32 7.81005 14.56 9.92005 17.34 10.2" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3 22H21" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
    `,

  key: (fillColor) => `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.9965 16H16.0054" stroke="${fillColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.9955 16H12.0045" stroke="${fillColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.99451 16H8.00349" stroke="${fillColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
    `,

  sliders: (fillColor) => `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M21.81 3.94012C20.27 7.78012 16.41 13.0001 13.18 15.5901L11.21 17.1701C10.96 17.3501 10.71 17.5101 10.43 17.6201C10.43 17.4401 10.42 17.2401 10.39 17.0501C10.28 16.2101 9.90002 15.4301 9.23002 14.7601C8.55002 14.0801 7.72002 13.6801 6.87002 13.5701C6.67002 13.5601 6.47002 13.5401 6.27002 13.5601C6.38002 13.2501 6.55002 12.9601 6.76002 12.7201L8.32002 10.7501C10.9 7.52012 16.14 3.64012 19.97 2.11012C20.56 1.89012 21.13 2.05012 21.49 2.42012C21.87 2.79012 22.05 3.36012 21.81 3.94012Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10.43 17.6201C10.43 18.7201 10.01 19.77 9.22003 20.57C8.61003 21.18 7.78003 21.6001 6.79003 21.7301L4.33003 22.0001C2.99003 22.1501 1.84003 21.01 2.00003 19.65L2.27003 17.1901C2.51003 15.0001 4.34003 13.6001 6.28003 13.5601C6.48003 13.5501 6.69003 13.56 6.88003 13.57C7.73003 13.68 8.56003 14.0701 9.24003 14.7601C9.91003 15.4301 10.29 16.21 10.4 17.05C10.41 17.24 10.43 17.4301 10.43 17.6201Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.24 14.47C14.24 11.86 12.12 9.73999 9.51001 9.73999" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
    `,

  sun: (fillColor) => `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19.14 19.14L19.01 19.01M19.01 4.99L19.14 4.86L19.01 4.99ZM4.86 19.14L4.99 19.01L4.86 19.14ZM12 2.08V2V2.08ZM12 22V21.92V22ZM2.08 12H2H2.08ZM22 12H21.92H22ZM4.99 4.99L4.86 4.86L4.99 4.99Z" stroke="${fillColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
    `,

  moon: (fillColor) => `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M2.03009 12.42C2.39009 17.57 6.76009 21.76 11.9901 21.99C15.6801 22.15 18.9801 20.43 20.9601 17.72C21.7801 16.61 21.3401 15.87 19.9701 16.12C19.3001 16.24 18.6101 16.29 17.8901 16.26C13.0001 16.06 9.00009 11.97 8.98009 7.13996C8.97009 5.83996 9.24009 4.60996 9.73009 3.48996C10.2701 2.24996 9.62009 1.65996 8.37009 2.18996C4.41009 3.85996 1.70009 7.84996 2.03009 12.42Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
    `,

  paperclip: (fillColor) => `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M12.3299 12.15L9.85993 14.62C8.48993 15.99 8.48993 18.2 9.85993 19.57C11.2299 20.94 13.4399 20.94 14.8099 19.57L18.6999 15.68C21.4299 12.95 21.4299 8.51004 18.6999 5.78004C15.9699 3.05004 11.5299 3.05004 8.79993 5.78004L4.55993 10.02C2.21993 12.36 2.21993 16.16 4.55993 18.51" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
    `,

  faq: (fillColor) => `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M17 18.4301H13L8.54999 21.39C7.88999 21.83 7 21.3601 7 20.5601V18.4301C4 18.4301 2 16.4301 2 13.4301V7.42999C2 4.42999 4 2.42999 7 2.42999H17C20 2.42999 22 4.42999 22 7.42999V13.4301C22 16.4301 20 18.4301 17 18.4301Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 11.36V11.15C12 10.47 12.42 10.11 12.84 9.82001C13.25 9.54001 13.66 9.18002 13.66 8.52002C13.66 7.60002 12.92 6.85999 12 6.85999C11.08 6.85999 10.34 7.60002 10.34 8.52002" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.9955 13.75H12.0045" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
    `,

  send: (fillColor) => `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M22 6.25V11.35C22 12.62 21.58 13.69 20.83 14.43C20.09 15.18 19.02 15.6 17.75 15.6V17.41C17.75 18.09 16.99 18.5 16.43 18.12L15.46 17.48C15.55 17.17 15.59 16.83 15.59 16.47V12.4C15.59 10.36 14.23 9 12.19 9H5.39999C5.25999 9 5.13 9.01002 5 9.02002V6.25C5 3.7 6.7 2 9.25 2H17.75C20.3 2 22 3.7 22 6.25Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.59 12.4V16.47C15.59 16.83 15.55 17.17 15.46 17.48C15.09 18.95 13.87 19.87 12.19 19.87H9.47L6.45 21.88C6 22.19 5.39999 21.86 5.39999 21.32V19.87C4.37999 19.87 3.53 19.53 2.94 18.94C2.34 18.34 2 17.49 2 16.47V12.4C2 10.5 3.18 9.19002 5 9.02002C5.13 9.01002 5.25999 9 5.39999 9H12.19C14.23 9 15.59 10.36 15.59 12.4Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
    `,

  layer: (fillColor) => `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M13.01 2.92007L18.91 5.54007C20.61 6.29007 20.61 7.53007 18.91 8.28007L13.01 10.9001C12.34 11.2001 11.24 11.2001 10.57 10.9001L4.66999 8.28007C2.96999 7.53007 2.96999 6.29007 4.66999 5.54007L10.57 2.92007C11.24 2.62007 12.34 2.62007 13.01 2.92007Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3 11C3 11.84 3.63 12.81 4.4 13.15L11.19 16.17C11.71 16.4 12.3 16.4 12.81 16.17L19.6 13.15C20.37 12.81 21 11.84 21 11" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3 16C3 16.93 3.55 17.77 4.4 18.15L11.19 21.17C11.71 21.4 12.3 21.4 12.81 21.17L19.6 18.15C20.45 17.77 21 16.93 21 16" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
    `,

  logout: (fillColor) => `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M19.5 19H15.5" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.15 10.87C12.05 10.86 11.93 10.86 11.82 10.87C9.44005 10.79 7.55005 8.84 7.55005 6.44C7.55005 3.99 9.53005 2 11.99 2C14.44 2 16.43 3.99 16.43 6.44C16.42 8.84 14.53 10.79 12.15 10.87Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.99 21.8101C10.17 21.8101 8.36004 21.3501 6.98004 20.4301C4.56004 18.8101 4.56004 16.1701 6.98004 14.5601C9.73004 12.7201 14.24 12.7201 16.99 14.5601" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
    `,

  arrowRight: (fillColor) => `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.90991 19.92L15.4299 13.4C16.1999 12.63 16.1999 11.37 15.4299 10.6L8.90991 4.07996" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    `,

    arrowLeft: (fillColor) => `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.0001 19.92L8.48009 13.4C7.71009 12.63 7.71009 11.37 8.48009 10.6L15.0001 4.07996" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    `,



  // clavier || keyboard
  key_delete: (fillColor) => `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M10.28 20.25H17C19.76 20.25 22 18.01 22 15.25V8.75C22 5.99 19.76 3.75 17 3.75H10.28C8.86999 3.75 7.52999 4.34 6.57999 5.39L3.04999 9.27C1.63999 10.82 1.63999 13.18 3.04999 14.73L6.57999 18.61C7.52999 19.66 8.86999 20.25 10.28 20.25Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16 14.47L11.06 9.53003" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M11.06 14.47L16 9.53003" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
    `,

  "eye-off": (fillColor) => `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M14.53 9.46998L9.47004 14.53C8.82004 13.88 8.42004 12.99 8.42004 12C8.42004 10.02 10.02 8.41998 12 8.41998C12.99 8.41998 13.88 8.81998 14.53 9.46998Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17.82 5.76998C16.07 4.44998 14.07 3.72998 12 3.72998C8.46997 3.72998 5.17997 5.80998 2.88997 9.40998C1.98997 10.82 1.98997 13.19 2.88997 14.6C3.67997 15.84 4.59997 16.91 5.59997 17.77" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8.42004 19.53C9.56004 20.01 10.77 20.27 12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39999C20.78 8.87999 20.42 8.38999 20.05 7.92999" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.5099 12.7C15.2499 14.11 14.0999 15.26 12.6899 15.52" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.47 14.53L2 22" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22 2L14.53 9.47" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
    `,

  eye: (fillColor) => `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M15.58 12C15.58 13.98 13.98 15.58 12 15.58C10.02 15.58 8.42004 13.98 8.42004 12C8.42004 10.02 10.02 8.41998 12 8.41998C13.98 8.41998 15.58 10.02 15.58 12Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.46997 3.71997 5.17997 5.79997 2.88997 9.39997C1.98997 10.81 1.98997 13.18 2.88997 14.59C5.17997 18.19 8.46997 20.27 12 20.27Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

    `,

  // Video SVG Interface
  url_def: (fillColor) => `
  <svg
    xmlns="http://www.w3.org/2000/svg" version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 64 64" style="enable-background:new 0 0 512 512" xml:space="preserve">
    <g>
      <path d="M54.172 12.209a6.052 6.052 0 0 0-4.391-1.693c-6.9.229-12.515 1.729-16.7 4.461a1.98 1.98 0 0 1-2.164 0c-4.182-2.731-9.8-4.231-16.7-4.46a6.024 6.024 0 0 0-4.39 1.693A5.948 5.948 0 0 0 8 16.519v26.053a5.957 5.957 0 0 0 5.776 5.991c6.1.2 11.176 1.55 15.091 4.023a5.907 5.907 0 0 0 6.268 0c3.913-2.473 8.99-3.826 15.089-4.023A5.957 5.957 0 0 0 56 42.572V16.519a5.948 5.948 0 0 0-1.828-4.31zM13.905 44.564A2 2 0 0 1 12 42.572V16.519a1.985 1.985 0 0 1 .61-1.436 2.011 2.011 0 0 1 1.408-.57h.068c6.156.2 11.083 1.487 14.644 3.811a5.916 5.916 0 0 0 1.27.613v29.689a34.536 34.536 0 0 0-16.095-4.062zM52 42.572a2 2 0 0 1-1.9 1.992A34.521 34.521 0 0 0 34 48.627V18.938a5.963 5.963 0 0 0 1.27-.613c3.561-2.324 8.488-3.607 14.643-3.811a1.965 1.965 0 0 1 1.477.569 1.985 1.985 0 0 1 .61 1.436z" fill="${fillColor}" opacity="1" data-original="${fillColor}"></path>
    </g>
  </svg>
  `,

  url_sign: (fillColor) => `
  <svg
    xmlns="http://www.w3.org/2000/svg" version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 32 32" style="enable-background:new 0 0 512 512" xml:space="preserve" class="">
    <g>
      <path fill="${fillColor}" d="M13 2c-1.645 0-3 1.355-3 3v11.813l-.656-.688-.25-.219a2.968 2.968 0 0 0-4.188 0 2.968 2.968 0 0 0 0 4.188v.031l8.188 8.094.062.031.031.063a8.307 8.307 0 0 0 5 1.687h1.72a8.17 8.17 0 0 0 8.187-8.188V14c0-1.645-1.356-3-3-3-.426 0-.82.117-1.188.281C23.578 9.981 22.394 9 21 9c-.766 0-1.469.3-2 .781A2.984 2.984 0 0 0 17 9a2.95 2.95 0 0 0-1 .188V5c0-1.645-1.355-3-3-3zm0 2c.555 0 1 .445 1 1v11h2v-4c0-.555.445-1 1-1s1 .445 1 1v4h2v-4c0-.555.445-1 1-1s1 .445 1 1v4h2.094v-2c0-.555.445-1 1-1 .554 0 1 .445 1 1v7.813c0 3.464-2.723 6.187-6.188 6.187h-1.718c-1.465 0-2.731-.523-3.782-1.313l-8.093-8c-.446-.445-.446-.93 0-1.375s.93-.445 1.375 0L12 21.625V5c0-.555.445-1 1-1z" opacity="1" data-original="#000000"></path>
    </g>
  </svg>
  `,

  // IA
  hybrid: (fillColor) => `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 2V5" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16 2V5" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21 8.5V13.63C20.11 12.92 18.98 12.5 17.75 12.5C16.52 12.5 15.37 12.93 14.47 13.66C13.26 14.61 12.5 16.1 12.5 17.75C12.5 18.73 12.78 19.67 13.26 20.45C13.63 21.06 14.11 21.59 14.68 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7 11H13" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7 16H9.62" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M23 17.75C23 18.73 22.72 19.67 22.24 20.45C21.96 20.93 21.61 21.35 21.2 21.69C20.28 22.51 19.08 23 17.75 23C16.6 23 15.54 22.63 14.68 22C14.11 21.59 13.63 21.06 13.26 20.45C12.78 19.67 12.5 18.73 12.5 17.75C12.5 16.1 13.26 14.61 14.47 13.66C15.37 12.93 16.52 12.5 17.75 12.5C18.98 12.5 20.11 12.92 21 13.63C22.22 14.59 23 16.08 23 17.75Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M17.75 20.25C17.75 18.87 18.87 17.75 20.25 17.75C18.87 17.75 17.75 16.63 17.75 15.25C17.75 16.63 16.63 17.75 15.25 17.75C16.63 17.75 17.75 18.87 17.75 20.25Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `,

  calendarMonths: (fillColor) => `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 2V5" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16 2V5" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M3.5 9.08997H20.5" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15.6947 13.7H15.7037" stroke="${fillColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15.6947 16.7H15.7037" stroke="${fillColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.9955 13.7H12.0045" stroke="${fillColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.9955 16.7H12.0045" stroke="${fillColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.29431 13.7H8.30329" stroke="${fillColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.29431 16.7H8.30329" stroke="${fillColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `,

  calendarWeek: (fillColor) => `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 2V5" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16 2V5" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16 3.5C19.33 3.68 21 4.95 21 9.65V15.83C21 19.95 20 22.01 15 22.01H9C4 22.01 3 19.95 3 15.83V9.65C3 4.95 4.67 3.69 8 3.5H16Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M20.75 8.59998H3.25" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10.4221 19C10.3282 19 10.2328 18.9832 10.1413 18.9478C9.78824 18.8111 9.6278 18.4481 9.78304 18.137L12.2316 13.2304H9.69842C9.3127 13.2304 9 12.955 9 12.6152C9 12.2754 9.3127 12 9.69842 12H13.3016C13.5375 12 13.7574 12.1049 13.8864 12.2789C14.0154 12.4529 14.0359 12.6725 13.941 12.8628L11.0618 18.6322C10.9468 18.8627 10.6907 19 10.4221 19Z" fill="${fillColor}"/>
  </svg>
  `,


  // Footer Congratulation Modal
  game: (fillColor) => `
  <svg width="82" height="79" viewBox="0 0 82 79" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M6.99042 9.75854C6.99042 9.75854 6.26911 18.0442 0.197266 19.2645C0.197266 19.2645 5.51454 21.6209 6.99042 27.5724C6.99042 27.5724 7.68431 21.0306 12.8998 19.4894C12.8998 19.4894 7.0511 17.4015 6.99042 9.75854Z" fill="white"/>
    <path d="M16.0129 0.888428C16.0129 0.888428 15.5255 6.48131 11.4268 7.30522C11.4268 7.30522 15.0156 8.89584 16.0129 12.9136C16.0129 12.9136 16.4817 8.49746 20.0021 7.4574C20.0021 7.4574 16.054 6.04803 16.0129 0.888428Z" fill="white"/>
    <path d="M81.0531 67.9761C80.8466 65.5547 80.1018 62.8843 78.8412 60.0394C78.7669 59.8717 78.5799 59.7835 78.4008 59.832C78.2227 59.8804 78.1072 60.052 78.1297 60.2333C78.1376 60.2934 78.851 66.2284 76.5619 68.0371C75.7985 68.64 74.7415 68.705 73.4222 68.23C73.4193 68.2291 73.4163 68.229 73.4134 68.2281C73.0992 66.589 72.0383 64.3838 68.8526 62.7922C68.8497 62.7903 68.8458 62.7893 68.8429 62.7874C68.7959 62.7651 67.6674 62.2484 66.1602 62.0691C64.1304 61.8268 62.3874 62.3211 61.1219 63.4998C61.0622 63.5551 61.027 63.6249 61.0123 63.6985C60.6629 63.5619 60.2841 63.4872 59.9269 63.4174C59.3309 63.3011 58.7681 63.1916 58.3727 62.8436C57.715 62.2669 57.4576 60.1867 57.532 58.9693C57.58 58.1813 58.1144 57.463 58.6566 56.7951C59.3759 55.9102 60.1217 55.0504 60.843 54.2187C62.9129 51.8333 64.8674 49.5806 66.3305 46.6873C68.6657 42.0695 69.4643 37.4372 68.8429 32.108C68.5894 29.9338 67.8211 27.4931 66.5586 24.8537C63.46 18.3739 57.8481 13.6272 51.1617 11.8311C46.9112 10.6893 42.3093 10.2967 37.8523 10.696C33.1693 11.1158 28.7397 12.4136 25.0441 14.4482C19.8707 17.297 15.9921 22.0059 14.1208 27.7064C12.6479 32.1933 12.3357 37.0989 13.24 41.5199C14.6151 48.2362 17.7587 51.4417 20.0547 53.7826C21.0755 54.8226 21.8868 55.6504 22.29 56.5218C22.3263 58.2501 22.0845 62.6536 20.5724 63.9244C20.5617 63.9108 20.5519 63.8982 20.5392 63.8856C19.2933 62.706 17.5786 62.2106 15.5801 62.453C14.0974 62.6333 12.9875 63.1509 12.9405 63.1722C12.9376 63.1741 12.9337 63.1751 12.9307 63.177C10.0925 64.6203 8.99638 66.6568 8.60196 68.293C7.37076 68.6943 6.37836 68.609 5.65216 68.0352C3.36201 66.2265 4.07646 60.2914 4.08429 60.2313C4.1068 60.0491 3.99131 59.8785 3.81319 59.83C3.63408 59.7816 3.44715 59.8698 3.37277 60.0375C2.11123 62.8833 1.36742 65.5528 1.16091 67.9741C0.994532 69.9282 1.17559 71.7263 1.69822 73.3198C2.5996 76.0649 4.19781 77.2416 4.26437 77.2891C5.6962 78.3302 7.084 78.6985 8.33184 78.6985C9.57968 78.6985 10.6651 78.3369 11.5322 77.9095C12.8544 77.2562 13.8321 76.3693 14.3039 75.8914C14.8647 76.7415 15.5488 77.452 16.3053 77.9095C17.4807 78.62 18.891 78.9835 20.408 78.9835C21.1254 78.9835 21.8663 78.9021 22.6169 78.7382C23.7415 78.492 25.142 78.0665 26.0071 76.9528C26.2616 76.6252 26.3614 76.3014 26.4143 75.9941C27.3617 77.072 28.7172 77.9163 30.2371 78.3176C30.7822 78.462 31.5035 78.589 32.353 78.589C34.1118 78.589 36.4146 78.0432 38.8242 75.9709C38.9945 75.8468 40.2081 74.9085 40.8853 72.9244C41.5626 74.9085 42.7762 75.8468 42.9465 75.9709C45.356 78.0432 47.6589 78.589 49.4176 78.589C50.2662 78.589 50.9884 78.462 51.5326 78.3176C53.0604 77.9134 54.4217 77.0633 55.3701 75.9777C55.3818 76.0571 55.3936 76.124 55.4034 76.1599C55.5228 76.6077 55.7978 77.0371 56.1971 77.4035C57.0642 78.1983 58.178 78.524 59.1537 78.7373C59.9044 78.9021 60.6453 78.9825 61.3627 78.9825C62.8796 78.9825 64.2899 78.619 65.4654 77.9085C66.3041 77.4016 67.0538 76.5835 67.6449 75.6093C67.8876 75.8827 69.0092 77.0827 70.6809 77.9075C71.548 78.336 72.6461 78.6975 73.8822 78.6975C75.1183 78.6975 76.5178 78.3292 77.9487 77.2882C78.0162 77.2397 79.6134 76.062 80.5158 73.3179C81.0394 71.7253 81.2205 69.9263 81.0531 67.9722V67.9761Z" fill="${fillColor}"/>
    <path d="M50.3647 53.5479C53.6846 53.5479 56.3759 50.8824 56.3759 47.5944C56.3759 44.3064 53.6846 41.6409 50.3647 41.6409C47.0448 41.6409 44.3535 44.3064 44.3535 47.5944C44.3535 50.8824 47.0448 53.5479 50.3647 53.5479Z" fill="${fillColor}"/>
    <path d="M49.7849 51.8837C51.8107 51.8837 53.453 50.2572 53.453 48.2507C53.453 46.2443 51.8107 44.6178 49.7849 44.6178C47.759 44.6178 46.1167 46.2443 46.1167 48.2507C46.1167 50.2572 47.759 51.8837 49.7849 51.8837Z" fill="${fillColor}"/>
    <path d="M31.8491 53.5479C35.1689 53.5479 37.8602 50.8824 37.8602 47.5944C37.8602 44.3064 35.1689 41.6409 31.8491 41.6409C28.5292 41.6409 25.8379 44.3064 25.8379 47.5944C25.8379 50.8824 28.5292 53.5479 31.8491 53.5479Z" fill="${fillColor}"/>
    <path d="M31.2692 51.8837C33.2951 51.8837 34.9374 50.2572 34.9374 48.2507C34.9374 46.2443 33.2951 44.6178 31.2692 44.6178C29.2434 44.6178 27.6011 46.2443 27.6011 48.2507C27.6011 50.2572 29.2434 51.8837 31.2692 51.8837Z" fill="${fillColor}"/>
  </svg>
    `,

  refresh: (fillColor) => `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M14.8901 5.08002C14.0201 4.82002 13.0601 4.65002 12.0001 4.65002C7.21008 4.65002 3.33008 8.53002 3.33008 13.32C3.33008 18.12 7.21008 22 12.0001 22C16.7901 22 20.6701 18.12 20.6701 13.33C20.6701 11.55 20.1301 9.89002 19.2101 8.51002" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16.13 5.32L13.24 2" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16.13 5.31995L12.76 7.77995" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
    `,

  dictionary: (fillColor) => `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M22 16.7399V4.66994C22 3.46994 21.02 2.57994 19.83 2.67994H19.77C17.67 2.85994 14.48 3.92994 12.7 5.04994L12.53 5.15994C12.24 5.33994 11.76 5.33994 11.47 5.15994L11.22 5.00994C9.44 3.89994 6.26 2.83994 4.16 2.66994C2.97 2.56994 2 3.46994 2 4.65994V16.7399C2 17.6999 2.78 18.5999 3.74 18.7199L4.03 18.7599C6.2 19.0499 9.55 20.1499 11.47 21.1999L11.51 21.2199C11.78 21.3699 12.21 21.3699 12.47 21.2199C14.39 20.1599 17.75 19.0499 19.93 18.7599L20.26 18.7199C21.22 18.5999 22 17.6999 22 16.7399Z" fill="${fillColor}" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 5.48999V20.49" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.75 8.48999H5.5" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8.5 11.49H5.5" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
    `,


  default: (fillColor) => `
  <svg width="41" height="40" viewBox="0 0 41 40" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_337_1819)">
      <path d="M40.9698 34.3612C40.8651 33.121 40.4877 31.7533 39.849 30.2961C39.8113 30.2103 39.7166 30.1651 39.6259 30.1899C39.5356 30.2147 39.4771 30.3026 39.4885 30.3954C39.4925 30.4262 39.854 33.4661 38.6941 34.3925C38.3072 34.7013 37.7717 34.7345 37.1032 34.4912C37.1017 34.4908 37.1002 34.4908 37.0987 34.4903C36.9395 33.6507 36.402 32.5213 34.7878 31.7061C34.7863 31.7051 34.7843 31.7046 34.7828 31.7036C34.759 31.6922 34.1873 31.4276 33.4236 31.3357C32.3951 31.2116 31.5118 31.4648 30.8706 32.0685C30.8404 32.0968 30.8225 32.1326 30.8151 32.1703C30.6381 32.1003 30.4461 32.0621 30.2651 32.0263C29.9631 31.9667 29.678 31.9106 29.4776 31.7324C29.1444 31.437 29.014 30.3716 29.0517 29.748C29.076 29.3444 29.3467 28.9765 29.6215 28.6345C29.9859 28.1812 30.3638 27.7408 30.7293 27.3149C31.7781 26.0931 32.7685 24.9393 33.5099 23.4574C34.6931 21.0922 35.0977 18.7196 34.7828 15.9901C34.6544 14.8765 34.2651 13.6264 33.6254 12.2745C32.0554 8.95569 29.2118 6.52451 25.8238 5.60457C23.6701 5.01973 21.3383 4.81867 19.08 5.02321C16.7071 5.23818 14.4626 5.90294 12.5901 6.94502C9.96871 8.40412 8.00344 10.8159 7.05526 13.7356C6.30893 16.0338 6.15073 18.5464 6.60895 20.8107C7.3057 24.2507 8.89854 25.8925 10.0619 27.0915C10.5792 27.6242 10.9903 28.0482 11.1946 28.4945C11.2129 29.3797 11.0904 31.6351 10.3243 32.286C10.3188 32.279 10.3139 32.2726 10.3074 32.2661C9.67613 31.6619 8.8073 31.4082 7.79466 31.5323C7.04336 31.6247 6.48101 31.8898 6.4572 31.9007C6.45571 31.9017 6.45373 31.9022 6.45224 31.9032C5.01412 32.6424 4.4587 33.6855 4.25885 34.5235C3.635 34.7291 3.13215 34.6854 2.76419 34.3915C1.60377 33.4651 1.96578 30.4252 1.96975 30.3944C1.98116 30.3011 1.92264 30.2137 1.83238 30.1889C1.74163 30.1641 1.64692 30.2093 1.60923 30.2951C0.970004 31.7528 0.593116 33.12 0.48848 34.3602C0.404176 35.3611 0.495918 36.282 0.760732 37.0982C1.21746 38.5042 2.02728 39.1069 2.061 39.1312C2.78651 39.6644 3.4897 39.853 4.12198 39.853C4.75426 39.853 5.30422 39.6679 5.74359 39.4489C6.41356 39.1143 6.90897 38.66 7.148 38.4153C7.43215 38.8507 7.77879 39.2146 8.16212 39.4489C8.75771 39.8128 9.47231 39.999 10.241 39.999C10.6045 39.999 10.9799 39.9573 11.3602 39.8734C11.93 39.7473 12.6397 39.5294 13.078 38.9589C13.207 38.7911 13.2576 38.6253 13.2843 38.4679C13.7644 39.02 14.4512 39.4524 15.2213 39.6579C15.4976 39.7319 15.863 39.7969 16.2935 39.7969C17.1846 39.7969 18.3515 39.5174 19.5724 38.456C19.6587 38.3925 20.2736 37.9119 20.6168 36.8956C20.96 37.9119 21.5749 38.3925 21.6612 38.456C22.8821 39.5174 24.049 39.7969 24.9401 39.7969C25.3701 39.7969 25.736 39.7319 26.0118 39.6579C26.7859 39.4509 27.4757 39.0155 27.9562 38.4595C27.9622 38.5002 27.9681 38.5344 27.9731 38.5528C28.0336 38.7822 28.1729 39.0021 28.3752 39.1898C28.8146 39.5969 29.379 39.7637 29.8734 39.8729C30.2537 39.9573 30.6291 39.9985 30.9926 39.9985C31.7613 39.9985 32.4759 39.8123 33.0715 39.4484C33.4965 39.1888 33.8763 38.7698 34.1759 38.2708C34.2988 38.4108 34.8671 39.0254 35.7142 39.4479C36.1535 39.6674 36.7099 39.8526 37.3363 39.8526C37.9626 39.8526 38.6717 39.6639 39.3968 39.1307C39.431 39.1059 40.2403 38.5027 40.6975 37.0972C40.9628 36.2815 41.0546 35.3601 40.9698 34.3592V34.3612Z" fill="${fillColor}"/>
      <path d="M25.1261 26.1189C26.1526 26.1189 26.9847 25.2858 26.9847 24.2581C26.9847 23.2305 26.1526 22.3974 25.1261 22.3974C24.0996 22.3974 23.2674 23.2305 23.2674 24.2581C23.2674 25.2858 24.0996 26.1189 25.1261 26.1189Z" fill="${fillColor}"/>
      <path d="M15.7445 26.1189C16.771 26.1189 17.6032 25.2858 17.6032 24.2581C17.6032 23.2305 16.771 22.3974 15.7445 22.3974C14.718 22.3974 13.8859 23.2305 13.8859 24.2581C13.8859 25.2858 14.718 26.1189 15.7445 26.1189Z" fill="${fillColor}"/>
    </g>
    <defs>
      <clipPath id="clip0_337_1819">
        <rect width="41" height="40" fill="white"/>
      </clipPath>
    </defs>
  </svg>
  `,
};

const InterfaceSvg = ({ iconName, fillColor = 'black', width = 24, height = 24 }) => {
  const svgContent = svgMarkup[iconName]
    ? svgMarkup[iconName](fillColor)
    : svgMarkup.default(fillColor);

  return <SvgXml xml={svgContent} width={width} height={height} />;
};

export default InterfaceSvg;
