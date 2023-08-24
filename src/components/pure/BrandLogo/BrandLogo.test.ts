import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import BrandLogo from './BrandLogo.vue'
import appHeaderModels from '@/data/appHeader.models'

describe('Brand Logo component', async () => {

  test('Normal imports as expected', async () => {
    const cmp = await import('./BrandLogo.vue')
    expect(cmp).toBeDefined()
  })

  test('Mount BrandLogo component with Plesk360', async () => {
    expect(BrandLogo).toBeTruthy()

    const wrapper = mount(BrandLogo, {
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

    await wrapper.get('#icon').trigger('click')
    expect(wrapper.get('#icon')).toBeTruthy()
    expect(wrapper.element).toMatchSnapshot()
  })

  test('Mount BrandLogo component with 360monitoring', async () => {
    expect(BrandLogo).toBeTruthy()

    const wrapper = mount(BrandLogo, {
      props: {
        config: {
          ...appHeaderModels['threeSixtyNixstats'],
          user: {
            email: 'john.doe@gmail.com',
            plan: ''
          }
        }
      }
    })

    await wrapper.get('#icon_2').trigger('click')
    expect(wrapper.get('#icon_2')).toBeTruthy()
    expect(wrapper.element).toMatchSnapshot()
  })

  test('Mount BrandLogo component with logo', async () => {
    expect(BrandLogo).toBeTruthy()

    const wrapper = mount(BrandLogo, {
      props: {
        config: {
          ...appHeaderModels['threeSixtyNixstats'],
          user: {
            email: 'john.doe@gmail.com',
            plan: ''
          }
        }
      }
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
