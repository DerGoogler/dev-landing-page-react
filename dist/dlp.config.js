function config(platform) {
  return {
    config: {
      intro: "default",
      tagline: `gg | ff | Backend`,
      theme: "white-red",
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
