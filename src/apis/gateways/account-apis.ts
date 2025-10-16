import { kyInstance } from "@/config/ky";
import { AccountRes } from "../responses/account-res";

import { ApiResult } from "../responses/api-res";

class AccountApis {
  public async getMe(): Promise<AccountRes> {
    const reqPath = `account/me`;
    const res = await kyInstance.get<AccountRes>(reqPath, {
    }).json<ApiResult<AccountRes>>();
    return res.data;
  }
}

export const accountApis = new AccountApis();