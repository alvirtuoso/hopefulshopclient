import axios from 'axios'
// import Vue from 'vue'
import Vuex from 'vuex';
import { ITEMS_URI, ITEM_URI, CART } from '../services/Constants'
// import {router} from '../main';
import router from '@/router'
import mixin from '@/helpers/mixin'
// import { createModule } from 'vuex-toast'
import LogSvc from '../services/LogSvc'
import { LOG_TYPE_ERROR, LOG_TYPE_INFO, LOG_TYPE_WARNING } from '../services/Constants'

const state = {
    item: {},
    itemList:[],
    cartItems: [],
    keywordList:[],
    viewedItems:[],
    keyword: '',
    currentPage: 1,
    loading: false,
    error: '',
    selectedItem: {},
    selectedItems:[],
    searchBegan: false,
    country: '',
    user: {},
    authError: null
  }
//   modules: {
//     // notification setting
//     toast: createModule({
//       dismissInterval: 4000
//     })
//   },
const mutations = {
    SetItemList: function(state, { list }){
        state.itemList = list
    },
    SetCountry: function(state, country){
        state.country = country
    },
    SetUser (state, value) {
      state.user = value;
    },
    SetAuthError(state, value){
      state.authError = value
    },
    SetCartItems: function(state, { params }){
        var exists = false
        if(params.action === 'add'){
            for(var i=0; i < state.cartItems.length; i++) {
                if(state.cartItems[i].OfferListingId == params.item.OfferListingId)
                {
                    exists = true
                    state.cartItems[i].quantity = state.cartItems[i].quantity + params.item.quantity
                    break;
                }
            }
            if(!exists){
                state.cartItems.push(params.item)
            }
        }
        else if(params.action == 'update')
        {
            state.cartItems[params.index].quantity = params.item.quantity
        }
        else{  // params.action == 'remove'
            for(var i=0; i < state.cartItems.length; i++) {
                if(state.cartItems[i].offerListingId == params.offerListingId)
                {
                    state.cartItems.splice(i,1);
                }
            }
        }
    },
    SetLoading: function(state, result){
        state.loading = result;
    },
    SetSearchBegan: function(state, result){
        state.searchBegan = result;
    },    
    SetError: function(state, result){
        state.error = result;
    },
    SetItem: function(state, { item }){
        state.item = item
    },
    SetKeyword: function(state, { keyword }){
        state.keyword = keyword
    },
    SetCurrentPage: function(state, { pageNumber }){
        state.currentPage = pageNumber;
    },
    SetSelectedItem: function(state, { selectedItem }){
        state.selectedItem = selectedItem;
    },
    SetSelectedItemAndGo: function(state, { selectedItem }){
        state.selectedItem = selectedItem
    },
    SetSelectedItems: function(state, { selectedItem}){
        var exists = false;
        if(state.selectedItems){
            if(state.selectedItems.length > 0){
                for (var i = 0; i < state.selectedItems.length; i++){
                    if(state.selectedItems[i] == selectedItem){
                        exists = true;
                        break;
                    }
                }
            }
            if(!exists){
                var id = mixin.methods.guid();
                state.selectedItems.push({viewed: selectedItem, id: id})
            }
        }
    },
    SetKeywordList: function(state, { wordsArray }){
        state.keywordList = wordsArray
    },
    ArchiveKeyword: function(state, { keyword }){
        var exists = false;
        if(state.keywordList){
            if(state.keywordList.length > 0){
                for (var i = 0; i < state.keywordList.length; i++){
                    if(state.keywordList[i].keyword == keyword){
                        exists = true;
                        break;
                    }
                }
            }
            if(!exists){
                var id = mixin.methods.guid();
                state.keywordList.push({keyword: keyword, id: id})

            }
        }
    },
    UnArchiveKeyword: function(state, {keyword}){
        if(state.keywordList.length > 0){
            for(var i = 0; i<state.keywordList.length; i++){
                if(state.keywordList[i].keyword == keyword){
                    state.keywordList.splice(i, 1);
                    break;
                }
            }
        }
    },
  }

const actions = {
    FetchData({commit, state}, params){
         // Clear any error
        commit('SetError', '')
        commit('SetSearchBegan', true)

        axios.get(ITEMS_URI + params.keyword + `/` + params.page.toString() + `/` + params.country).then(resp => {
          if(resp.status == 200 && (typeof resp.data == "object")){
                commit('SetLoading', false)
                commit('SetItemList', {list: resp.data})
                // Work on the same keyword during pagination or selecting item.
                if(params.page == 1){
                    commit('SetKeyword', {keyword: params.keyword})
                    commit('ArchiveKeyword', {keyword: params.keyword})
                    commit('SetCurrentPage', {pageNumber: params.page})
                }
         }
         else{
                // Search 0 result
                commit('SetLoading', false)
                commit('SetItemList', {list: []})
                commit('SetKeyword', {keyword: params.keyword})
            }
        }
        ,(err) => {
            commit('SetLoading', false)
            commit('SetError', err.toString())
            LogSvc.addLog({"LogType": LOG_TYPE_ERROR, "Note": 'store.js FetchData' + err.toString(), "user": state.user})
             console.log("FetchData error:", err.toString())
         })


    },
    ProceedToCheckout({commit}, params){
        commit('SetError', '')
        var cartItems = params.items
        var id = (params.id) ? params.id : ''
        var itemArray = [];
        for(var i=0; i < cartItems.length; i++){
            // Remove item objects. Amazon api only needs offerListingId & quantity
            itemArray.push({OfferListingId: cartItems[i].OfferListingId, Quantity: cartItems[i].quantity})
        }
        axios.post(CART, {items: itemArray, id: id, country: params.country})//.then(resp => {
           .then(response => {
               console.log('respcheckout', response)
              if(response.data.purchaseURL){
                window.location.href = response.data.purchaseURL
              }else{
                commit('SetError', "System error. Try again later!")
                commit('SetLoading', false)
              }
           })
            .catch(error => {
                console.log('error checkout', error)
                commit('SetLoading', false)
                commit('SetError', error.toString() + '......Try again later!')
                LogSvc.addLog({"LogType": LOG_TYPE_ERROR, "Note": 'store.js ProceedToCheckout()' + error.toString(), "user": state.user})
            });
    },
    UpdateCartItems({commit}, params){
        commit('SetCartItems', {params})
    },
    FetchItem({commit}, params){ // asin, country){
        console.log("fect item",)
        commit('SetError', '')

        axios.get(ITEM_URI + params.asin + `/` + params.country).then(resp => {
           if(resp.status == 200 && (typeof resp.data == "object")){
                commit('SetLoading', false)
                commit('SetSelectedItemAndGo', {selectedItem: resp.data})
                commit('SetSelectedItems', {selectedItem: resp.data})
                // Go to detail comp
                router.push('detail')
           }
           commit('SetLoading', false)
         }, (err) => {
             commit('SetLoading', false)
             commit('SetError', err.toString())
             LogSvc.addLog({"LogType": LOG_TYPE_ERROR, "Note": 'store.js FetchData' + err.toString(), "user": state.user})
        })
    },
    SetLoadingFlag({commit}, loading){
        commit('SetLoading', loading)
    },

    DetectCountry({commit}, country){
        var url = 'https://freegeoip.net/json/'; //'http://api.wipmania.com/jsonp?callback=?'
        axios.get(url).then(
            function(response){
                if(response.status == 200){
                    commit('SetCountry', response.data.country_code)
                }
            }
        ).catch((error) => {
            console.log('Country location undetected', error);
            LogSvc.addLog({"LogType": LOG_TYPE_ERROR, "Note": 'store.js DetectCountry' + err.toString(), "user": state.user})
             commit('SetCountry', 'US')
        })
    },
    SetKeywordsWithArray({commit}, wordsArray){
        commit('SetKeywordList', {wordsArray})
    },
    ClearError({commit}){
         commit('SetError', '')
    },
    SetErrorInfo({commit}, err){
        commit('SetError', err.toString())
   },
    FindAuthError({commit}, err){
        commit('SetAuthError', err)
    },
    RemoveKeyword({commit}, keyword){
        commit('UnArchiveKeyword', {keyword})
    },
    SetCurrentUser({commit}, user){
        commit('SetUser', user)
    },
    SaveSelectedItem({commit}, selectedItem){
        commit('SetSelectedItem', {selectedItem})
    },
    ViewItemDetail({commit}, selectedItem){
        commit('SetSelectedItemAndGo', {selectedItem})
        // Go to detail comp
        router.push('detail')
    },
    UpdateKeyword({commit}, word){
        commit('SetKeyword', {keyword: word})
    },
    SaveKeywordToArchive({commit}, wordAndId){
            commit('ArchiveKeyword', {wordAndId})
    },
    SetActivePage({commit}, pageNumber){
        commit('SetCurrentPage', {pageNumber})
    },
    ChangeSelectedItemId({commit}, selectedItemId){
        commit('SetSelectedItemId', { selectedItemId })
    }
  }

  export default {
    state,
    mutations,
    actions
}
