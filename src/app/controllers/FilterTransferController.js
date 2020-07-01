import TransferModel from "../models/Transfer";
import User from "../models/User";
import CarWeight from "../models/CarWeight";
import { eachDayOfInterval, parseISO } from "date-fns";

class FilterTransferController {
  async index(req, res) {
    const { dateStart, dateEnd } = req.body;
    const { page = 1 } = req.query;

    const intervalDate = eachDayOfInterval({
      start: parseISO(dateStart),
      end: parseISO(dateEnd),
    });

    const filterTransfer = await TransferModel.findAndCountAll({
      where: { date: intervalDate },
      order: ["created_at"],
      limit: 31,
      offset: (page - 1) * 31,
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
