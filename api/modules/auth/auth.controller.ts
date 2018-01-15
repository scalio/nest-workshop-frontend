import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { wait } from '../../utils/wait';
import { error } from '../../utils/error';
import { success } from '../../utils/success';
import { userFixture } from '../fixtures/user';

const signedUser = { id: userFixture.id, username: userFixture.username };

const getSignedUser = () =>
  success({
    access_token: jwt.sign(signedUser, 'secret', {
      expiresIn: '24h',
    }),
    expires: (() => {
      const date = new Date();
      date.setDate(date.getDate() + 1);
      return date.getTime();
    })(),
  });

const router = express.Router();

router.post('/token', async (req, res, next) => {
  const { username, password } = req.body;
  await wait(100);

  if (username !== 'test' || password !== 'test') {
    return res.status(401).json(error(401, 'Unauthorized'));
  }
  return res.status(200).json(getSignedUser());
});

export { router };
