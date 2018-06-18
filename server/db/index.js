
/**
 * this contains the database connection specification
 * @author sandeep thakare
 * @since Monday, June 18, 2018 11:59 AM
 */
import mongoose from 'mongoose';
import { Promise as es6Promise } from 'es6-promise';
import { mongoConnectionString } from '../constants';

const useMongoClient = true;

mongoose.Promise = es6Promise;
mongoose.connect(mongoConnectionString, { useMongoClient }, (err) => {
	if (err) {
		console.log('mongo connection err', err);
	} else {
		console.log('database connected');
	}
});

export default mongoose;