---
layout: page
eleventyComputed:
  menu:
  - text: "{{pkg.name}}"
    url: /
    icon: "{% include 'icons/logo.njk' %}"
  - text: GitHub
    url: "{{pkg.homepage}}"
    icon: "{% include 'icons/github.njk' %}"
  - text: Twitter
    url: "{{pkg.author.twitter}}"
    icon: "{% include 'icons/twitter.njk' %}"
  - text: "{{pkg.author.name}}"
    url: "{{pkg.author.url}}"
    icon: "{% include 'icons/author-logo.njk' %}"
---
# {{pkg.name}} - v{{pkg.version}}

{{pkg.description}}
