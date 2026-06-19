import { posts } from "wix-blog-backend";
import { members } from "wix-members-backend";
import { webMethod, Permissions } from "wix-web-module";

const OPINI_CATEGORY_ID = "bc7f02eb-7c0f-4a9e-8187-60c191b29b64";

const enrichPostWithAuthor = async (post) => {
  if (post.memberId) {
    try {
      const member = await members.getMember(post.memberId);

      let photoUrl = null;
      if (member.profile?.profilePhoto?.url) {
        const originalUrl = member.profile.profilePhoto.url;
        // URL encoded = adalah %3D
        photoUrl = originalUrl.replace("%3Ds96-c", "%3Ds400-c");
        console.log("Original URL:", originalUrl);
        console.log("Converted URL:", photoUrl);
      }

      post.author = {
        name: member.profile?.nickname || "Anonymous",
        displayName: member.profile?.nickname || member.loginEmail,
        photo: photoUrl,
        memberId: member._id,
      };
    } catch (e) {
      console.error("Error enriching author:", e);
      post.author = {
        name: "Writer",
        displayName: "Writer",
        photo: null,
      };
    }
  }
  return post;
};

export const getOpiniPosts = webMethod(Permissions.Anyone, async () => {
  const result = await posts.queryPosts().limit(100).find();
  const opiniPosts = result.items.filter((p) =>
    p.categoryIds?.includes(OPINI_CATEGORY_ID),
  );
  console.log("Total opini posts fetched:", opiniPosts.length);
  return Promise.all(opiniPosts.map((post) => enrichPostWithAuthor(post)));
});

export const getOpiniPostsByPage = webMethod(
  Permissions.Anyone,
  async (pageNum = 0) => {
    try {
      const allPosts = await getOpiniPosts();
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
      console.error("Error in getOpiniPostsByPage:", error);
      throw error;
    }
  },
);
