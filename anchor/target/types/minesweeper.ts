/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/minesweeper.json`.
 */
export type Minesweeper = {
  "address": "GtV2Qi686QG3tKsQepj8hiNKezzrZiz1xxZQoaDJH7W8",
  "metadata": {
    "name": "minesweeper",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Solana Minesweeper created as a Capstone project during turbin3 Q4 2024"
  },
  "instructions": [
    {
      "name": "createNewGame",
      "discriminator": [
        125,
        123,
        146,
        199,
        15,
        252,
        11,
        68
      ],
      "accounts": [
        {
          "name": "gameState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "gamerId"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "gamerId",
          "type": "string"
        },
        {
          "name": "gamerNickname",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "gameState",
      "discriminator": [
        144,
        94,
        208,
        172,
        248,
        99,
        134,
        120
      ]
    }
  ],
  "types": [
    {
      "name": "gameState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "gamerId",
            "type": "string"
          },
          {
            "name": "gamerNickname",
            "type": "string"
          }
        ]
      }
    }
  ]
};
