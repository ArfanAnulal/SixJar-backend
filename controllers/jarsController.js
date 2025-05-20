const {getUserIdFromToken} = require('../utils/helpers')
const sayBye = (req, res) => {
    const userId = getUserIdFromToken(req.user);
    res.send(`Bye from the jars controller! User ID: ${userId}`);
};

module.exports = {
    sayBye
};
