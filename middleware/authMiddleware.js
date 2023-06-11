const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {
    let token = req.cookies.userToken;
    if(!token){
        res.locals.user = false;
        next();
    } else {
        res.redirect('/')
    }
}

const checkUserToken = (req, res, next) => {
    let token = req.cookies.userToken;

    if(token){
        jwt.verify(token, process.env.JWT_TEXT, async (err, userInfo) => {
            if(err){
                console.log(err);
            } else {
                res.locals.user = userInfo.user.username;
                res.locals.email = userInfo.user.email;
                res.locals.userId = userInfo.user._id;
                next();
            }
        })
    } else {
        res.locals.user = false;
        next()
        // res.redirect("/")
    }
}

module.exports = {
    checkToken,
    checkUserToken
}