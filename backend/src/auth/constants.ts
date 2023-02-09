import 'dotenv/config';

const SECRET_KEY = process.env.SECRET_KEY as string;

export const jwtConstants = {
  secret: SECRET_KEY,
};
