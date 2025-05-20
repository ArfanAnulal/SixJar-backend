const JAR_PERCENTAGES = {
  Necessities: 55,
  Savings: 10,
  Education: 10,
  Play: 10,
  Give: 5,
  Investment: 10,
};

function getUserIdFromToken(decodedToken) {
  // Ensure the decodedToken is a valid object and has the 'uid' property.
  if (decodedToken && typeof decodedToken === 'object' && decodedToken.uid) {
    
    console.log("User ID extracted from token:", decodedToken.uid);
    return decodedToken.uid;
  } else {
    // Log an error or handle the case where the token is invalid or uid is missing.
    console.error("Invalid or malformed decoded token, or 'uid' field is missing:", decodedToken);
    return null;
  }
}

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

module.exports = {getUserIdFromToken, splitIncomeIntoJars};