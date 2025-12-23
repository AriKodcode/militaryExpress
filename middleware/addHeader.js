const addHeader = (req, res, next) => {
  res.setHeader('X-Server-Start-Time', new Date().toLocaleTimeString());
  next();
};
export default addHeader;
