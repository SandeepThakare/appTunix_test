import S3Services from '../services/S3Services';
import { S3_BUCKET, S3_ROUTES } from '../constants';
/**
 * This moudule acts as a common handler for picture fetching since all the controllers
 * follows almost the same design pattern, making a commong handler function will help to
 * eventually reduce the code base and redundant code.
 * @author sandeep thakare
 * @since Monday, June 18, 2018 11:59 AM
 *
 * @param {*} req
 * @param {*} res
 *
 * @todo Handle authentication middleware injections?
*/
export default (req, res) => {
	const { body: { path }, params: { imageKey } } = req;
	const route = path.split('/')[2];
	if (S3_ROUTES.indexOf(route) !== -1) {
		const Bucket = `${S3_BUCKET}/${route}`;
		const Key = `${imageKey}`;

		S3Services.findFile({ Bucket, Key })
			.then((success) => {
				const { data: { Body } } = success;
				res.writeHead(200, {
					'Content-Type': 'image/jpeg',
					'Content-Disposition': `attachment;filename=${Key}`,
					'Content-Length': Body.length,
				});

				res.end(Buffer.from(Body));
			}).catch(err => res.status(200).send(err));
	} else {
		res.status(200).send({ code: 101, message: 'This route path does not handles images' });
	}
};
