import wixLocation from "wix-location";
import { getAllHomeData } from "backend/home.web";

$w.onReady(async function () {
  try {
    // SINGLE CALL - fetch semua data home page
    const {
      latestNews,
      newsList,
      opiniList,
      researchList,
      journalList,
      topPosts,
    } = await getAllHomeData();

    // ===== LATEST NEWS (LEFT COLUMN) =====
    if (latestNews) {
      try {
        $w("#newsImage").src = latestNews.media.wixMedia.image;
        $w("#newsTitle").text = latestNews.title;
        $w("#newsDescription").text =
          latestNews.excerpt.split(" ").slice(0, 20).join(" ") + "...";
        $w("#newsDate").text = new Date(
          latestNews.firstPublishedDate,
        ).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        $w("#newsDuration").text = `${latestNews.minutesToRead} min read`;

        const navigateLatestNews = () => {
          wixLocation.to(`/post/${latestNews.slug}`);
        };

        // Try to attach onClick, skip if element doesn't support it
        try {
          $w("#newsImage").onClick(navigateLatestNews);
        } catch (e) {
          console.warn("#newsImage onClick not supported");
        }
        try {
          $w("#newsTitle").onClick(navigateLatestNews);
        } catch (e) {
          console.warn("#newsTitle onClick not supported");
        }
        try {
          $w("#newsDate").onClick(navigateLatestNews);
        } catch (e) {
          console.warn("#newsDate onClick not supported");
        }
        try {
          $w("#newsDuration").onClick(navigateLatestNews);
        } catch (e) {
          console.warn("#newsDuration onClick not supported");
        }
        try {
          $w("#newsDescription").onClick(navigateLatestNews);
        } catch (e) {
          console.warn("#newsDescription onClick not supported");
        }
      } catch (e) {
        console.error("Error rendering latest news:", e);
      }
    }

    // ===== NEWS LIST (MIDDLE COLUMN) =====
    if (newsList && newsList.length > 0) {
      try {
        // Item 1
        if (newsList[0]) {
          $w("#news2Image").src = newsList[0].media.wixMedia.image;
          $w("#news2Title").text =
            newsList[0].title.split(" ").slice(0, 5).join(" ") + "...";
          $w("#news2Description").text =
            newsList[0].excerpt.split(" ").slice(0, 10).join(" ") + "...";

          const navigateNews1 = () => {
            wixLocation.to(`/post/${newsList[0].slug}`);
          };

          try {
            $w("#news2Image").onClick(navigateNews1);
          } catch (e) {
            console.warn("#news2Image onClick not supported");
          }
          try {
            $w("#news2Title").onClick(navigateNews1);
          } catch (e) {
            console.warn("#news2Title onClick not supported");
          }
          try {
            $w("#news2Description").onClick(navigateNews1);
          } catch (e) {
            console.warn("#news2Description onClick not supported");
          }
        }

        // Item 2
        if (newsList[1]) {
          $w("#news2Image2").src = newsList[1].media.wixMedia.image;
          $w("#news2Title2").text =
            newsList[1].title.split(" ").slice(0, 5).join(" ") + "...";
          $w("#news2Description2").text =
            newsList[1].excerpt.split(" ").slice(0, 10).join(" ") + "...";

          const navigateNews2 = () => {
            wixLocation.to(`/post/${newsList[1].slug}`);
          };

          try {
            $w("#news2Image2").onClick(navigateNews2);
          } catch (e) {
            console.warn("#news2Image2 onClick not supported");
          }
          try {
            $w("#news2Title2").onClick(navigateNews2);
          } catch (e) {
            console.warn("#news2Title2 onClick not supported");
          }
          try {
            $w("#news2Description2").onClick(navigateNews2);
          } catch (e) {
            console.warn("#news2Description2 onClick not supported");
          }
        }
      } catch (e) {
        console.error("Error rendering news list:", e);
      }
    }

    // ===== OPINI LIST (RIGHT COLUMN) =====
    if (opiniList && opiniList.length > 0) {
      try {
        // Item 1
        if (opiniList[0]) {
          $w("#opini3ImageAuthor").src = opiniList[0].media.wixMedia.image;
          $w("#opini3Title").text =
            opiniList[0].title.split(" ").slice(0, 5).join(" ") + "...";
          $w("#opini3Description").text =
            opiniList[0].excerpt.split(" ").slice(0, 5).join(" ") + "...";
          $w("#opini3Date").text = new Date(
            opiniList[0].firstPublishedDate,
          ).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          if (opiniList[0].author) {
            $w("#opini3Author").text = opiniList[0].author.name;
          }

          const navigateOpini1 = () => {
            wixLocation.to(`/post/${opiniList[0].slug}`);
          };

          try {
            $w("#opini3ImageAuthor").onClick(navigateOpini1);
          } catch (e) {
            console.warn("#opini3ImageAuthor onClick not supported");
          }
          try {
            $w("#opini3Title").onClick(navigateOpini1);
          } catch (e) {
            console.warn("#opini3Title onClick not supported");
          }
          try {
            $w("#opini3Description").onClick(navigateOpini1);
          } catch (e) {
            console.warn("#opini3Description onClick not supported");
          }
          try {
            $w("#opini3Author").onClick(navigateOpini1);
          } catch (e) {
            console.warn("#opini3Author onClick not supported");
          }
          try {
            $w("#opini3Date").onClick(navigateOpini1);
          } catch (e) {
            console.warn("#opini3Date onClick not supported");
          }
        }

        // Item 2
        if (opiniList[1]) {
          $w("#opini3ImageAuthor2").src = opiniList[1].media.wixMedia.image;
          $w("#opini3Title2").text =
            opiniList[1].title.split(" ").slice(0, 5).join(" ") + "...";
          $w("#opini3Description2").text =
            opiniList[1].excerpt.split(" ").slice(0, 5).join(" ") + "...";
          $w("#opini3Date2").text = new Date(
            opiniList[1].firstPublishedDate,
          ).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          if (opiniList[1].author) {
            $w("#opini3Author2").text = opiniList[1].author.name;
          }

          const navigateOpini2 = () => {
            wixLocation.to(`/post/${opiniList[1].slug}`);
          };

          try {
            $w("#opini3ImageAuthor2").onClick(navigateOpini2);
          } catch (e) {
            console.warn("#opini3ImageAuthor2 onClick not supported");
          }
          try {
            $w("#opini3Title2").onClick(navigateOpini2);
          } catch (e) {
            console.warn("#opini3Title2 onClick not supported");
          }
          try {
            $w("#opini3Description2").onClick(navigateOpini2);
          } catch (e) {
            console.warn("#opini3Description2 onClick not supported");
          }
          try {
            $w("#opini3Author2").onClick(navigateOpini2);
          } catch (e) {
            console.warn("#opini3Author2 onClick not supported");
          }
          try {
            $w("#opini3Date2").onClick(navigateOpini2);
          } catch (e) {
            console.warn("#opini3Date2 onClick not supported");
          }
        }

        // Item 3
        if (opiniList[2]) {
          $w("#opini3ImageAuthor3").src = opiniList[2].media.wixMedia.image;
          $w("#opini3Title3").text =
            opiniList[2].title.split(" ").slice(0, 5).join(" ") + "...";
          $w("#opini3Description3").text =
            opiniList[2].excerpt.split(" ").slice(0, 5).join(" ") + "...";
          $w("#opini3Date3").text = new Date(
            opiniList[2].firstPublishedDate,
          ).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          if (opiniList[2].author) {
            $w("#opini3Author3").text = opiniList[2].author.name;
          }

          const navigateOpini3 = () => {
            wixLocation.to(`/post/${opiniList[2].slug}`);
          };

          try {
            $w("#opini3ImageAuthor3").onClick(navigateOpini3);
          } catch (e) {
            console.warn("#opini3ImageAuthor3 onClick not supported");
          }
          try {
            $w("#opini3Title3").onClick(navigateOpini3);
          } catch (e) {
            console.warn("#opini3Title3 onClick not supported");
          }
          try {
            $w("#opini3Description3").onClick(navigateOpini3);
          } catch (e) {
            console.warn("#opini3Description3 onClick not supported");
          }
          try {
            $w("#opini3Author3").onClick(navigateOpini3);
          } catch (e) {
            console.warn("#opini3Author3 onClick not supported");
          }
          try {
            $w("#opini3Date3").onClick(navigateOpini3);
          } catch (e) {
            console.warn("#opini3Date3 onClick not supported");
          }
        }
      } catch (e) {
        console.error("Error rendering opini list:", e);
      }
    }

    // ===== RESEARCH LIST =====
    if (researchList && researchList.length > 0) {
      try {
        // Item 1
        if (researchList[0]) {
          $w("#research4ImageAuthor").src =
            researchList[0].media.wixMedia.image;
          $w("#research4Title").text =
            researchList[0].title.split(" ").slice(0, 10).join(" ") + "...";
          $w("#research4Description").text =
            researchList[0].excerpt.split(" ").slice(0, 15).join(" ") + "...";
          $w("#research4Date").text = new Date(
            researchList[0].firstPublishedDate,
          ).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          $w("#research4Duration").text =
            `${researchList[0].minutesToRead} min read`;

          const navigateResearch1 = () => {
            wixLocation.to(`/post/${researchList[0].slug}`);
          };

          try {
            $w("#research4ImageAuthor").onClick(navigateResearch1);
          } catch (e) {
            console.warn("#research4ImageAuthor onClick not supported");
          }
          try {
            $w("#research4Title").onClick(navigateResearch1);
          } catch (e) {
            console.warn("#research4Title onClick not supported");
          }
          try {
            $w("#research4Description").onClick(navigateResearch1);
          } catch (e) {
            console.warn("#research4Description onClick not supported");
          }
          try {
            $w("#research4Date").onClick(navigateResearch1);
          } catch (e) {
            console.warn("#research4Date onClick not supported");
          }
          try {
            $w("#research4Duration").onClick(navigateResearch1);
          } catch (e) {
            console.warn("#research4Duration onClick not supported");
          }
        }

        // Item 2
        if (researchList[1]) {
          $w("#research4ImageAuthor2").src =
            researchList[1].media.wixMedia.image;
          $w("#research4Title2").text =
            researchList[1].title.split(" ").slice(0, 10).join(" ") + "...";
          $w("#research4Description2").text =
            researchList[1].excerpt.split(" ").slice(0, 15).join(" ") + "...";
          $w("#research4Date2").text = new Date(
            researchList[1].firstPublishedDate,
          ).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          $w("#research4Duration2").text =
            `${researchList[1].minutesToRead} min read`;

          const navigateResearch2 = () => {
            wixLocation.to(`/post/${researchList[1].slug}`);
          };

          try {
            $w("#research4ImageAuthor2").onClick(navigateResearch2);
          } catch (e) {
            console.warn("#research4ImageAuthor2 onClick not supported");
          }
          try {
            $w("#research4Title2").onClick(navigateResearch2);
          } catch (e) {
            console.warn("#research4Title2 onClick not supported");
          }
          try {
            $w("#research4Description2").onClick(navigateResearch2);
          } catch (e) {
            console.warn("#research4Description2 onClick not supported");
          }
          try {
            $w("#research4Date2").onClick(navigateResearch2);
          } catch (e) {
            console.warn("#research4Date2 onClick not supported");
          }
          try {
            $w("#research4Duration2").onClick(navigateResearch2);
          } catch (e) {
            console.warn("#research4Duration2 onClick not supported");
          }
        }
      } catch (e) {
        console.error("Error rendering research list:", e);
      }
    }

    // ===== JOURNAL SECTION =====
    if (journalList && journalList.length > 0 && journalList[0]) {
      try {
        $w("#journalTitle").text = journalList[0].title;
        $w("#journalDescription").text =
          journalList[0].excerpt.split(" ").slice(0, 12).join(" ") + "...";

        const navigateJournal = () => {
          wixLocation.to(`/post/${journalList[0].slug}`);
        };

        try {
          $w("#journalButton").onClick(navigateJournal);
        } catch (e) {
          console.warn("#journalButton onClick not supported");
        }
      } catch (e) {
        console.error("Error rendering journal section:", e);
      }
    }

    // ===== TOP 5 POSTS SECTION REPEATER =====
    if (topPosts && topPosts.length > 0) {
      $w("#topRepeater").data = topPosts.map((post, index) => ({
        ...post,
        _id: post._id || String(index),
      }));

      $w("#topRepeater").onItemReady(($item, itemData) => {
        $item("#topTitle").text = itemData.title || "";

        $item("#topDate").text = new Date(
          itemData.firstPublishedDate,
        ).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        $item("#topDuration").text = `${itemData.minutesToRead || 0} min read`;

        const navigatePost = () => {
          wixLocation.to(`/post/${itemData.slug}`);
        };

        $item("#topTitle").onClick(navigatePost);
        $item("#topDate").onClick(navigatePost);
        $item("#topDuration").onClick(navigatePost);
      });
    }
  } catch (e) {
    console.error("Error in onReady:", e);
  }
});
