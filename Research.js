import wixLocation from "wix-location";
import { getResearchPostsByLimit } from "backend/research.web";

$w.onReady(async function () {
  try {
    const researchData = await getResearchPostsByLimit(5);
    const { posts: researchPosts } = researchData;

    console.log("Rendering research posts:", researchPosts.length);

    researchPosts.forEach((post, index) => {
      const itemNum = index + 1; // 1-5
      const baseId = itemNum === 1 ? "research" : `research${itemNum}`;

      try {
        const imageId = `#${baseId}Image`;
        const dateId = `#${baseId}Date`;
        const durationId = `#${baseId}Duration`;
        const titleId = `#${baseId}Title`;
        const descId = `#${baseId}Description`;

        // Set data
        $w(imageId).src = post.media.wixMedia.image;
        $w(dateId).text = new Date(post.firstPublishedDate).toLocaleDateString(
          "en-US",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          },
        );
        $w(durationId).text = `${post.minutesToRead} min read`;
        $w(titleId).text = post.title;
        $w(descId).text =
          post.excerpt.split(" ").slice(0, 15).join(" ") + "...";

        console.log(`✅ Item ${itemNum} data set successfully`);

        // Navigation function
        const navigatePost = () => {
          wixLocation.to(`/post/${post.slug}`);
        };

        // Attach onClick - individual try-catch untuk each element
        try {
          $w(imageId).onClick(navigatePost);
        } catch (e) {
          console.warn(`${imageId} onClick not supported`);
        }

        try {
          $w(dateId).onClick(navigatePost);
        } catch (e) {
          console.warn(`${dateId} onClick not supported`);
        }

        try {
          $w(durationId).onClick(navigatePost);
        } catch (e) {
          console.warn(`${durationId} onClick not supported`);
        }

        try {
          $w(titleId).onClick(navigatePost);
        } catch (e) {
          console.warn(`${titleId} onClick not supported`);
        }

        try {
          $w(descId).onClick(navigatePost);
        } catch (e) {
          console.warn(`${descId} onClick not supported`);
        }

        console.log(`✅ Item ${itemNum} fully rendered`);
      } catch (e) {
        console.error(`❌ Error rendering item ${itemNum}:`, e.message);
      }
    });
  } catch (e) {
    console.error("Error loading research posts:", e);
  }
});
