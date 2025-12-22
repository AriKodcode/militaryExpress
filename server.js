import express from 'express';
import getHealth from './routers/health.js';
import getBriefing from './routers/briefing.js';
import fs from 'fs';

const app = express();
const port = 3000;

app.use('/health', getHealth);
app.get('/briefing', getBriefing);

app.listen(port, () => {
  console.log('server run... on port: ', port);
});
