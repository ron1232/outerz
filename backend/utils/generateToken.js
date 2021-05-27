import jwt from 'jsonwebtoken';

const generateToken = (id, email, password) => {
  const hash = jwt.sign({ password }, process.env.JWT_HASH_PASSWORD);
  return jwt.sign({ id, email, hash }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export default generateToken;
