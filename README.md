# yt-xml2srt

Easily convert YouTube caption format from XML to SRT

[![npm package](https://nodei.co/npm/yt-xml2srt.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/yt-xml2srt/)

# Installation

```bash
npm i yt-xml2srt
```

Or for Yarn users:

```bash
yarn add yt-xml2srt
```

# Usage

```js
const xml2srt = require('yt-xml2srt');

xml2srt.Parse('xml string')
  .then(res => /* DO SOMETHING WITH RES */)
  .catch(err => console.log(`Error while converting xml2srt : ${err}`));
```

Or you can use async await

```js
const xml2srt = require('yt-xml2srt');

try {
	const res = await xml2srt.Parse('xml string');
	/* DO SOMETHING WITH RES */
} catch (err) {
	console.log(`Error while converting xml2srt : ${err}`);
}
```

# Tests

```bash
npm test
```
