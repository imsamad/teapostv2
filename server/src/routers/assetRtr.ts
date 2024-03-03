import express from "express";
import assetCtrl from "../controllers/assetCtrl";
import { requireAuth } from "../middlewares/auth";

const assetRtr = express.Router();

assetRtr
  .route("/")
  .post(requireAuth, assetCtrl.uploadAsset)
  .get(requireAuth, assetCtrl.getAssets)
  .delete(requireAuth, assetCtrl.deleteAsset);

export default assetRtr;
