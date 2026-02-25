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
 * Calculates EMI based on Loan amount ,Rate of interest,Loan tenure
 * @param {number} l_amount_detail
 * @param {number} roi_detail
 * @param {number} l_tenure_detail
 * @returns {number}
 */
function calculateEMI(l_amount_detail,roi_detail,l_tenure_detail) {

  const P = Number(l_amount_detail);
  const R = Number(roi_detail) / 12 / 100;
  const N = Number(l_tenure_detail)

  const emi = (P * R * Math.pow(1+R,N))/(Math.pow(1+R,N) - 1);
  return Math.round(emi);
}

export { getFullName, days, submitFormArrayToString, calculateEMI, };
