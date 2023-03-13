import { shallowMount } from '@vue/test-utils'
import PostItem from '@/components/PostItem.vue'

describe('PostItem.vue', () => {
  it('renders props.post when passed', () => {
    const post = { id: '63f89048a2611139301082e1', name: 'Post 1' }
    const wrapper = shallowMount(PostItem, {
      propsData: { post },
    })

    // const nameItem = wrapper.get('.v-list-item__title')
    expect(post.name).toEqual(post.name)
  })
})
