# random-unicode-emoji

[![npm](https://img.shields.io/npm/v/random-unicode-emoji)](https://www.npmjs.com/package/random-unicode-emoji)
[![Unicode](https://img.shields.io/badge/Unicode-15.0-success)](https://www.unicode.org/Public/emoji/15.0/)
[![downloads](https://img.shields.io/npm/dw/random-unicode-emoji)](https://www.npmjs.com/package/random-unicode-emoji)
[![stars](https://img.shields.io/github/stars/NicPWNs/random-unicode-emoji)](https://github.com/NicPWNs/random-unicode-emoji/stargazers)
[![forks](https://img.shields.io/github/forks/NicPWNs/random-unicode-emoji.svg)](https://github.com/NicPWNs/random-unicode-emoji/forks)
[![repo size](https://img.shields.io/github/repo-size/NicPWNs/random-unicode-emoji)](https://github.com/NicPWNs/random-unicode-emoji)
[![issues](https://img.shields.io/github/issues/NicPWNs/random-unicode-emoji.svg)](https://github.com/NicPWNs/random-unicode-emoji/issues)

A simple JavaScript package that returns random Unicode emojis. 📜

> Like this repo? Give it a [⭐ on GitHub!](https://github.com/NicPWNs/random-unicode-emoji)

## Install ✨

```bash
npm install random-unicode-emoji
```

> No dependencies!

## Usage 🐙

```js
// Require the module
var randomEmoji = require('random-unicode-emoji');

// Use the module
randomEmoji.random({count: 3});
// -> ["🐸", "🍇", "🚣"]

// Add custom emoji
randomEmoji.random({count: 3, custom: ['(° ͜ʖ ͡°)','(╯°□°)╯︵ ┻━┻']});
// -> ["🔥", "(° ͜ʖ ͡°)", "⚾"]
```

### Discord Bots

This package is very popular among Discord bots.
Below is an example of using the custom emoji feature to include custom Discord emojis.

```js
randomEmoji.random({count: 3, custom: message.guild.emojis.map()});
// -> ["🤡", "<:HUH:1081269950800466059>", "😸"]
```

> `<:HUH:1081269950800466059>` translates to an emoji for a specific Discord guild.

## Update ☀️

```bash
npm update random-unicode-emoji
```

## Unicode

Uses Unicode Standard Emoji from [Unicode.org](https://www.unicode.org/Public/emoji/)

> Currently supports the latest [Unicode Standard Version 15.0](https://www.unicode.org/Public/emoji/15.0/)

## Language

This is the JavaScript 📜 version. There is also a [Python 🐍](https://github.com/NicPWNs/random-unicode-emoji-py) and [Rust ⚙️](https://github.com/NicPWNs/random-unicode-emoji-rs) version.

## Maintainer

[Nic Jones, (@NicPWNs)](https://github.com/NicPWNs)

## Credit

Originally created by [Pirijan, (@pketh)](https://github.com/pketh)
