# Unswash

An Unsplash clone built on NextJS with Typescript using the Unsplash API

- [Unswash](#unswash)
  - [Important Packages](#important-packages)
  - [Project Overview](#project-overview)
    - [`/app`](#app)
    - [`/components`](#components)
    - [`lib`](#lib)
  - [Getting Started](#getting-started)

## Important Packages

1. Shadcn: Customizable re-usable components set built from RadixUI and TailwindCSS
2. TailwindCSS: Utility based styling library based on CSS classes
3. React Masonry Grid: Wrapper to create a masonry image grid
4. File Saver: JS library to download files

## Project Overview

### `/app`

The directory that determines the page routing and layout wrappers

### `/components`

Holds the Functional Components used throught the app

**`/context`**: Contains Context Provider and Hook for global App stateful variables such as the light mode theme

**`/ui`**: Contains the Generic components imported from [Shadcn](https://ui.shadcn.com/docs)

### `lib`

A Direcotry for all utilities, functions, constants and business logic

**`data`**: API services to fetch data from Unpslash APIs

**`types`**: Typescript stucture definitions for all objects used in the app

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
