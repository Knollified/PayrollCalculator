// Target All inputs
const hoursInput = document.getElementById("hours");
const payPerHourInput = document.getElementById("hourly_rate");
const submitButton = document.getElementById("submit");
const overTime = document.getElementById("overTime");
const Form = document.getElementById("form");

//Storage before valueUpdate
const initalState = () => {
  return {
    hours,
    rate: 0,
    Gross: 0,
    deductionRate: 0,
    deductionTotal: 0,
    overTimeHours: 0,
    overTimeRate: 0,
    totalPayAmount: 0,
    overTimePay: 0,
  };
};

//storage  with updated values
let storage = initalState();

// Event handlers
const updateHours = (e) => {
  storage.hours = parseInt(e.target.value); //NUMBERS NOT STRINGS
};
const updateRate = (e) => {
  storage.rate = parseInt(e.target.value);
};

// Event Listeners
hoursInput.addEventListener("input", updateHours);
payPerHourInput.addEventListener("input", updateRate);

// Update Values
const HourlyRatePlus = () => {
  if (storage.hours > 40) {
    //Over time hours
    storage.overTimeHours = storage.hours - 40;
    // Rate per ot hour
    storage.overTimeRate = storage.rate * 0.05 + storage.rate;
    // Dollar total
    storage.overTimePay = storage.overTimeRate * storage.overTimeHours;
    storage.Gross = storage.overTimePay;
    overTime.innerHTML = `<div> <ul> <li> Hours: ${storage.overTimeHours} </li> <li> Rate: ${storage.overTimeRate} </li> <li> Extra Over Time Pay: ${storage.overTimePay} </li>  </ul> </div>`;
  } else {
    overTime.innerHTML = "No Over Time";
  }
};

// Update DOM
const totalPay = () => {
  document.getElementById(
    "total_pay"
  ).innerHTML = `<span> $ ${storage.totalPayAmount.toFixed(2)} </span>`;
};

//Calulate Gross Pay
const GrossPay = () => {
  storage.Gross += storage.rate * (storage.hours - storage.overTimeHours);
  document.getElementById(
    "Gross_Pay"
  ).innerHTML = `<span> $ ${storage.Gross.toFixed(2)} </span>`;
};

//Calculate Deductions
const Deductions = () => {
  if (storage.rate >= 10 && storage.rate <= 25) {
    storage.deductionRate = 0.05;
  } else if (storage.rate >= 26 && storage.rate <= 50) {
    storage.deductionRate = 0.07;
  }
  storage.deductionTotal = storage.Gross * storage.deductionRate;
  storage.totalPayAmount = storage.Gross - storage.deductionTotal;
  document.getElementById(
    "Deduction"
  ).innerHTML = `<span>  ${storage.deductionTotal.toFixed(
    2
  )} <div> <ul> <li> Deduction Rate: ${(storage.deductionRate * 100).toFixed(
    2
  )}% </li>  </ul> </div>`;
};

// Update all values
const updateAllValues = () => {
  HourlyRatePlus();
  GrossPay();
  Deductions();
  totalPay();
  storage = initalState();
  Form.reset();
};