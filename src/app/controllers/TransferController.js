import TransferModel from "../models/Transfer";
import User from "../models/User";
import CarWeightModel from "../models/CarWeight";
import { startOfDay, format } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

class Transfer {
  async index(req, res) {
    const { date } = req.params;

    if (!date) {
      return res.status(400).json({ error: "Data inválida" });
    }

    const transferList = await TransferModel.findAll({
      where: { date: date },
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
      order: [["id", "DESC"]],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username", "driver", "adm"]
        },
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

    const tzStartDay = zonedTimeToUtc(new Date(), "Antarctica/Mawson");

    const startDay = startOfDay(tzStartDay);

    const checkUser = await User.findByPk(req.userId);

    if (!checkUser.driver) {
      return res.status(401).json({
        error: "Usuário não autorizado! Procure o administrador."
      });
    }

    const carweight = await CarWeightModel.findByPk(1);

    if (!carweight) {
      return res.status(401).json({
        erro: "Cadastre antes o caminhão e o peso do mesmo para continuar!"
      });
    }

    const transfer = await TransferModel.create({
      user_id: req.userId,
      carweight_id: carweight.id,
      date: startDay,
      mat_type,
      mat_origin,
      mat_dest,
      weight,
      comments
    });

    return res.json(transfer);
  }

  async delete(req, res) {
    const id = parseInt(req.params.id);

    const info = await TransferModel.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username", "driver", "adm"]
        }
      ]
    });

    if (info.user_id !== req.userId) {
      return res.status(401).json({ error: "Usuário não autorizado!" });
    }

    await info.destroy(id);

    return res.json();
  }
}

export default new Transfer();
