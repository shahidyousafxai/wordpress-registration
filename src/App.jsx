import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import Router from '@/router'
import { queryClient } from '@/network/query.config'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  )
}

export default App
