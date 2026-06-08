import { clearMediaKitAuthCookie } from '@/network/mediaKit/mediaKitAuthCookie'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

const AUTH_STORAGE_KEY = 'ilola-auth'

export const useAuthStore = create(
  persist(
    immer((set) => ({
      currentUser: null,
      accessToken: null,
      mediaKitUserId: null,
      mediaKitUrl: null,
      mediaKitSession: null,
      registrationComplete: false,
      setAuth: (user, token) =>
        set((state) => {
          state.currentUser = user
          state.accessToken = token
        }),
      setMediaKit: (mediaKit) =>
        set((state) => {
          state.mediaKitUserId = mediaKit?.userId ?? null
          state.mediaKitUrl = mediaKit?.url ?? null
          state.mediaKitSession = mediaKit?.session ?? null
        }),
      completeRegistration: () =>
        set((state) => {
          state.registrationComplete = true
        }),
      updateUser: (updates) =>
        set((state) => {
          if (state.currentUser) {
            Object.assign(state.currentUser, updates)
          }
        }),
      clearAuth: () => {
        clearMediaKitAuthCookie()
        set((state) => {
          state.currentUser = null
          state.accessToken = null
          state.mediaKitUserId = null
          state.mediaKitUrl = null
          state.mediaKitSession = null
          state.registrationComplete = false
        })
      },
    })),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentUser: state.currentUser,
        accessToken: state.accessToken,
        mediaKitUserId: state.mediaKitUserId,
        mediaKitUrl: state.mediaKitUrl,
        mediaKitSession: state.mediaKitSession,
        registrationComplete: state.registrationComplete,
      }),
    }
  )
)
