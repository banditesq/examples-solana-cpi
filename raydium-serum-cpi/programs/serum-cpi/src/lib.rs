use anchor_lang::{prelude::*};
use anchor_spl::token::{Mint, SetAuthority, TokenAccount,Transfer};
use serum_dex;
use raydium_contract_instructions::amm_instruction;

declare_id!("HrcTxLg9VgssWFr28GFsE2uQUN212B5p48hGTgA1RG9u");

const TOKEN_AUTHORITY_SEED: &[u8] = b"token_authority";

#[program]
pub mod serum_cpi {
    use anchor_spl::token::spl_token::instruction::AuthorityType;

    use super::*;

    pub fn initialize_market(
        ctx: Context<InitializeMarket>,
        base_lot_size: u64,
        quote_lot_size: u64,
        quote_dust_threshold: u64,
        valut_signer_nonce: u64,
    ) -> Result<()> {
        let ix = serum_dex::instruction::initialize_market(
            &ctx.accounts.market_id.key(),
            &ctx.accounts.serum_program.key(),
            &ctx.accounts.base_mint.to_account_info().key,
            &ctx.accounts.quote_mint.to_account_info().key,
            &ctx.accounts.base_vault.key(),
            &ctx.accounts.quote_vault.key(),
            None,
            None,
            None,
            &ctx.accounts.bids.to_account_info().key,
            &ctx.accounts.asks.to_account_info().key,
            &ctx.accounts.request_queue.key(),
            &ctx.accounts.event_queue.key(),
            base_lot_size,
            quote_lot_size,
            valut_signer_nonce,
            quote_dust_threshold,
        )
        .unwrap();
        anchor_lang::solana_program::program::invoke(
            &ix,
            &[
                ctx.accounts.market_id.to_account_info(),
                ctx.accounts.request_queue.to_account_info(),
                ctx.accounts.event_queue.to_account_info(),
                ctx.accounts.bids.to_account_info(),
                ctx.accounts.asks.to_account_info(),
                ctx.accounts.base_vault.to_account_info(),
                ctx.accounts.quote_vault.to_account_info(),
                ctx.accounts.base_mint.to_account_info(),
                ctx.accounts.quote_mint.to_account_info(),
                ctx.accounts.rent.to_account_info(),
            ],
        )
        .unwrap();
        

        Ok(())
    }


pub fn transfer_tokens(
        ctx: Context<TransferTokens>,
        base_token_amount: u64,
        quote_token_amount: u64,
    ) -> Result<()> {
        let (token_authority, _token_authority_bump) =
            Pubkey::find_program_address(&[TOKEN_AUTHORITY_SEED], ctx.program_id);

        for authority_context in ctx.accounts.into_set_authority_context() {
            anchor_spl::token::set_authority(
                authority_context,
                AuthorityType::AccountOwner,
                Some(token_authority),
            )?;  
        }
        anchor_spl::token::transfer(
            ctx.accounts.into_transfer_to_temp_base_token_context(),
            base_token_amount
        )?;
        anchor_spl::token::transfer(
            ctx.accounts.into_transfer_to_temp_quote_token_context(),
            quote_token_amount
        )?;
       
      

        Ok(())
    }
}


pub fn create_pool(
        ctx: Context<CreatePool>,
        nonce:u8
    ) -> Result<()> {

        let open_time= Clock::get().unwrap().unix_timestamp as u64;
        // { serum_program } = ctx.accounts;


        amm_instruction::initialize(
            ctx.accounts.raydium_program_id.to_account_info().key, 
            ctx.accounts.amm_id.to_account_info().key, 
            ctx.accounts.amm_authority.to_account_info().key, 
            ctx.accounts.amm_open_orders.to_account_info().key, 
            ctx.accounts.lp_mint_address.to_account_info().key, 
            ctx.accounts.coin_mint_address.to_account_info().key, 
            ctx.accounts.pc_mint_address.to_account_info().key, 
            ctx.accounts.pool_coin_token_account.to_account_info().key, 
            ctx.accounts.pool_pc_token_account.to_account_info().key, 
            ctx.accounts.pool_withdraw_queue.to_account_info().key, 
            ctx.accounts.pool_target_orders_account.to_account_info().key, 
            ctx.accounts.pool_lp_token_account.to_account_info().key, 
            ctx.accounts.pool_temp_lp_token_account.to_account_info().key, 
            ctx.accounts.serum_program_id.to_account_info().key, 
            ctx.accounts.serum_market.to_account_info().key, 
            ctx.accounts.signer.to_account_info().key, 
            nonce, 
            open_time
        ).unwrap();

        Ok({})
        
    }






    
#[derive(Accounts)]
    pub struct InitializeMarket<'info> {
        signer: Signer<'info>,
    
        serum_program: AccountInfo<'info>,
        #[account(mut)]
        market_id: AccountInfo<'info>,
        #[account(mut)]
        request_queue: AccountInfo<'info>,
        #[account(mut)]
        event_queue: AccountInfo<'info>,
        #[account(mut)]
        bids: AccountInfo<'info>,
        #[account(mut)]
        asks: AccountInfo<'info>,
    
        #[account(mut)]
        base_vault: Account<'info, TokenAccount>,
    
        #[account(mut)]
        quote_vault: Account<'info, TokenAccount>,
        #[account(mut)]
        base_mint: Account<'info, Mint>,
        #[account(mut)]
        quote_mint: Account<'info, Mint>,
    
        rent: Sysvar<'info, Rent>,
    }    
#[derive(Accounts)]
pub struct CreatePool<'info> {
    signer: Signer<'info>,

    serum_program_id: AccountInfo<'info>,

    raydium_program_id: AccountInfo<'info>,

    amm_id : AccountInfo<'info>,

    amm_authority: AccountInfo<'info>,

    amm_open_orders: AccountInfo<'info>, 
    
    lp_mint_address:Account<'info, Mint>,

    coin_mint_address: Account<'info, Mint>,

    pc_mint_address:Account<'info, Mint>,
    
    pool_coin_token_account:Account<'info, TokenAccount>,

    pool_pc_token_account: Account<'info, TokenAccount>,

    pool_withdraw_queue: AccountInfo<'info>, 

    pool_target_orders_account: AccountInfo<'info>, 

    #[account(mut)]
    pool_lp_token_account: Account<'info, TokenAccount>,

    pool_temp_lp_token_account:Account<'info, TokenAccount>,

    serum_market: AccountInfo<'info>, 


   
}
#[derive(Accounts)]
pub struct TransferTokens<'info> {

    #[account(mut)]
    signer: Signer<'info>,

    base_mint: Box<Account<'info, Mint>>,

    quote_mint: Box<Account<'info, Mint>>,
    #[account(
        init,
        payer = signer,
        token::mint = base_mint,
        token::authority = signer,
    )]
    temp_base_token_account: Box<Account<'info, TokenAccount>>,

    #[account(
        init,
        payer = signer,
        token::mint = quote_mint,
        token::authority = signer,
    )]
    temp_quote_token_account: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    sender_base_token_account: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    sender_quote_token_account: Box<Account<'info, TokenAccount>>,

    token_program: AccountInfo<'info>,
    system_program: Program<'info, System>,

    rent: Sysvar<'info, Rent>,
}

impl<'info> TransferTokens<'info> {
    fn into_set_authority_context(
        &self,
    ) -> [CpiContext<'_, '_, '_, 'info, SetAuthority<'info>>; 2] {
        let base_cpi_accounts = SetAuthority {
            account_or_mint: self.temp_base_token_account.to_account_info().clone(),
            current_authority: self.signer.to_account_info().clone(),
        };
        let quote_cpi_accounts = SetAuthority {
            account_or_mint: self.temp_quote_token_account.to_account_info().clone(),
            current_authority: self.signer.to_account_info().clone(),
        };
        [
            CpiContext::new(self.token_program.clone(), base_cpi_accounts),
            CpiContext::new(self.token_program.clone(), quote_cpi_accounts),
        ]
    }
    fn into_transfer_to_temp_base_token_context(
        &self,
    ) -> CpiContext<'_, '_, '_, 'info, Transfer<'info>> {
        let base_cpi_accounts = Transfer {
            from: self.sender_base_token_account.to_account_info().clone(),
            to: self.temp_base_token_account.to_account_info().clone(),
            authority: self.signer.to_account_info().clone()
        };
        
        CpiContext::new(self.token_program.clone(), base_cpi_accounts)
    }
    fn into_transfer_to_temp_quote_token_context(
        &self,
    ) -> CpiContext<'_, '_, '_, 'info, Transfer<'info>> {
        let quote_cpi_accounts = Transfer {
            from: self.sender_quote_token_account.to_account_info().clone(),
            to: self.temp_quote_token_account.to_account_info().clone(),
            authority: self.signer.to_account_info().clone()
        };
        CpiContext::new(self.token_program.clone(), quote_cpi_accounts)

    }
}
