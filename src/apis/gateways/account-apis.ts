import { kyInstance } from "@/config/ky";
import { AccountRes } from "../responses/account-res";

import { ApiResult } from "../responses/api-res";
import { getServerAuthHeaders } from "@/lib/utils";

class AccountApis {

  public async getMe(): Promise<AccountRes> {
    const headers = await getServerAuthHeaders();
    const reqPath = `account/me`;
    const res = await kyInstance.get<AccountRes>(reqPath, {
      headers
    }).json<ApiResult<AccountRes>>();
    return res.data;
  }
}

export const accountApis = new AccountApis();