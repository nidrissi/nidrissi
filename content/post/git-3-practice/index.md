---
title: "Git for Mathematicians (3a): The Practice"
date: 2021-08-06
tags: [code, math]
urls:
  custom:
    - label: "Part 1: Preliminaries"
      url: /post/git-1-preliminaries
    - label: "Part 2: The Theory"
      url: /post/git-2-theory
---

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools, faKeyboard, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

<AlertDiv color="red" extraStyle="font-bold text-lg">
<FontAwesomeIcon icon={faTools} />&nbsp;This post is still a work-in-progress!
</AlertDiv>

After a long hiatus, here is the third part of my series of posts about Git for Mathematicians 🙂.
I explain the basics of how one would go about using Git to write a math paper.
If you have not read the previous parts of the series, you can find them there:

- [Part 1: Preliminaries](/post/git-1-preliminaries), where I explain quickly what Git is and why you could be interested in this series.
- [Part 2: The Theory](/post/git-2-theory), where I explain at a high level the inner workings and the data models used by Git.

I will mainly use GitHub as a remote, but feel free to use anything you want (Bitbucket, GitLab...).

<AlertDiv color="yellow">

<FontAwesomeIcon icon={faKeyboard} />&nbsp;I will assume some level of familiarity with using a terminal to run commands. If you are not comfortable with that, then I suggest that you wait for the "Bonus" part of the series, where I will mention some alternatives, including GitHub Desktop and Visual Studio Code.
</AlertDiv>

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
# run the following commands in a terminal
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

Note that these commands are typical of how most Git commands work:

- The first part, `git`, is common to all Git commands.
- The second part, `config`, represents a specific Git sub-command. Examples include `init`, `commit`, or `push`.
  To learn more about the options and meaning of a specific sub-command, you can type `man git-SUBCOMMAND` in your terminal (or Git Bash on Windows) or [look for the manual page in the documentation](https://git-scm.com/docs).
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

## Repositories

As I explained in my previous post, Git is structured around repository.
A repository is just a folder (and its sub-folders) whose history is tracked by Git.
The repository contains the files, the commits, the branches, and so on.
There are essentially two ways to create a repository on your computer: either you can create a brand-new repository that you can then push somewhere, or you can clone an existing repository.
I will explain both options, starting with the (simpler) cloning.

### Cloning a repository

Cloning a repository simply means creating a local copy of a distant repository.
This local copy will contain (unless you choose otherwise) the full history of the repository, and the files tracked by Git in their latest state.
You must be connected to the Internet (if the repository is online) and you must be able to read it if it is private.

If you have not already created a repository, you can create one on GitHub, as in the following screenshot:

![Creating a repository on GitHub](./create-repository.png)

You can either set it to public or private.
Note the URL of your repository when it appears on the next screen (or use the one I provide below).
Then, you can clone it with the following command:

```shell
git clone https://github.com/nidrissi/example-repository.git
```

This will create a new folder in the current directory called `example-repository` and copy everything from the remote repository into it.
Afterwards, assuming that you cloned my example repository, your folders will look like this:

```
example-repository
├── .git
├── sample.txt
└── some-folder
    └── other-sample.txt
```

As you can see, the folder contains two things:

- The most recent copy of the files. Here, there is just one file, `sample.txt`.
- The `.git` folder is a special folder that contains Git's internal data: the commits, the branches, the objects, etc. Unless you know what you are doing, I strongly recommend leaving that folder alone. Only interact with Git through shell commands or a graphical program.

You can now modify the files in this repository and use the commands from the next sections to track your changes.
Everything is already set-up so that pushing and pulling works as expected.

### Initializing a new repository

The other option, if you have no existing repository to clone, is to initialize a new one.
The steps are simple:

1. (Optional) Choose or create a folder that you want to track with Git.
2. In the terminal, switch to that folder.
3. Then type `git init` in the terminal.

In a Linux shell, this would typically look like this (feel free to change the name of the folder, of course):

```shell
# skip the first step if the folder already exists:
mkdir ~/papers/riemann-hypothesis # 1. create a new folder
cd ~/papers/riemann-hypothesis    # 2. switch to that folder
git init                          # 3. initialize the repository
```

Afterwards, your files should look like this:

```
~/papers/riemann-hypothesis
├── .git
└── other files (if some were already in the folder)
├── ...........
└── other files
```

In effect, initializing just creates a `.git` folder with an empty history of commits.
You are then free to work on the files and track your changes with Git.
However, the remote(s) will not be set-up properly yet, so you will need to adjust that before being able to collaborate with other people and/or making backups of your repository.

<AlertDiv color="yellow">
<FontAwesomeIcon icon={faExclamationTriangle} />&nbsp;Initializing will work incorrectly if the directory you are in, or a parent directory, is already a Git repository. In that case, <a href="https://github.com/git-guides/git-init#git-init-in-the-wrong-directory">take these steps to fix the issue</a>.
</AlertDiv>

---

_More to come in a next post..._

## Further reading

Here are some more resources to learn using Git:

- [GitHub's Git Guide.](https://github.com/git-guides/) This is a great resource if you want to quickly get up to speed.
- [GitHub's "Hello World" tutorial.](https://guides.github.com/activities/hello-world/)
- [The Pro Git Book.](https://git-scm.com/book/en/v2)
