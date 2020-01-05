import TransferModel from "../models/Transfer";

class SumTransfers {
  async index(req, res) {
    const total = await TransferModel.findAll({
      attributes: ["weight"]
    });

    return res.json(total);
  }
}

export default new SumTransfers();
