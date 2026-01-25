#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

const EMOJI_URL = 'https://www.unicode.org/Public/emoji/latest/emoji-test.txt';
const SRC_FILE = path.join(__dirname, '..', 'src', 'random-unicode-emoji.js');
const README_FILE = path.join(__dirname, '..', 'README.md');
const PACKAGE_FILE = path.join(__dirname, '..', 'package.json');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function parseEmojiData(data) {
  const lines = data.split('\n');
  const emojis = [];
  let version = null;

  for (const line of lines) {
    // Extract version from header
    if (line.startsWith('# Version:')) {
      version = line.replace('# Version:', '').trim();
    }

    // Extract fully-qualified emojis
    if (line.includes('; fully-qualified')) {
      const match = line.match(/# (.+?) E\d/);
      if (match) {
        emojis.push(match[1].trim());
      }
    }
  }

  return { emojis, version };
}

function getCurrentEmojiCount() {
  const content = fs.readFileSync(SRC_FILE, 'utf8');
  const match = content.match(/var emojis = \[(.*?)\];/s);
  if (match) {
    return match[1].split(',').length;
  }
  return 0;
}

function updateSourceFile(emojis) {
  const emojiArray = emojis.map(e => `"${e}"`).join(',');
  const content = `// returns an array with a specified number of random unicode emojis

var emojis = [${emojiArray}];

module.exports = {
  random: function(options) {
    var numberOfEmojis = options.count;
    var result = [];
    emojis.push.apply(emojis, options.custom);
    for (var i = 0; i < numberOfEmojis; i++) {
      randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      result.push(randomEmoji);
    }
    return result;
  }
};
`;
  fs.writeFileSync(SRC_FILE, content);
}

function updateReadme(version) {
  let content = fs.readFileSync(README_FILE, 'utf8');

  // Update badge
  content = content.replace(
    /\[!\[Unicode\]\(https:\/\/img\.shields\.io\/badge\/Unicode-[\d.]+-success\)\]\(https:\/\/www\.unicode\.org\/Public\/emoji\/[\d.]+\/\)/,
    `[![Unicode](https://img.shields.io/badge/Unicode-${version}-success)](https://www.unicode.org/Public/emoji/${version}/)`
  );

  // Update text reference
  content = content.replace(
    /Currently supports the latest \[Unicode Standard Version [\d.]+\]\(https:\/\/www\.unicode\.org\/Public\/emoji\/[\d.]+\/\)/,
    `Currently supports the latest [Unicode Standard Version ${version}](https://www.unicode.org/Public/emoji/${version}/)`
  );

  fs.writeFileSync(README_FILE, content);
}

function bumpPackageVersion() {
  const pkg = JSON.parse(fs.readFileSync(PACKAGE_FILE, 'utf8'));
  const [major, minor, patch] = pkg.version.split('.').map(Number);
  pkg.version = `${major}.${minor + 1}.${patch}`;
  fs.writeFileSync(PACKAGE_FILE, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`Bumped package version to ${pkg.version}`);
  return pkg.version;
}

async function main() {
  console.log('Fetching latest emoji data from Unicode...');
  const data = await fetch(EMOJI_URL);

  const { emojis, version } = parseEmojiData(data);
  console.log(`Found Unicode version: ${version}`);
  console.log(`Found ${emojis.length} fully-qualified emojis`);

  const currentCount = getCurrentEmojiCount();
  console.log(`Current emoji count: ${currentCount}`);

  if (emojis.length === currentCount) {
    console.log('No changes detected. Emoji list is up to date.');
    process.exit(0);
  }

  console.log(`Updating from ${currentCount} to ${emojis.length} emojis...`);

  updateSourceFile(emojis);
  console.log('Updated source file');

  updateReadme(version);
  console.log('Updated README');

  const packageVersion = bumpPackageVersion();

  // Output for GitHub Actions
  const output = process.env.GITHUB_OUTPUT;
  if (output) {
    fs.appendFileSync(output, `version=${version}\n`);
    fs.appendFileSync(output, `package_version=${packageVersion}\n`);
    fs.appendFileSync(output, `old_count=${currentCount}\n`);
    fs.appendFileSync(output, `new_count=${emojis.length}\n`);
  }

  console.log('Update complete!');
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
