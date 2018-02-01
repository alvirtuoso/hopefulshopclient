import axios from 'axios'
import {API_DNS, DNS_ADD, DNS_DELETE_BY_ID, DNS_DELETE_BY_EMAIL, DNS_UPDATE, DNS_FIND_BY_EMAIL, DNS_FIND_BY_URL_SUBNAME, DNS_FIND_BY_AMAZON_ID } from './Constants'

export default{
    saveDns(dns){
        return axios.put(DNS_ADD, dns)
    },
    deleteDnsByEmail(email){
        return axios.delete(DNS_DELETE_BY_EMAIL + email)
    },
    getDnsbyEmail(email){
       return axios.get(DNS_FIND_BY_EMAIL + email)
    },
    getDnsByAmazonAssocId(id){
        return axios.get(DNS_FIND_BY_AMAZON_ID + id)
    },
    getDnsByUrlSubname(name){
        return axios.get(DNS_FIND_BY_URL_SUBNAME + name)
    },
    getDomain(url, subdomain) {
            // getDomain('http://www.example.com'); // example.com
           // getDomain('www.example.com'); // example.com
           // getDomain('http://blog.example.com', true); // blog.example.com
           // getDomain(location.href); // ..
        subdomain = subdomain || false;

        url = url.replace(/(https?:\/\/)?(www.)?/i, '');

        if (!subdomain) {
            url = url.split('.');

            url = url.slice(url.length - 2).join('.');
        }

        if (url.indexOf('/') !== -1) {
            return url.split('/')[0];
        }

        return url;
    },

}