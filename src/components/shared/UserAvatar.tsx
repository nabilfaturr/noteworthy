import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "next-auth";

const UserAvatar = ({ userInfo }: { userInfo: User | undefined }) => {
  const imageSrc = userInfo?.image as string | undefined;
  const username = userInfo?.name as string | undefined;

  return (
    <Avatar>
      <AvatarImage src={imageSrc} alt={`@${username}` || "Avatar"} />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
