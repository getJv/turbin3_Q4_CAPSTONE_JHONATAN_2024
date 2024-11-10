// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import MinesweeperIDL from '../target/idl/minesweeper.json'
import type { Minesweeper } from '../target/types/minesweeper'

// Re-export the generated IDL and type
export { Minesweeper, MinesweeperIDL }

// The programId is imported from the program IDL.
export const GAME_PROGRAM_ID = new PublicKey(MinesweeperIDL.address)

// This is a helper function to get the Counter Anchor program.
export function getGameProgram(provider: AnchorProvider) {
  return new Program(MinesweeperIDL as Minesweeper, provider)
}

// This is a helper function to get the program ID for the Counter program depending on the cluster.
export function getGameProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Counter program on devnet and testnet.
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg')
    case 'mainnet-beta':
    default:
      return GAME_PROGRAM_ID
  }
}
