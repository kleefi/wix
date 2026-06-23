import { webMethod, Permissions } from "wix-web-module";
import { posts } from "wix-blog-backend";
import { members } from "wix-members-backend";

export const getAuthors = webMethod(Permissions.Anyone, async () => {
  const result = await posts.queryPosts().limit(10).find();

  const memberIds = [
    ...new Set(result.items.map((post) => post.memberId).filter(Boolean)),
  ];

  const authors = [];

  for (const memberId of memberIds) {
    try {
      const member = await members.getMember(memberId);
      console.log("MEMBER FULL:");
      console.log(JSON.stringify(member, null, 2));
      console.log("PROFILE", member.profile);
      console.log("CUSTOM FIELDS", member.customFields);
      console.log("CONTACT DETAILS", member.contactDetails);
      console.log("FULL MEMBER", JSON.stringify(member, null, 2));
      authors.push({
        _id: memberId,
        name: member.profile?.nickname || "",
        image: member.profile?.profilePhoto?.url || "",
        title: member.profile?.title || "",
        slug: member.profile?.slug || "",
      });
    } catch (err) {
      console.error(err);
    }
  }

  return authors;
});
