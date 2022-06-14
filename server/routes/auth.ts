const passport = require('passport');
const router = require('express').Router();
require('dotenv').config();
const { User } = require('../../database/index.ts');
const CLIENT_URL = process.env.CLIENT_URL === 'http://localhost' ? `${process.env.CLIENT_URL}:${process.env.PORT}` : process.env.CLIENT_URL;

router.get('/login/success', (req: any, res: any) => {
  if (req.user) {
    User.findOne({
      where: {
        id: req.user.id
      }
    })
      .then((user: object) => {
        res.status(200).json({
            message: 'success',
            success: true,
            user: user
          })
      })
      .catch((error: string) => {
        res.sendStatus(400);
        console.log(error);
      })
  }
})

router.get('/login/fail', (req: any, res: any) => {
  res.sendStatus(400).redirect('/login');
})

router.get('/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: CLIENT_URL,
  failRedirect: '/login/fail'
}));

router.get('/logout', (req: any, res: any) => {
  req.logOut(() => {
    res.redirect(CLIENT_URL);
  });
});

module.exports = router;