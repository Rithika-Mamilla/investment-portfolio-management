<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center space-x-4 mb-4">
          <router-link
            to="/users"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </router-link>
          <h1 class="text-3xl font-bold text-gray-900">
            {{ isEdit ? 'Edit Client' : 'Add New Client' }}
          </h1>
        </div>
        <p class="text-gray-600">
          {{ isEdit ? 'Update client information' : 'Enter the client details below' }}
        </p>
      </div>

      <!-- Add Client Form -->
      <div class="bg-white rounded-lg shadow">
        <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
          <!-- Personal Information -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  :class="{ 'border-red-500': errors.name }"
                />
                <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  :class="{ 'border-red-500': errors.email }"
                />
                <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
              </div>

              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  :class="{ 'border-red-500': errors.phone }"
                />
                <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
              </div>

              <div>
                <label for="dateOfBirth" class="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  id="dateOfBirth"
                  v-model="form.dateOfBirth"
                  type="date"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  :class="{ 'border-red-500': errors.dateOfBirth }"
                />
                <p v-if="errors.dateOfBirth" class="mt-1 text-sm text-red-600">{{ errors.dateOfBirth }}</p>
              </div>
            </div>

            <div class="mt-6">
              <label for="address" class="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <textarea
                id="address"
                v-model="form.address"
                rows="3"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                :class="{ 'border-red-500': errors.address }"
              ></textarea>
              <p v-if="errors.address" class="mt-1 text-sm text-red-600">{{ errors.address }}</p>
            </div>
          </div>

          <!-- Investment Profile -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Investment Profile</h3>
            <div>
              <label for="riskProfile" class="block text-sm font-medium text-gray-700 mb-2">
                Risk Profile *
              </label>
              <select
                id="riskProfile"
                v-model="form.riskProfile"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                :class="{ 'border-red-500': errors.riskProfile }"
              >
                <option value="">Select risk profile</option>
                <option value="Conservative">Conservative</option>
                <option value="Moderate">Moderate</option>
                <option value="Aggressive">Aggressive</option>
              </select>
              <p v-if="errors.riskProfile" class="mt-1 text-sm text-red-600">{{ errors.riskProfile }}</p>
              
              <!-- Risk Profile Descriptions -->
              <div class="mt-3 space-y-2">
                <div v-if="form.riskProfile === 'Conservative'" class="p-3 bg-green-50 rounded-lg">
                  <p class="text-sm text-green-800">
                    <strong>Conservative:</strong> Lower risk, stable returns, suitable for capital preservation
                  </p>
                </div>
                <div v-if="form.riskProfile === 'Moderate'" class="p-3 bg-yellow-50 rounded-lg">
                  <p class="text-sm text-yellow-800">
                    <strong>Moderate:</strong> Balanced risk and return, suitable for steady growth
                  </p>
                </div>
                <div v-if="form.riskProfile === 'Aggressive'" class="p-3 bg-red-50 rounded-lg">
                  <p class="text-sm text-red-800">
                    <strong>Aggressive:</strong> Higher risk, potential for higher returns, suitable for growth
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <router-link
              to="/users"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </router-link>
            <button
              type="submit"
              :disabled="isLoading"
              class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <svg
                v-if="isLoading"
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isLoading ? 'Saving...' : (isEdit ? 'Update Client' : 'Create Client') }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'UserForm',
  props: {
    id: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        riskProfile: ''
      },
      errors: {},
      isLoading: false
    }
  },
  computed: {
    ...mapGetters('user', ['userById']),
    isEdit() {
      return !!this.id
    }
  },
  created() {
    if (this.isEdit) {
      this.loadUser()
    }
  },
  methods: {
    ...mapActions('user', ['addUser', 'updateUser']),
    loadUser() {
      const user = this.userById(parseInt(this.id))
      if (user) {
        this.form = { ...user }
      }
    },
    validateForm() {
      this.errors = {}
      
      if (!this.form.name.trim()) {
        this.errors.name = 'Name is required'
      }
      
      if (!this.form.email.trim()) {
        this.errors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
        this.errors.email = 'Please enter a valid email address'
      }
      
      if (!this.form.phone.trim()) {
        this.errors.phone = 'Phone number is required'
      }
      
      if (!this.form.address.trim()) {
        this.errors.address = 'Address is required'
      }
      
      if (!this.form.dateOfBirth) {
        this.errors.dateOfBirth = 'Date of birth is required'
      }
      
      if (!this.form.riskProfile) {
        this.errors.riskProfile = 'Risk profile is required'
      }
      
      return Object.keys(this.errors).length === 0
    },
    async handleSubmit() {
      if (!this.validateForm()) {
        return
      }
      
      this.isLoading = true
      
      try {
        if (this.isEdit) {
          await this.updateUser({ ...this.form, id: parseInt(this.id) })
        } else {
          await this.addUser(this.form)
        }
        
        this.$router.push('/users')
      } catch (error) {
        console.error('Error saving user:', error)
        // Handle error 
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>


