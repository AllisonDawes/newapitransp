import TransferModel from "../models/Transfer";
import { startOfToday, startOfDay } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

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

  /*async store(req, res) {
    const dataAtual = new Date();

    const data = startOfToday(dataAtual);

    const znDate = zonedTimeToUtc(dataAtual, "Antarctica/Mawson");

    return res.json({
      dataAtual,
      data,
      znDate
    });
  }*/
}

export default new SumTransfers();
