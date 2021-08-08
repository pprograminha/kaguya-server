const authConfig = {
  secret: process.env.APP_SECRET || '*',
  expiresIn: '1h',
};

export { authConfig };
