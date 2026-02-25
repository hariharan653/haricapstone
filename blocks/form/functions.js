/**
 * Get Full Name
 * @name getFullName Concats first name and last name
 * @param {string} firstname in Stringformat
 * @param {string} lastname in Stringformat
 * @return {string}
 */
function getFullName(firstname, lastname) {
  return `${firstname} ${lastname}`.trim();
}

/**
 * Custom submit function
 * @param {scope} globals
 */
function submitFormArrayToString(globals) {
  const data = globals.functions.exportData();
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key] = data[key].join(',');
    }
  });
  globals.functions.submitForm(data, true, 'application/json');
}

/**
 * Calculate the number of days between two dates.
 * @param {*} endDate
 * @param {*} startDate
 * @returns {number} returns the number of days between two dates
 */
function days(endDate, startDate) {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  // return zero if dates are valid
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 0;
  }

  const diffInMs = Math.abs(end.getTime() - start.getTime());
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

// eslint-disable-next-line import/prefer-default-export

/**
 * Calculates EMI
 * @param {number} loanAmountDetail Loan amount
 * @param {number} rateOfInterest Rate of interest
 * @param {number} loanTenureDetail Loan tenure in months
 * @returns {number} EMI amount
 */
function calculateEMI(loanAmountDetail,rateOfInterest,loanTenureDetail) {

  const P = Number(loanAmountDetail);
  const R = Number(rateOfInterest) / 12 / 100;
  const N = Number(loanTenureDetail);

  if (!P || !R || !N) {
    return 0;
  }

  const emi = (P * R * (1 + R) ** N ) / (((1 + R) ** N) - 1);
  return Math.round(emi);
}

export { getFullName, days, submitFormArrayToString, calculateEMI };
