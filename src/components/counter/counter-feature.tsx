import { useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'
import { ellipsify } from '../ui/ui-layout'
import { useCounterProgram } from './counter-data-access'
import { CounterCreate, CounterList } from './counter-ui'
import { ExplorerLink } from '@/components/solana/explorer-link.tsx'

export default function CounterFeature() {
  const { publicKey } = useWallet()
  const { programId } = useCounterProgram()

  return publicKey ? (
    <div>
      <p className="mb-6">
        <ExplorerLink path={`account/${programId}`} label={ellipsify(programId.toString())} />
      </p>
      <CounterCreate />
      <CounterList />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  )
}
