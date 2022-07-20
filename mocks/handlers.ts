import { rest } from 'msw';

export const login = rest.post('/api/login', (req, res, ctx) => {
  return res(
    ctx.json({
      data: {
        token: 'sometoken.logintoken.thisisemailaddress.maybeotherinfohere',
      },
      error: null,
    })
  );
});

export const getUserInfo = rest.get('/api/userInfo', (req, res, ctx) => {
  return res(
    ctx.json({
      no: 1,
      name: 'user1',
      email: 'user1@test.com',
      position: 'PM',
    })
  );
});
