import { createStore } from 'vuex'
import user from './user'
import portfolio from './portfolio'

export default createStore({
  modules: {
    user,
    portfolio
  }
})


