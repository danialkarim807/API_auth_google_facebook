
module.exports = async(req, res, next) => {
    const BearerHeaders = req.headers['authorization'];

    if (typeof BearerHeaders !== 'undefined') {
        const Bearer = BearerHeaders.split(" ");
    
        const token = await Bearer[1].replace(/^"(.*)"$/, '$1'); // Remove double quotes
        
        req.token = token;
        next();
    } else {
        res.send({
            result: 'Token not found'
        });
    }
};



