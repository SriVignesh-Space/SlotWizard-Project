import colors from 'colors';


const match = {
    GET : "green",
    POST : "blue",
    PUT : "yellow",
    DELETE : "red"
}

const logger = (req,res,next) => {
    console.log(`${req.method} ---- ${req.protocol}://${req.get('host')}${req.originalUrl}`[match[req.method]]);
    next();
}

export default logger;