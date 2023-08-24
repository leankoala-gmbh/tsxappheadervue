import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from './AppHeader.ce.vue'

describe('App Header component', async () => {

  test('Normal imports as expected', async () => {
    const cmp = await import('./AppHeader.ce.vue')
    expect(cmp).toBeDefined()
  })

  test('Mount AppHeader component with smaller width', async () => {
    expect(AppHeader).toBeTruthy()

    const wrapper = mount(AppHeader, {
      props: {
        model: 'threeSixtyFSC',
        environment: 'stage',
        currentLanguage: 'en'
      }
    })

    expect(wrapper.text()).not.toContain('John Doe')
  })
})

