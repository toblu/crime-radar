
export enum CHECK_FAIL_REASON {
  PASSWORD_MISSING = "password-missing",
  PASSWORD_MISMATCH = "passwords-do-not-match",
  PASSWORD_COMPLEXITY_RULES = "password-does-not-satisfy-complexity-rules"
}

export const CHECK_STATUS = {
  OK: true,
  FAILED: false
}
