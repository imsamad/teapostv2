import { LoremIpsum } from "lorem-ipsum";
import { phrases } from "./vocab";
import slugify from "slugify";
import User from "../models/User";
import Tag from "../models/Tag";
import { getRndInteger, readingTime } from "../lib/utils";
import { titleImages } from "./cloudinaryDummyPics";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

export async function generateStories(len: number) {
  const dummyUsersIds = (await User.find()).map(({ _id }) => _id);
  const dummyTagsIds = (await Tag.find()).map(({ _id }) => _id);

  return Array(len)
    .fill(1)
    .map((val, index) => {
      const content = generateMarkdown();
      const title = phrases[index % phrases.length];

      const subtitle = lorem.generateSentences(getRndInteger(10, 20));
      const createdAt = new Date(new Date().getTime() + index * 10000000);
      const imageUrl = titleImages[getRndInteger(0, titleImages.length)];
      const newStory = {
        createdAt,
        author:
          index < 10
            ? dummyUsersIds[0]
            : dummyUsersIds[getRndInteger(0, dummyUsersIds.length)],
        title,
        subtitle,
        slug: slugify(title + "_" + Math.random().toString().slice(3)),
        posterImage: imageUrl.secure_url || imageUrl.url,
        description: content,
        seoKeywords: lorem.generateSentences(3),
        isPublished: true,
        isPublishedByAdmin: true,
        hadEmailedToFollowers: true,
        tags: [dummyTagsIds[getRndInteger(0, dummyTagsIds.length)]],
        readingTime: readingTime(content),
        noOfViews: 0,
        noOfComments: 0,
        noOfLikes: 0,
        noOfDislikes: 0,
      };
      return newStory;
    });
}
function generateMarkdown() {
  let markdownContent = "";

  const addTypos = () => {
    const tags = ["### ", "#### ", "##### ", "###### ", "**", "*", "> "];
    markdownContent += "\n";
    tags.forEach((tag) => {
      markdownContent += `${tag}${lorem.generateWords(5)}\n\n`;
    });
  };

  markdownContent += `# ${phrases[getRndInteger(0, phrases.length)]}\n\n`;
  markdownContent += `_${lorem.generateSentences(getRndInteger(10, 30))}_\n\n`;

  const numberOfSections = getRndInteger(5, 30);

  for (let index = 0; index < numberOfSections; index++) {
    // Insert heading
    markdownContent += `## ${
      phrases[getRndInteger(0, phrases.length - 1)]
    }\n\n`;

    const numberOfParagraphs = getRndInteger(4, 25);
    markdownContent += `${lorem.generateSentences(numberOfParagraphs)}\n\n`;

    const shouldInsertImage = getRndInteger(1, 50);

    if (
      index === 2 ||
      (index !== numberOfSections - 1 &&
        shouldInsertImage > 20 &&
        shouldInsertImage < 25)
    ) {
      const url = titleImages[getRndInteger(0, titleImages.length - 1)];
      markdownContent += `![${lorem.generateWords(3)}](${
        url.url || url.secure_url
      })\n\n`;
    }
  }

  markdownContent += `---\n\n`;
  return markdownContent;
}
