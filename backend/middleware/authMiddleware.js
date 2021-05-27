import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      const { password: hash } = jwt.verify(
        decoded.hash,
        process.env.JWT_HASH_PASSWORD
      );
      if (hash !== req.user.password) {
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
      if (decoded.email !== req.user.email) {
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  res.status(401);
  throw new Error('Not authorized as an admin');
};

export { protect, admin };
