# Solana Minesweeper

Solana Minesweeper brings the classic, beloved Windows Minesweeper into the
future, now powered by Solana blockchain.

Just like the arcade days, players will need to "insert a coin" to begin each match.
Every player’s actions and high scores are securely stored on the blockchain, adding a layer of transparency and
trust.

In the upcoming update, the game will introduce a multiplayer cooperative
mode, allowing players to team up and increase the excitement and interaction.
Get ready for a new era of Minesweeper, where tradition meets cutting-edge
technology!

## Development environment

### Starting local dev-server

1. Checkout the project and go to project root folder
2. install the js dependencies `yarn install`
3. use `yarn dev` to start your dev server.
4. Access http://localhost:5173/ the system should be on.

### Deploying on dev.net

1. Go to anchor folder.
2. Sync your keys using  `anchor keys sync`
3. build the anchor project with: `cargo build-sbf && anchor build`
4. Deploy on devnet with: `anchor deploy --provider.cluster devnet`

## Random Info.

* Test Game
  created: https://explorer.solana.com/tx/23fYNT3gYozsmMpqWFxsqXAVdHyM12BLC231V4Ka3v5UDnzv4ddrJQvsZUg7q2M4P5sWZTFMG2eeU3wi1GNC5x1P?cluster=devnet

## Architecture

### Use cases

Actors:

1. Player
2. Visitor
3. GameRoom

```mermaid
flowchart TD
    User[Player]
    User -->|Start a New Game| Start[Start a New Game]
    User -->|Set a Nickname| Nickname[Set a Nickname]
    User -->|Pay game fee| PayFee[Pay game fee]
    User -->|Play a Game| PlayGame[Play a Game]
    User -->|View final Game Score| FinalScore[View final Game Score]
    User -->|Check Global Score| GlobalScore[Check Global Score]
    User -->|Check Global Position| GlobalPosition[Check Global Position]

```

```mermaid
flowchart TD
    User[Visitor]
    User -->|Check Global Position| GlobalPosition[Check Global Position]
```

```mermaid
flowchart TD
    GameRoom[GameRoom]
    GameRoom -->|Register New Game| RegisterNew[Register New Game]
    GameRoom -->|Track Player Actions| Track[Track Player Actions]
    GameRoom -->|Register End Game| RegisterEnd[Register End Game]
    GameRoom -->|Store Players Stats| Store[Store Players Stats]
``` 

### Use cases: Start a New Game, Pay game fee, Set a Nickname,

```mermaid
sequenceDiagram
    participant Player
    participant GameRoom
    participant Solana
    Player ->> GameRoom: Visit game room
    Player ->> GameRoom: Start a new game
    GameRoom ->> Player: Request game fee
    Player ->> Player: Link wallet
    Player ->> GameRoom: Pay game fee
    GameRoom ->> Solana: Register payment
    GameRoom ->> Player: Request nickname
    Player ->> GameRoom: Provide nickname
    GameRoom ->> GameRoom: Start game and initialize counter
    GameRoom ->> Solana: Register game start
```

### Use cases: Play Game (win output)

```mermaid
sequenceDiagram
    participant Player
    participant GameRoom
    participant Solana

    loop Player makes moves
        Player ->> GameRoom: Make move (click or flag)
        GameRoom ->> Solana: Record move coordinates
    end

    Player ->> GameRoom: Win game
    GameRoom ->> GameRoom: Stop time counter
    GameRoom ->> Player: Display player statistics (time, flags used)
    GameRoom ->> Solana: Register victory
    GameRoom ->> Player: Show global rank position
    GameRoom ->> Player: Ask if player wants to play again
```

### Use cases: Play Game (win/lose output)

```mermaid
sequenceDiagram
    participant Player
    participant GameRoom
    participant Solana

    loop Player makes moves
        Player ->> GameRoom: Make move (click or flag)
        GameRoom ->> Solana: Record move coordinates
    end

    Player ->> GameRoom: Win/Lose game
    GameRoom ->> GameRoom: Stop time counter
    GameRoom ->> Player: Display player statistics (time, flags used)
    GameRoom ->> Solana: Register end of match
    GameRoom ->> Player: Show global rank position
    GameRoom ->> Player: Ask if player wants to play again
```

### Use cases: Global Ranking

```mermaid
sequenceDiagram
    participant Visitor
    participant GameRoom
    participant Solana
    Visitor ->> GameRoom: Access game room
    Visitor ->> GameRoom: Request Global Ranking
    GameRoom ->> Solana: Fetch top 10 players by game time
    Solana ->> GameRoom: Return top 10 players
    GameRoom ->> Visitor: Display top 10 players
```

