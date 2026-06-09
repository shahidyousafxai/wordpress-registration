import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { appEnv } from '@/network/env'
import { queryKeys } from '@/network/http'
import { useAuthStore } from '@/store/useAuthStore'
import { setMediaKitAuthCookie } from '@/network/mediaKit/mediaKitAuthCookie'
import { loginFn, registerFn } from './authFns'

export function useLoginMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: loginFn,
    onSuccess: ({ user, token }) => {
      useAuthStore.getState().setAuth(user, token)
      void queryClient.invalidateQueries({ queryKey: queryKeys.auth.all })
      window.location.assign(appEnv.influencerDashboardUrl)
    },
  })
}

export function useRegisterMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: registerFn,
    onSuccess: ({ user, token, mediaKit }) => {
      useAuthStore.getState().setAuth(user, token)
      useAuthStore.getState().setMediaKit(mediaKit)
      setMediaKitAuthCookie(mediaKit?.session)
      useAuthStore.getState().completeRegistration()
      void queryClient.invalidateQueries({ queryKey: queryKeys.auth.all })
      toast.success('Account created successfully')
    },
  })
}
