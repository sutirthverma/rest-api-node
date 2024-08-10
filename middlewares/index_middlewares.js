const fs = require('fs');

function logReqRes(path){
    return (req, res, next) => {
        fs.appendFile(
            path,
            `${Date.now()}: ${req.ip} ${req.method}: ${req.path}\n`,
            (err, data) => {
                next();
            }
        )
    }
}

module.exports = {
    logReqRes,
}