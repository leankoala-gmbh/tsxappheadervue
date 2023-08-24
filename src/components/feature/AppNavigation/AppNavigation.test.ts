import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import AppNavigation from './AppNavigation.vue'
import appHeaderModels from '@/data/appHeader.models'

describe('App Navigation component', async () => {

  test('Normal imports as expected', async () => {
    const cmp = await import('./AppNavigation.vue')
    expect(cmp).toBeDefined()
  })

  test('Mount AppNavigation component with User', async () => {
    expect(AppNavigation).toBeTruthy()

    const wrapper = mount(AppNavigation, {
      props: {
        config: {
          ...appHeaderModels['threeSixtyFSC'],
          user: {
            email: 'john.doe@gmail.com',
            plan: ''
          }
        }
      }
    })

    expect(wrapper.text()).toContain('Full Site Check')
    expect(wrapper.text()).toContain('Servers')
    expect(wrapper.element).toMatchSnapshot()
  })

  test('Mount AppNavigation component without User', async () => {
    expect(AppNavigation).toBeTruthy()

    const wrapper = mount(AppNavigation, {
      props: {
        config: {
          ...appHeaderModels['threeSixtyNixstats'],
          baseUrl: {
            stage: 'http://localhost:3000',
            production: 'https://plesk.com'
          }
        }
      }
    })
    expect(wrapper.text()).toContain('Full Site Check')
    expect(wrapper.text()).toContain('Servers')
    expect(wrapper.element).toMatchSnapshot()
  })
})

