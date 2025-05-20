
function getUserIdFromToken(decodedToken) {
  // Ensure the decodedToken is a valid object and has the 'uid' property.
  if (decodedToken && typeof decodedToken === 'object' && decodedToken.uid) {
    return decodedToken.uid;
  } else {
    // Log an error or handle the case where the token is invalid or uid is missing.
    console.error("Invalid or malformed decoded token, or 'uid' field is missing:", decodedToken);
    return null;
  }
}

module.exports = {getUserIdFromToken};