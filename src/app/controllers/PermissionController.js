import User from "../models/User";

class PermissionController {
  async update(req, res) {
    const user = await User.findByPk(req.userId);

    if (!user.adm) {
      return res.status(401).json({ error: "Permissão negada!" });
    }

    const { driver, adm } = req.body;

    const idRegister = await User.findByPk(req.params.id);

    await idRegister.update({
      driver,
      adm
    });

    return res.json({
      driver,
      adm
    });
  }
}

export default new PermissionController();
