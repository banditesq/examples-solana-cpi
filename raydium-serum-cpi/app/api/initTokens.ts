import { Connection, Keypair, clusterApiUrl, PublicKey, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import {  createMint, mintTo, createAssociatedTokenAccountInstruction, getAssociatedTokenAddress } from "@solana/spl-token";

export interface ITokenAccounts {

    base_mint: PublicKey;
    quote_mint: PublicKey;
    base_ATA: PublicKey;
    quote_ATA: PublicKey;
    base_temp_token_account: Keypair;
    quote_temp_token_account: Keypair;



}

export const initTokens = async (feePayer: Keypair): Promise<ITokenAccounts> => {
    const connection = new Connection(clusterApiUrl('devnet'), 'finalized');

    const base_temp_token_account = Keypair.generate();
    const quote_temp_token_account = Keypair.generate();

    const base_token = Keypair.generate();
    const quote_token = Keypair.generate();
    const base_mint = await createMint(
        connection, feePayer, feePayer.publicKey, feePayer.publicKey, 9, base_token
    )
    const quote_mint = await await createMint(
        connection, feePayer, feePayer.publicKey, feePayer.publicKey, 9, quote_token
    )

    console.log("created base mint :", base_mint.toBase58());
    console.log("created quote mint :", quote_mint.toBase58());

    const base_ATA = await getAssociatedTokenAddress(base_mint, feePayer.publicKey, false);
    const quote_ATA = await getAssociatedTokenAddress(quote_mint, feePayer.publicKey, false);
    const createBaseATAix = createAssociatedTokenAccountInstruction(feePayer.publicKey, base_ATA, feePayer.publicKey, base_mint);
    const createQuoteATAix = createAssociatedTokenAccountInstruction(feePayer.publicKey, quote_ATA, feePayer.publicKey, quote_mint);
    const transaction = new Transaction().add(createBaseATAix, createQuoteATAix)
    transaction.recentBlockhash = await (await connection.getLatestBlockhash()).blockhash;
    transaction.feePayer = feePayer.publicKey;

    const tx_signature = await sendAndConfirmTransaction(connection, transaction, [feePayer])
    await connection.confirmTransaction(tx_signature, 'finalized')
    console.log("created base ATA", base_ATA.toBase58());
    console.log("created quote ATA", quote_ATA.toBase58());

    await connection.confirmTransaction(await mintTo(
        connection,
        feePayer,
        base_mint,
        base_ATA,
        feePayer,
        Number(1e9)
    ), 'finalized')
    await connection.confirmTransaction(await mintTo(
        connection,
        feePayer,
        quote_mint,
        quote_ATA,
        feePayer,
        Number(1e9)),
        'finalized'
    )
    console.log("tokens transfered to ATA");

    return { base_mint, quote_mint, base_ATA, quote_ATA, base_temp_token_account, quote_temp_token_account }



} 