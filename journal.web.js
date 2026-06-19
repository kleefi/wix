import { posts } from "wix-blog-backend";
import { members } from "wix-members-backend";
import { webMethod, Permissions } from "wix-web-module";

const JOURNAL_CATEGORY_ID = "86ee454a-f24b-4b64-b44c-cf35cfa37a0e";

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

export const getJournalPosts = webMethod(Permissions.Anyone, async () => {
  const result = await posts.queryPosts().limit(100).find();
  const journalPosts = result.items.filter((p) =>
    p.categoryIds?.includes(JOURNAL_CATEGORY_ID),
  );
  console.log("Total journal posts fetched:", journalPosts.length);
  return Promise.all(journalPosts.map((post) => enrichPostWithAuthor(post)));
});

export const getJournalPostsByPage = webMethod(
  Permissions.Anyone,
  async (pageNum = 0) => {
    try {
      const allPosts = await getJournalPosts();
      const itemsPerPage = 5;
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
      console.error("Error in getJournalPostsByPage:", error);
      throw error;
    }
  },
);
