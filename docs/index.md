---
layout: default
title: "A WebGL Playground"
---
<div class="demo">
{% for project in site.threejs %}
<article class="item">
    <a href="{{site.baseurl}}{{project.url}}">
    {% if project.thumbnail %}
        <figure>
            <img src="{{site.baseurl}}{{project.thumbnail[0]}}" alt="{{project.thumbnail[1]}}">
        </figure>
    {% endif %}
    <h3 class="title">{{project.title}}</h3> 
    </a>
    <div class="date">{{project.date | date: "%-d %B %Y" }}</div>
    <p>{{project.summary}}</p>
   
</article>
{% endfor %}
</div>


