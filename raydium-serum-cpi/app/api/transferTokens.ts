import { Connection, Keypair, clusterApiUrl, PublicKey, Transaction, sendAndConfirmTransaction, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { getMint, createMint, Mint, mintTo, createAssociatedTokenAccountInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { initializeMarket } from "./listMarket";
import * as anchor from '@project-serum/anchor';
import { Program } from "@project-serum/anchor";
import { ITokenAccounts } from "./initTokens";

export const transferTokens = async(program: Program<any>, wallet: anchor.Wallet,args:ITokenAccounts )=>{

    await program.rpc.transferTokens(
        new anchor.BN(1 * 1e9),
        new anchor.BN(1 * 1e9), {
        accounts: {
            signer: wallet.publicKey,
            baseMint: args.base_mint,
            quoteMint: args.quote_mint,
            tempBaseTokenAccount: args.base_temp_token_account.publicKey,
            tempQuoteTokenAccount: args.quote_temp_token_account.publicKey,
            senderBaseTokenAccount: args.base_ATA,
            senderQuoteTokenAccount: args.quote_ATA,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: anchor.web3.SystemProgram.programId,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY
        },
        signers: [args.base_temp_token_account, args.quote_temp_token_account]
    })

}