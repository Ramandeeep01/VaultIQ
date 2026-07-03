const express = require("express");

const router = express.Router();

const { createVault, getAllVaults, getVaultById, updateVault, deleteVault } = require("../Controllers/vault");
const { checkAuth, requireAuth } = require("../Middlewares/user");

router.use(checkAuth, requireAuth);

router.post("/create-vault", createVault);
router.get("/vaults", getAllVaults);
router.get("/vault/:id", getVaultById);
router.put("/vault/:id", updateVault);
router.delete("/vault/:id", deleteVault);

module.exports = router;