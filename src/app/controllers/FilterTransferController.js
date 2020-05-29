import TransferModel from "../models/Transfer";
import user from "../models/User";
import CarWeightModel from "../models/CarWeight";
import { startOfMonth, getMonth, getDaysInMonth } from "date-fns";

class FilterTransferController {
  async index(req, res) {
    //const { date } = req.body;

    const date = new Date();

    const startOfMonthSearch = startOfMonth(date);
    const monthSearch = getMonth(date);
    const daysInMontSearch = getDaysInMonth(date);

    return res.json({
      date,
      startOfMonthSearch,
      monthSearch,
      daysInMontSearch,
    });
  }
}

export default new FilterTransferController();
