import express from 'express';

const getHealth = express();
getHealth.get('/', (req, res) => {
  try {
    res.json({
      status: 'ok',
      serverTime: new Date(),
    });
  } catch (error) {
    console.error(error.message);
  }
});
export default getHealth;
