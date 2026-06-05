import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

const AUTH_STORAGE_KEY = 'ilola-auth'

export const useAuthStore = create(
  persist(
    immer((set) => ({
      currentUser: null,
      accessToken: null,
      setAuth: (user, token) =>
        set((state) => {
          state.currentUser = user
          state.accessToken = token
        }),
      updateUser: (updates) =>
        set((state) => {
          if (state.currentUser) {
            Object.assign(state.currentUser, updates)
          }
        }),
      clearAuth: () =>
        set((state) => {
          state.currentUser = null
          state.accessToken = null
        }),
    })),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentUser: state.currentUser,
        accessToken: state.accessToken,
      }),
    }
  )
)
