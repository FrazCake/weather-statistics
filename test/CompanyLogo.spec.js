import { mount } from '@vue/test-utils'
import CompanyLogo from '~/components/CompanyLogo.vue'

describe('CompanyLogo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(CompanyLogo)
    expect(wrapper.vm).toBeTruthy()
  })
})
