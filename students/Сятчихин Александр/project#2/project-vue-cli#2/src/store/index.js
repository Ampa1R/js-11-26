import Vue from 'vue'
import Vuex from 'vuex'
import { get, post, put, deleteReq } from '@/core/requests';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    basket: []
  },
  mutations: {
    basket_load: (state, payload) => {
      state.basket = payload;
    },
    basket_add: (state, item) => {
      state.basket.push(item);
    },
    basket_remove: (state, item) => {
      state.basket.splice(state.basket.indexOf(item), 1);
    },
    basket_change: (state, payload) => {
      payload.item.amount += payload.amount;
    }
  },
  actions: {
    async loadBasket({ commit }, url) { // payload - массив товаров из джейсона
      let payload = (await get(url)).content; 
      commit('basket_load', payload);
    },
    changeBasketItems({ commit, state }, payload) {
      if (!payload.action) {
        let find = state.basket.find(el => el.productId == payload.item.productId);
        payload.action = find ? 3 : 1;
        payload.item = find ? find : Object.assign({}, payload.item, {amount: 1});
        payload.amount = 1;
      }

      switch (payload.action) {
        case 1: {
          post('/api/basket', payload.item)
            .then(res => {
                if(res.status) {
                  commit('basket_add', payload.item);
                }
            });
          break;
        }
        case 2: {
          deleteReq('/api/basket/' + payload.item.productId)
          .then(res => {
              if(res.status) {
                commit('basket_remove', payload.item);
              }
          });
        break;
        }
        case 3: {
          put('/api/basket/' + payload.item.productId, payload.amount)
            .then(res => {
                if(res.status) {
                  commit('basket_change', {item: payload.item, amount: payload.amount});
                }
            });
          break;
        }
      }
    }
  },
  getters: {
    basket_getter: state => state.basket,
  }
})
