# random-unicode-emoji

A small, simple lib that returns random unicode emojis. 

Only 4kb and has no dependencies 👼

## Install ✨

`npm install random-unicode-emoji`

## Usage 🐙

```
var randomEmoji = require('random-unicode-emoji');

randomEmoji.random({count: 3})
// -> ["🐸", "🍇", "🚣"]

```

## Updating on NPM

After making changes like adding ne emojis, you'll need to republish it on npm so that users can update to it

- Bump up the `version` number in `package.json`
- Open the repo folder in terminal
- `$ npm adduser`
- `$ npm publish`

## Looking for Contributors

I'm pretty busy with [Kinopio](https://kinopio.club) these days and don't have time to keep this repo up to date with the latest unicode emojis. It's small and simple, and a couple people use it. If you'd like to contribute please do!
