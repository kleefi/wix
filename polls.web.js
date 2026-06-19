import { webMethod, Permissions } from "wix-web-module";
import wixData from "wix-data";

export const getActivePolls = webMethod(Permissions.Anyone, async () => {
  const result = await wixData
    .query("Polls")
    .eq("active", true)
    .descending("_createdDate")
    .limit(10)
    .find();

  return result.items;
});
