---
title: "Git for Mathematicians (1): Preliminaries"
date: 2021-04-13
lastMod: 2021-04-26
tags: [code, math]
urls:
  custom:
    - label: "Part 2: The Theory"
      url: /post/git-2-theory
    - label: "Part 3a: The Practice"
      url: /post/git-3-practice
---

This post is the first in a series in which I will try to explain how to use Git to write papers, with an audience of professional mathematicians in mind.
I know that there are a lot of material online about learning Git, but as far as I can tell, none are tailored specifically for mathematicians' needs (which differ a bit from programmers' needs).
Here, I will try to explain why one would even be interested in Git to begin with.

## Why do I need a (distributed) version control system?

Git is a [distributed version control system](https://en.wikipedia.org/wiki/Distributed_version_control).
Behind this barbarous name is a rather simple idea.
Suppose that you are writing an article.
This article is typically composed of a LaTeX file (I did say I was writing for mathematicians), a bibliographical database, sometimes figures, maybe even some code, etc.
As your work advances, you are faced with various challenges that need to be solved:

- You want to easily _work on your files from various places_ (your laptop, your desktop at work, your desktop at work, etc).
- You want to _keep track of the history_ of your files, in case e.g. you change something but later on you change your mind and want to revert those changes.
- In particular, you may want to _pinpoint specific versions_ of your article, e.g. the v1 that you sent to arXiv, the version that you submitted to a journal, etc.
- You may want to _make "parallel" changes_ to your article. This may mean various things. For example, you may want to keep one version of your article in your favorite style and submit that one to arXiv, and another version in the journal's house style for the final submission.
- You want a _backup_ of your article if you something happens to your computer.
- You want to collaborate with other authors, which brings its own set of challenges:
  - You want to be able to _share the article with your collaborators_.
  - You want to all _be on the same page_ about what's the "current" version of the article. Nobody wants to sift through a dozen email with attachments named `article-prefinal-06_04-wip.tex` or `article-final-v4-submitted-corrigendum-reply3-banana6.tex`.
  - When a collaborator changes something, you want to _see what was changed_, and perhaps even get an automatic email with the changes.
  - And perhaps the most difficult task: if two collaborators change the same sentence at the same time (it happens!), you want to easily be able to _resolve the "conflict"_.
    Not in the diplomatic sense, of course: you want to know what were the changes made by each one, easily choose on which version to keep (or even write a third version).
    And implicitly, you don't want to miss the fact that there was a conflict to begin with, which can happen if you are working through email and everyone just sends around their most recent version.
  - (Bonus) You may even want to have a central place to collaborate other than through endless emails, meetings, etc.

Does this sound like a lot?
That's because it is!
There are various ways to solve some or all these problems.
They range from "everyone writes one section of the paper alone and the paper gets merged in the end" to "we have a copy of the paper in a Dropbox folder and we hope that nobody works on it at the same time" through "we send each other versions of the paper by email until the process converges".
This can certainly work, and a combination of these has been the standard way to collaboratively work on math papers since the invention of the Internet, I guess.
But each approach has its pitfalls.

## Why Git?

Distributed version control systems (DVCSs) are essentially an answer to all these challenges and the pitfalls of the other approaches.
I will not bore you with the details of the history of version control systems.
You may have heard of some of them, like the old-school CVS or Subversion, or the other DVCSs like Mercurial or GNU Bazaar.
Git, which was created by Linus Torvalds (who also created the Linux kernel) in 2005.

While there used to be some contention in the early days (Subversion supplanted CVS a while ago, then DVCSs came along and the battle raged between Git and Mercurial), it is generally accepted today that [Git](https://git-scm.com/) is the most popular one.
In 2018, the [StackOverflow developer survey](https://insights.stackoverflow.com/survey/2018#work-_-version-control) listed Git as the most-used VCS with a 87.2% market share.
Newer editions of the developer survey do not even include the question anymore, as Git is completely dominating the scene.
Even Microsoft is using Git to [manage the source code of Windows](https://devblogs.microsoft.com/bharry/the-largest-git-repo-on-the-planet/).

So how does a distributed version control system like Git work?
There are two operative phrases in the name, that can be explained at a high level:

- Git is a _version control system_.
  It keeps tracks of versions.
  When you are working on your article, you will modify your files as usual.
  Then, once you are satisfied with your changes, you _commit_ them to Git.
  This creates a new "version" in Git that says "the files are in this state".
  It also contains extra metadata, such as who committed and when, and what the previous version was, essentially.
  Everything else in Git is bells and whistles around the basic cycle: modify the files → commit the changes → modify the files → commit the changes → ...
- Git is _distributed_.
  Essentially, this means that unlike the old-school version control systems like CVS or Subversion, every user downloads the complete history of the repository and makes changes based on the complete history.
  "User" should be understood in a wide sense: if you are working from two different computers, and you download a Git repository on both, then both copies will contain the full history of the repository.
  In addition to making many things easier, this adds an extra layer of security: if you lose your laptop, your desktop will still contain the full history of all the changes you ever made to your article, for example.

  This also theoretically eliminates the need to work with a central server.
  Of course, most people choose to work with one (e.g. GitHub or Bitbucket) for easier collaboration and backup.
  But strictly speaking, you could set things up so that nothing leaves your computer(s).

## Next steps

**Update:** [Part 2 ("Theory") is now available here.](/post/git-2-theory)

In the next post, I will try to explain how one uses Git.
In the meantime, here are some links:

- [Git's documentation](https://git-scm.com/doc).
- [GitHub's "Resources to learn Git"](https://try.github.io/), and in particular their handy [cheat sheet](https://training.github.com/downloads/github-git-cheat-sheet/).

And here's a little teaser of what you will hopefully be able to do by the end of all this!

<video controls loop autoplay>
<source src="teaser.webm" type="video/webm"/>
This is supposed to be a video showcasing the use of Git in Visual Studio Code, but apparently your browser does not support showing <a href="https://en.wikipedia.org/wiki/WebM" target="_blank" rel="noopener noreferrer">HTML5/WebM</a> videos.
</video>
