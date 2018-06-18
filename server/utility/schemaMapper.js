import { ResponseUtility } from './';

/**
 * Utility function that parses the acceptable input props and generate
 * the corresponding json object containing only the defined JSON properties.
 * Generally used by the update query to append only the defined json props.
 * @author sandeep thakare
 * @since Monday, June 18, 2018 11:59 AM
 */
export default jsonObject => new Promise((resolve, reject) => {
	const resultantObject = {};
	Object.keys(jsonObject).map((key, index) => {
		if (jsonObject[key] && key !== 'id') {
			resultantObject[key] = jsonObject[key];
		}
		if (index === Object.keys(jsonObject).length - 1) {
			if (Object.keys(resultantObject).length >= 1) {
				resolve(resultantObject);
			}
			reject(ResponseUtility.ERROR({ message: 'No defined field', error: 'There is no defined field in json Object. The resultant object is empty.' }));
		}
	});
});