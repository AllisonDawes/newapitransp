import TransferModel from "../models/Transfer";
import User from "../models/User";
import CarWeightModel from "../models/CarWeight";

class Transfer {
  async index(req, res) {
    const { page = 1 } = req.query;

    const transferList = await TransferModel.findAll({
      attributes: [
        "id",
        "user_id",
        "carweight_id",
        "mat_type",
        "mat_origin",
        "mat_dest",
        "weight",
        "comments",
        "created_at",
        "updated_at"
      ],
      order: ["id"],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username", "driver", "adm"]
        }
      ],
      include: [
        {
          model: CarWeightModel,
          as: "carweight",
          attributes: ["truck", "car_weight"]
        }
      ]
    });

    return res.json(transferList);
  }

  async store(req, res) {
    const { mat_type, mat_origin, mat_dest, weight, comments } = req.body;

    const checkUser = await User.findByPk(req.userId);

    if (!checkUser.driver) {
      return res.status(401).json({
        error: "Usuário não autorizado! Procure o administrador."
      });
    }

    const carweight = await CarWeightModel.findByPk(1);

    const transfer = await TransferModel.create({
      user_id: req.userId,
      carweight_id: carweight.id,
      mat_type,
      mat_origin,
      mat_dest,
      weight,
      comments
    });

    return res.json(transfer);
  }
}

export default new Transfer();
