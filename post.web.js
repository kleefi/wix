import { webMethod, Permissions } from "wix-web-module";
import wixData from "wix-data";
import { members } from "@wix/members";

/**
 * Homepage
 */
export const getAuthors = webMethod(Permissions.Anyone, async () => {
  const { items } = await wixData
    .query("Authors")
    .ascending("_createdDate")
    .find();

  return items;
});

/**
 * Detail Post
 * authorId = post.author
 */
export const getAuthorFromBlog = webMethod(
  Permissions.Anyone,
  async (authorId) => {
    // Ambil member berdasarkan authorId dari Wix Blog
    const member = await members.getMember(authorId);

    if (!member?.profile?.slug) {
      return null;
    }

    // Cari author di collection berdasarkan slug
    const { items } = await wixData
      .query("Authors")
      .eq("slug", member.profile.slug)
      .limit(1)
      .find();

    return items[0] || null;
  },
);
