import { rest } from 'msw';

const URL_PREFIX = '/api';

export const login = rest.post(
  URL_PREFIX + '/common/login',
  (req, res, ctx) => {
    return res(
      ctx.json({
        data: 'sometoken.logintoken.thisisemailaddress.maybeotherinfohere',
      })
    );
  }
);

export const getUserInfo = rest.get(
  URL_PREFIX + '/user/info',
  (req, res, ctx) => {
    return res(
      ctx.json({
        no: 1,
        name: 'user1',
        email: 'user1@test.com',
        position: 'PM',
      })
    );
  }
);
