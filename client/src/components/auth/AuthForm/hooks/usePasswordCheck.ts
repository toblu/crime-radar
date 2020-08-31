import React from 'react';
import { CHECK_FAIL_REASON, CHECK_STATUS } from './../shared/passwordCheckConstants';
import useDebouncedEffect from '../../../shared/hooks/useDebouncedEffect';

const rules = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');

const usePasswordCheck = (
  checkPassword: boolean,
  password: string,
  confirmPassword: string
): [boolean, CHECK_FAIL_REASON?] => {
  const [{passed, failReason}, setCheckResult] = React.useState<{passed: boolean, failReason: CHECK_FAIL_REASON | undefined}>({passed: false, failReason: undefined})

  const updateCheckResult = (passed: boolean, failReason?: CHECK_FAIL_REASON) => setCheckResult({passed, failReason})

  useDebouncedEffect(() => {
    if (checkPassword) {
      if (!password || !confirmPassword) {
        updateCheckResult(CHECK_STATUS.FAILED, CHECK_FAIL_REASON.PASSWORD_MISSING);
      } else if (password !== confirmPassword) {
        updateCheckResult(CHECK_STATUS.FAILED, CHECK_FAIL_REASON.PASSWORD_MISMATCH);
      } else if (!password.match(rules)) {
        updateCheckResult(CHECK_STATUS.FAILED, CHECK_FAIL_REASON.PASSWORD_COMPLEXITY_RULES)
      } else {
        updateCheckResult(CHECK_STATUS.OK);
      }
    }
  }, [checkPassword, password, confirmPassword], 400)

  if (!checkPassword) return [CHECK_STATUS.OK];

  return [passed, failReason]
};

export default usePasswordCheck;
