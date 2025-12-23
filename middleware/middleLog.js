const getLog = (req, res, next) => {
  const log = {
    method: req.method,
    path: req.originalUrl,
    timestamp: new Date(),
  };
  console.log(log);
  next();
};

export default getLog;
