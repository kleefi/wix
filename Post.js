import wixLocation from "wix-location";
import { getAuthorFromBlog } from "backend/post.web";

$w.onReady(async function () {
  try {
    // Ambil post yang sedang dibuka
    const post = await $w("#blogPost1").getPost();

    // Ambil author custom
    const author = await getAuthorFromBlog(post.author);

    if (!author) {
      console.log("Author tidak ditemukan.");
      return;
    }

    const profileUrl = `https://usernoname0.wixsite.com/omai/profile/${author.slug}/profile`;

    // Image
    $w("#authorImage").src = author.image;

    // Nama
    $w("#authorName").text = author.name;

    // Title
    $w("#authorTitle").text = author.title;

    // Bio (maksimal 15 kata)
    const plainBio = author.bio.replace(/<[^>]*>/g, "").trim();

    const words = plainBio.split(/\s+/);

    $w("#authorBio").text =
      words.length > 15 ? words.slice(0, 15).join(" ") + "..." : plainBio;

    // Link profile
    $w("#authorSlug").text = "View Profile";

    $w("#authorSlug").onClick(() => {
      wixLocation.to(profileUrl);
    });
  } catch (error) {
    console.error("Load author error:", error);
  }
});
