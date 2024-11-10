import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ClusterProvider } from '../components/solana/cluster-provider.tsx'
import { SolanaProvider } from '../components/solana/solana-provider'
import { AppRoutes } from './app-routes'

const client = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={client}>
      <ClusterProvider>
        <SolanaProvider>
          <AppRoutes />
        </SolanaProvider>
      </ClusterProvider>
    </QueryClientProvider>
  )
}
