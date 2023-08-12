import express from 'express';
export const Logout = async (req: express.Request, res: express.Response) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token !== req.token;
		});
		await req.user.save();
		res.status(200).json({ status: 'success' });
	} catch (error) {
		res.status(500).json({ status: 'fail', error });
	}
};