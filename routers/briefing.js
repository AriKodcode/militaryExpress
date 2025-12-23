import express from 'express';

const getBriefing = express();
getBriefing.get('/', (req, res) => {
  try {
    if (req.headers.client_unit) {
      res.json({
        unit: req.headers.client_unit,
        message: 'briefing delivered',
      });
    } else {
      res.status(400).send('Access denied');
    }
  } catch (error) {
    console.error(error.message);
  }
});
export default getBriefing;
