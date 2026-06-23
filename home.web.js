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
const FEATURED_CATEGORY_ID = "151060d0-d6af-4fae-a828-f987727fd49e";

// ===== UNIFIED FUNCTION - SINGLE QUERY =====
export const getAllHomeData = webMethod(Permissions.Anyone, async () => {
  console.time("getAllHomeData");

  // Query posts sekali aja
  const allPosts = await getAllPostsWithAuthor();
  console.log("Total posts fetched:", allPosts.length);

  // Filter by kategori
  const newsPosts = allPosts.filter((p) =>
    p.categoryIds?.includes(NEWS_CATEGORY_ID),
  );
  const opiniPosts = allPosts.filter((p) =>
    p.categoryIds?.includes(OPINI_CATEGORY_ID),
  );
  const researchPosts = allPosts.filter((p) =>
    p.categoryIds?.includes(RESEARCH_CATEGORY_ID),
  );
  const journalPosts = allPosts.filter((p) =>
    p.categoryIds?.includes(JOURNAL_CATEGORY_ID),
  );
  const featuredPost = allPosts
    .filter((p) => p.categoryIds?.includes(FEATURED_CATEGORY_ID))
    .sort(
      (a, b) => new Date(b.firstPublishedDate) - new Date(a.firstPublishedDate),
    )[0];

  // Top 5 by views
  const topPosts = newsPosts
    .sort((a, b) => (b.statistics?.views || 0) - (a.statistics?.views || 0))
    .slice(0, 3);

  // console.log("Latest News:", newsPosts[0]?.title);
  // console.log("News List:", newsPosts.slice(1, 3).length, "items");
  // console.log("Opini List:", opiniPosts.slice(0, 3).length, "items");
  // console.log("Research List:", researchPosts.slice(0, 2).length, "items");
  // console.log("Journal List:", journalPosts.slice(0, 1).length, "items");
  // console.log("Top 5 News Posts:", topPosts.length, "items");

  console.timeEnd("getAllHomeData");

  return {
    latestNews: newsPosts[0] || null,
    newsList: newsPosts.slice(1, 3),
    opiniList: opiniPosts.slice(0, 3),
    researchList: researchPosts.slice(0, 2),
    journalList: journalPosts.slice(0, 1),
    topPosts: topPosts,
    featuredPost,
  };
});

// ===== KEEP THESE FOR OTHER PAGES =====
export const getLatestNewPost = webMethod(Permissions.Anyone, async () => {
  const allPosts = await getAllPostsWithAuthor();
  const newsPosts = allPosts.filter((p) =>
    p.categoryIds?.includes(NEWS_CATEGORY_ID),
  );
  return newsPosts[0] || null;
});

export const getNewsListPosts = webMethod(Permissions.Anyone, async () => {
  const allPosts = await getAllPostsWithAuthor();
  const newsPosts = allPosts.filter((p) =>
    p.categoryIds?.includes(NEWS_CATEGORY_ID),
  );
  return newsPosts.slice(1, 3);
});

export const getTopNewsPosts = webMethod(Permissions.Anyone, async () => {
  const allPosts = await getAllPostsWithAuthor();
  const newsPosts = allPosts.filter((p) =>
    p.categoryIds?.includes(NEWS_CATEGORY_ID),
  );
  const sortedByViews = newsPosts.sort(
    (a, b) => (b.statistics?.views || 0) - (a.statistics?.views || 0),
  );
  return sortedByViews.slice(0, 5);
});

export const getOpiniListPosts = webMethod(Permissions.Anyone, async () => {
  const allPosts = await getAllPostsWithAuthor();
  const opiniPosts = allPosts.filter((p) =>
    p.categoryIds?.includes(OPINI_CATEGORY_ID),
  );
  return opiniPosts.slice(0, 3);
});

export const getResearchListPosts = webMethod(Permissions.Anyone, async () => {
  const allPosts = await getAllPostsWithAuthor();
  const researchPosts = allPosts.filter((p) =>
    p.categoryIds?.includes(RESEARCH_CATEGORY_ID),
  );
  return researchPosts.slice(0, 2);
});

export const getJournalListPosts = webMethod(Permissions.Anyone, async () => {
  const allPosts = await getAllPostsWithAuthor();
  const journalPosts = allPosts.filter((p) =>
    p.categoryIds?.includes(JOURNAL_CATEGORY_ID),
  );
  return journalPosts.slice(0, 1);
});
