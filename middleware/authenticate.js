const jwt = require('jsonwebtoken');
const USER = require('../models/usersSchema');
const secretKey = process.env.KEY;

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.Amazonweb;

    const verifyToken = jwt.verify(token, secretKey);
    console.log(verifyToken);

    const rootUser = await USER.findOne({
      _id: verifyToken._id,
      'tokens.token': token,
    });
    console.log(rootUser);

    if (!rootUser) {
      throw new Error('user not found');
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (err) {
    res.status(401).send('Unauthorized : No token provide');
    console.log(err);
  }
};

module.exports = authenticate;
