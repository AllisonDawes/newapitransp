import jwt from "jsonwebtoken";

import User from "../models/User";
import authConfig from "../../config/auth";

class SessionController {
  async store(req, res) {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: "Usuário não existe." });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Senha incorreta!" });
    }

    const { id } = user;

    return res.json({
      user: {
        id,
        username
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    });
  }
}

export default new SessionController();
