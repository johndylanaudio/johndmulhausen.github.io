---
layout: null
---
var pages = [{% assign isFirst = "yes" %}{% for page in site.pages %}{% if isFirst == "no" %},{% else %}{% assign isFirst = "no" %}{% endif %}{"url":{{ page.url | jsonify }},"title":{{ page.title | jsonify }},"description":{{ page.description | jsonify }},"keywords":{{ page.keywords | jsonify }}}{% endfor %}]
var posts = [{% assign isFirst = "yes" %}{% for page in site.posts %}{% if isFirst == "no" %},{% else %}{% assign isFirst = "no" %}{% endif %}{"url":{{ page.url | jsonify }},"title":{{ page.title | jsonify }},"description":{{ page.description | jsonify }},"keywords":{{ page.keywords | jsonify }},"date":{{ page.date | jsonify }}}{% endfor %}]
