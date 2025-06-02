import { SupportLanguageField, TransactionTypeEnum } from '../../common';

export interface CategoryDto {
  id: number;
  name: SupportLanguageField;
  description: SupportLanguageField;
  avatar: string;
  isDefault: boolean;
  isDelete: boolean;
  groupId: string;
  groupName: SupportLanguageField;
  transactionType: TransactionTypeEnum;
}
