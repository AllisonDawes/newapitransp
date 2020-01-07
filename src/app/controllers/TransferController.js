import TransferModel from "../models/Transfer";
import User from "../models/User";
import CarWeightModel from "../models/CarWeight";
import { startOfDay } from "date-fns";

class Transfer {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { type_filter, filter } = req.body;

    if (filter == null) {
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
        order: [["id", "DESC"]],
        limit: 20,
        offset: (page - 1) * 20,
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

    if (type_filter == "tipo de material") {
      const transferList = await TransferModel.findAll({
        where: { mat_type: filter },
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
        limit: 20,
        offset: (page - 1) * 20,
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

    if (type_filter == "origem do material") {
      const transferList = await TransferModel.findAll({
        where: { mat_origin: filter },
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
        limit: 20,
        offset: (page - 1) * 20,
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

    if (type_filter == "destino do material") {
      const transferList = await TransferModel.findAll({
        where: { mat_dest: filter },
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
        limit: 20,
        offset: (page - 1) * 20,
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

    if (type_filter == "criacao do registro") {
      const transferList = await TransferModel.findAll({
        where: { created_at: filter },
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
        limit: 20,
        offset: (page - 1) * 20,
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
  }

  async store(req, res) {
    const { mat_type, mat_origin, mat_dest, weight, comments } = req.body;

    const startDay = startOfDay(new Date());

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
}

export default new Transfer();
