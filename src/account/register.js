import passport from 'passport'

export function register (req, res, next) {
  passport.authenticate('local-signup', (err, user, info) => {
    if (err) {
      res.status(400).send({ message: err.message })
    }
    if (user) {
      res.status(200).send({ message: 'User created !' })
    } else {
      res.status(200).send({
        message: info.message.message
          ? info.message.message : info.message
      })
    }
  })(req, res, next)
}
