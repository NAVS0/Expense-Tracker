import { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'

// Configure API base URL from env for production deployments
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/'
})

// Initial State
const initialState = {
  transactions: [],
  error: null,
  loading: true,
}

// Create Context
export const GlobalContext = createContext(initialState)

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  // Actions
  // Get Transactions
  async function getTransactions() {
    try {
      const res = await api.get('/api/v1/transactions')

      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data,
      })
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error,
      })
    }
  }

  // Delete Transaction
  async function deleteTransaction(id) {
    try {
      await api.delete(`/api/v1/transactions/${id}`)

      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id,
      })
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error,
      })
    }
  }

  // Add Transaction
  async function addTransaction(transaction) {
    try {
      const res = await api.post('/api/v1/transactions', transaction)

      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data,
      })
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error,
      })
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
