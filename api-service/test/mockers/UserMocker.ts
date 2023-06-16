import { range } from 'lodash';
import Chance from "chance";
import User from "../../database/model/User";
import {IUser} from "../../Interfaces/AuthInterface";

const ch = new Chance();
export class UserMocker {
  static make(override: IUser | Record<string, any> = {}): User {
    return User.build({
      id: ch.integer({ min: 0, max: 20000 }),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      email: ch.email(),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      name: ch.name(),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      password: ch.string(),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...override,
    });
  }
}
