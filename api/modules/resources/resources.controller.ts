import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { wait } from '../../utils/wait';
import { error } from '../../utils/error';
import { success } from '../../utils/success';
import { resourcesFixture } from './fixtures/resources';

const router = express.Router();

router.get('/', async (req, res, next) => {
  await wait(100);
  return res.status(200).json(success(resourcesFixture));
});

export { router };
