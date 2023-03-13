import { generateNextId } from './helpers'

const STORAGE_KEY = 'posts'
const NAME_MAX_LENGTH = 150

const getInitPosts = async () => {
  return fetch('/mock/posts.json')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      return data.posts
    })
    .catch(() => {
      return []
    })
}

const getPosts = async () => {
  const storedPosts = localStorage.getItem(STORAGE_KEY)

  if (!storedPosts) {
    return await getInitPosts()
  }

  try {
    return JSON.parse(storedPosts)
  } catch (e) {
    return []
  }
}

const savePosts = (posts) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}

let posts

const normalizeName = (name) => name.trim().slice(0, NAME_MAX_LENGTH)

export default {
  async getPosts() {
    if (!posts) {
      posts = await getPosts()
      savePosts(posts)
    }

    return posts
  },
  async addPost(post) {
    post.name = normalizeName(post.name)
    const newPost = { id: generateNextId(), ...post }
    posts.unshift(newPost)
    savePosts(posts)

    return newPost
  },
  async updatePost(updPost) {
    const postIndex = posts.findIndex((post) => post.id === updPost.id)
    updPost.name = normalizeName(updPost.name)
    posts[postIndex] = { ...updPost }
    savePosts(posts)

    return posts[postIndex]
  },
  async deletePost(postId) {
    const postIndex = posts.findIndex((post) => post.id === postId)
    posts.splice(postIndex, 1)
    savePosts(posts)
  },
}
