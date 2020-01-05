import TransferModel from "../models/Transfer";

class CountTransfers {
  async index(req, res) {
    const count = await TransferModel.count();

    return res.json(count);
  }
}

export default new CountTransfers();
