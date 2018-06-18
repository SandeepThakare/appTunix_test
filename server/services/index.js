/**
* This is the indexer for services
* @author sandeep thakare
* @since Monday, June 18, 2018 11:59 AM
*/
import fs from 'fs';

const skip = ['index.js', 'templates'];
const files = fs.readdirSync(__dirname);

files.map((file) => {
	const found = skip.find(skipThisFile => skipThisFile === file);
	console.log(file);
	if(!found) {
		const fileName = `${file.charAt(0).toUpperCase()}${file.split('.')[0].substring(1, file.length)}`;
		if (!fileName.startsWith('.'))
			module.exports[`${fileName}Services`] = require(`./${file}`).default;
	}
});
