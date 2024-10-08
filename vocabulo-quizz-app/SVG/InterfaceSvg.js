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

  settings: (fillColor) => `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2 12.8799V11.1199C2 10.0799 2.85 9.21994 3.9 9.21994C5.71 9.21994 6.45 7.93994 5.54 6.36994C5.02 5.46994 5.33 4.29994 6.24 3.77994L7.97 2.78994C8.76 2.31994 9.78 2.59994 10.25 3.38994L10.36 3.57994C11.26 5.14994 12.74 5.14994 13.65 3.57994L13.76 3.38994C14.23 2.59994 15.25 2.31994 16.04 2.78994L17.77 3.77994C18.68 4.29994 18.99 5.46994 18.47 6.36994C17.56 7.93994 18.3 9.21994 20.11 9.21994C21.15 9.21994 22.01 10.0699 22.01 11.1199V12.8799C22.01 13.9199 21.16 14.7799 20.11 14.7799C18.3 14.7799 17.56 16.0599 18.47 17.6299C18.99 18.5399 18.68 19.6999 17.77 20.2199L16.04 21.2099C15.25 21.6799 14.23 21.3999 13.76 20.6099L13.65 20.4199C12.75 18.8499 11.27 18.8499 10.36 20.4199L10.25 20.6099C9.78 21.3999 8.76 21.6799 7.97 21.2099L6.24 20.2199C5.33 19.6999 5.02 18.5299 5.54 17.6299C6.45 16.0599 5.71 14.7799 3.9 14.7799C2.85 14.7799 2 13.9199 2 12.8799Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,

  profil: (fillColor) => `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,

    house: (fillColor) => `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.07 2.82009L3.14002 8.37008C2.36002 8.99008 1.86002 10.3001 2.03002 11.2801L3.36002 19.2401C3.60002 20.6601 4.96002 21.8101 6.40002 21.8101H17.6C19.03 21.8101 20.4 20.6501 20.64 19.2401L21.97 11.2801C22.13 10.3001 21.63 8.99008 20.86 8.37008L13.93 2.8301C12.86 1.9701 11.13 1.97009 10.07 2.82009Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,

  home: (fillColor) => `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 96 96" xml:space="preserve" width="512" height="512">
<g id="Layer_4">
	<g>
		<path fill="${fillColor}" d="M71.232,34.235L65.925,22.35c-0.767-1.721-2.159-3.04-3.918-3.714c-1.76-0.675-3.677-0.623-5.397,0.144    c-0.861,0.384-1.605,0.923-2.22,1.567l-0.813-1.824c-1.524-3.418-5.544-4.958-8.963-3.436l-0.488,0.217    c-0.714,0.318-1.34,0.751-1.88,1.259c-1.7-3.006-5.45-4.287-8.668-2.854l-0.488,0.217c-3.418,1.524-4.959,5.545-3.435,8.963    l0.196,0.44c-0.715,0.071-1.421,0.251-2.096,0.553l-0.488,0.217c-1.656,0.738-2.925,2.077-3.574,3.77    c-0.649,1.693-0.6,3.537,0.139,5.193l7.481,16.778c-3.111-0.89-6.589,0.16-8.635,2.904c-2.621,3.518-1.916,8.502,1.563,11.157    c0.901,0.782,3.245,2.893,4.183,4.056c3.177,3.941,7.576,8.913,13.439,12.417c4.392,2.625,8.822,3.939,13.252,3.939    c3.439-0.001,6.879-0.792,10.3-2.378c7.02-3.252,11.431-7.436,13.486-12.789c2.403-6.261,2.257-13.008-0.422-19.015L71.232,34.235    z M74.628,67.507c-1.608,4.188-5.251,7.55-11.138,10.278c-10.417,4.827-20.722,0.674-31.504-12.699    c-1.386-1.718-4.938-4.798-4.938-4.798c-1.519-1.132-1.834-3.289-0.702-4.808c1.132-1.518,3.289-1.833,4.808-0.702l11.314,7.937    c1.035,0.726,2.462,0.475,3.187-0.559c0.726-1.035,0.475-2.461-0.559-3.187l-6.845-4.802l-10.24-22.967    c-0.24-0.54-0.256-1.14-0.045-1.692c0.211-0.551,0.625-0.987,1.164-1.228l0.488-0.217c0.539-0.241,1.14-0.258,1.692-0.045    c0.551,0.211,0.988,0.625,1.228,1.164l8.505,19.076c0.515,1.154,1.867,1.673,3.022,1.158c1.154-0.514,1.673-1.867,1.158-3.022    L33.835,21.025c-0.497-1.113,0.006-2.423,1.119-2.92l0.487-0.217c1.114-0.496,2.424,0.006,2.92,1.119L50.13,45.403    c0.38,0.851,1.215,1.357,2.091,1.357c0.311,0,0.628-0.064,0.93-0.199c1.154-0.514,1.673-1.867,1.158-3.022l-9.485-21.275    c-0.399-1.082,0.097-2.305,1.164-2.782l0.488-0.217c1.114-0.496,2.424,0.006,2.92,1.119l10.318,23.142    c0.38,0.851,1.215,1.357,2.091,1.357c0.311,0,0.628-0.064,0.93-0.199c1.154-0.514,1.673-1.867,1.158-3.022    c0,0-6.545-15.138-6.675-15.432c-0.556-1.248,0.006-2.716,1.254-3.272c0.604-0.27,1.278-0.287,1.896-0.051    c0.618,0.237,1.107,0.701,1.376,1.305l4.913,11.018l7.649,16.782C76.48,56.885,76.594,62.387,74.628,67.507z"/>
		<path fill="${fillColor}" d="M76.345,12.258c-0.948-0.835-2.394-0.744-3.229,0.204c-0.835,0.948-0.744,2.394,0.204,3.229    c4.499,3.965,8.049,8.988,10.268,14.527c0.358,0.894,1.217,1.438,2.125,1.438c0.283,0,0.571-0.053,0.85-0.165    c1.173-0.469,1.743-1.801,1.274-2.975C85.352,22.316,81.379,16.693,76.345,12.258z"/>
		<path fill="${fillColor}" d="M13.578,27.289c-1.185-0.439-2.501,0.168-2.939,1.354c-2.615,7.082-3.303,14.776-1.99,22.253    c0.195,1.111,1.161,1.893,2.251,1.893c0.132,0,0.265-0.012,0.399-0.035c1.245-0.218,2.076-1.405,1.858-2.65    c-1.174-6.679-0.56-13.552,1.775-19.875C15.369,29.042,14.763,27.726,13.578,27.289z"/>
	</g>
</g>
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
      <path fill="${fillColor}" d="M13 2c-1.645 0-3 1.355-3 3v11.813l-.656-.688-.25-.219a2.968 2.968 0 0 0-4.188 0 2.968 2.968 0 0 0 0 4.188v.031l8.188 8.094.062.031.031.063a8.307 8.307 0 0 0 5 1.687h1.72a8.17 8.17 0 0 0 8.187-8.188V14c0-1.645-1.356-3-3-3-.426 0-.82.117-1.188.281C23.578 9.981 22.394 9 21 9c-.766 0-1.469.3-2 .781A2.984 2.984 0 0 0 17 9a2.95 2.95 0 0 0-1 .188V5c0-1.645-1.355-3-3-3zm0 2c.555 0 1 .445 1 1v11h2v-4c0-.555.445-1 1-1s1 .445 1 1v4h2v-4c0-.555.445-1 1-1s1 .445 1 1v4h2.094v-2c0-.555.445-1 1-1 .554 0 1 .445 1 1v7.813c0 3.464-2.723 6.187-6.188 6.187h-1.718c-1.465 0-2.731-.523-3.782-1.313l-8.093-8c-.446-.445-.446-.93 0-1.375s.93-.445 1.375 0L12 21.625V5c0-.555.445-1 1-1z" opacity="1" data-original="${fillColor}"></path>
    </g>
  </svg>
  `,


  quote: (fillColor) => `<svg fill="${fillColor}" id="Layer_2" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" data-name="Layer 2"><path d="m7.68 6.54c-3.68 0-6.68 3.03-6.68 6.75 0 2.53 1.37 4.8 3.54 5.96-.11 1.18-.6 3.69-2.61 4.24-.48.13-.79.59-.73 1.08s.46.87.96.88h.15c.98 0 6.36-.22 9.84-4.89 2.26-3.03 2.93-6.32 1.9-9.22-.86-2.87-3.42-4.8-6.37-4.8z"/><path d="m30.54 11.35c-.86-2.87-3.42-4.8-6.37-4.8-3.68 0-6.68 3.03-6.68 6.75 0 2.53 1.37 4.8 3.54 5.96-.11 1.18-.6 3.69-2.61 4.24-.48.13-.79.59-.73 1.08s.46.87.96.88h.15c.98 0 6.36-.22 9.84-4.89 2.26-3.03 2.93-6.32 1.9-9.22z"/></svg>
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

    bookSaved: (fillColor) => `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 4.66994V16.74C22 17.7 21.22 18.5999 20.26 18.7199L19.93 18.76C17.75 19.05 14.39 20.1599 12.47 21.2199C12.21 21.3699 11.78 21.3699 11.51 21.2199L11.47 21.2C9.54997 20.15 6.20003 19.05 4.03003 18.76L3.73999 18.7199C2.77999 18.5999 2 17.7 2 16.74V4.65993C2 3.46993 2.96997 2.56994 4.15997 2.66994C6.25997 2.83994 9.43997 3.89997 11.22 5.00997L11.47 5.15993C11.76 5.33994 12.24 5.33994 12.53 5.15993L12.7 5.04995C13.33 4.65995 14.13 4.26994 15 3.91994V7.99996L17 6.66994L19 7.99996V2.77999C19.27 2.72999 19.53 2.69995 19.77 2.67995H19.83C21.02 2.57995 22 3.46994 22 4.66994Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 5.48999V20.49" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 2.78003V8L17 6.66998L15 8V3.91998C16.31 3.39998 17.77 2.98003 19 2.78003Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    `,

    brush: (fillColor) => `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.81 3.94012C20.27 7.78012 16.41 13.0001 13.18 15.5901L11.21 17.1701C10.96 17.3501 10.71 17.5101 10.43 17.6201C10.43 17.4401 10.42 17.2401 10.39 17.0501C10.28 16.2101 9.90002 15.4301 9.23002 14.7601C8.55002 14.0801 7.72002 13.6801 6.87002 13.5701C6.67002 13.5601 6.47002 13.5401 6.27002 13.5601C6.38002 13.2501 6.55002 12.9601 6.76002 12.7201L8.32002 10.7501C10.9 7.52012 16.14 3.64012 19.97 2.11012C20.56 1.89012 21.13 2.05012 21.49 2.42012C21.87 2.79012 22.05 3.36012 21.81 3.94012Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.43 17.6201C10.43 18.7201 10.01 19.77 9.22003 20.57C8.61003 21.18 7.78003 21.6001 6.79003 21.7301L4.33003 22.0001C2.99003 22.1501 1.84003 21.01 2.00003 19.65L2.27003 17.1901C2.51003 15.0001 4.34003 13.6001 6.28003 13.5601C6.48003 13.5501 6.69003 13.56 6.88003 13.57C7.73003 13.68 8.56003 14.0701 9.24003 14.7601C9.91003 15.4301 10.29 16.21 10.4 17.05C10.41 17.24 10.43 17.4301 10.43 17.6201Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.24 14.47C14.24 11.86 12.12 9.73999 9.51001 9.73999" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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

    source: (fillColor) => `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.99998 3H8.99998C7.04998 8.84 7.04998 15.16 8.99998 21H7.99998" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 3C16.95 8.84 16.95 15.16 15 21" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 16V15C8.84 16.95 15.16 16.95 21 15V16" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 9.0001C8.84 7.0501 15.16 7.0501 21 9.0001" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    `,

    rotate: (fillColor) => `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.8901 5.08002C14.0201 4.82002 13.0601 4.65002 12.0001 4.65002C7.21008 4.65002 3.33008 8.53002 3.33008 13.32C3.33008 18.12 7.21008 22 12.0001 22C16.7901 22 20.6701 18.12 20.6701 13.33C20.6701 11.55 20.1301 9.89002 19.2101 8.51002" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.13 5.32L13.24 2" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.13 5.31995L12.76 7.77995" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    `,

    galleryAdd: (fillColor) => `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V10" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.75 5H21.25" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round"/>
<path d="M18.5 7.75V2.25" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round"/>
<path d="M2.66992 18.9501L7.59992 15.6401C8.38992 15.1101 9.52992 15.1701 10.2399 15.7801L10.5699 16.0701C11.3499 16.7401 12.6099 16.7401 13.3899 16.0701L17.5499 12.5001C18.3299 11.8301 19.5899 11.8301 20.3699 12.5001L21.9999 13.9001" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    `,

    eraser: (fillColor) => `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 22H21" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.90997 17.58L6.41998 21.09C7.58998 22.26 9.49997 22.26 10.66 21.09L21.09 10.66C22.26 9.48997 22.26 7.57997 21.09 6.41997L17.58 2.90997C16.41 1.73997 14.5 1.73997 13.34 2.90997L2.90997 13.34C1.73997 14.5 1.73997 16.41 2.90997 17.58Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.12 9.12988L14.87 16.8799" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.52002 17.66L9.16998 12" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.34003 20.4901L12 14.8301" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    `,

    addItem: (fillColor) => `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2_14610)">
<path d="M8 16H5.43C3.14 16 2 14.86 2 12.57V5.43C2 3.14 3.14 2 5.43 2H10C12.29 2 13.43 3.14 13.43 5.43" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.57 22H14C11.71 22 10.57 20.86 10.57 18.57V11.43C10.57 9.14 11.71 8 14 8H18.57C20.86 8 22 9.14 22 11.43V18.57C22 20.86 20.86 22 18.57 22Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.87 15H18.13" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.5 16.6301V13.3701" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_2_14610">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
    `,

  annonce: (fillColor) => `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 10V14C5.5 16 6.5 17 8.5 17H9.93C10.3 17 10.67 17.11 10.99 17.3L13.91 19.13C16.43 20.71 18.5 19.56 18.5 16.59V7.41003C18.5 4.43003 16.43 3.29003 13.91 4.87003L10.99 6.70003C10.67 6.89003 10.3 7.00003 9.93 7.00003H8.5C6.5 7.00003 5.5 8.00003 5.5 10Z" stroke="${fillColor}" stroke-width="1.5"/>
</svg>
    `,

  help: (fillColor) => `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 18.4301H13L8.54999 21.39C7.88999 21.83 7 21.3601 7 20.5601V18.4301C4 18.4301 2 16.4301 2 13.4301V7.42999C2 4.42999 4 2.42999 7 2.42999H17C20 2.42999 22 4.42999 22 7.42999V13.4301C22 16.4301 20 18.4301 17 18.4301Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 11.36V11.15C12 10.47 12.42 10.11 12.84 9.82001C13.25 9.54001 13.66 9.18002 13.66 8.52002C13.66 7.60002 12.92 6.85999 12 6.85999C11.08 6.85999 10.34 7.60002 10.34 8.52002" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.9955 13.75H12.0045" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    `,

  info: (fillColor) => `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 18.4301H13L8.54999 21.39C7.88999 21.83 7 21.3601 7 20.5601V18.4301C4 18.4301 2 16.4301 2 13.4301V7.42999C2 4.42999 4 2.42999 7 2.42999H17C20 2.42999 22 4.42999 22 7.42999V13.4301C22 16.4301 20 18.4301 17 18.4301Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.9955 6.75H12.0045" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 10V14" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    `,

  new: (fillColor) => `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.2 22C19.851 22 22 19.851 22 17.2C22 14.549 19.851 12.4 17.2 12.4C14.549 12.4 12.4 14.549 12.4 17.2C12.4 19.851 14.549 22 17.2 22Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.99 17.26H15.41" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.2 15.51V19.1" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 8.69C22 10.66 21.49 12.4 20.69 13.91C19.81 12.98 18.57 12.4 17.2 12.4C14.55 12.4 12.4 14.55 12.4 17.2C12.4 18.43 12.87 19.55 13.63 20.4C13.26 20.57 12.92 20.71 12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.69C2 5.6 4.49 3.09998 7.56 3.09998C9.37 3.09998 10.99 3.98002 12 5.33002C13.01 3.98002 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.6 22 8.69Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    `,

  //Slider Hybrid
  user_check: (fillColor) => `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.2101 15.74L15.67 19.2801C15.53 19.4201 15.4 19.68 15.37 19.87L15.18 21.22C15.11 21.71 15.45 22.05 15.94 21.98L17.29 21.79C17.48 21.76 17.75 21.63 17.88 21.49L21.42 17.95C22.03 17.34 22.32 16.63 21.42 15.73C20.53 14.84 19.8201 15.13 19.2101 15.74Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 21.8101C10.18 21.8101 8.37005 21.3501 6.99005 20.4301C4.57005 18.8101 4.57005 16.1701 6.99005 14.5601C9.74005 12.7201 14.25 12.7201 17 14.5601" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    `,

  chart: (fillColor) => `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 2V19C2 20.66 3.34 22 5 22H22" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 17L9.59 11.64C10.35 10.76 11.7 10.7 12.52 11.53L13.47 12.48C14.29 13.3 15.64 13.25 16.4 12.37L21 7" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    `,

  feedback: (fillColor) => `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.48 18.35L10.58 20.75C10.98 21.15 11.88 21.35 12.48 21.35H16.28C17.48 21.35 18.78 20.45 19.08 19.25L21.48 11.95C21.98 10.55 21.08 9.35003 19.58 9.35003H15.58C14.98 9.35003 14.48 8.85003 14.58 8.15003L15.08 4.95003C15.28 4.05003 14.68 3.05003 13.78 2.75003C12.98 2.45003 11.98 2.85003 11.58 3.45003L7.48 9.55003" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10"/>
<path d="M2.38 18.35V8.55002C2.38 7.15002 2.98 6.65002 4.38 6.65002H5.38C6.78 6.65002 7.38 7.15002 7.38 8.55002V18.35C7.38 19.75 6.78 20.25 5.38 20.25H4.38C2.98 20.25 2.38 19.75 2.38 18.35Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    `,

  sun: (fillColor) => `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.14 19.14L19.01 19.01M19.01 4.99L19.14 4.86L19.01 4.99ZM4.86 19.14L4.99 19.01L4.86 19.14ZM12 2.08V2V2.08ZM12 22V21.92V22ZM2.08 12H2H2.08ZM22 12H21.92H22ZM4.99 4.99L4.86 4.86L4.99 4.99Z" stroke="${fillColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    `,

    lock: (fillColor) => `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    `,



    //Profil progress bar
    faceMonocle: (fillColor) => `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M24 12c0 .733-.066 1.467-.198 2.181a1 1 0 0 1-1.967-.361c.109-.595.165-1.207.165-1.819 0-5.514-4.486-10-10-10S2 6.486 2 12s4.486 10 10 10c.927 0 1.844-.127 2.728-.376a1 1 0 1 1 .544 1.923c-1.061.3-2.162.452-3.272.452C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12ZM7 16c.948 0 3.465 0 5.168 2.555a1 1 0 1 0 1.664-1.11C12.308 15.159 10.009 14 7 14a1 1 0 1 0 0 2Zm.5-6a1.5 1.5 0 1 0-.001-3.001A1.5 1.5 0 0 0 7.5 10Zm12.5.5V23a1 1 0 1 1-2 0v-8.762a4.474 4.474 0 0 1-2.5.762c-2.481 0-4.5-2.019-4.5-4.5S13.019 6 15.5 6 20 8.019 20 10.5Zm-2 0C18 9.121 16.878 8 15.5 8S13 9.121 13 10.5s1.122 2.5 2.5 2.5 2.5-1.121 2.5-2.5Z" fill="${fillColor}" opacity="1" data-original="#000000"></path></g></svg>    `,

    faceRelieved: (fillColor) => `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M18.655 10.244c.417.361.462.993.101 1.411-.729.841-1.777 1.342-2.807 1.342h-.019c-.711-.005-1.756-.242-2.694-1.352a1 1 0 1 1 1.528-1.291c.358.424.755.64 1.179.643h.007c.451 0 .946-.25 1.294-.652a1.002 1.002 0 0 1 1.411-.101ZM7.949 12.997c1.03 0 2.078-.501 2.807-1.342a1.001 1.001 0 0 0-1.512-1.31c-.349.402-.844.652-1.294.652h-.007c-.424-.003-.82-.219-1.179-.643a1 1 0 0 0-1.528 1.291c.938 1.109 1.983 1.347 2.694 1.352h.019Zm8.387 2.256C16.316 15.27 14.331 17 12 17c-2.314 0-4.287-1.705-4.335-1.747a1 1 0 0 0-1.331 1.493C6.437 16.838 8.893 19 12 19s5.563-2.162 5.666-2.254a.999.999 0 0 0-1.33-1.493ZM23.971 12c0 6.617-5.383 12-12 12s-12-5.383-12-12 5.383-12 12-12 12 5.383 12 12Zm-2 0c0-5.514-4.486-10-10-10s-10 4.486-10 10 4.486 10 10 10 10-4.486 10-10Zm-16-3a.999.999 0 0 0 .783-.377c.625-.784 1.629-1.463 2.441-1.648a.998.998 0 0 0 .751-1.197.996.996 0 0 0-1.198-.752c-1.252.286-2.649 1.209-3.559 2.352a1 1 0 0 0 .782 1.623Zm8.777-2.025c.812.186 1.816.864 2.441 1.648a.999.999 0 0 0 1.406.159 1 1 0 0 0 .159-1.405c-.91-1.143-2.307-2.065-3.559-2.352a.999.999 0 1 0-.447 1.949Z" fill="${fillColor}" opacity="1" data-original="#000000"></path></g></svg>    `,

    faceSunglasses: (fillColor) => `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0Zm0 2c3.728 0 6.98 2.054 8.699 5.086a3.021 3.021 0 0 0-.7-.086h-4.085a4.37 4.37 0 0 0-2.765 1h-2.298a4.37 4.37 0 0 0-2.765-1H4.001c-.239 0-.473.032-.7.086C5.021 4.054 8.273 2 12 2Zm0 20c-5.294 0-9.629-4.139-9.967-9.349A4 4 0 0 0 5.021 14h2.137a3.994 3.994 0 0 0 3.881-3.03l.242-.97h1.439l.242.97A3.994 3.994 0 0 0 16.843 14h2.137a3.999 3.999 0 0 0 2.987-1.349C21.629 17.861 17.294 22 12 22Zm5.746-6.664a.999.999 0 0 1-.08 1.409c-.103.092-2.559 2.254-5.666 2.254s-5.563-2.162-5.666-2.254a1 1 0 0 1 1.33-1.493C7.689 15.274 9.672 17 12 17s4.316-1.73 4.336-1.748a1 1 0 0 1 1.41.084Z" fill="${fillColor}" opacity="1" data-original="#000000" class=""></path></g></svg>    `,

    faceExplosion: (fillColor) => `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M8.5 16a1.5 1.5 0 1 1 .001-3.001A1.5 1.5 0 0 1 8.5 16Zm7-3a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 15.5 13Zm8.5-2.451v1.086c0 6.698-5.283 12.245-11.776 12.363l-.227.002a11.905 11.905 0 0 1-8.403-3.437A11.908 11.908 0 0 1 0 12v-1.499c0-.599.358-1.138.912-1.372a1.462 1.462 0 0 1 1.59.292C3.074 9.976 3.991 10 4 10h4.5a.5.5 0 0 0 .5-.5V8c0-.523-.154-.774-.316-.894C8.028 7.704 7.299 8 6.5 8a3.486 3.486 0 0 1-2.727-1.306 3.518 3.518 0 0 1-.689-2.97c.247-1.132 1.088-2.091 2.197-2.502a3.414 3.414 0 0 1 1.987-.135C8.515-.08 10.517-.322 12 .546c1.485-.869 3.486-.627 4.732.543a3.489 3.489 0 0 1 3.539 1.272 3.52 3.52 0 0 1 .609 3.064 3.45 3.45 0 0 1-2.277 2.399c-1.07.339-2.239.061-3.219-.745-.255.136-.384.444-.384.92v1.5a.5.5 0 0 0 .5.5H20s.899-.021 1.476-.559a1.49 1.49 0 0 1 1.617-.275c.551.239.907.782.907 1.383Zm-2 .944A4.682 4.682 0 0 1 20 12h-4.5A2.503 2.503 0 0 1 13 9.5V8c0-1.241.511-1.951.939-2.328.733-.646 1.624-.693 1.878-.664a.999.999 0 0 1 .596.302c.245.257.886.834 1.583.609.456-.145.827-.536.948-.999a1.514 1.514 0 0 0-.256-1.336 1.479 1.479 0 0 0-1.831-.431 1 1 0 0 1-1.24-.317A1.98 1.98 0 0 0 14 2c-.621 0-1.066.283-1.331.521a1 1 0 0 1-1.338 0A1.974 1.974 0 0 0 10 2a1.98 1.98 0 0 0-1.617.836.997.997 0 0 1-1.242.316 1.433 1.433 0 0 0-1.166-.054c-.467.173-.835.586-.937 1.052A1.5 1.5 0 0 0 6.499 6c.484 0 .832-.337 1.05-.591.059-.068.185-.191.26-.241.164-.109.357-.168.555-.168 1.059 0 2.635.799 2.635 3v1.5c0 1.379-1.122 2.5-2.5 2.5H4c-.132 0-1.06-.019-2-.506V12a9.927 9.927 0 0 0 2.995 7.137c1.93 1.895 4.487 2.903 7.193 2.861C17.599 21.899 22 17.251 22 11.635v-.142ZM12 17c-1.44 0-2.597 1.148-2.972 2.22-.134.383.168.78.573.78h4.788c.403 0 .706-.393.576-.775-.365-1.074-1.53-2.224-2.965-2.224Z" fill="${fillColor}" opacity="1" data-original="#000000"></path></g></svg>
    `,

    faceTear: (fillColor) => `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="512" height="512" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M10 9.5a1.5 1.5 0 0 1-3 0 1.5 1.5 0 0 1 3 0ZM15.5 8a1.5 1.5 0 0 0 0 3 1.5 1.5 0 0 0 0-3Zm8.5 4A12.013 12.013 0 0 0 12 0C-3.9.6-3.893 23.4 12 24a12.013 12.013 0 0 0 12-12Zm-2 0a10.011 10.011 0 0 1-10 10C-1.249 21.5-1.244 2.5 12 2a10.011 10.011 0 0 1 10 10Zm-4.254 5.666a1 1 0 0 0-.08-1.412A9.454 9.454 0 0 0 12 14a1 1 0 0 0 0 2 7.519 7.519 0 0 1 4.336 1.747 1 1 0 0 0 1.41-.081ZM5 16a2 2 0 0 0 4 0 6.571 6.571 0 0 0-1.538-3.388C6.46 11.512 4.953 15.152 5 16Z" fill="${fillColor}" opacity="1" data-original="#000000" class=""></path></g></svg>    `,


  //Grid Home
  category: (fillColor) => `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 19.77V15.73C2 14.14 2.64 13.5 4.23 13.5H8.27C9.86 13.5 10.5 14.14 10.5 15.73V19.77C10.5 21.36 9.86 22 8.27 22H4.23C2.64 22 2 21.36 2 19.77Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M13.5 8.52V3.98C13.5 2.57 14.14 2 15.73 2H19.77C21.36 2 22 2.57 22 3.98V8.51C22 9.93 21.36 10.49 19.77 10.49H15.73C14.14 10.5 13.5 9.93 13.5 8.52Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 8.98528 8.98528 11 6.5 11Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14.9752 22H20.5248C21.6433 22 22.3562 20.7248 21.8154 19.6784L20.3835 16.9056L19.0437 14.3093C18.4844 13.2302 17.0217 13.2302 16.4625 14.3093L15.1165 16.9056L14.4712 18.1546L13.6846 19.6784C13.1438 20.7248 13.8567 22 14.9752 22Z" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,
  custom: (fillColor) => `
      <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.6424 11.3667C22.6426 10.8623 22.543 10.3629 22.3493 9.89711C22.1556 9.43137 21.8717 9.00855 21.5138 8.65303C20.7816 7.95435 19.8085 7.56453 18.7964 7.56453C17.7844 7.56453 16.8112 7.95435 16.079 8.65303L1.19901 23.5371C0.519871 24.2653 0.149969 25.2288 0.167268 26.2244C0.184566 27.22 0.587714 28.1701 1.29175 28.8743C1.99578 29.5785 2.9457 29.9819 3.94131 29.9994C4.93692 30.0169 5.90046 29.6472 6.62884 28.9683L21.5138 14.0842C21.8722 13.7283 22.1565 13.3049 22.3502 12.8385C22.5439 12.372 22.6433 11.8718 22.6424 11.3667ZM4.85568 27.1976C4.60218 27.4392 4.2654 27.574 3.91518 27.574C3.56496 27.574 3.22818 27.4392 2.97468 27.1976C2.72565 26.9479 2.58581 26.6097 2.58581 26.2571C2.58581 25.9044 2.72565 25.5662 2.97468 25.3165L12.717 15.5727L14.6043 17.4601L4.85568 27.1976ZM19.7432 12.3098L16.3724 15.6818L14.4914 13.7945L17.8634 10.4237C17.9836 10.2864 18.1308 10.1752 18.2957 10.0971C18.4606 10.0189 18.6398 9.97548 18.8222 9.96943C19.0046 9.96338 19.1863 9.99484 19.3561 10.0619C19.5258 10.1289 19.68 10.2301 19.809 10.3591C19.9381 10.4882 20.0392 10.6424 20.1063 10.8121C20.1733 10.9818 20.2048 11.1635 20.1987 11.346C20.1927 11.5284 20.1492 11.7076 20.0711 11.8725C19.9929 12.0374 19.8818 12.1845 19.7444 12.3048L19.7432 12.3098ZM6.16862 3.58049L8.11232 3.02621L8.66659 1.08247C8.75588 0.770574 8.9443 0.496234 9.20335 0.300935C9.46241 0.105636 9.778 0 10.1024 0C10.4268 0 10.7424 0.105636 11.0015 0.300935C11.2605 0.496234 11.449 0.770574 11.5383 1.08247L12.0925 3.02621L14.0362 3.58049C14.3481 3.66978 14.6224 3.85821 14.8177 4.11726C15.013 4.37632 15.1187 4.69192 15.1187 5.01635C15.1187 5.34078 15.013 5.65638 14.8177 5.91544C14.6224 6.1745 14.3481 6.36292 14.0362 6.45221L12.0925 7.00649L11.5383 8.95023C11.449 9.26213 11.2605 9.53647 11.0015 9.73177C10.7424 9.92706 10.4268 10.0327 10.1024 10.0327C9.778 10.0327 9.46241 9.92706 9.20335 9.73177C8.9443 9.53647 8.75588 9.26213 8.66659 8.95023L8.11232 7.00649L6.16862 6.45221C5.85673 6.36292 5.5824 6.1745 5.3871 5.91544C5.19181 5.65638 5.08617 5.34078 5.08617 5.01635C5.08617 4.69192 5.19181 4.37632 5.3871 4.11726C5.5824 3.85821 5.85673 3.66978 6.16862 3.58049ZM29.0842 21.5005L27.1405 22.0548L26.5863 23.9985C26.497 24.3104 26.3086 24.5848 26.0495 24.7801C25.7905 24.9754 25.4749 25.081 25.1504 25.081C24.826 25.081 24.5104 24.9754 24.2514 24.7801C23.9923 24.5848 23.8039 24.3104 23.7146 23.9985L23.1603 22.0548L21.2166 21.5005C20.9047 21.4112 20.6304 21.2228 20.4351 20.9638C20.2398 20.7047 20.1342 20.3891 20.1342 20.0647C20.1342 19.7402 20.2398 19.4246 20.4351 19.1656C20.6304 18.9065 20.9047 18.7181 21.2166 18.6288L23.1603 18.0745L23.7146 16.1308C23.8039 15.8189 23.9923 15.5446 24.2514 15.3493C24.5104 15.154 24.826 15.0483 25.1504 15.0483C25.4749 15.0483 25.7905 15.154 26.0495 15.3493C26.3086 15.5446 26.497 15.8189 26.5863 16.1308L27.1405 18.0745L29.0842 18.6288C29.3961 18.7181 29.6705 18.9065 29.8658 19.1656C30.0611 19.4246 30.1667 19.7402 30.1667 20.0647C30.1667 20.3891 30.0611 20.7047 29.8658 20.9638C29.6705 21.2228 29.3961 21.4112 29.0842 21.5005ZM22.3352 3.13531L24.0356 2.65L24.5234 0.947035C24.6028 0.675936 24.7679 0.437865 24.994 0.268497C25.2201 0.0991296 25.495 0.00758698 25.7774 0.00758698C26.0599 0.00758698 26.3348 0.0991296 26.5609 0.268497C26.7869 0.437865 26.952 0.675936 27.0314 0.947035L27.5167 2.6475L29.2172 3.1328C29.4883 3.2122 29.7263 3.3773 29.8957 3.60338C30.0651 3.82947 30.1566 4.10434 30.1566 4.38683C30.1566 4.66931 30.0651 4.94419 29.8957 5.17027C29.7263 5.39636 29.4883 5.56146 29.2172 5.64086L27.5167 6.12616L27.0314 7.83039C26.952 8.10149 26.7869 8.33956 26.5609 8.50892C26.3348 8.67829 26.0599 8.76983 25.7774 8.76983C25.495 8.76983 25.2201 8.67829 24.994 8.50892C24.7679 8.33956 24.6028 8.10149 24.5234 7.83039L24.0381 6.13118L22.3352 5.64336C22.0641 5.56397 21.826 5.39886 21.6567 5.17278C21.4873 4.9467 21.3958 4.67182 21.3958 4.38934C21.3958 4.10685 21.4873 3.83197 21.6567 3.60589C21.826 3.37981 22.0641 3.2147 22.3352 3.13531Z" fill="${fillColor}"/></svg>
      `,

  random: (fillColor) => `
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.685 19.2317C21.685 18.0167 21.2016 16.85 20.3416 15.9917C19.4833 15.1317 18.3166 14.6483 17.1016 14.6483C13.7916 14.6483 8.74496 14.6483 5.43496 14.6483C4.21829 14.6483 3.05329 15.1317 2.19329 15.9917C1.33496 16.85 0.851624 18.0167 0.851624 19.2317V30.8983C0.851624 32.115 1.33496 33.28 2.19329 34.14C3.05329 34.9983 4.21829 35.4817 5.43496 35.4817H17.1016C18.3166 35.4817 19.4833 34.9983 20.3416 34.14C21.2016 33.28 21.685 32.115 21.685 30.8983V19.2317ZM19.185 19.2317V30.8983C19.185 31.4517 18.965 31.9817 18.575 32.3717C18.1833 32.7633 17.6533 32.9817 17.1016 32.9817H5.43496C4.88162 32.9817 4.35162 32.7633 3.96162 32.3717C3.56996 31.9817 3.35162 31.4517 3.35162 30.8983V19.2317C3.35162 18.68 3.56996 18.15 3.96162 17.7583C4.35162 17.3683 4.88162 17.1483 5.43496 17.1483H17.1016C17.6533 17.1483 18.1833 17.3683 18.575 17.7583C18.965 18.15 19.185 18.68 19.185 19.2317Z" fill="${fillColor}"/><path fill-rule="evenodd" clip-rule="evenodd" d="M25.0116 24.0833C25.2583 24.1733 25.4983 24.2583 25.73 24.3417C26.8733 24.7533 28.1333 24.6933 29.2333 24.1767C30.3333 23.6583 31.1816 22.725 31.5933 21.5817C32.715 18.4667 34.4233 13.7183 35.545 10.6033C35.9566 9.46 35.8966 8.2 35.3783 7.1C34.8616 6 33.9283 5.15167 32.7833 4.74C29.67 3.61833 24.9216 1.91 21.8066 0.788333C20.6633 0.376666 19.4016 0.436666 18.3033 0.955C17.2033 1.47167 16.3533 2.405 15.9416 3.55C15.2383 5.505 14.3016 8.10667 13.425 10.5433C13.1916 11.1917 13.5283 11.9083 14.1783 12.1417C14.8266 12.375 15.5433 12.0383 15.7766 11.39L18.295 4.39667C18.4816 3.87667 18.8666 3.45167 19.3666 3.21667C19.8666 2.98167 20.44 2.95333 20.96 3.14167L31.9366 7.09167C32.4566 7.27833 32.8816 7.665 33.1166 8.165C33.3516 8.665 33.38 9.23833 33.1916 9.75667L29.2416 20.735C29.055 21.255 28.6683 21.6783 28.1683 21.915C27.6683 22.15 27.095 22.1767 26.5766 21.99L25.8583 21.7317C25.2083 21.4983 24.4916 21.835 24.2583 22.485C24.025 23.1333 24.3633 23.85 25.0116 24.0833Z" fill="${fillColor}"/><path d="M11.2683 26.7317C12.1888 26.7317 12.935 25.9855 12.935 25.065C12.935 24.1445 12.1888 23.3983 11.2683 23.3983C10.3478 23.3983 9.60162 24.1445 9.60162 25.065C9.60162 25.9855 10.3478 26.7317 11.2683 26.7317Z" fill="${fillColor}"/><path fill-rule="evenodd" clip-rule="evenodd" d="M24.3316 10.9967C23.4666 10.685 22.5116 11.135 22.2 12.0017C21.8883 12.8667 22.3383 13.8217 23.2033 14.1333C24.0683 14.445 25.025 13.995 25.3366 13.13C25.6483 12.265 25.1983 11.3083 24.3316 10.9967Z" fill="${fillColor}"/><path d="M15.435 22.565C16.3555 22.565 17.1016 21.8188 17.1016 20.8983C17.1016 19.9779 16.3555 19.2317 15.435 19.2317C14.5145 19.2317 13.7683 19.9779 13.7683 20.8983C13.7683 21.8188 14.5145 22.565 15.435 22.565Z" fill="${fillColor}"/><path fill-rule="evenodd" clip-rule="evenodd" d="M17.1016 29.2317C17.1016 28.3117 16.355 27.565 15.435 27.565C14.515 27.565 13.7683 28.3117 13.7683 29.2317C13.7683 30.1517 14.515 30.8983 15.435 30.8983C16.355 30.8983 17.1016 30.1517 17.1016 29.2317Z" fill="${fillColor}"/><path fill-rule="evenodd" clip-rule="evenodd" d="M27.8449 18.4617C28.1566 17.595 27.7066 16.64 26.8416 16.3283C25.9766 16.0167 25.0199 16.4667 24.7099 17.3317C24.3983 18.1983 24.8483 19.1533 25.7133 19.465C26.5783 19.7767 27.5349 19.3267 27.8449 18.4617Z" fill="${fillColor}"/><path d="M7.1016 30.8983C8.02208 30.8983 8.76827 30.1521 8.76827 29.2317C8.76827 28.3112 8.02208 27.565 7.1016 27.565C6.18113 27.565 5.43494 28.3112 5.43494 29.2317C5.43494 30.1521 6.18113 30.8983 7.1016 30.8983Z" fill="${fillColor}"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8.76827 20.8983C8.76827 19.9783 8.0216 19.2317 7.1016 19.2317C6.1816 19.2317 5.43494 19.9783 5.43494 20.8983C5.43494 21.8183 6.1816 22.565 7.1016 22.565C8.0216 22.565 8.76827 21.8183 8.76827 20.8983Z" fill="${fillColor}"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22.8266 7.79833C23.1383 6.93333 22.6883 5.97667 21.8233 5.665C20.9566 5.355 20.0016 5.80333 19.69 6.67C19.3783 7.535 19.8283 8.49 20.6933 8.80167C21.56 9.11333 22.515 8.66333 22.8266 7.79833Z" fill="${fillColor}"/></svg>
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

  // Footer
  footer: (fillColor) => `

  `,


};

const InterfaceSvg = ({ iconName, fillColor = 'black', width = 24, height = 24 }) => {
  const svgContent = svgMarkup[iconName]
    ? svgMarkup[iconName](fillColor)
    : svgMarkup.default(fillColor);

  return <SvgXml xml={svgContent} width={width} height={height} />;
};

export default InterfaceSvg;
