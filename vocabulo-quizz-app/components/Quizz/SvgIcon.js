import React from 'react';
import { SvgXml } from 'react-native-svg';

const SvgIcon = ({ icon, fillColor }) => {
  const svgMarkup = {

    category: `
      <svg width="82" height="79" viewBox="0 0 82 79" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.99042 9.75854C6.99042 9.75854 6.26911 18.0442 0.197266 19.2645C0.197266 19.2645 5.51454 21.6209 6.99042 27.5724C6.99042 27.5724 7.68431 21.0306 12.8998 19.4894C12.8998 19.4894 7.0511 17.4015 6.99042 9.75854Z" fill="white"/>
      <path d="M16.0129 0.888428C16.0129 0.888428 15.5255 6.48131 11.4268 7.30522C11.4268 7.30522 15.0156 8.89584 16.0129 12.9136C16.0129 12.9136 16.4817 8.49746 20.0021 7.4574C20.0021 7.4574 16.054 6.04803 16.0129 0.888428Z" fill="white"/>
      <path d="M81.0531 67.9761C80.8466 65.5547 80.1018 62.8843 78.8412 60.0394C78.7669 59.8717 78.5799 59.7835 78.4008 59.832C78.2227 59.8804 78.1072 60.052 78.1297 60.2333C78.1376 60.2934 78.851 66.2284 76.5619 68.0371C75.7985 68.64 74.7415 68.705 73.4222 68.23C73.4193 68.2291 73.4163 68.229 73.4134 68.2281C73.0992 66.589 72.0383 64.3838 68.8526 62.7922C68.8497 62.7903 68.8458 62.7893 68.8429 62.7874C68.7959 62.7651 67.6674 62.2484 66.1602 62.0691C64.1304 61.8268 62.3874 62.3211 61.1219 63.4998C61.0622 63.5551 61.027 63.6249 61.0123 63.6985C60.6629 63.5619 60.2841 63.4872 59.9269 63.4174C59.3309 63.3011 58.7681 63.1916 58.3727 62.8436C57.715 62.2669 57.4576 60.1867 57.532 58.9693C57.58 58.1813 58.1144 57.463 58.6566 56.7951C59.3759 55.9102 60.1217 55.0504 60.843 54.2187C62.9129 51.8333 64.8674 49.5806 66.3305 46.6873C68.6657 42.0695 69.4643 37.4372 68.8429 32.108C68.5894 29.9338 67.8211 27.4931 66.5586 24.8537C63.46 18.3739 57.8481 13.6272 51.1617 11.8311C46.9112 10.6893 42.3093 10.2967 37.8523 10.696C33.1693 11.1158 28.7397 12.4136 25.0441 14.4482C19.8707 17.297 15.9921 22.0059 14.1208 27.7064C12.6479 32.1933 12.3357 37.0989 13.24 41.5199C14.6151 48.2362 17.7587 51.4417 20.0547 53.7826C21.0755 54.8226 21.8868 55.6504 22.29 56.5218C22.3263 58.2501 22.0845 62.6536 20.5724 63.9244C20.5617 63.9108 20.5519 63.8982 20.5392 63.8856C19.2933 62.706 17.5786 62.2106 15.5801 62.453C14.0974 62.6333 12.9875 63.1509 12.9405 63.1722C12.9376 63.1741 12.9337 63.1751 12.9307 63.177C10.0925 64.6203 8.99638 66.6568 8.60196 68.293C7.37076 68.6943 6.37836 68.609 5.65216 68.0352C3.36201 66.2265 4.07646 60.2914 4.08429 60.2313C4.1068 60.0491 3.99131 59.8785 3.81319 59.83C3.63408 59.7816 3.44715 59.8698 3.37277 60.0375C2.11123 62.8833 1.36742 65.5528 1.16091 67.9741C0.994532 69.9282 1.17559 71.7263 1.69822 73.3198C2.5996 76.0649 4.19781 77.2416 4.26437 77.2891C5.6962 78.3302 7.084 78.6985 8.33184 78.6985C9.57968 78.6985 10.6651 78.3369 11.5322 77.9095C12.8544 77.2562 13.8321 76.3693 14.3039 75.8914C14.8647 76.7415 15.5488 77.452 16.3053 77.9095C17.4807 78.62 18.891 78.9835 20.408 78.9835C21.1254 78.9835 21.8663 78.9021 22.6169 78.7382C23.7415 78.492 25.142 78.0665 26.0071 76.9528C26.2616 76.6252 26.3614 76.3014 26.4143 75.9941C27.3617 77.072 28.7172 77.9163 30.2371 78.3176C30.7822 78.462 31.5035 78.589 32.353 78.589C34.1118 78.589 36.4146 78.0432 38.8242 75.9709C38.9945 75.8468 40.2081 74.9085 40.8853 72.9244C41.5626 74.9085 42.7762 75.8468 42.9465 75.9709C45.356 78.0432 47.6589 78.589 49.4176 78.589C50.2662 78.589 50.9884 78.462 51.5326 78.3176C53.0604 77.9134 54.4217 77.0633 55.3701 75.9777C55.3818 76.0571 55.3936 76.124 55.4034 76.1599C55.5228 76.6077 55.7978 77.0371 56.1971 77.4035C57.0642 78.1983 58.178 78.524 59.1537 78.7373C59.9044 78.9021 60.6453 78.9825 61.3627 78.9825C62.8796 78.9825 64.2899 78.619 65.4654 77.9085C66.3041 77.4016 67.0538 76.5835 67.6449 75.6093C67.8876 75.8827 69.0092 77.0827 70.6809 77.9075C71.548 78.336 72.6461 78.6975 73.8822 78.6975C75.1183 78.6975 76.5178 78.3292 77.9487 77.2882C78.0162 77.2397 79.6134 76.062 80.5158 73.3179C81.0394 71.7253 81.2205 69.9263 81.0531 67.9722V67.9761Z" fill="${fillColor}"/>
      <path d="M50.3647 53.5479C53.6846 53.5479 56.3759 50.8824 56.3759 47.5944C56.3759 44.3064 53.6846 41.6409 50.3647 41.6409C47.0448 41.6409 44.3535 44.3064 44.3535 47.5944C44.3535 50.8824 47.0448 53.5479 50.3647 53.5479Z" fill="${fillColor}"/>
      <path d="M49.7849 51.8837C51.8107 51.8837 53.453 50.2572 53.453 48.2507C53.453 46.2443 51.8107 44.6178 49.7849 44.6178C47.759 44.6178 46.1167 46.2443 46.1167 48.2507C46.1167 50.2572 47.759 51.8837 49.7849 51.8837Z" fill="${fillColor}"/>
      <path d="M31.8491 53.5479C35.1689 53.5479 37.8602 50.8824 37.8602 47.5944C37.8602 44.3064 35.1689 41.6409 31.8491 41.6409C28.5292 41.6409 25.8379 44.3064 25.8379 47.5944C25.8379 50.8824 28.5292 53.5479 31.8491 53.5479Z" fill="${fillColor}"/>
      <path d="M31.2692 51.8837C33.2951 51.8837 34.9374 50.2572 34.9374 48.2507C34.9374 46.2443 33.2951 44.6178 31.2692 44.6178C29.2434 44.6178 27.6011 46.2443 27.6011 48.2507C27.6011 50.2572 29.2434 51.8837 31.2692 51.8837Z" fill="${fillColor}"/>
      </svg>
    `,

    dictionary: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 16.7399V4.66994C22 3.46994 21.02 2.57994 19.83 2.67994H19.77C17.67 2.85994 14.48 3.92994 12.7 5.04994L12.53 5.15994C12.24 5.33994 11.76 5.33994 11.47 5.15994L11.22 5.00994C9.44 3.89994 6.26 2.83994 4.16 2.66994C2.97 2.56994 2 3.46994 2 4.65994V16.7399C2 17.6999 2.78 18.5999 3.74 18.7199L4.03 18.7599C6.2 19.0499 9.55 20.1499 11.47 21.1999L11.51 21.2199C11.78 21.3699 12.21 21.3699 12.47 21.2199C14.39 20.1599 17.75 19.0499 19.93 18.7599L20.26 18.7199C21.22 18.5999 22 17.6999 22 16.7399Z" fill="${fillColor}" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 5.48999V20.49" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7.75 8.48999H5.5" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.5 11.49H5.5" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,

    refresh: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.8901 5.08002C14.0201 4.82002 13.0601 4.65002 12.0001 4.65002C7.21008 4.65002 3.33008 8.53002 3.33008 13.32C3.33008 18.12 7.21008 22 12.0001 22C16.7901 22 20.6701 18.12 20.6701 13.33C20.6701 11.55 20.1301 9.89002 19.2101 8.51002" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16.13 5.32L13.24 2" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16.13 5.31995L12.76 7.77995" stroke="${fillColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,

    happy: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15.5 9.75C16.3284 9.75 17 9.07843 17 8.25C17 7.42157 16.3284 6.75 15.5 6.75C14.6716 6.75 14 7.42157 14 8.25C14 9.07843 14.6716 9.75 15.5 9.75Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.5 9.75C9.32843 9.75 10 9.07843 10 8.25C10 7.42157 9.32843 6.75 8.5 6.75C7.67157 6.75 7 7.42157 7 8.25C7 9.07843 7.67157 9.75 8.5 9.75Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.4 13.3H15.6C16.1 13.3 16.5 13.7 16.5 14.2C16.5 16.69 14.49 18.7 12 18.7C9.51 18.7 7.5 16.69 7.5 14.2C7.5 13.7 7.9 13.3 8.4 13.3Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,

    normal: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7 8.25C8 9.25 9.63 9.25 10.64 8.25" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M13.36 8.25C14.36 9.25 15.99 9.25 17 8.25" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.4 13H15.6C16.1 13 16.5 13.4 16.5 13.9C16.5 16.39 14.49 18.4 12 18.4C9.51 18.4 7.5 16.39 7.5 13.9C7.5 13.4 7.9 13 8.4 13Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,

    sad: `
     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7 8.75C8 7.75 9.63 7.75 10.64 8.75" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M13.36 8.75C14.36 7.75 15.99 7.75 17 8.75" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8.4 17.7H15.6C16.1 17.7 16.5 17.3 16.5 16.8C16.5 14.31 14.49 12.3 12 12.3C9.51 12.3 7.5 14.31 7.5 16.8C7.5 17.3 7.9 17.7 8.4 17.7Z" stroke="${fillColor}" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
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