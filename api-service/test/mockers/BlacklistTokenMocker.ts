import TokenBlacklist from "../../database/model/TokenBlacklist";

export class BlacklistTokenMocker {
  static make(token: string): TokenBlacklist {
    return TokenBlacklist.build({
      token,
    })
  }
}
