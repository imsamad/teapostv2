import { isLoggedIn } from "@/app/(login)/authAction";
import StoryForm from "./StoryForm";

const page = () => {
  // if (!cookies().has("auth-session")) return redirect("/login?redirectTo=/me");
  return (
    <div>
      page
      <StoryForm isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default page;
