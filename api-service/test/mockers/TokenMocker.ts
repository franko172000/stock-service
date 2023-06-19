import * as jwt from "jsonwebtoken";

export class TokenMocker {
  static make(userId: number): string {
    return jwt.sign({
      id: userId,
    }, 'test token', {
      expiresIn: '1d'
    })
  }
}
