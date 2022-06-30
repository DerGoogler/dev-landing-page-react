function config(platform, theme) {
  return {
    intro: "Sample Name",
    tagline: `Cool | Frontend | Backend`,
    theme: {
      "@global": {
        main: {
          background: "#0076ff",
          color: "#fff",
        },
        ".iconColor": {
          color: "#fff",
        },
      },
    },
    links: [
      {
        icon: "github",
        link: "https://github.com/DerGoogler",
      },
      // Shows only when not opened in Instagram browser
      {
        icon: "instagram",
        hide: platform.isInstagram,
        link: "https://instagram.com/der_googler",
      },
    ],
  };
}
