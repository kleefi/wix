import { posts } from "wix-blog-backend";
import { members } from "wix-members-backend";
import { webMethod, Permissions } from "wix-web-module";

const RESEARCH_CATEGORY_ID = "22d75fbf-b3f5-4d59-b243-eaf9e5a9d421";

const enrichPostWithAuthor = async (post) => {
  if (post.memberId) {
    try {
      const member = await members.getMember(post.memberId);
      post.author = {
        name:
          member.profile?.nickname || member.profile?.firstName || "Anonymous",
        displayName: member.profile?.nickname || member.loginEmail,
        photo: member.profile?.photo?.url,
      };
    } catch (e) {
      post.author = { name: "Writer" };
    }
  }
  return post;
};

export const getResearchPosts = webMethod(Permissions.Anyone, async () => {
  const result = await posts.queryPosts().limit(100).find();
  const researchPosts = result.items.filter((p) =>
    p.categoryIds?.includes(RESEARCH_CATEGORY_ID),
  );
  console.log("Total research posts fetched:", researchPosts.length);
  return Promise.all(researchPosts.map((post) => enrichPostWithAuthor(post)));
});

export const getResearchPostsByLimit = webMethod(
  Permissions.Anyone,
  async (limit = 5) => {
    try {
      const allPosts = await getResearchPosts();
      const limitedPosts = allPosts.slice(0, limit);

      console.log(`Fetched ${limitedPosts.length} research posts`);

      return {
        posts: limitedPosts,
        totalItems: allPosts.length,
      };
    } catch (error) {
      console.error("Error in getResearchPostsByLimit:", error);
      throw error;
    }
  },
);
