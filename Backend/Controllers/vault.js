const Vault = require("../Models/vault");

async function createVault(req, res) {
  try {
    const { name, description } = req.body;
    const owner = req.user.id;

    const vault = await Vault.create({
      name,
      description,
      owner,
    });

    res.status(201).json(vault);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllVaults(req, res) {
    const owner = req.user.id;
    try {
        const vaults = await Vault.find({ owner });
        res.status(200).json(vaults);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}  

async function getVaultById(req, res) {
    const { id } = req.params;
    try {
        const vault = await Vault.findOne({
            _id: id,
            owner: req.user.id,
        });
        if (!vault) {
            return res.status(404).json({ message: "Vault not found" });
        }
        res.status(200).json(vault);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateVault(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const vault = await Vault.findOne({
            _id: id,
            owner: req.user.id,
        });

        if (!vault) {
            return res.status(404).json({ message: "Vault not found" });
        }

        vault.name = name;
        vault.description = description;

        await vault.save();
        res.status(200).json(vault);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateVault(req, res) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const vault = await Vault.findOneAndUpdate(
      {
        _id: id,
        owner: req.user.id,
      },
      {
        name,
        description,
      },
      {
        new: true,
      }
    );

    if (!vault) {
      return res.status(404).json({
        message: "Vault not found",
      });
    }

    res.status(200).json(vault);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function deleteVault(req, res) {
  try {
    const { id } = req.params;

    const vault = await Vault.findOneAndDelete({
      _id: id,
      owner: req.user.id,
    });

    if (!vault) {
      return res.status(404).json({
        message: "Vault not found",
      });
    }

    res.status(200).json({
      message: "Vault deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  createVault,
  getAllVaults,
  getVaultById,
  updateVault,
  deleteVault,
};