const xml2js = require('xml2js');
const htmlDecoder = require('../util/DecodeHTML.js');
const formatTime = require('../util/FormatTime');

const parser = new xml2js.Parser();

function Parse(xmlString) {
	return new Promise((resolve, reject) => {
		parser
			.parseStringPromise(xmlString)
			.then(res => {
				const newRes = res.transcript.text.map(textElement => {
					return {
						text: htmlDecoder(textElement._),
						attr: {
							start: textElement.$.start,
							end: (
								parseFloat(textElement.$.start) + parseFloat(textElement.$.dur)
							).toString()
						}
					};
				});

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
					if (newRes.length !== index + 1) srtText += `\n\n`;
				});

				resolve(srtText);
			})
			.catch(err => reject(err));
	});
}

module.exports.Parse = Parse;
