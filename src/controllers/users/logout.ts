import express from 'express';

export const logout = async (req: express.Request, res: express.Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.sendStatus(401); // Unauthorized
    }

    // Rest of your logout logic

    return res.sendStatus(200); // OK
  } catch (error) {
    console.log(error);
    return res.sendStatus(500); // Internal Server Error
  }
};
