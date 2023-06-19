import * as jwt from "jsonwebtoken";

export class TokenMocker {
  static make(userId: number): string {
    return jwt.sign({
      id: userId,
    }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
  }
}
