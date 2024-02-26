import express from "express";

import * as authCtrls from "../controllers/authCtrl";
import { requireAuth } from "../middlewares/auth";

const authRtr = express.Router();

authRtr.post(`/register`, authCtrls.register);
authRtr.post(`/confirm/registration/:token`, authCtrls.confirmRegistration);

authRtr.post(`/forgotPassword`, authCtrls.forgotPassword);
authRtr.post(`/confirm/resetPassword/:token`, authCtrls.resetPassword);

authRtr.post(`/changeEmail`, requireAuth, authCtrls.changeEmail);
authRtr.post(`/confirm/changeEmail/:token`, authCtrls.confirmChangedEmail);

authRtr.route(`/login`).get(authCtrls.login).post(authCtrls.login);

authRtr.get(`/forgotIdentifier`, authCtrls.forgotIdentifier);
authRtr.get(`/me`, requireAuth, authCtrls.me);

authRtr.get(`/ctrl1`, authCtrls.ctrl1);
authRtr.get(`/ctrl2`, authCtrls.ctrl2);

authRtr.get(`/`, (_, res) => {
  res.send("running");
});

export default authRtr;
