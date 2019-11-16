import User from "../models/User";

class UserController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const userList = await User.findAll({
      attributes: [
        "id",
        "username",
        "driver",
        "adm",
        "created_at",
        "updated_at"
      ],
      order: ["username"],
      limit: 20,
      offset: (page - 1) * 20
    });

    return res.json(userList);
  }

  async store(req, res) {
    const userExists = await User.findOne({
      where: { username: req.body.username }
    });

    if (userExists) {
      return res
        .status(400)
        .json({ error: "Usuário cadastrado! entre com outro nome." });
    }

    const { id, username, driver, adm } = await User.create(req.body);

    return res.json({
      id,
      username,
      driver,
      adm
    });
  }

  async update(req, res) {
    const { username, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (username !== user.username) {
      const userExists = await User.findOne({
        where: { username }
      });

      if (userExists) {
        return res
          .status(400)
          .json({ error: "Usuário cadastrado, por favor informe outro nome!" });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: "Senha não corresponde!" });
    }

    const { id, driver, adm } = await user.update(req.body);

    return res.json({
      id,
      username,
      driver,
      adm
    });
  }
}

export default new UserController();
