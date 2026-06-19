import wixLocation from "wix-location";
import { getNewsPostsByPage } from "backend/news.web";

let currentPage = 0;
let totalPages = 0;

$w.onReady(async function () {
  $w("#opiniRepeater").onItemReady(($item, post) => {
    $item("#articleImage").src = post.media?.wixMedia?.image || "";

    $item("#articleTitle").text = post.title || "";

    $item("#articleDescription").text = post.excerpt
      ? post.excerpt.split(" ").slice(0, 15).join(" ") + "..."
      : "";

    $item("#articleDate").text = new Date(
      post.firstPublishedDate,
    ).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    $item("#articleDuration").text = `${post.minutesToRead || 0} min read`;

    const goToPost = () => {
      wixLocation.to(`/post/${post.slug}`);
    };

    $item("#articleImage").onClick(goToPost);
    $item("#articleTitle").onClick(goToPost);
    $item("#articleDescription").onClick(goToPost);
  });

  await loadPage(0);

  $w("#opiniNextBtn").onClick(async () => {
    if (currentPage < totalPages - 1) {
      await loadPage(currentPage + 1);
      await $w("#topSection").scrollTo();
    }
  });

  $w("#opiniPrevBtn").onClick(async () => {
    if (currentPage > 0) {
      await loadPage(currentPage - 1);
      await $w("#topSection").scrollTo();
    }
  });
});

async function loadPage(pageNum) {
  const result = await getNewsPostsByPage(pageNum);

  currentPage = pageNum;
  totalPages = result.totalPages;

  $w("#opiniRepeater").data = result.posts;

  updatePagination();
}

function updatePagination() {
  if (totalPages <= 1) {
    $w("#opiniPrevBtn").collapse();
    $w("#opiniNextBtn").collapse();
    $w("#opiniPageInfo").collapse();

    return;
  }

  $w("#opiniPrevBtn").expand();
  $w("#opiniNextBtn").expand();
  $w("#opiniPageInfo").expand();

  $w("#opiniPrevBtn").disabled = currentPage === 0;

  $w("#opiniNextBtn").disabled = currentPage >= totalPages - 1;

  $w("#opiniPageInfo").text = `Page ${currentPage + 1} of ${totalPages}`;
}
