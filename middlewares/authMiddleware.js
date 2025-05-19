const admin = require('../config/firebaseAdmin'); 

const authenticateFirebaseToken = async (req, res, next) => {
  //Get the Token
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // No token provided or incorrect format
    return res.status(401).send('Unauthorized: No token provided or invalid format.');
  }

  // Extract the token from the "Bearer " string
  const idToken = authHeader.split(' ')[1];

  try {
    //Verify the Token
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // You can use the uid from the decoded token to fetch or associate user data
    req.user = decodedToken; // Attach decoded token including uid (decodedToken.uid) to the request

    // Token is valid, proceed to the next middleware or route handler
    next();

  } catch (error) {
    // Token verification failed
    console.error('Error verifying Firebase token:', error);
    return res.status(403).send('Forbidden: Invalid or expired token.');
  }
};

module.exports = authenticateFirebaseToken; // Export the middleware function
