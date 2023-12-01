const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader  = req.headers.authorization;
  if (authHeader  && authHeader .startsWith('Bearer ')) {
    
    const token = authHeader.replace('Bearer ', '');
    jwt.verify(token, 'secreto', (err, decoded) => {
      if (err) {
        res.status(403).json({ error: 'Token inválido' });
      } else {
        req.usuario = decoded;
        next();
      }
    });
  } else {
    res.status(403).json({ error: 'Token no proporcionado' });
  }
}

module.exports = verifyToken;
