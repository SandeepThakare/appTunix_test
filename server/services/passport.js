/**
 * @desc the passport service module
 * @author gaurav sharma
 */
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
//import { UserServices } from '../model';
import { TokenUtility, ResponseUtility } from '../utility';

/**
 * serialize the generated access token
 */
passport.serializeUser((token, done) => done(undefined, token));
/**
 * deserialize the generated token
 */
passport.deserializeUser((token, done) => {
	const payload = TokenUtility.decodeToken(token);
	done(undefined, payload);
});

/**
* @todo you can add as many passport services as you like.
* You can also include other login services like google, facebook etc login services
/*
passport.use('UserLogin', new LocalStrategy((username, password, done) => {
	if (username && password) {
		/**
		* @todo call your authentication function here...
		* uncomment the below code and add your custom authentication
		*/
		//const query = { email: username, upassword: password };
		//UserServices.UserAuthenticateService(query)
		//	.then((success) => {
		//		const { user } = success;
		//		const user = Object.assign({}, user._doc, { role: 'user' });
		//		done(undefined, { code: 100, message: 'Authenticated', accessToken: TokenUtility.generateToken(user) });
		//	}).catch(err => done({ code: 102, message: 'Username/password is incorrect', error: err }));
	//} else {
	//	done(null, false, { message: 'Missing required properties.' });
	//}
//}));

export const userLoginHandler = (req, res, next) => {
	passport.authenticate('UserLogin', (err, teacher, info) => {
		if (teacher) {
			res.status(200).send(teacher);
		} else {
			res.status(200).send(ResponseUtility.ERROR({ message: 'Authentication Failed.', error: err }));
		}
	})(req, res, next);
};

/**
* @todo you can add as many user login handlers as possible
*/

export default {
	passport,
	UserLoingHandler: userLoginHandler,
};