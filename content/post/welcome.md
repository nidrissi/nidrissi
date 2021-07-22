---
date: 2015-12-21
tags: [code]
title: Hello Everyone!
---

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

Hi! If you're reading this, it means I've finally decided to upload my blog, and this is my first post.

## Me

If you don't know me (how did you get here?!) I'm Najib Idrissi, a doctoral student in math at [Université Lille 1](https://www.univ-lille1.fr). You can also read the [about page](/#about).

I've decided to create this blog because... well, everybody is doing it. More seriously, I wanted to share stuff about mathematics that I couldn't necessarily share through other means (e.g. [math.SE](https://math.stackexchange.com)). I also wanted to have a website which wasn't hosted by my university (I have a webpage hosted by my lab _[Update 2019: link is dead]_) to have a bit more freedom. Plus, creating the website was an interesting challenge.

## Technical stuff

As you may have noted from the URL, this website is hosted by [<FontAwesomeIcon icon={faGithub} />&nbsp;GitHub](https://github.com), using their [GitHub pages](https://pages.github.com). I didn't want this website to be too much of a hassle to make, and I already use [Git](https://git-scm.com/) for all my writing anyway, so this seemed to be one of the best ways. Making changes is as easy as `git commit -am '...' && git push` (I actually use [Magit](https://magit.vc/) for Emacs, so it looks more like <kbd>c -a c '...' C-c C-c P P</kbd>), and I can easily access everything from anywhere.

GitHub Pages uses [Jekyll](https://jekyllrb.com/) to generate the website, a tool written in Ruby to produce static websites. No pesky databases needed! It also easily allows one to structure the website coherently -- those of you who are interested can check out my [GitHub repository](https://github.com/nidrissi/idrissi.eu) to see how it works. Once everything is set up correctly, writing a post is as easy as creating a new file in the `_posts` directory and starting to write. Posts themselves are formatted with [Kramdown](https://kramdown.gettalong.org/) for maximum ease -- here's what this paragraph actually looks like from my end:

```markdown
GitHub Pages uses [Jekyll](https://jekyllrb.com/) to generate the website, a tool written in Ruby to produce static websites. No pesky databases needed! It also easily allows one to structure the website coherently -- those of you who are interested can check out my [GitHub repository](https://github.com/nidrissi/idrissi.eu) to see how it works. Once everything is set up correctly, writing a post is as easy as creating a new file in the `_posts` directory and starting to write. Posts themselves are formatted with [Kramdown](https://kramdown.gettalong.org/) for maximum ease -- here's what this paragraph actually looks like from my end:
```

The design itself is done with the [Bootstrap](https://getbootstrap.com/) framework (which uses [jQuery](https://jquery.com/) underneath). It makes it very easy to create navigation bars (at the top), fixed sidebars (on the right), etc. I settled on [Font Awesome](https://fortawesome.github.io/Font-Awesome/) for the icons. Again, check out the GitHub repository to see how it works. I also set up MathJax to produce math formulas:

$$
1+1=2.
$$

The lack of database came at a cost though: I couldn't host comments myself. I decided to use [Disqus](https://disqus.com/), which is apparently very popular. I wish I had found something a bit less intrusive though. **Note**: you can comment as a guest! It's not very intuitive, but start filling out "Sign up with disqus" and then choose "I'd rather post as a guest".

## What I plan to do

As I said, this blog will probably be mostly about math. I don't have a fixed schedule -- hopefully there will at least be a new post once a month? We'll see. I think my first actual post will be about the Eckmann--Hilton argument (about which I wrote a [math.SE answer](http://math.stackexchange.com/q/1203807/10014)), so stay tuned!

If you have any comments about all this (the design of the site, the planned content...), don't hesitate to tell me.
