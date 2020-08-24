const PASSWORD_MISSING: "password-missing" = "password-missing";
const PASSWORD_MISMATCH: "passwords-do-not-match" = "passwords-do-not-match";
const PASSWORD_COMPLEXITY_RULES: "password-does-not-satisfy-complexity-rules" = "password-does-not-satisfy-complexity-rules";

export const CHECK_FAIL_REASON = {
  PASSWORD_MISSING,
  PASSWORD_MISMATCH,
  PASSWORD_COMPLEXITY_RULES
}

export const CHECK_STATUS = {
  OK: true,
  FAILED: false
}
