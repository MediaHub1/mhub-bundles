import * as i18n from "@mediahubmx/i18n";
import {
  Addon,
  createAddon,
  DashboardItem,
  runCli,
  translateDeep,
} from "@mediahubmx/sdk";

(async () => {
  await i18n.init(["en", "de", "fr", "tr", "es", "nl"], {
    lng: "en",
    defaultNS: "bundles",
    ns: ["bundles"],
  });

  const watchup = createAddon(
    translateDeep(
      <Addon>{
        id: "where-to-watch",
        name: "Where To Watch",
        version: "1.0.0",
        icon: "https://avatars1.githubusercontent.com/u/76741193?s=200&v=4",
        requirements: ["../tmdb", "../werstreamtes", "../youtube-resolver"],
      },
      i18n.tAll,
      "watchup"
    )
  );

  const mediathek = createAddon(
    translateDeep(
      <Addon>{
        id: "mediathek-bundle",
        name: "Mediathek Bundle",
        description: "i18n:Mediathek bundle which various german Mediatheks.",
        version: "1.2.0",
        icon: "https://avatars1.githubusercontent.com/u/76741193?s=200&v=4",
        requirements: ["../ard-mediathek", "../zdf-mediathek"],
      },
      i18n.tAll,
      "mediathek"
    )
  );

  const ted = createAddon(
    translateDeep(
      <Addon>{
        id: "ted-bundle",
        name: "TED Bundle",
        description: "TED Topics",
        version: "1.0.0",
        icon: "https://pi.tedcdn.com/r/pl.tedcdn.com/social/ted-logo-fb.png",
        requirements: ["../ted"],
        pages: [
          {
            dashboards: [
              "Technology",
              "Entertainment",
              "Design",
              "Business",
              "Science",
              "Global issues",
            ].map<DashboardItem>((key) => {
              return {
                type: "directory",
                addonId: "ted",
                name: `TED: ${key}`,
                id: `ted-${key}`,
                args: {
                  filter: {
                    topics: [key],
                  },
                },
              };
            }),
          },
        ],
      },
      i18n.tAll,
      "ted"
    )
  );

  runCli([watchup, mediathek, ted]);
})();
