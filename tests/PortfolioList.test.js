import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import PortfolioList from '../src/views/portfolios/PortfolioList.vue'

// Mock Vue Router
const mockRouter = {
  push: jest.fn()
}

// Create a mock store
const createMockStore = () => {
  return createStore({
    modules: {
      portfolio: {
        namespaced: true,
        getters: {
          allPortfolios: () => [
            {
              id: 1,
              name: 'Test Portfolio 1',
              clientName: 'Rajesh Kumar',
              status: 'ACTIVE',
              totalValue: 100000,
              returns: 10000,
              returnPercentage: 10.0,
              riskLevel: 'Moderate',
              createdAt: '2024-01-01',
            },
            {
              id: 2,
              name: 'Test Portfolio 2',
              clientName: 'Priya Sharma',
              status: 'UPCOMING',
              totalValue: 0,
              returns: 0,
              returnPercentage: 0,
              riskLevel: 'Conservative',
              createdAt: '2024-01-02',
            }
          ]
        }
      }
    }
  })
}

describe('PortfolioList', () => {
  let wrapper
  let store

  beforeEach(() => {
    store = createMockStore()
    wrapper = mount(PortfolioList, {
      global: {
        plugins: [store],
        mocks: {
          $router: mockRouter
        }
      }
    })
  })

  it('renders the portfolio list correctly', () => {
    expect(wrapper.find('h1').text()).toBe('Portfolios')
    expect(wrapper.find('input[placeholder*="Search"]').exists()).toBe(true)
    expect(wrapper.find('select').exists()).toBe(true)
  })

  it('displays all portfolios by default', () => {
    const portfolioRows = wrapper.findAll('tbody tr')
    expect(portfolioRows.length).toBe(2)
  })

  it('filters portfolios by status', async () => {
    const statusSelect = wrapper.find('select')
    await statusSelect.setValue('ACTIVE')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.filteredPortfolios.length).toBe(1)
    expect(wrapper.vm.filteredPortfolios[0].status).toBe('ACTIVE')
  })

  it('filters portfolios by risk level', async () => {
    wrapper.vm.riskFilter = 'Conservative'
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.filteredPortfolios.length).toBe(1)
    expect(wrapper.vm.filteredPortfolios[0].riskLevel).toBe('Conservative')
  })

  it('shows empty state when no portfolios match filters', async () => {
    const searchInput = wrapper.find('input[placeholder*="Search"]')
    await searchInput.setValue('NonExistent')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.filteredPortfolios.length).toBe(0)
    expect(wrapper.text()).toContain('No portfolios found')
  })

  it('navigates to portfolio detail when row is clicked', async () => {
    const portfolioRow = wrapper.find('tbody tr')
    await portfolioRow.trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith('/portfolios/1')
  })
})
