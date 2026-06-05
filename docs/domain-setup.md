# Custom Domain and Google Visibility

When you are ready to use a personal domain, GitHub Pages can serve this site from that domain.

## Recommended Setup

Use `www.yourdomain.com` as the main website address and redirect `yourdomain.com` to it. GitHub recommends setting up the `www` subdomain together with the apex/root domain for HTTPS.

## GitHub Pages Steps

1. Push this repository to GitHub.
2. In the GitHub repository, go to `Settings > Pages`.
3. Set the source to deploy from the `main` branch and root folder.
4. Under custom domain, enter your chosen domain, for example `www.yourdomain.com`.
5. GitHub will create or expect a root-level `CNAME` file containing that domain.
6. Once DNS is correct, enable `Enforce HTTPS`.

## DNS Steps

At your domain registrar, create a `CNAME` record:

```text
Host: www
Type: CNAME
Value: RafaelSdeSouza.github.io
```

For the apex/root domain, follow GitHub's current documentation for `A`, `AAAA`, `ALIAS`, or `ANAME` records. Do not copy IP addresses from old tutorials; GitHub's documentation is the source of truth.

## Google Search

After the domain works:

1. Add the final domain to Google Search Console.
2. Submit a sitemap.
3. Make sure the page title, description, structured data, ORCID, GitHub, and institutional links are correct.
4. Keep the same domain long term so citations, search results, and links accumulate authority.
