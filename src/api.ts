import { Transaction, Block, Address } from './interfaces';
import mockGenerator from './mock-generator';

class Api {
  constructor() { }

  getMempoolInfo(): any {
    return {
      'count': mockGenerator.mempoolTransactions.length,
      'vsize': mockGenerator.mempoolTransactions.map((tx) => tx.weight / 4),
    };
  }

  getRawMempool(): string[] {
    return mockGenerator.mempoolTransactions.map((tx) => tx.txid);
  }

  getRawTransaction(txId: string): Transaction | undefined {
    const findMempoolTx = mockGenerator.mempoolTransactions.find((tx) => txId === tx.txid);
    if (findMempoolTx) {
      return findMempoolTx;
    }

    for (const block in mockGenerator.blockTransactions) {
      if (true) {
        const tx = mockGenerator.blockTransactions[block].find((t) => txId === t.txid);
        if (tx) {
          return tx;
        }
      }
    }

    console.log('could not locate TX', txId);
  }

  getBlocks() {
    return mockGenerator.blocks.slice(mockGenerator.blocks.length - 10, mockGenerator.blocks.length).reverse();
  }

  getTransactionsForBlockFrom(hash: string, fromHash: string) {
    return mockGenerator.blockTransactions[hash].slice(0, 10);
  }

  getRandomTx(): Transaction {
    return mockGenerator.getRandomTx();
  }

  getBlockHeightTip(): number {
    return mockGenerator.tip;
  }

  getTxIdsForBlock(hash: string): string[] {
    return mockGenerator.blockTransactions[hash].map((tx: Transaction) => tx.txid);
  }

  getBlockHash(height: string): string {
    const findblock = mockGenerator.blocks.find((blk) => blk.height === parseInt(height, 10));
    if (findblock) {
      return findblock.id;
    } else {
      return '';
    }
  }

  getBlock(hash: string): Block | undefined {
    const block = mockGenerator.blocks.find((blk) => blk.id === hash);
    if (block) {
      return block;
    }
    console.log('cant find block with hash' + hash + ' returning random block.');
    return mockGenerator.getRandomBlock();
  }

  getAddress(address: string): Address {
    return {"address":"2MvFhfwmyb2Zci6YdivuTyJGKBvVEBwcLBE","chain_stats":{"funded_txo_count":315,"funded_txo_sum":13464123699,"spent_txo_count":314,"spent_txo_sum":13427390245,"tx_count":626},"mempool_stats":{"funded_txo_count":0,"funded_txo_sum":0,"spent_txo_count":0,"spent_txo_sum":0,"tx_count":0}};
  }

}

export default new Api();
