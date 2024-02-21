import StoryForm from "./StoryForm";

const page = () => {
  // if (!cookies().has("auth-session")) return redirect("/login?redirectTo=/me");
  return (
    <div>
      page
      <StoryForm />
    </div>
  );
};

export default page;
