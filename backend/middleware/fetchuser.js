const jwt = require('jsonwebtoken');
const jwt_Secrete = 'Afafisgoodbo&y';

const fetchuser = (req, res, next) => {


    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please Authenticate using Correct Token!" })
    }
    try {
        const data = jwt.verify(token, jwt_Secrete);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please Authenticate using Correct Token!" });
    }
}

module.exports = fetchuser;