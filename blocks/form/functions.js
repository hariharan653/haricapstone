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
 * Calculates EMI (Equated Monthly Installment)
 * @param {number} loanAmountDetail Loan amount (INR)
 * @param {number} loanTenureDetail Loan tenure (in months)
 * @param {number} rateOfInterest Rate of interest
 * @returns {number} EMI amount
 */
function calculateEMI(loanAmountDetail, loanTenureDetail, rateOfInterest) {
  const principal = Number(loanAmountDetail);
  const tenure = Number(loanTenureDetail);
  const monthlyRate = Number(rateOfInterest) / 12 / 100;

  if (!principal || !tenure) {
    return 0;
  }

  if (!monthlyRate) {
    return Math.round(principal / tenure);
  }

  const power = (1 + monthlyRate) ** tenure;

  const emi = (principal * monthlyRate * power) / (power - 1);
  return Math.round(emi);
}

window.calculateEMI = calculateEMI;

document.addEventListener('bridgeInitializeStart', () => {
  if (window.guideBridege) {
    window.guideBridge.registerFunction('calculateEMI', calculateEMI);
  }
});

// eslint-disable-next-line import/prefer-default-export
export {
  getFullName,
  days,
  submitFormArrayToString,
  calculateEMI,
};
