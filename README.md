# yt-xml2srt

A tiny module to easily convert YouTube caption format from XML to SRT with ZERO dependencies.

[![npm package](https://nodei.co/npm/yt-xml2srt.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/yt-xml2srt/)

# Installation

```bash
npm i -S yt-xml2srt
```

Or for Yarn users:

```bash
yarn add yt-xml2srt
```

# Usage

## Using Promises:

```js
const xml2srt = require('yt-xml2srt');

xml2srt.Parse(xmlString)
  .then(srt => /* DO SOMETHING WITH SRT */)
  .catch(err => console.log(`Error while converting XML to SRT : ${err}`));
```

Or you can use async await

```js
const xml2srt = require('yt-xml2srt');

const srt = await xml2srt
  .Parse(xmlString)
  .catch(err => console.log(`Error while converting XML to SRT : ${err}`));
/* DO SOMETHING WITH SRT */
```

## Using it synchronously:

```js
const xml2srt = require('yt-xml2srt');

try {
  const srt = = xml2srt.ParseSync(xmlString);
  /* DO SOMETHING WITH SRT */
} catch(err) {
  console.log(`Error while converting XML to SRT : ${err}`);
}
```

# Tests

```bash
npm test
```
