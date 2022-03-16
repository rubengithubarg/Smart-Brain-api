const handleRegister = (req, res, postgres, bcrypt) => {
    const {email, name, password } = req.body;
    if (!email || !name || !password ){
       return res.status(400).json('incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);
    postgres.transaction(trx => {
        trx.insert({
          hash: hash,
          email: email
        })
        .into('login')
        .returning('email')
        .then(LoginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    // If you are using knex.js version 1.0.0 or higher this now returns an array of objects. Therefore, the code goes from:
                    // loginEmail[0] --> this used to return the email
                    // loginEmail[0].email --> this now returns the email
                    email: loginEmail[0].email,
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0]);
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
      .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
    handleRegister: handleRegister
}