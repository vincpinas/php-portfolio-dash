export const API_URL = () => {
  if(window.location.href.includes('ma-cloud')) {
    return ''
  } else {
    return 'http://127.0.0.1'
  }
};