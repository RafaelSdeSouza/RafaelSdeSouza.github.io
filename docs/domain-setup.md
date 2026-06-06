# Custom Domain and Google Visibility

When you are ready to use a personal domain, GitHub Pages can serve this site from that domain.

## Recommended Setup

The configured website domain is `rafaelsdesouza.com.br`.

Optionally also configure `www.rafaelsdesouza.com.br` as an alias that redirects to the root domain. GitHub recommends setting up the `www` subdomain together with the apex/root domain for HTTPS.

## GitHub Pages Steps

1. Push this repository to GitHub.
2. In the GitHub repository, go to `Settings > Pages`.
3. Set the source to deploy from the `main` branch and root folder.
4. Under custom domain, enter `rafaelsdesouza.com.br`.
5. GitHub will create or expect a root-level `CNAME` file containing that domain.
6. Once DNS is correct, enable `Enforce HTTPS`.

## DNS Steps

At your domain registrar, configure the apex/root domain with GitHub Pages records. If your registrar supports `ALIAS` or `ANAME`, point the root domain to `RafaelSdeSouza.github.io`. If it uses `A` records, use GitHub's current Pages IP addresses from the official documentation.

Also create a `CNAME` record for `www`:

```text
Host: www
Type: CNAME
Value: RafaelSdeSouza.github.io
```

In Registro.br this usually means editing the DNS zone for `rafaelsdesouza.com.br`, adding the root records, and adding `www` as a CNAME.

## Google Search

After the domain works:

1. Add `https://rafaelsdesouza.com.br` to Google Search Console.
2. Submit a sitemap.
3. Make sure the page title, description, structured data, ORCID, GitHub, and institutional links are correct.
4. Keep the same domain long term so citations, search results, and links accumulate authority.
