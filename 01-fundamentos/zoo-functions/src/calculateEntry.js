const data = require('../data/zoo_data');

const { prices } = data;

function countEntrants(entrants) {
  const arrAge = entrants.map((entrant) => entrant.age);
  // console.log(arrAge);
  const countChildren = arrAge.filter((age) => age < 18).length;
  const countAdults = arrAge.filter((age) => age >= 18 && age < 50).length;
  const countSeniors = arrAge.filter((age) => age >= 50).length;
  return { child: countChildren, adult: countAdults, senior: countSeniors };
}

function calculateEntry(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  const { child, adult, senior } = countEntrants(entrants);
  return (child * prices.child) + (adult * prices.adult) + (senior * prices.senior);
}
module.exports = { calculateEntry, countEntrants };
