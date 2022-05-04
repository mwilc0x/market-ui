import { Token } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import {
  createAssociatedTokenAccountInstruction,
  createMint,
} from "/utils/metaplex/accounts";
import { findProgramAddress } from "/utils/metaplex/utils";
import { programIds } from "/utils/metaplex/ids";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";

export async function createMintAndAccountWithOne(
  wallet,
  receiverWallet,
  mintRent,
  instructions,
  signers
) {
  if (!wallet.publicKey) throw new WalletNotConnectedError();

  const mint = createMint(
    instructions,
    wallet.publicKey,
    mintRent,
    0,
    wallet.publicKey,
    wallet.publicKey,
    signers
  );

  const PROGRAM_IDS = programIds();

  const account = (
    await findProgramAddress(
      [
        new PublicKey(receiverWallet).toBuffer(),
        PROGRAM_IDS.token.toBuffer(),
        mint.toBuffer(),
      ],
      PROGRAM_IDS.associatedToken
    )
  )[0];

  createAssociatedTokenAccountInstruction(
    instructions,
    new PublicKey(account),
    wallet.publicKey,
    new PublicKey(receiverWallet),
    mint
  );

  instructions.push(
    Token.createMintToInstruction(
      PROGRAM_IDS.token,
      mint,
      new PublicKey(account),
      wallet.publicKey,
      [],
      1
    )
  );

  return { mint: mint.toBase58(), account };
}
