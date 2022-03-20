import { createStore } from 'vuex';
import sanity from '../client';

export default createStore({
  state: {
    menu_is_active: false,
    posts: [],
    authors: [],
    total_posts: 0,
  },
  getters: {
    posts: (state) =>
      state.posts.sort(
        (a, b) =>
          new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
      ),
  },
  mutations: {
    TOGGLE_MENU(state, dir = null) {
      if (dir === 'open') {
        state.menu_is_active = true;
      } else if (dir === 'close') {
        state.menu_is_active = false;
      } else {
        state.menu_is_active = !state.menu_is_active;
      }
    },
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
  },
  actions: {
    ToggleMenu({ commit }) {
      commit('TOGGLE_MENU');
    },
    FetchPosts({ commit }, limit = null) {
      const query = `*[_type == "post"] { ..., author-> } | order(_createdAt desc) ${
        limit ? `[0...${limit}]` : ''
      }`;

      sanity.fetch(query).then((posts) => {
        commit('SET_POSTS', posts);
      });
    },
  },
});
