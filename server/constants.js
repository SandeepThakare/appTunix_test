/**
* This is the twitter_handler constant file
* @author sandeep thakare
* @since Monday, June 18, 2018 11:59 AM
*/

const host = process.env.MONGO_HOST || 'localhost';
const db = process.env.MONGO_DB || 'twitter_handler';
const port = 27017;

export const mongoConnectionString = `mongodb://${host}:${port}/${db}`;

// this string is unique for each project construction
export const secretString = 'cfnPvshRzLYRKRyJGCA9fpCwOlVIRdUc';

export const SUCCESS_CODE = 100;

export const {
	AWS_ACCESSID='',
	AWS_SECRET='',
	STANDARD_IMAGE_SIZE=2,
	S3_SERVER_URL='',
	S3_BUCKET='',
	P8_FILE='',
	APPLE_BUNDLE='BUNDLEID',
	APPLE_KEY_ID='KEYID',
	APPLE_TEAM_ID='TEAMID',
} = process.env;

export const MB = 1024 * 1024;
