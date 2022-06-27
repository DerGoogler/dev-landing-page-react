[website]: https://dergoogler.com
[rtb]: https://github.com/DerGoogler/react-typescript-boilerplate
[dlp]: https://github.com/flexdinesh/dev-landing-page

# [Dev Landing Page][website]

Used [react-typescript-boilerplate][rtb] and [dev-landing-page][dlp]

## Usage

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Me | Your Name</title>

    <link
      rel="icon"
      href="https://avatars.githubusercontent.com/u/54764558?v=4"
      type="image/png"
    />

    <link
      href="https://fonts.googleapis.com/css?family=Reem+Kufi|Roboto:300"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.dergoogler.com/internal/dlp/bundle/vendor.bundle.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.dergoogler.com/internal/dlp/bundle/app.bundle.css"
    />
  </head>
  <body>
    <app></app>
    <script src="https://cdn.dergoogler.com/internal/dlp/bundle/vendor.bundle.js"></script>
    <script src="https://cdn.dergoogler.com/internal/dlp/bundle/app.bundle.js"></script>
  </body>
</html>
```

dlp.config.js

```js
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
```
