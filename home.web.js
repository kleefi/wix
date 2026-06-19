import { members } from "wix-members-backend";
import { posts } from "wix-blog-backend";
import { webMethod, Permissions } from "wix-web-module";

const enrichPostWithAuthor = async (post) => {
  if (post.memberId) {
    try {
      const member = await members.getMember(post.memberId);

      let photoUrl = null;
      if (member.profile?.profilePhoto?.url) {
        const originalUrl = member.profile.profilePhoto.url;
        photoUrl = originalUrl.replace("%3Ds96-c", "%3Ds400-c");
      }

      post.author = {
        name: member.profile?.nickname || "Anonymous",
        displayName: member.profile?.nickname || member.loginEmail,
        photo: photoUrl,
      };
    } catch (e) {
      post.author = { name: "Writer", displayName: "Writer", photo: null };
    }
  }
  return post;
};

const getAllPostsWithAuthor = async () => {
  const result = await posts.queryPosts().limit(50).find();
  return Promise.all(result.items.map((post) => enrichPostWithAuthor(post)));
};

const NEWS_CATEGORY_ID = "804a8409-47af-4250-a0b9-7e882ce9ea0b";
const OPINI_CATEGORY_ID = "bc7f02eb-7c0f-4a9e-8187-60c191b29b64";
const RESEARCH_CATEGORY_ID = "22d75fbf-b3f5-4d59-b243-eaf9e5a9d421";
const JOURNAL_CATEGORY_ID = "86ee454a-f24b-4b64-b44c-cf35cfa37a0e";

export const getLatestNewPost = webMethod(Permissions.Anyone, async () => {
  const allPosts = await getAllPostsWithAuthor();
  const newsPosts = allPosts.filter((p) =>
    p.categoryIds?.includes(NEWS_CATEGORY_ID),
  );
  console.log("Latest News:", newsPosts[0]?.title);
  return newsPosts[0] || null;
});

export const getNewsListPosts = webMethod(Permissions.Anyone, async () => {
  const allPosts = await getAllPostsWithAuthor();
  const newsPosts = allPosts.filter((p) =>
    p.categoryIds?.includes(NEWS_CATEGORY_ID),
  );
  console.log("News List:", newsPosts.slice(1, 3).length, "items");
  return newsPosts.slice(1, 3);
});

// TOP 5 POSTS BERDASARKAN VIEWS
export const getTopNewsPosts = webMethod(Permissions.Anyone, async () => {
  const allPosts = await getAllPostsWithAuthor();
  const newsPosts = allPosts.filter((p) =>
    p.categoryIds?.includes(NEWS_CATEGORY_ID),
  );
  // Sort by views descending
  const sortedByViews = newsPosts.sort(
    (a, b) => (b.statistics?.views || 0) - (a.statistics?.views || 0),
  );
  console.log("Top 5 News Posts:", sortedByViews.slice(0, 5).length, "items");
  return sortedByViews.slice(0, 5);
});

export const getOpiniListPosts = webMethod(Permissions.Anyone, async () => {
  const allPosts = await getAllPostsWithAuthor();
  const opiniPosts = allPosts.filter((p) =>
    p.categoryIds?.includes(OPINI_CATEGORY_ID),
  );
  console.log("Opini List:", opiniPosts.slice(0, 3).length, "items");
  return opiniPosts.slice(0, 3);
});

export const getResearchListPosts = webMethod(Permissions.Anyone, async () => {
  const allPosts = await getAllPostsWithAuthor();
  const researchPosts = allPosts.filter((p) =>
    p.categoryIds?.includes(RESEARCH_CATEGORY_ID),
  );
  console.log("Research List:", researchPosts.slice(0, 2).length, "items");
  return researchPosts.slice(0, 2);
});

export const getJournalListPosts = webMethod(Permissions.Anyone, async () => {
  const allPosts = await getAllPostsWithAuthor();
  const journalPosts = allPosts.filter((p) =>
    p.categoryIds?.includes(JOURNAL_CATEGORY_ID),
  );
  console.log("Journal List:", journalPosts.slice(0, 1).length, "items");
  return journalPosts.slice(0, 1);
});
