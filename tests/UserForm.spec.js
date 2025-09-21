import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import UserForm from '../src/views/users/UserForm.vue'

// Mock Vue Router
const mockRouter = {
  push: jest.fn()
}

// Create a mock store
const createMockStore = () => {
  return createStore({
    modules: {
      user: {
        namespaced: true,
        getters: {
          userById: () => (id) => ({
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1-555-0123',
            address: '123 Main St',
            dateOfBirth: '1990-01-01',
            riskProfile: 'Moderate'
          })
        },
        actions: {
          addUser: jest.fn(),
          updateUser: jest.fn()
        }
      }
    }
  })
}

describe('UserForm', () => {
  let wrapper
  let store

  beforeEach(() => {
    store = createMockStore()
    wrapper = mount(UserForm, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter
        }
      }
    })
  })

  it('renders the form correctly', () => {
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[id="name"]').exists()).toBe(true)
    expect(wrapper.find('input[id="email"]').exists()).toBe(true)
    expect(wrapper.find('input[id="phone"]').exists()).toBe(true)
    expect(wrapper.find('textarea[id="address"]').exists()).toBe(true)
    expect(wrapper.find('input[id="dateOfBirth"]').exists()).toBe(true)
    expect(wrapper.find('select[id="riskProfile"]').exists()).toBe(true)
  })

  it('validates required fields', async () => {
    const form = wrapper.find('form')
    await form.trigger('submit.prevent')

    expect(wrapper.vm.errors.name).toBe('Name is required')
    expect(wrapper.vm.errors.email).toBe('Email is required')
    expect(wrapper.vm.errors.phone).toBe('Phone number is required')
    expect(wrapper.vm.errors.address).toBe('Address is required')
    expect(wrapper.vm.errors.dateOfBirth).toBe('Date of birth is required')
    expect(wrapper.vm.errors.riskProfile).toBe('Risk profile is required')
  })

  it('validates email format', async () => {
    await wrapper.find('input[id="email"]').setValue('invalid-email')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.vm.errors.email).toBe('Please enter a valid email address')
  })

  it('loads user data when editing', () => {
    const editWrapper = mount(UserForm, {
      props: { id: 1 },
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter
        }
      }
    })

    expect(editWrapper.vm.form.name).toBe('John Doe')
    expect(editWrapper.vm.form.email).toBe('john@example.com')
    expect(editWrapper.vm.isEdit).toBe(true)
  })
})

