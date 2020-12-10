const validationExpressions:Record<string, RegExp> = {
  email: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
  password: /^(?=.*?[a-z])(?=.*?[0-9]).{6,20}$/,
  generic: /^[a-zA-Z0-9- ]{3,25}$/,
}

export const validateInputHelper = (
  type:string,
  term:string,
):boolean => validationExpressions[type].test(term)

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const generateStringFromDate = (date:Date):string => {
  // parse normally if it's a Date object
  if (date instanceof Date && date.getMonth()) {
    const dateMonth:number = date.getMonth()
    const dateDay:number = date.getDate()
    const dateYear:number = date.getFullYear()
    return (
      `${months[dateMonth].substr(0, 3)} ${dateDay} ${dateYear}`
    )
  }
  // call the function again passing a correct Date object
  return generateStringFromDate(new Date(date))
}
