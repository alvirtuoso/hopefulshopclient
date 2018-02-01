// *****  AMAZON   ******
export const API_AMAZON = 'https://api.hopeful.shop/api/amazon/'; //'http://127.0.0.1:5000/api/amazon/'; // 
export const ITEMS_URI = API_AMAZON + 'items/';
export const ITEM_URI = API_AMAZON + 'item/';
export const REVIEWS = API_AMAZON +  'reviews/';
export const CART = API_AMAZON +  'cart';
export const AMAZON_DEFAULT_ID = 'glow0c1-20';
// ***** USER   ******
export const API_USER = 'https://api.hopeful.shop/api/user/'; //'http://127.0.0.1:5000/api/user/'; //
export const USER_DELETE_BY_ID = API_USER + 'delete/';
export const USER_ADD = API_USER + 'add/';
export const USER_UPDATE = API_USER + 'update/';
export const FIND_USER_BY_EMAIL = API_USER + 'findbyemail/';
export const IS_EXISTING_USER = API_USER + 'isexisting/';
export const SEND_MAIL = API_USER + 'send/';

// *****  DNS   ******
export const API_DNS = 'https://api.hopeful.shop/api/dns/';  //'http://127.0.0.1:5000/api/dns/';
export const DNS_DELETE_BY_ID = API_DNS + 'delete/';
export const DNS_DELETE_BY_EMAIL = API_DNS + 'delete/';
export const DNS_ADD = API_DNS + 'add/';
export const DNS_UPDATE = API_DNS + 'update/';
export const DNS_FIND_BY_EMAIL = API_DNS + 'findbyemail/';
export const DNS_FIND_BY_AMAZON_ID = API_DNS + 'findbyamazonid/';
export const DNS_FIND_BY_URL_SUBNAME = API_DNS + 'findbyurlsubname/';

// *****  LOGCLIENT   ******
export const API_LOGCLIENT = 'https://api.hopeful.shop/api/LogClient/' //'http://127.0.0.1:5000/api/LogClient/';
export const LOGCLIENT_ADD = API_LOGCLIENT + 'add/';
export const LOGCLIENT_DELETE = API_LOGCLIENT + 'delete/';

// *****  LOG_TYPE   ******
export const LOG_TYPE_ERROR = 'ERROR';
export const LOG_TYPE_INFO = 'INFO';
export const LOG_TYPE_WARNING = 'WARNING';