import TransferModel from "../models/Transfer";
import User from "../models/User";
import CarWeightModel from "../models/CarWeight";
import { startOfDay } from "date-fns";
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
        "weight_brute",
        "car_weight",
        "date",
        "mat_type",
        "mat_origin",
        "mat_dest",
        "weight",
        "comments",
        "created_at",
        "updated_at",
      ],
      order: [["id", "DESC"]],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username", "driver", "adm"],
        },
        {
          model: CarWeightModel,
          as: "carweight",
          attributes: ["truck", "car_weight"],
        },
      ],
    });

    return res.json(transferList);
  }

  async store(req, res) {
    const { weight_brute, mat_type, mat_origin, mat_dest, comments } = req.body;

    const tzStartDay = zonedTimeToUtc(new Date(), "Australia/Melbourne");

    const startDay = startOfDay(tzStartDay);

    const checkUser = await User.findByPk(req.userId);

    if (!checkUser.driver) {
      return res.status(401).json({
        error: "Usuário não autorizado! Procure o administrador.",
      });
    }

    const carweight = await CarWeightModel.findByPk(1);

    if (!carweight) {
      return res.status(401).json({
        erro: "Cadastre antes o caminhão e o peso do mesmo para continuar!",
      });
    }

    if (carweight.user_id !== req.userId) {
      return res.status(401).json({
        error:
          "Você não pode registrar pesagens, antes de atualizar o peso do carro!",
      });
    }

    const net_weight = weight_brute - carweight.car_weight;

    console.log(startDay);
    console.log(tzStartDay);

    const transfer = await TransferModel.create({
      user_id: req.userId,
      carweight_id: carweight.id,
      weight_brute,
      car_weight: carweight.car_weight,
      date: startDay,
      mat_type,
      mat_origin,
      mat_dest,
      weight: net_weight,
      comments,
    });

    return res.json(transfer);
  }

  async update(req, res) {
    const id = parseInt(req.params.id);
    const { weight_brute } = req.body;

    const transfer = await TransferModel.findByPk(id);

    const userAdmin = await User.findByPk(req.userId);

    if (!userAdmin) {
      return res.status(400).json({ error: "Usuário não permitido." });
    }

    const weight_neto = weight_brute - transfer.car_weight;

    await transfer.update({
      weight_brute,
      weight: weight_neto,
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
          attributes: ["username", "driver", "adm"],
        },
      ],
    });

    if (info.user_id !== req.userId) {
      return res.status(401).json({ error: "Usuário não autorizado!" });
    }

    await info.destroy(id);

    return res.json();
  }
}

export default new Transfer();
