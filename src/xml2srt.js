const htmlDecoder = require('../util/DecodeHTML.js');
const formatTime = require('../util/FormatTime');
const parseXml = require('../util/parseXml');

function convert(parsedXml) {
  let srtText = '';
  parsedXml.forEach((item, index) => {
    const currEnd = item.attr.end;
    const nextStart =
      index + 1 === parsedXml.length ? 0 : parsedXml[index + 1].attr.start;
    srtText += `${index + 1}\n`;
    const end = currEnd > nextStart ? nextStart : currEnd;
    srtText += `${formatTime(item.attr.start)} --> ${formatTime(
      nextStart === 0 ? item.attr.end : end
    )}\n`;
    srtText += `${item.text}`;
    if (parsedXml.length !== index + 1) srtText += '\n\n';
  });

  return srtText;
}

function Parse(xmlString) {
  return new Promise((resolve, reject) => {
    try {
      const res = parseXml(xmlString);
      if (!res.root) throw new Error('Error while parsing xml');

      const newRes = res.root.children.map(textElement => ({
        text: htmlDecoder(textElement.content),
        attr: {
          start: parseFloat(textElement.attributes.start),
          end:
            parseFloat(textElement.attributes.start) +
            parseFloat(textElement.attributes.dur),
        },
      }));

      resolve(convert(newRes));
    } catch (error) {
      reject(error);
    }
  });
}

function ParseSync(xmlString) {
  const res = parseXml(xmlString);
  if (!res.root) throw new Error('Error while parsing xml');

  const newRes = res.root.children.map(textElement => ({
    text: htmlDecoder(textElement.content),
    attr: {
      start: parseFloat(textElement.attributes.start),
      end:
        parseFloat(textElement.attributes.start) +
        parseFloat(textElement.attributes.dur),
    },
  }));

  return convert(newRes);
}

module.exports.Parse = Parse;
module.exports.ParseSync = ParseSync;
