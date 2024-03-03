import { TProfileSchema } from "@/shared-lib/endpoints/profile";

export const setProfileLocalStorage = (profile: TProfileSchema) => {
  localStorage.setItem("USER_DETAILS", JSON.stringify(profile));
};
export const deleteProfileLocalStorage = () => [
  localStorage.removeItem("USER_DETAILS"),
];
export const getProfileLocalStorage = () => {
  if (localStorage.getItem("USER_DETAILS"))
    // @ts-ignore
    return JSON.parse(localStorage.getItem("USER_DETAILS")) as TProfileSchema;
  return null;
};

export const updateProfileLocalStorage = ({
  storyId,
  isLike,
}: {
  isLike: boolean;
  storyId: string;
}) => {
  const profile = getProfileLocalStorage();
  if (!profile) return null;
  if (isLike) {
    profile.likeStories.push(storyId);
    profile.dislikeStories = profile.dislikeStories.filter(
      (id) => id != storyId
    );
  } else {
    profile.dislikeStories.push(storyId);
    profile.likeStories = profile.likeStories.filter((id) => id != storyId);
  }

  setProfileLocalStorage(profile);

  return profile;
};
