import { MintLayout } from "@solana/spl-token";
import mintNewEditionFromMasterEditionViaToken from "./mintNewEditionFromMasterEditionViaToken";
import { createMintAndAccountWithOne } from "./createMintAndAccountWithOne";
import { PublicKey } from "@solana/web3.js";

export async function setupMintEditionIntoWalletInstructions(
  art,
  wallet,
  connection,
  edition,
  instructions,
  signers,
  mintDestination
) {
  if (!art.mint) throw new Error("Art mint is not provided");
  if (typeof art.supply === "undefined") {
    throw new Error("Art supply is not provided");
  }
  if (!wallet.publicKey) throw new Error("Wallet pubKey is not provided");
  const walletPubKey = wallet.publicKey.toString();
  const { mint: tokenMint } = art;
  const mintTokenAccountPubKey = new PublicKey(
    "2n4j8DmMZQ2FwaWqwTQiDqHMqn9K9SMqe45VU1Qo4Vrt"
  );
  const mintTokenAccountOwner = "2eBBNzw7DeWuYfWhPVGanm7VyYogiWKjSRcAHhcDFSMd";

  const mintRentExempt = await connection.getMinimumBalanceForRentExemption(
    MintLayout.span
  );
  const { mint: newMint } = await createMintAndAccountWithOne(
    wallet,
    mintDestination,
    mintRentExempt,
    instructions,
    signers
  );

  await mintNewEditionFromMasterEditionViaToken(
    newMint,
    tokenMint,
    walletPubKey,
    walletPubKey,
    mintTokenAccountOwner,
    mintTokenAccountPubKey,
    instructions,
    walletPubKey,
    edition
  );
}
