# Flash-Fund
https://connect.uat.flash-payments.com
const bodyJSON = {
  operationName: "balances",
  variables: {
    currencies: ["AUD"],
  },
  query: `
query balances($currencies: [CurrencyIso3]) {
  balances(currencies: $currencies) {
    currency cleared pending
  }
}`,
};
