import TransferModel from "../models/Transfer";
import { startOfDay } from "date-fns";

class SumTransfers {
  async index(req, res) {
    const dayStart = startOfDay(new Date());

    const total = await TransferModel.findAll({
      where: { date: dayStart },
      attributes: ["weight"]
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
