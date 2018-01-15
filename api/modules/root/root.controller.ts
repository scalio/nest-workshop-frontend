import * as express from 'express';
import { wait } from '../../utils/wait';
import { error } from '../../utils/error';
import { success } from '../../utils/success';
import { userFixture } from '../fixtures/user';
import { buildingsFixture } from '../buildings/fixtures/buildings';

const router = express.Router();

router.get('/me', async (req: express.Request, res, next) => {
  const accessToken = req.headers['authorization'];
  await wait(100);

  if (!accessToken) {
    return res.status(401).json(error(401, 'Unauthorized'));
  }
  return res.status(200).json(success(userFixture));
});

router.post('/me/buildings', async (req, res, next) => {
  const { id } = req.body;
  await wait(100);

  const building = buildingsFixture.find((item) => item.id === +id);
  if (!building) {
    return res.status(404).json(error(404, 'Not Found'));
  }
  try {
    const { resources } = building;
    const userResources = userFixture.resources;
    resources.forEach((resource) => {
      const userResource = userResources.find((item) => item.id === resource.id);
      if (userResource.amount < resource.amount) {
        throw new Error('Not enough resources');
      }
      userResource.amount -= resource.amount;
    });
    userFixture.buildings.push(id);
    return res.status(201).send();
  }
  catch (e) {
    return res.status(400).json(error(404, 'Bad Request'));
  }
});


export { router };
