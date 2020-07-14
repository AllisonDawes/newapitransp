import TransferModel from "../models/Transfer";
import User from "../models/User";
import CarWeight from "../models/CarWeight";
import { eachDayOfInterval, parseISO } from "date-fns";

class FilterTransferController {
  async index(req, res) {
    const { dateStart, dateEnd } = req.query;

    console.log(dateStart);
    console.log(dateEnd);

    if (!dateStart || !dateEnd) {
      return res
        .status(401)
        .json({ error: "Informe a data inicial e final da pesquisa." });
    }

    const intervalDate = eachDayOfInterval({
      start: parseISO(dateStart),
      end: parseISO(dateEnd),
    });

    const filterTransfer = await TransferModel.findAll({
      where: { date: intervalDate },
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
      order: ["created_at"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username", "driver", "adm"],
        },
        {
          model: CarWeight,
          as: "carweight",
          attributes: ["truck", "car_weight"],
        },
      ],
    });

    return res.json(filterTransfer);
  }
}

export default new FilterTransferController();
