import { SupportLanguageField, TransactionTypeEnum } from '../../common';

export interface CategoryDto {
  id: string;
  name: SupportLanguageField;
  description: SupportLanguageField;
  avatar: string;
  isDefault: boolean;
  isDelete: boolean;
  groupId: string;
  groupName: SupportLanguageField;
  transactionType: TransactionTypeEnum;
}

export interface CategoryDetailDto {
  id: string;
  name: SupportLanguageField;
  description: SupportLanguageField;
  avatar: string;
  isDefault: boolean;
  groupId: number;
}
