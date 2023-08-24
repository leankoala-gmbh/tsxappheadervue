import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserAvatar from './UserAvatar.vue'

describe('UserAvatar.vue', () => {
  it('should render', () => {
    const wrapper = mount(UserAvatar)
    expect(wrapper).toBeTruthy()
  })
})
