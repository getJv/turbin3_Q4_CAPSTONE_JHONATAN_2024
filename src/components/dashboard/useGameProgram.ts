import { useConnection } from '@solana/wallet-adapter-react'
import { useCluster } from '@/components/solana/cluster-provider.tsx'
import { useTransactionToast } from '@/components/ui/ui-layout.tsx'
import { useAnchorProvider } from '@/components/solana/solana-provider.tsx'
import { useMemo } from 'react'
import { Cluster, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getGameProgram, getGameProgramId } from '@project/anchor'

interface CreateGameArgs {
  s
  gamer_id: string
  gamer_nickname: string
  owner: PublicKey
}

export function useGameProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getGameProgramId(cluster.network as Cluster), [cluster])
  const program = getGameProgram(provider)

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const createEntry = useMutation<string, Error, CreateGameArgs>({
    mutationKey: ['gameState', 'create', { cluster }],
    mutationFn: async ({ gamer_id, gamer_nickname }) => {
      return program.methods.createNewGame(gamer_id, gamer_nickname).rpc()
    },
    onSuccess: (signature) => {
      transactionToast(signature)
    },
    onError: (error) => {
      toast.error(`Failed to create journal entry: ${error.message}`)
    },
  })

  return {
    program,
    programId,
    getProgramAccount,
    createEntry,
  }
}
