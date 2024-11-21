import { defineStore } from 'pinia'

export const useUserStore = defineStore('users', {
  state: () => ({
    isAuthenticated: false,
    user: {}, // Simplified initialization
    failedRefreshAttempts: 0,
    country: '',
    userZone: '',
    paymentDetails: {}, // Simplified initialization
    otpEmail: '',
    event: {} // Simplified initialization
  }),
  actions: {
    logout() {
      this.isAuthenticated = false
      this.user = {}
      this.country = ''
      this.userZone = ''
    },
    clearPaymentDetails() {
      this.paymentDetails = {}
    }
  },
  persist: true // Requires the persist plugin (setup below)
})
