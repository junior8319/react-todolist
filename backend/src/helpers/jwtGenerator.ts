import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';
import IToken from '../interfaces/IToken';

class JwtGenerator {
  public jwt = jwt;

  static secret = async () => fs.readFile('jwt.evaluation.key', 'utf8');

  static config: jwt.SignOptions = {
    expiresIn: '24h',
    algorithm: 'HS256',
  };

  public async generate(data: IToken) : Promise<string | null> {
    try {
      const secret = await JwtGenerator.secret();
      const token = this.jwt.sign(data, secret, JwtGenerator.config);
      if (!token) return null;

      return token;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async verify(token: string) : Promise<IToken | null> {
    try {
      const secret = await JwtGenerator.secret();
      const decoded = this.jwt.verify(token, secret, JwtGenerator.config);

      return decoded as IToken;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new JwtGenerator();
