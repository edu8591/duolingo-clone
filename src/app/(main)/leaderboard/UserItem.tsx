import { Avatar, AvatarImage } from "@/components";

type UserItemProps = {
  userName: string;
  userImageSrc: string;
  points: number;
  index: number;
};
export const UserItem = ({
  userName,
  index,
  points,
  userImageSrc,
}: UserItemProps) => {
  return (
    <div className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50">
      <p className="font-bold text-lime-700 mr-4"> {index + 1}</p>
      <Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
        <AvatarImage className="object-cover" src={userImageSrc} />
      </Avatar>
      <p className="font-bold text-neutral-800 flex-1">{userName}</p>
      <p className="text-muted-foreground">{points} XP</p>
    </div>
  );
};
