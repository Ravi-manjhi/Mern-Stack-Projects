import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decoderData;

    if (token) {
      decoderData = jwt.verify(token, "test");

      req.userId = decoderData?.id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
