const authConfig = {
  secret: process.env.APP_SECRET || '*',
  expiresIn: '2d',
};

export { authConfig };
