export const API_URL = () => {
  if(window.location.href.includes('ma-cloud')) {
    return 'http://30472.hosts1.ma-cloud.nl/php-portfolio-dash/api'
  } else {
    return 'http://127.0.0.1/php-portfolio-dash/api'
  }
};