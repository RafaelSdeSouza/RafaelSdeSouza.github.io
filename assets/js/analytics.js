(() => {
  const allowedHosts = new Set([
    "rafaelsdesouza.com.br",
    "www.rafaelsdesouza.com.br",
    "rafaelsdesouza.github.io",
  ]);

  const canTrack =
    !window.RSD_ANALYTICS_DISABLED &&
    allowedHosts.has(window.location.hostname.toLowerCase()) &&
    typeof window.gtag === "function";

  const cleanText = (text) => text.replace(/\s+/g, " ").trim().slice(0, 120);

  const linkLabel = (anchor) =>
    cleanText(
      anchor.getAttribute("aria-label") ||
        anchor.textContent ||
        anchor.getAttribute("href") ||
        "link"
    );

  const classifyLink = (anchor) => {
    const href = anchor.getAttribute("href") || "";
    const url = new URL(href, window.location.href);
    const hostname = url.hostname.toLowerCase();

    if (href.includes("assets/cv/cv.pdf")) return "cv_download";
    if (href.startsWith("mailto:")) return "email_click";
    if (hostname === "github.com" || hostname.endsWith(".github.com")) return "github_click";
    if (anchor.closest(".publication-card, .featured-book")) return "publication_click";
    if (anchor.closest(".project-card") || anchor.closest("#software-grid")) return "software_click";
    if (anchor.closest(".research-card") || anchor.closest("#research-application-grid")) return "research_click";
    if (anchor.closest(".writing-card") || anchor.closest("#writing-grid")) return "writing_click";
    if (anchor.closest(".contact-links, .contact-page, .compact-contact")) return "contact_click";
    if (url.origin !== window.location.origin) return "external_click";

    return null;
  };

  const track = (eventName, params = {}) => {
    if (!canTrack || !eventName) return;
    window.gtag("event", eventName, {
      page_path: window.location.pathname,
      page_title: document.title,
      ...params,
    });
  };

  document.addEventListener("click", (event) => {
    const anchor = event.target.closest("a[href]");
    if (!anchor) return;

    const eventName = classifyLink(anchor);
    if (!eventName) return;

    const url = new URL(anchor.getAttribute("href"), window.location.href);
    track(eventName, {
      link_url: url.href,
      link_text: linkLabel(anchor),
      outbound: url.origin !== window.location.origin,
    });
  });

  window.rsdTrack = track;
})();
