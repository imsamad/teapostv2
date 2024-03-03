import { monthList } from "@/lib/utils";
import { TStorySchema, TTagSchema } from "@/shared-lib";
import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

import LikeDislike from "./LikeDislike";

import { getProfileLocalStorage } from "@/lib/profileLocalStorageClient";
import StoryComment from "./StoryComment";

const StoryCard = ({ story }: { story: TStorySchema }) => {
  const profile = getProfileLocalStorage();
  return (
    <div className="my-2 h-[132px] sm:h-[140px] md:h-[200px] py-[8px] shadow-md  active:shadow-none rounded-lg border-2 border-gray-200 overflow-hidden">
      <AuthorStrip
        author={story.author}
        // @ts-ignore
        tags={story.tags}
        // @ts-ignore
        createdAt={story.createdAt}
      />
      <Flex className="pt-2 pl-[10px]">
        <Box className="pr-2 pb-2 flex-1 flex flex-col">
          <Link href={`/stories/${story.slug}`}>
            <Heading size="4" color="gray">
              {story.title}
            </Heading>
            <Text size="2" color="gray" className="line-clamp-2">
              {story.subtitle}
            </Text>
          </Link>
          <Box className="flex-1" />
          <Flex gap="3" className="pl-1">
            <LikeDislike story={story} profile={profile} />

            <StoryComment story={story} />
          </Flex>
        </Box>
        <Link href={`/stories/${story.slug}`} className="self-stretch">
          <Box className="overflow-hidden min-w-[85px] w-[115px] sm:w-[120px] md:w-[200px]">
            <AspectRatio ratio={4 / 3}>
              <Image
                src={story.posterImage}
                width={200}
                height={150}
                alt={story.seoKeywords}
              />
            </AspectRatio>
          </Box>
        </Link>
      </Flex>
    </div>
  );
};

export default StoryCard;

const AuthorStrip = ({
  author,
  tags,
  createdAt,
}: {
  author: any;
  tags: TTagSchema[];
  createdAt: any;
}) => {
  let date: any = new Date(createdAt);

  date = `${date.getDate()} ${monthList[date.getMonth()]}`;

  return (
    <Flex className="px-[10px]">
      <Link href={`/author/${author.username}`} className="italic text-sm  ">
        by
        <Text className="text-blue-400">@{author.username}</Text>
      </Link>
      <Flex grow="1" justify="end" align="center" gap="1">
        <span className="text-xs">8 min</span>

        <Separator size="1" color="blue" orientation="vertical" />
        <Link href={`/#/${tags[0].title}`}>
          <div className="leading-none text-xs py-[4px] px-1 rounded-md bg-gray-500 text-gray-200">
            #{tags[0].title}
          </div>
        </Link>
        <Separator size="1" color="blue" orientation="vertical" />

        <span className="text-xs">18 may</span>

        {/* ~{date} */}
      </Flex>
    </Flex>
  );
};
