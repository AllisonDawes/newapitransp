import User from "../models/User";

class CanceledController {
  async update(req, res) {
    const user_current = await User.findByPk(req.userId);

    if (!user_current.adm) {
      return res.status(401).json({ error: "Permissão negada!" });
    }

    const { canceled } = req.body;

    const userCanceled = await User.findByPk(req.params.id);

    await userCanceled.update({
      canceled: canceled
    });

    return res.json(userCanceled);
  }
}

export default new CanceledController();
