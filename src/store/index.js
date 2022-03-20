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

    SET_TOTAL_POSTS(state, total_posts) {
      state.total_posts = total_posts;
    },

    INCREMENT_TOTAL_POSTS(state, increment = 1) {
      state.total_posts += increment;
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

      const count_query = `count(*[_type == "post"])`;

      sanity.fetch(count_query).then((count) => {
        commit('SET_TOTAL_POSTS', count);
      });
    },

    UpdatePost({ commit }, post) {
      commit(
        'SET_POSTS',
        this.state.posts.map((p) => (p._id === post._id ? post : p))
      );
    },
    AddNewPost({ commit }, post) {
      commit('SET_POSTS', [...this.state.posts, post]);
      commit('INCREMENT_TOTAL_POSTS');
    },
    RemovePost({ commit }, id) {
      commit(
        'SET_POSTS',
        this.state.posts.filter((p) => p._id !== id)
      );
      commit('INCREMENT_TOTAL_POSTS', -1);
    },

    LoadMorePosts({ commit }, limit = 10) {
      const query = `*[_type == "post"] {..., author -> } | order(_createdAt desc) [${
        this.state.posts.length
      }...${this.state.posts.length + limit}]`;

      sanity.fetch(query).then((posts) => {
        commit('SET_POSTS', [...this.state.posts, ...posts]);
      });
    },
  },
});
