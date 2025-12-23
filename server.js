import express from 'express';
import getHealth from './routers/health.js';
import getBriefing from './routers/briefing.js';
import getTargets from './routers/targets.js';
import getLog from './middleware/middleLog.js';
import addHeader from './middleware/addHeader.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(getLog);
app.use(addHeader);

app.use('/health', getHealth);
app.use('/briefing', getBriefing);
app.use('/targets', getTargets);

app.listen(port, () => {
  console.log('server run... on port: ', port);
});
