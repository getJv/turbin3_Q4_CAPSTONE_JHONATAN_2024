import { useGameProgram } from '@/components/dashboard/dashboard-feature.tsx'
import { useWallet } from '@solana/wallet-adapter-react'
import { useState } from 'react'

export default function NewGameForm() {
  const { createEntry } = useGameProgram()
  const { publicKey } = useWallet()
  const [gamerId, setGamerId] = useState('')
  const [gamerNickname, setGamerNickname] = useState('')

  const isFormValid = gamerId.trim() !== '' && gamerNickname.trim() !== ''

  const handleSubmit = () => {
    if (publicKey && isFormValid) {
      createEntry.mutateAsync({
        gamer_id: gamerId,
        gamer_nickname: gamerNickname,
        owner: publicKey,
      })
    }
  }

  if (!publicKey) {
    return <p>Connect your wallet</p>
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Gamer id"
        value={gamerId}
        onChange={(e) => setGamerId(e.target.value)}
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="text"
        placeholder="Gamer Nickname"
        value={gamerNickname}
        onChange={(e) => setGamerNickname(e.target.value)}
        className="input input-bordered w-full max-w-xs"
      />
      <br></br>
      <button
        className="btn btn-xs lg:btn-md btn-primary"
        onClick={handleSubmit}
        disabled={createEntry.isPending || !isFormValid}
      >
        Create Journal Entry {createEntry.isPending && '...'}
      </button>
    </div>
  )
}
