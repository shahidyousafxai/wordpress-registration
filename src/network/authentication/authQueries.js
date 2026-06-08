import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { queryKeys } from '@/network/http'
import { messageFromAxiosError } from '@/utils'
import { useAuthStore } from '@/store/useAuthStore'
import { loginFn, registerFn } from './authFns'

export function useLoginMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: loginFn,
    onSuccess: ({ user, token }) => {
      useAuthStore.getState().setAuth(user, token)
      void queryClient.invalidateQueries({ queryKey: queryKeys.auth.all })
      toast.success('Welcome back!')
    },
    onError: (error) => {
      toast.error(messageFromAxiosError(error, 'Login failed'))
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
      useAuthStore.getState().completeRegistration()
      void queryClient.invalidateQueries({ queryKey: queryKeys.auth.all })
      toast.success('Account created successfully')
    },
    onError: (error) => {
      toast.error(messageFromAxiosError(error, 'Registration failed'))
    },
  })
}
