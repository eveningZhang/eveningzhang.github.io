---
title: 文章归档
layout: default
permalink: /archive/
---

<section class="content-section archive-page">
  <h1>文章归档</h1>
  <div class="archive-list">
    {% for post in site.posts %}
      <article class="archive-item">
        <p class="post-meta">{{ post.date | date: "%Y-%m-%d" }}</p>
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <p>{{ post.excerpt | strip_html | truncate: 120 }}</p>
      </article>
    {% endfor %}
  </div>
</section>