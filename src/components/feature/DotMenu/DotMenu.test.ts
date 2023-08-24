import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import DotMenu from './DotMenu.vue'
import appHeaderModels from '@/data/appHeader.models'

describe('Dot Menu component', async () => {

  test('Normal imports as expected', async () => {
    const cmp = await import('./DotMenu.vue')
    expect(cmp).toBeDefined()
  })

  test('Mount DotMenu component', async () => {
    expect(DotMenu).toBeTruthy()

    const wrapper = mount(DotMenu, {
      props: {
        config: appHeaderModels['threeSixtyFSC']
      }
    })

    await wrapper.get('button').trigger('click')
    expect(wrapper.html()).toContain('Plesk360')
  })

  test('Mount DotMenu component with Standard width', async () => {
    expect(DotMenu).toBeTruthy()

    const wrapper = mount(DotMenu, {
      props: {
        config: appHeaderModels['threeSixtyFSC'],
        width: 1300
      }
    })

    await wrapper.get('button').trigger('click')
    expect(wrapper.find('.hidden').isVisible()).toBe(true)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('Mount DotMenu component with smaller width', async () => {
    expect(DotMenu).toBeTruthy()

    const wrapper = mount(DotMenu, {
      props: {
        config: appHeaderModels['threeSixtyFSC'],
        width: 700
      }
    })

    await wrapper.get('button').trigger('click')
    expect(wrapper.html()).toContain('Dashboard')
    expect(wrapper.element).toMatchSnapshot()
  })
})
