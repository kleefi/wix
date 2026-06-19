import { posts } from "wix-blog-backend";
import { members } from "wix-members-backend";
import { webMethod, Permissions } from "wix-web-module";

const NEWS_CATEGORY_ID = "804a8409-47af-4250-a0b9-7e882ce9ea0b";

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

export const getNewsPosts = webMethod(Permissions.Anyone, async () => {
  const result = await posts.queryPosts().limit(100).find();
  const newsPosts = result.items.filter((p) =>
    p.categoryIds?.includes(NEWS_CATEGORY_ID),
  );
  console.log("Total news posts fetched:", newsPosts.length);
  return Promise.all(newsPosts.map((post) => enrichPostWithAuthor(post)));
});

export const getNewsPostsByPage = webMethod(
  Permissions.Anyone,
  async (pageNum = 0) => {
    try {
      const allPosts = await getNewsPosts();
      const itemsPerPage = 6;
      const startIdx = pageNum * itemsPerPage;
      const endIdx = startIdx + itemsPerPage;

      const paginatedPosts = allPosts.slice(startIdx, endIdx);
      const totalPages = Math.ceil(allPosts.length / itemsPerPage);

      console.log(
        `Page ${pageNum}: Got ${paginatedPosts.length} posts, Total pages: ${totalPages}`,
      );

      return {
        posts: paginatedPosts,
        currentPage: pageNum,
        totalPages: totalPages,
        totalItems: allPosts.length,
      };
    } catch (error) {
      console.error("Error in getNewsPostsByPage:", error);
      throw error;
    }
  },
);
