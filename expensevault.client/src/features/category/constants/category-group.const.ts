import { TransactionTypeEnum } from '@/shared/types/common';

export const CategoryGroupTranslateKey: Record<TransactionTypeEnum, string> = {
  [TransactionTypeEnum.Income]: 'category:categoryGroup.income',
  [TransactionTypeEnum.Expense]: 'category:categoryGroup.expense',
  [TransactionTypeEnum.Transfer]: 'category:categoryGroup.transfer',
  [TransactionTypeEnum.Loan]: 'category:categoryGroup.loan',
};
