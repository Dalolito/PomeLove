import { Dictionary } from '@/lib/types/dictionary';
import { replaceText } from './textUtils';

export const formatAge = (
  ageYears: number,
  ageMonths: number,
  dict: Dictionary
): string => {
  if (ageYears === 0 && ageMonths === 0) {
    return dict.admin.utils.age.lessThanMonth;
  }

  if (ageYears === 0) {
    return ageMonths === 1
      ? dict.admin.utils.age.month
      : replaceText(dict.admin.utils.age.months, { count: ageMonths });
  }

  if (ageYears === 1) {
    if (ageMonths === 0) {
      return dict.admin.utils.age.year;
    } else if (ageMonths === 1) {
      return dict.admin.utils.age.yearAndMonth;
    } else {
      return replaceText(dict.admin.utils.age.yearAndMonths, {
        count: ageMonths,
      });
    }
  }

  if (ageMonths === 0) {
    return replaceText(dict.admin.utils.age.years, { count: ageYears });
  } else if (ageMonths === 1) {
    return replaceText(dict.admin.utils.age.yearsAndMonth, { years: ageYears });
  } else {
    return replaceText(dict.admin.utils.age.yearsAndMonths, {
      years: ageYears,
      months: ageMonths,
    });
  }
};
