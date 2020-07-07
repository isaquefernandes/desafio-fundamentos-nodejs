import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += transaction.value;
            break;
          case 'outcome':
            accumulator.outcome += transaction.value;
            break;
          default:
            break;
        }

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create(data: CreateTransactionDTO): Transaction {
    const newTransaction = new Transaction({
      title: data.title,
      value: data.value,
      type: data.type,
    });

    const totalValue = this.transactions;

    // if (newTransaction.type === 'outcome' && newTransaction.value > totalValue)
    //   throw new Error(
    //     'Cant not create outcome transaction without valid balance',
    //   );

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
