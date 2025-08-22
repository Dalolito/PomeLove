import { Dictionary } from '@/lib/types/dictionary';
import { replaceText } from './textUtils';

export const calculatePuppyAgeUtil = (
  birthDate: Date,
  dict: Dictionary
): string => {
  const now = new Date();
  const birth = new Date(birthDate);
  const diffTime = Math.abs(now.getTime() - birth.getTime());
  const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));

  if (diffMonths < 1) {
    return dict.admin.utils.age.lessThanMonth;
  }

  const years = Math.floor(diffMonths / 12);
  const remainingMonths = diffMonths % 12;

  if (years === 0) {
    return remainingMonths === 1
      ? dict.admin.utils.age.month
      : replaceText(dict.admin.utils.age.months, { count: remainingMonths });
  }

  if (years === 1) {
    if (remainingMonths === 0) {
      return dict.admin.utils.age.year;
    } else if (remainingMonths === 1) {
      return dict.admin.utils.age.yearAndMonth;
    } else {
      return replaceText(dict.admin.utils.age.yearAndMonths, {
        count: remainingMonths,
      });
    }
  }

  if (remainingMonths === 0) {
    return replaceText(dict.admin.utils.age.years, { count: years });
  } else if (remainingMonths === 1) {
    return replaceText(dict.admin.utils.age.yearsAndMonth, { years });
  } else {
    return replaceText(dict.admin.utils.age.yearsAndMonths, {
      years,
      months: remainingMonths,
    });
  }
};
