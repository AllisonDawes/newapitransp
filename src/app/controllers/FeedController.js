import Feed from "../models/Feed";
import User from "../models/User";

class FeedController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const feedStatus = await Feed.findAndCountAll({
      attributes: [
        "id",
        "user_id",
        "feed",
        "status",
        "created_at",
        "updated_at"
      ],
      order: [["created_at", "DESC"]],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username", "driver", "adm"]
        }
      ]
    });

    return res.json(feedStatus);
  }

  async store(req, res) {
    const { feed, status } = req.body;

    const checkUser = await User.findByPk(req.userId);

    if (!checkUser.driver) {
      return res.status(400).json({ error: "Usuário não autorizado!" });
    }

    const newFeed = await Feed.create({
      user_id: req.userId,
      feed,
      status
    });

    return res.json(newFeed);
  }
}

export default new FeedController();
