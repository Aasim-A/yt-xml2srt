const fs = require('fs');
const xml2srt = require('../src/Xml2Srt');

let xmlFile, expectedRes;

try {
	xmlFile = fs.readFileSync(`${__dirname}/testData/caption.xml`, 'utf8');
	expectedRes = fs.readFileSync(`${__dirname}/testData/caption.srt`, 'utf8');
} catch (err) {
	throw new Error(`Tests failed, couldn't open test data : ${err}`);
}

xml2srt
	.Parse(xmlFile)
	.then(data => {
		if (data !== expectedRes)
			throw new Error('Tests failed, expected result does not match result');
		console.log('Tests passed successfully!');
		return process.exit(0);
	})
	.catch(err => {
		throw new Error(`Tests failed with error : ${err}`);
	});
