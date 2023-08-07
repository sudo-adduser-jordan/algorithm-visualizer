# Toolchain + React

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?)](https://github.com/RichardLitt/standard-readme)

Create Esbuild React

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)


## Background

A react starter app utilizing esbuild as the build tool and development server. The idea that everything must be done in javascript is absurd when there are much more performant tools that can be used. Esbuild is built with GO, a programing language built by the some of the same creators of Google's V8 engine, Unix, and C. This allows for build and serve times that are much faster than the common javascript tools used for these purposes.

Currently this application is configured to build a basic React application. More features will be added in the future.

## Install

Download zip or run

```
git clone https://github.com/sudo-adduser-jordan/Toolchain
```

```
cd react
```

## Usage

### Getting Started

First, run the development server:

```
npm install
```

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `App.tsx`. The page auto-updates as you edit the file.

This tool does not use HMR and does a full reload on save. This is beneficial as HMR may require a full reload anyway depending on what has been edited. Since esbuild is programed in GO the speed of your reloads will not be any slower than a javascript HMR server.
