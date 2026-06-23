import { getAuthors } from "backend/opini.web";
import wixLocation from "wix-location";
const PAGE_SIZE = 9;

let allAuthors = [];
let currentPage = 1;
let totalPages = 1;

$w.onReady(async () => {
  allAuthors = await getAuthors();

  totalPages = Math.ceil(allAuthors.length / PAGE_SIZE);

  if (totalPages <= 1) {
    $w("#opiniPrevBtn").collapse();
    $w("#opiniNextBtn").collapse();
    $w("#opiniPageInfo").collapse();
  } else {
    $w("#opiniPrevBtn").expand();
    $w("#opiniNextBtn").expand();
    $w("#opiniPageInfo").expand();
  }

  renderPage();

  $w("#opiniPrevBtn").onClick(() => {
    if (currentPage > 1) {
      currentPage--;
      renderPage();
    }
  });

  $w("#opiniNextBtn").onClick(() => {
    if (currentPage < totalPages) {
      currentPage++;
      renderPage();
    }
  });
});

function renderPage() {
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const pageData = allAuthors.slice(start, end);

  $w("#opiniRepeater").data = pageData;

  $w("#opiniRepeater").onItemReady(($item, itemData) => {
    $item("#authorName").text = itemData.name || "";
    $item("#authorTitle").text = itemData.title || "";

    if (itemData.image) {
      $item("#authorImage").src = itemData.image;
    }

    const profileUrl = `/profile/${itemData.slug}/profile`;

    $item("#authorImage").onClick(() => {
      wixLocation.to(profileUrl);
    });

    $item("#authorName").onClick(() => {
      wixLocation.to(profileUrl);
    });
    $item("#authorCard").onClick(() => {
      wixLocation.to(profileUrl);
    });
  });

  $w("#opiniPageInfo").text = `Halaman ${currentPage} dari ${totalPages}`;

  $w("#opiniPrevBtn").disable();
  $w("#opiniNextBtn").disable();

  if (currentPage > 1) {
    $w("#opiniPrevBtn").enable();
  }

  if (currentPage < totalPages) {
    $w("#opiniNextBtn").enable();
  }
}
