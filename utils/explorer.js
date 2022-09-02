export function getTransaction(signature) {
    return `${process.env.NEXT_PUBLIC_SOLANA_EXPLORER_TX}/${signature}?cluster=devnet`;
}

export function getAddress(address) {
    return `${process.env.NEXT_PUBLIC_SOLANA_EXPLORER_ADDRESS}/${address}?cluster=devnet`;
}
