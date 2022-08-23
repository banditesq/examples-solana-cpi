import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";
import { getMint} from "@solana/spl-token";
import { initializeMarket } from "./listMarket";
import * as anchor from '@project-serum/anchor';
import * as  SERUM_CPI_EXAMPLE from "../idl/idl";
import { initTokens } from "./initTokens";
import { transferTokens } from "./transferTokens";




export const start = async () => {
    const feePayer = Keypair.generate()
    const wallet = new anchor.Wallet(feePayer);
    const connection = new Connection(clusterApiUrl('devnet'), 'finalized');
    const options = anchor.AnchorProvider.defaultOptions();
    const provider = new anchor.AnchorProvider(connection, wallet, options);
    anchor.setProvider(provider);
    const program = new anchor.Program(SERUM_CPI_EXAMPLE.IDL, SERUM_CPI_EXAMPLE.IDL.metadata.address, provider);

    console.log("Requesting airdrop..");


    await connection.confirmTransaction(await connection.requestAirdrop(feePayer.publicKey, 2 * 1e9))
    await connection.confirmTransaction(await connection.requestAirdrop(feePayer.publicKey, 2 * 1e9))
    await connection.confirmTransaction(await connection.requestAirdrop(feePayer.publicKey, 2 * 1e9))
    await connection.confirmTransaction(await connection.requestAirdrop(feePayer.publicKey, 2 * 1e9))
    await connection.confirmTransaction(await connection.requestAirdrop(feePayer.publicKey, 2 * 1e9))



    console.log("Balance: ", await connection.getBalance(feePayer.publicKey));







    // const base_temp_token_account = Keypair.generate();
    // const quote_temp_token_account = Keypair.generate();

    // const base_token = Keypair.generate();
    // const quote_token = Keypair.generate();








    // // TRANSFER TOKENS FUNCTION

    // const base_mint = await createMint(
    //     connection, feePayer, feePayer.publicKey, feePayer.publicKey, 9, base_token
    // )
    // const quote_mint = await await createMint(
    //     connection, feePayer, feePayer.publicKey, feePayer.publicKey, 9, quote_token
    // )

    // console.log("base mint", base_mint.toBase58());
    // console.log("quote mint", quote_mint.toBase58());

    // const base_ATA = await getAssociatedTokenAddress(base_mint, feePayer.publicKey, false);
    // const quote_ATA = await getAssociatedTokenAddress(quote_mint, feePayer.publicKey, false);
    // const createBaseATAix = createAssociatedTokenAccountInstruction(feePayer.publicKey, base_ATA, feePayer.publicKey, base_mint);
    // const createQuoteATAix = createAssociatedTokenAccountInstruction(feePayer.publicKey, quote_ATA, feePayer.publicKey, quote_mint);




    // const transaction = new Transaction().add(createBaseATAix, createQuoteATAix)
    // transaction.recentBlockhash = await (await connection.getLatestBlockhash()).blockhash;
    // transaction.feePayer = wallet.publicKey;

    // const tx_signature = await sendAndConfirmTransaction(connection, transaction, [feePayer])
    // await connection.confirmTransaction(tx_signature, 'finalized')

    // await connection.confirmTransaction(await mintTo(
    //     connection,
    //     feePayer,
    //     base_mint,
    //     base_ATA,
    //     feePayer,
    //     Number(1e9)
    // ), 'finalized')
    // await connection.confirmTransaction(await mintTo(
    //     connection,
    //     feePayer,
    //     quote_mint,
    //     quote_ATA,
    //     feePayer,
    //     Number(1e9)),
    //     'finalized'
    // )
    // INIT TOKENS
    console.log("creating Tokens and transfering to ATA");

    const args = await initTokens(feePayer);

    console.log("Transfering tokens to program temp accounts");

    await transferTokens(program, wallet, args)

    console.log("Initializing market");

    let lotSize= "1.0"
    let tickSize= "1.0"

    let baseMintInfo = await getMint(
        connection,
        args.base_mint
    )
    let quoteMintInfo = await getMint(
        connection,
        args.quote_mint
    )
   
    let baseLotSize = Math.round(10 ** baseMintInfo.decimals * parseFloat(lotSize));
    let quoteLotSize = Math.round(
        parseFloat(lotSize) *
          10 ** quoteMintInfo.decimals *
          parseFloat(tickSize),
      );
    const market_id = await initializeMarket({connection,wallet,program,baseMint:args.base_mint,quoteMint:args.quote_mint,quoteLotSize,baseLotSize});









    //


  
  

    // console.log("market_id : ",market_id.toBase58());



}

