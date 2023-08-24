import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import UserMenu from './UserMenu.vue'
import appHeaderModels from '@/data/appHeader.models'

describe('User Menu component', async () => {

  test('Normal imports as expected', async () => {
    const cmp = await import('./UserMenu.vue')
    expect(cmp).toBeDefined()
  })

  test('Mount UserMenu component', async () => {
    expect(UserMenu).toBeTruthy()

    const wrapper = mount(UserMenu, {
      props: {
        config: {
          ...appHeaderModels['threeSixtyFSC'],
          user: {
            name: 'john.doe@gmail.com'
          }
        },
        width: 1300
      }
    })

    expect(wrapper.text()).toContain('')
    expect(wrapper.element).toMatchSnapshot()
  })

  test('Mount UserMenu component with smaller width', async () => {
    expect(UserMenu).toBeTruthy()

    const wrapper = mount(UserMenu, {
      props: {
        config: {
          ...appHeaderModels['threeSixtyFSC'],
          user: {
            name: 'John Doe',
            plan: 'john.doe@gmail.com'
          }
        },
        width: 700
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
