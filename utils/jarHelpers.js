const Jar = require('../models/Jar');
const JAR_PERCENTAGES = {
  Necessities: 55,
  Savings: 10,
  Education: 10,
  Play: 10,
  Give: 5,
  Investment: 10,
};

async function splitIncomeIntoJars(uid,amount) {
  const jarUpdates = [];
    for (const [jarName, percent] of Object.entries(JAR_PERCENTAGES)) {
      const jarAmount = (amount * percent) / 100;

      jarUpdates.push(
        Jar.findOneAndUpdate(
         { uid, jarName },
         { $inc: { currentAmount: jarAmount } },
         { new: true, upsert: true }
        )
     );
    }
    await Promise.all(jarUpdates);
}

async function checkJarExistsAndBalance(uid, jarName, amount){
    const jar = await Jar.findOne({ uid, jarName });
    if (!jar) {
      throw new Error('Jar not found.');
    } else if (jar.currentAmount < amount) {
      throw new Error('Insufficient balance in selected jar.');
    }
    return jar;
}

async function updateJarBalance(uid, jarName, amount) {
 const updatedJar = await Jar.findOneAndUpdate(
    { uid, jarName },
    { $inc: { currentAmount: -amount } },
    { new: true }
  );
  if (!updatedJar) {
    throw new Error('Failed to update jar balance.');
  }
  return updatedJar;
}

module.exports = {splitIncomeIntoJars, checkJarExistsAndBalance, updateJarBalance};
