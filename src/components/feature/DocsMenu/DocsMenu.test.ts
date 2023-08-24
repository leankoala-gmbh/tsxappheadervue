import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DocsMenu from './DocsMenu.vue'

describe('DocsMenu.vue', () => {
  it('should render', () => {
    const wrapper = mount(DocsMenu)
    expect(wrapper).toBeTruthy()
  })
})
