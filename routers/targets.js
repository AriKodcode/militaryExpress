import express from 'express';
import fs from 'fs';

const getTargets = express();
getTargets.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = JSON.parse(
      await fs.promises.readFile('./data/targets.json', 'utf-8')
    );
    for (const target of data['targets']) {
      if (target['id'] == id) {
        return res.send(target);
      }
    }
    res.status(404).send('target not found');
  } catch (error) {
    console.error(error.message);
  }
});

getTargets.get('/', async (req, res) => {
  try {
    const { region, status, priority } = req.query;
    let data = JSON.parse(
      await fs.promises.readFile('./data/targets.json', 'utf-8')
    );
    if (req.query['region']) {
      data['targets'] = data['targets'].filter((Target) => {
        if (Target['region'] == req.query['region']) {
          return true;
        }
      });
    }
    if (req.query['status']) {
      data['targets'] = data['targets'].filter((Target) => {
        if (Target['status'] == req.query['status']) {
          return true;
        }
      });
    }
    if (req.query['minPriority']) {
      data['targets'] = data['targets'].filter((Target) => {
        if (Target['priority'] >= req.query['minPriority']) {
          return true;
        }
      });
    }
    res.send(data);
  } catch (error) {
    console.error(error.message);
  }
});

getTargets.post('/', async (req, res) => {
  try {
    const countKeys = Object.keys(req.body);
    if (
      req.body.id &&
      req.body.codeName &&
      req.body.region &&
      req.body.priority &&
      req.body.status &&
      countKeys.length === 5
    ) {
      console.log('hi');
      const data = JSON.parse(
        await fs.promises.readFile('./data/targets.json', 'utf-8')
      );
      let newTarget = req.body;
      newTarget['createdAt'] = new Date().toLocaleTimeString();
      data['targets'].push(newTarget);
      await fs.promises.writeFile(
        './data/targets.json',
        JSON.stringify(data, null, 2),
        'utf-8'
      );
      res.send(newTarget);
    } else {
      res.send('Error! Enter 5 kyes only!');
    }
  } catch (error) {
    console.error(error.message);
  }
});

getTargets.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const data = JSON.parse(
      await fs.promises.readFile('./data/targets.json', 'utf-8')
    );
    for (let i = 0; i < data['targets'].length; i++) {
      if (data['targets'][i]['id'] == id) {
        data.targets[i] = Object.assign(data.targets[i], update);
        fs.promises.writeFile(
          './data/targets.json',
          JSON.stringify(data, null, 2),
          'utf-8'
        );
        return res.send('update successful\n', data.targets[i]);
      }
    }
    res.send('id not found');
  } catch (error) {
    console.error(error.message);
  }
});

getTargets.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = JSON.parse(
      await fs.promises.readFile('./data/targets.json', 'utf-8')
    );
    for (let i in data.targets) {
      if (data['targets'][i]['id'] == id) {
        data.targets.splice(i, 1);
        fs.promises.writeFile(
          './data/targets.json',
          JSON.stringify(data, null, 2),
          'utf-8'
        );
        return res.send('Deleted successfully');
      }
      res.send('id not found');
    }
  } catch (error) {
    console.error(error.message);
  }
});

export default getTargets;
