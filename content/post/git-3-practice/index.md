---
title: "Git for Mathematicians (3/3): The Practice"
date: 2021-08-06
tags: [code, math]
urls:
  custom:
    - label: "Part 1: Preliminaries"
      url: /post/git-1-preliminaries
    - label: "Part 2: The Theory"
      url: /post/git-2-theory
---

After a long hiatus, here is the third part of my series of posts about Git for Mathematicians 🙂.
I explain the basics of how one would go about using Git to write a math paper.
If you have not read the previous parts of the series, you can find them there:

- [Part 1: Preliminaries](/post/git-1-preliminaries), where I explain quickly what Git is and why you could be interested in this series.
- [Part 2: The Theory](/post/git-2-theory), where I explain at a high level the inner workings and the data models used by Git.

<div class="p-2 rounded-md bg-yellow-300 dark:bg-yellow-800">
I will assume some level of familiarity with using a terminal to run commands. If you are not comfortable with that, then I suggest that you wait for the "Bonus" part of the series, where I will mention some alternatives.
</div>

## Setup

The first thing to do is setup your environment.
You will, of course, need to install Git.
This is dependent on your OS:

- On Windows and Mac, the recommended source for installation packages is Git's official homepage, [git-scm.com](https://git-scm.com/). Simply head there, download the installer, and run it like you would any other installer. The defaults are fine. On Windows, you would typically run the program called "Git Bash" to run the commands that use Git. You may also use any other terminal (e.g., the integrated cmd, Windows Terminal...).
- On Linux, you can use your package manager. For example, run `sudo apt-get install git-all` on Debian/Ubuntu, or `sudo dnf install git-all` on Fedora. Otherwise, if you are running Linux, I assume that you are well-versed enough to know how to use your distribution's package manager.

Before going further, you should also configure your name and email, as otherwise you will not be able to commit anything.
This will also serve as a test run to see if you are able to run the Git commands.
To configure your contact details, run the following commands in a terminal (replace "Your Name" and "your@email.com" by your own name and email, but keep the quotes):

```shell
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

Note that these commands are typical of how most Git commands work:

- The first part, `git`, is common to all Git commands.
- The second part, `config`, represents a specific Git sub-command. Examples include `init`, `commit`, or `push`.
  To learn more about the options and meaning of a specific sub-command, you can type `man git-SUBCOMMAND` in your terminal (or Git Bash on Windows), or [look for the manual page in the documentation](https://git-scm.com/docs).
- The rest (`--global user.name "Your Name"`) are arguments of the specific sub-command.
  Here, you are telling the `git-config` sub-command to configure the parameter `user.name` to take the value "Your Name" globally.

Running these two commands will change Git's global configuration file for your account.
This file, called `.gitconfig`, is located in your user's home directory (usually `/home/[user]` on Linux, or `C:\Users\[user]` on Windows).
Afterwards, the file should look like this:

```ini
[user]
email = your@email.com
name = Your Name
```
