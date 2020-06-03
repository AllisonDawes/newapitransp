import * as Yup from "yup";

import CarWeightModel from "../models/CarWeight";
import User from "../models/User";

class CarWeight {
  async show(req, res) {
    const carweightList = await CarWeightModel.findOne({
      attributes: [
        "id",
        "user_id",
        "truck",
        "car_weight",
        "created_at",
        "updated_at",
      ],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username", "driver", "adm"],
        },
      ],
    });

    return res.json(carweightList);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      truck: Yup.string().required(
        "Informe o Carro que será usado no serviço."
      ),
      car_weight: Yup.string()
        .required("Informe o peso do carro.")
        .min(5, "Informação de pesagem incorreta"),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: "As validações de cadastro falharam." });
    }

    const { truck, car_weight } = req.body;

    const checkUser = await User.findByPk(req.userId);

    if (!checkUser.driver) {
      return res.status(401).json({
        error: "Usuário não autorizado! Procure o administrador.",
      });
    }

    const carweight = await CarWeightModel.create({
      user_id: req.userId,
      truck,
      car_weight,
    });

    return res.json(carweight);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      truck: Yup.string().required(
        "Informe o Carro que será usado no serviço."
      ),
      car_weight: Yup.string()
        .required("Informe o peso do carro.")
        .min(5, "Informação de pesagem incorreta"),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: "As validações de cadastro falharam." });
    }

    const weight = await CarWeightModel.findByPk(req.params.id);

    const checkUser = await User.findByPk(req.userId);

    if (!checkUser.driver) {
      return res.status(401).json({
        error: "Usuário não autorizado! Procure o administrador",
      });
    }

    await weight.update({
      user_id: req.userId,
      truck: req.body.truck,
      car_weight: req.body.car_weight,
    });

    return res.json(weight);
  }
}

export default new CarWeight();
