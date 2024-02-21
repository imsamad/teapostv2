import express from "express";

import * as authCtrls from "../controllers/authCtrl";
import { requireAuth } from "../middlewares/auth";

const authRouter = express();

authRouter.post([`/register`, `/signup`], authCtrls.register);
authRouter.post(`/confirm/registration/:token`, authCtrls.confirmRegistration);

authRouter.post(`/forgotPassword`, authCtrls.forgotPassword);
authRouter.post(`/confirm/resetPassword/:token`, authCtrls.resetPassword);

authRouter.post(`/changeEmail`, requireAuth, authCtrls.changeEmail);
authRouter.post(`/confirm/changeEmail/:token`, authCtrls.confirmChangedEmail);

authRouter.post(`/login`, authCtrls.login);

authRouter.get(`/forgotIdentifier`, authCtrls.forgotIdentifier);
authRouter.get(`/me`, requireAuth, authCtrls.me);

export default authRouter;
