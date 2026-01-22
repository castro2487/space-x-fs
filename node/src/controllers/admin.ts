import jwt from "jsonwebtoken";

export const generateToken = async (req, res) => {
  try {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const userId = req.body.userId;

    if (!jwtSecretKey) {
      console.error("JWT_SECRET_KEY is missing");
      return res.status(500).send("Server Error: JWT Secret not set");
    }

    if (!userId) {
      console.error("UserId is missing in request body");
      return res.status(400).send("UserId not set");
    }

    const data = {
      time: Date(),
      userId
    };

    const token = jwt.sign(data, jwtSecretKey);

    return res.send({ token });
  } catch (error) {
    console.error("Error generating token:", error);
    return res.status(500).send("Internal Server Error");
  }
};
