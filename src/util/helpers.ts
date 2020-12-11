const validationExpressions:Record<string, RegExp> = {
  email: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
  password: /^(?=.*?[a-z])(?=.*?[0-9]).{6,20}$/,
  generic: /^[a-zA-Z0-9- ]{3,25}$/,
}

export const validateInputHelper = (
  type:string,
  term:string,
):boolean => validationExpressions[type].test(term)
