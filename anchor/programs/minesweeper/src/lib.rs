#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("GtV2Qi686QG3tKsQepj8hiNKezzrZiz1xxZQoaDJH7W8");

#[program]
pub mod minesweeper {
    use super::*;
    pub fn create_new_game(
        ctx: Context<CreateNewGameCtx>,
        gamer_id: String,
        gamer_nickname: String,
    ) -> Result<()> {
        msg!("A new game is starting");
        msg!("Gamer: {}", gamer_id);
        msg!("Nickname: {}", gamer_nickname);

        let game_state = &mut ctx.accounts.game_state;
        game_state.owner = ctx.accounts.owner.key();
        game_state.gamer_id = gamer_id;
        game_state.gamer_nickname = gamer_nickname;

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(gamer_id: String, gamer_nickname: String)]
pub struct CreateNewGameCtx<'info> {
    #[account(
        init,
        seeds = [gamer_id.as_bytes(), owner.key().as_ref()],
        bump,
        payer = owner,
        space = 8 + GameState::INIT_SPACE
    )]
    pub game_state: Account<'info, GameState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct GameState {
    pub owner: Pubkey,
    #[max_len(10)]
    pub gamer_id: String,
    #[max_len(3)]
    pub gamer_nickname: String,
}
