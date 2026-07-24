# MNRC

A lightweight, single-page website for MNRC, a New York diamond and precious
metals dealer.

## Project structure

- `index.html` â€” page content and search metadata
- `styles.css` â€” responsive layout, typography, and visual design
- `script.js` â€” mobile navigation, header state, and subtle reveal motion
- `robots.txt` and `sitemap.xml` â€” basic search-engine discovery

There is no build step and no JavaScript framework. The site can be served
directly by nginx.

## Preview locally

From the project folder, start any static file server. For example:

```sh
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## nginx

Point the server block's `root` at the folder containing these files:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name mnrc.llc www.mnrc.llc;

    root /var/www/mnrc.llc;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~* \.(css|js|xml|txt)$ {
        expires 7d;
        add_header Cache-Control "public, max-age=604800";
    }
}
```

TLS should be configured on the VPS before the public launch.

