const jwt = require("jsonwebtoken");
const fs = require("fs");
var publicKEY = fs.readFileSync("./public.key", "utf8");

module.exports = async (request, response, next) => {
  try {
    //   get the token from the authorization header
    const token = await request.headers.authorization.split(" ")[1];

    //check if the token matches the supposed origin
    const decodedToken = await jwt.verify(token, publicKEY, {
      expiresIn: "1800s",
      algorithm: ["RS256"],
    });

    // retrieve the user details of the logged in user
    const user = await decodedToken;

    // pass the user down to the endpoints here
    request.user = user;

    // pass down functionality to the endpoint
    next();
  } catch (error) {
    response.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
