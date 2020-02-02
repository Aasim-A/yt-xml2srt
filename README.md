# yt-xml2srt

Easily convert YouTube caption format from XML to SRT

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

```js
const xml2srt = require('yt-xml2srt');
const fs = require('fs');

// In this example we are getting the data from an XML file, if you have a string you can directly plug it into the function and do the conversion
const ytXmlCaptionFile = fs.readFileSync('PATH/TO/XML/FILE', 'utf8');

xml2srt.Parse(ytXmlCaptionFile)
  .then(srt => /* DO SOMETHING WITH SRT */)
  .catch(err => console.log(`Error while converting XML to SRT : ${err}`));
```

Or you can use async await

```js
const xml2srt = require('yt-xml2srt');
const fs = require('fs');

// In this example we are getting the data from an XML file, if you have a string you can directly plug it into the function and do the conversion
const ytXmlCaptionFile = fs.readFileSync('PATH/TO/XML/FILE', 'utf8');

try {
  const srt = await xml2srt.Parse(ytXmlCaptionFile);
  /* DO SOMETHING WITH SRT */
} catch (err) {
  console.log(`Error while converting XML to SRT : ${err}`);
}
```

# Tests

```bash
npm test
```
