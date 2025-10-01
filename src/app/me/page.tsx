import { profile } from "console";
import { accountApis } from "../apis/gateways/account-apis";
import { AccountRes } from "../apis/responses/account-res";

const Profile = async () => {
  const profile: AccountRes = await accountApis.getMe();
  return (
    <main>
      <div>Profile Page</div>
      <div>Name: {profile.name}</div>
      <div>Email: {profile.email}</div>
    </main>
  );
}

export default Profile