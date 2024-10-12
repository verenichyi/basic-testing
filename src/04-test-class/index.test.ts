// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 100;
    const bankAccount = getBankAccount(initialBalance);
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 100;
    const withdraw = 150;
    const bankAccount = getBankAccount(initialBalance);
    expect(() => bankAccount.withdraw(withdraw)).toThrowError(
      new InsufficientFundsError(initialBalance),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 100;
    const transfer = 150;
    const bankAccount1 = getBankAccount(initialBalance);
    const bankAccount2 = getBankAccount(initialBalance);
    expect(() => bankAccount1.transfer(transfer, bankAccount2)).toThrowError(
      new InsufficientFundsError(initialBalance),
    );
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 100;
    const transfer = 150;
    const bankAccount = getBankAccount(initialBalance);
    expect(() => bankAccount.transfer(transfer, bankAccount)).toThrowError(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    const initialBalance = 100;
    const amount = 50;
    const bankAccount = getBankAccount(initialBalance);
    expect(bankAccount.deposit(amount).getBalance()).toBe(
      initialBalance + amount,
    );
  });

  test('should withdraw money', () => {
    const initialBalance = 100;
    const amount = 50;
    const bankAccount = getBankAccount(initialBalance);
    expect(bankAccount.withdraw(amount).getBalance()).toBe(
      initialBalance - amount,
    );
  });

  test('should transfer money', () => {
    const initialBalance = 100;
    const amount = 50;
    const bankAccount1 = getBankAccount(initialBalance);
    const bankAccount2 = getBankAccount(initialBalance);
    expect(bankAccount1.transfer(amount, bankAccount2).getBalance()).toBe(
      initialBalance - amount,
    );
    expect(bankAccount2.getBalance()).toBe(initialBalance + amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 100;
    const bankAccount = getBankAccount(initialBalance);
    const balance = await bankAccount.fetchBalance();
    if (balance !== null) {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 100;
    const newBalance = 50;
    const bankAccount = getBankAccount(initialBalance);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(newBalance);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 100;
    const bankAccount = getBankAccount(initialBalance);

    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(null);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrowError(
      new SynchronizationFailedError(),
    );
  });
});
