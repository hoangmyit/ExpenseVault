import { SupportLanguageField, TransactionTypeEnum } from '../../common';

export type CategoryGroupResponse = {
  id: number;
  name: SupportLanguageField;
  description: SupportLanguageField;
  avatar: string;
  transactionType: TransactionTypeEnum;
};
