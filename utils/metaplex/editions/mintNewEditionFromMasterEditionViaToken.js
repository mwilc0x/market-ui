import { programIds } from "/utils/metaplex/ids";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
const web3 = require("@solana/web3.js");

export const METADATA_PREFIX = "metadata";
export const EDITION = "edition";

export default async function mintNewEditionFromMasterEditionViaToken(
  newMint,
  tokenMint,
  newMintAuthority,
  newUpdateAuthority,
  tokenOwner,
  tokenAccount,
  instructions,
  payer,
  edition
) {
  const getMetadata = async (mint) => {
    return (
      await web3.PublicKey.findProgramAddress(
        [
          Buffer.from("metadata"),
          programIds().metadata.toBuffer(),
          new PublicKey(mint).toBuffer(),
        ],
        programIds().metadata
      )
    )[0];
  };
  const getEdition = async (mint) => {
    const PROGRAM_IDS = programIds();

    return (
      await web3.PublicKey.findProgramAddress(
        [
          Buffer.from(METADATA_PREFIX),
          new PublicKey(PROGRAM_IDS.metadata).toBuffer(),
          new PublicKey(mint).toBuffer(),
          Buffer.from(EDITION),
        ],
        new PublicKey(PROGRAM_IDS.metadata)
      )
    )[0];
  };
  const getEditionMarkPda = async (mint, edition) => {
    const PROGRAM_IDS = programIds();
    const editionNumber = Math.floor(edition.toNumber() / 248);
    return (
      await web3.PublicKey.findProgramAddress(
        [
          Buffer.from(METADATA_PREFIX),
          new PublicKey(PROGRAM_IDS.metadata).toBuffer(),
          new PublicKey(mint).toBuffer(),
          Buffer.from(EDITION),
          Buffer.from(editionNumber.toString()),
        ],
        new PublicKey(PROGRAM_IDS.metadata)
      )
    )[0];
  };
  const metadataProgramId = programIds().metadata;
  const newMetadataKey = await getMetadata(newMint);
  const masterMetadataKey = await getMetadata(tokenMint);
  const newEdition = await getEdition(newMint);
  const masterEdition = await getEdition(tokenMint);
  const editionMarkPda = await getEditionMarkPda(tokenMint, edition);
  const data = Buffer.from([11, ...edition.toArray("le", 8)]);
  const keys = [
    {
      pubkey: new PublicKey(newMetadataKey),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: new PublicKey(newEdition),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: new PublicKey(masterEdition),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: new PublicKey(newMint),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: new PublicKey(editionMarkPda),
      isSigner: false,
      isWritable: true,
    },
    {
      pubkey: new PublicKey(newMintAuthority),
      isSigner: true,
      isWritable: false,
    },
    {
      pubkey: new PublicKey(payer),
      isSigner: true,
      isWritable: false,
    },
    {
      pubkey: new PublicKey(tokenOwner),
      isSigner: true,
      isWritable: false,
    },
    {
      pubkey: new PublicKey(tokenAccount),
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: new PublicKey(newUpdateAuthority),
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: new PublicKey(masterMetadataKey),
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: programIds().token,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: web3.SystemProgram.programId,
      isSigner: false,
      isWritable: false,
    },
    {
      pubkey: web3.SYSVAR_RENT_PUBKEY,
      isSigner: false,
      isWritable: false,
    },
  ];
  instructions.push(
    new web3.TransactionInstruction({
      keys,
      programId: metadataProgramId,
      data,
    })
  );
}
