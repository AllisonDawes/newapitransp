import TransferModel from "../models/Transfer";
import { startOfDay } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

class SumTransfers {
  async index(req, res) {
    const znDate = zonedTimeToUtc(new Date(), "Asia/Tokyo");

    const dayStart = startOfDay(znDate);

    console.log(znDate);
    console.log(dayStart);

    const total = await TransferModel.findAll({
      where: { date: dayStart },
      attributes: ["weight"],
    });

    if (!total) {
      return res
        .status(401)
        .json({ error: "Nenhum registro de carrada ainda foi feito hoje!" });
    }

    return res.json(total);
  }
}

export default new SumTransfers();
