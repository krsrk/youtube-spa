import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from "../config";

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    videos: [],
    loading: false,
  },
  getters: {
    VIDEOS: (state) => {
      return state.videos;
    },
    LOADING: (state) => {
      return state.loading;
    },
  },
  mutations: {
    SET_VIDEOS(state, data) {
      state.videos = data
    },
    SET_LOADING(state, data) {
      state.loading = data;
    },
  },
  actions: {
    getVideos: async (context) => {
      try {
        let {data} = await axios.get(config.ENDPOINT_QUERY_URL);
        context.commit('SET_VIDEOS', data.data);
      } catch (e) {
        console.log(e);
      }
    },
    addVideo: async (context, payload) => {
      try {
        await axios.post(config.ENDPOINT_ADD_URL, {
          video_link: payload,
        });
        await context.dispatch('getVideos');
      } catch (e) {
        console.log(e);
      }
    },
    deleteVideo: async (context, payload) => {
      try {
        await axios.post(config.ENDPOINT_DEL_URL, {
          video_id: payload,
        });
        await context.dispatch('getVideos');
      } catch (e) {
        console.log(e);
      }
    },
  },
  modules: {}
})
