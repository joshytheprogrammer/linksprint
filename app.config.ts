// app.config.ts
export default defineAppConfig({
  head: {
    title: 'Joshytheprogrammer - URL Shortener',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'A fast, reliable, and user-friendly URL shortener service.' },
      { name: 'author', content: 'Joshytheprogrammer' },
      { name: 'keywords', content: 'URL Shortener, Link Shortener, Joshytheprogrammer, Fast Links' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://linksprint.joshytheprogrammer.com' },
      { property: 'og:title', content: 'Joshytheprogrammer - URL Shortener' },
      { property: 'og:description', content: 'Simplify your links effortlessly with our fast and reliable URL shortener.' },
      { property: 'og:image', content: 'https://res.cloudinary.com/dsgvwxygr/image/upload/v1736970509/joshytheprogrammer/ufou176tensgw9gacdnq.png' }
    ]
  }
});
