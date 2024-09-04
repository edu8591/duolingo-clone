import { getTopTenUsers } from "@/db";
import { UserItem } from "./UserItem";

export const UserList = async () => {
  const [topTenUsers] = await Promise.all([getTopTenUsers()]);
  const renderedTopTenUsers = topTenUsers.map((userProgress, index) => (
    <UserItem
      key={userProgress.userId}
      userName={userProgress.userName}
      index={index}
      points={userProgress.points}
      userImageSrc={userProgress.userImageSrc}
    />
  ));
  return renderedTopTenUsers;
};
