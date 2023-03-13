import api from '@/api/posts-storage'

const posts = {
  namespaced: true,

  state: {
    posts: [],
    query: '',
  },

  getters: {
    query: (state) => state.query,
    filteredPosts: (state) => {
      if (!state.query) {
        return state.posts
      }

      return state.posts.filter((post) =>
        post.name.toLowerCase().includes(state.query.toLowerCase())
      )
    },
  },

  mutations: {
    SET_POSTS: (state, posts) => {
      state.posts = [...posts]
    },
    ADD_POST: (state, post) => {
      state.posts.unshift(post)
    },
    EDIT_POST: (state, post) => {
      const index = state.posts.findIndex((p) => p.id === post.id)
      state.posts.splice(index, 1, post)
    },
    DELETE_POST: (state, id) => {
      const index = state.posts.findIndex((post) => post.id === id)
      state.posts.splice(index, 1)
    },
    SET_QUERY: (state, query) => {
      state.query = query
    },
  },

  actions: {
    async fetchPosts({ commit }) {
      const posts = await api.getPosts()
      commit('SET_POSTS', posts)
    },
    async addPost({ commit }, post) {
      const addedPost = await api.addPost(post)
      commit('ADD_POST', addedPost)
    },
    async updatePost({ commit }, post) {
      const updatedPost = await api.updatePost(post)
      commit('EDIT_POST', updatedPost)
    },
    async deletePost({ commit }, { id }) {
      await api.deletePost(id)
      commit('DELETE_POST', id)
    },
    async setQuery({ commit }, query) {
      commit('SET_QUERY', query)
    },
  },
}

export default posts
