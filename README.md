# git-trauma

The `git-trauma` wizard is a little tool to fix common Git problems. Simply run it in your Git repositories and let it guide you through fixing popular Git issues. Easily squash commits or fix "fatal loose object" errors.

## Motivation

I was tired of my Git repositories sometimes misbehaving and having to remember all the complex Git commands to handle these situations. Let's be honest, who memorizes `git reset $(git commit-tree HEAD^{tree} -m "Reset")`? I had these commands scribbled in a notebook but I thought it would be much cooler to have a small tool that executes them directly in my Git repositories. So, I created "git-trauma" to save me from all the traumas I've had using Git in my projects.

## Installation

Install it globally using:

```bash
npm i -g git-trauma
```

Navigate to your Git project and run the following inside of it:

```bash
git-trauma
```

## How it works?

It inspects your local `.git` directory to determine your Git settings. Then, a wizard guides you through selecting what needs to be fixed. Once you've made your choices, it runs the necessary Git commands for you, eliminating the need to remember them yourself.

## Features

- Fixing `fatal: loose object is corrupt` errors
- Squashing all commits into one
- Triggering empty commits

## Resources

- https://github.com/bennycode/welovecoding.github.io/wiki/Working-with-Git
