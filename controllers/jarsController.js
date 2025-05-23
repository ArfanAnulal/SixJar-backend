const Jar = require('../models/Jar');
const {getUserIdFromToken} = require('../utils/tokenHelpers')
const User = require('../models/User');
const sayBye = (req, res) => {
    const userId = getUserIdFromToken(req.user);
    res.send(`Bye from the jars controller! User ID: ${userId}`);
};

async function getUserJars(req, res) {
    const userId = getUserIdFromToken(req.user);
    try {
        const jars = await Jar.find({ uid: userId });
        res.status(200).json(jars);
    } catch (error) {
        console.error('Error fetching user jars:', error);
        res.status(500).json({ message: 'Internal server error while fetching user jars.' });
    }
}

module.exports = {sayBye, getUserJars};
