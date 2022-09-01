export function asSigner(wallet) {
    if (wallet.publicKey == null) {
      throw new Error('Connect wallet.');
    }
    if (wallet.signMessage == null) {
      throw new Error('Not able to sign messages with this wallet.');
    }
    if (wallet.signTransaction == null || wallet.signAllTransactions == null) {
      throw new Error('Not able to sign transactions with this wallet.');
    }
    return wallet;
}