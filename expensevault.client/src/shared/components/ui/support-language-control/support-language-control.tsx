import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import FormInput from '../../form/form-input/form-input';

import { SupportLanguageControlProps } from './support-language-control.const';

import { SupportLanguages, SupportLanguageType } from '@/shared/types/common';
import { mapArray } from '@/shared/utils/array-util';
import { getLangFieldText } from '@/shared/utils/language-util';
import { formatString } from '@/shared/utils/string-util';

const SupportLanguageControl: FC<SupportLanguageControlProps> = ({
  label,
  value,
  placeholderPattern,
  onChange,
}) => {
  const { t } = useTranslation();
  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    lang: SupportLanguageType,
  ) => {
    const newValue = { ...value, [lang]: event.target.value };
    onChange?.(newValue);
  };
  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box my-2 border p-4">
      <legend className="text-sm font-semibold">{label}</legend>
      {mapArray(
        SupportLanguages as unknown as SupportLanguageType[],
        (lang: SupportLanguageType) => (
          <FormInput
            key={lang}
            value={getLangFieldText(value, lang)}
            placeholder={formatString(t(placeholderPattern), {
              0: t(`language:${lang}`),
            })}
            onChange={(e) => handleOnChange(e, lang)}
            label={t(`language:${lang}`)}
          />
        ),
      )}
    </fieldset>
  );
};

export default SupportLanguageControl;
