import ProgramationModel from "../models/Programation";
import User from "../models/User";

class Programation {
  async show(req, res) {
    const programation = await ProgramationModel.findOne({
      attributes: ["id", "user_id", "program", "created_at", "updated_at"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username", "driver", "adm"]
        }
      ]
    });

    return res.json(programation);
  }

  async store(req, res) {
    const { program } = req.body;

    const checkUser = await User.findByPk(req.userId);

    if (!checkUser.driver) {
      return res.status(401).json({ error: "Usuário não autorizado" });
    }

    const programation = await ProgramationModel.create({
      user_id: req.userId,
      program
    });

    return res.json(programation);
  }

  async update(req, res) {
    const programation = await ProgramationModel.findByPk(req.params.id);

    const checkUser = await User.findByPk(req.userId);

    if (!checkUser.driver) {
      return res.status(401).json({
        error: "Usuário não autorizado! Procure o administraidor"
      });
    }

    await programation.update({
      user_id: req.userId,
      program: req.body.program
    });

    return res.json(programation);
  }
}

export default new Programation();
