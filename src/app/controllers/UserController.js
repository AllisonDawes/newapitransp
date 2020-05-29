import * as Yup from "yup";
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
        "canceled",
        "created_at",
        "updated_at"
      ],
      order: ["username"],
      limit: 20,
      offset: (page - 1) * 20
    });

    return res.json(userList);
  }

  async show(req, res) {
    const user = await User.findByPk(req.params.id, {
      attributes: [
        "id",
        "username",
        "driver",
        "adm",
        "canceled",
        "created_at",
        "updated_at"
      ]
    });

    return res.json(user);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string()
        .required()
        .min(6)
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: "As validações de cadastro falharam." });
    }

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
    const schema = Yup.object().shape({
      username: Yup.string().min(3),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when("oldPassword", (oldPassword, field) =>
          oldPassword ? field.required() : field
        )
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Validation fails" });
    }

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

    if (user.driver === false) {
      return res.status(401).json({ error: "Usuário não tem autorização!" });
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
