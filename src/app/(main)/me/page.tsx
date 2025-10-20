import { profile } from "console";
import { accountApis } from "../../apis/gateways/account-apis";
import { AccountRes } from "../../apis/responses/account-res";

const Profile = async () => {
  const getUserProfile = async () => {
    try {
      const res = await accountApis.getMe();
      return res;
    } catch (error) {
      console.error('Error fetching user profile: ', error);
      return {
        id: 123456789,
        name: "Username ne!",
        email: "Email ne!"
      }
    }
  }
  const profile: AccountRes = await getUserProfile();

  return (
    <main>
      <div>Profile Page</div>
      <div>Name: {profile.name}</div>
      <div>Email: {profile.email}</div>
    </main>
  );
}

export default Profile