const { parse } = require('fast-xml-parser');
const htmlDecoder = require('../util/DecodeHTML.js');
const formatTime = require('../util/FormatTime');

const options = {
  attributeNamePrefix: '$_',
  textNodeName: '_text',
  ignoreAttributes: false,
  trimValues: true,
  parseNodeValue: false,
  parseAttributeValue: false,
  tagValueProcessor: val => htmlDecoder(val),
};

function Parse(xmlString) {
  return new Promise((resolve, reject) => {
    try {
      const res = parse(xmlString, options, true);
      const newRes = res.transcript.text.map(textElement => ({
        text: textElement._text,
        attr: {
          start: textElement.$_start,
          end: (
            parseFloat(textElement.$_start) + parseFloat(textElement.$_dur)
          ).toString(),
        },
      }));

      let srtText = '';
      newRes.forEach((item, index) => {
        const currEnd = parseFloat(item.attr.end);
        const nextStart =
          index + 1 === newRes.length
            ? 0
            : parseFloat(newRes[index + 1].attr.start);
        srtText += `${index + 1}\n`;
        const end = currEnd > nextStart ? nextStart : currEnd;
        srtText += `${formatTime(item.attr.start)} --> ${formatTime(
          nextStart === 0 ? item.attr.end : end
        )}\n`;
        srtText += `${item.text}`;
        if (newRes.length !== index + 1) srtText += '\n\n';
      });

      resolve(srtText);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports.Parse = Parse;
