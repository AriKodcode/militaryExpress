import express from 'express';

const getBriefing = express();
getBriefing.get('/', (req, res) => {
  try {
    if (req.header.Client_Unit) {
      res.json({
        unit: req.header.Client_Unit,
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
