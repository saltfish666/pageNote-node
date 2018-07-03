const User = require('../models/User')

module.exports = (req,res) => {
  let token = null
  
  try{ token = req.headers.authorization.split(' ')[0] } 
  catch(e) { return res.status(401).send('no token') }
  
  User.find({ token: token}, (err,doc) => {
    if(err) return res.status(500).res.send(err.message)
    
    if(!doc.length) return res.status(401).send('token doesnot match user')

    res.json(doc[0])
  })
}