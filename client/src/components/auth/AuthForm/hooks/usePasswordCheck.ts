import { CHECK_FAIL_REASON, CHECK_STATUS} from '../shared/passwordCheckConstants';

const rules = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

const usePasswordCheck = (checkPassword: boolean, password: string, confirmPassword: string): [boolean, CHECK_FAIL_REASON?] => {
  if (!checkPassword) return [CHECK_STATUS.OK];

  if (!password || !confirmPassword) return [CHECK_STATUS.FAILED, CHECK_FAIL_REASON.PASSWORD_MISSING]

  if (password !== confirmPassword) return [CHECK_STATUS.FAILED, CHECK_FAIL_REASON.PASSWORD_MISMATCH];

  return password.match(rules) ? [CHECK_STATUS.OK] : [CHECK_STATUS.FAILED, CHECK_FAIL_REASON.PASSWORD_COMPLEXITY_RULES]
}

export default usePasswordCheck;
