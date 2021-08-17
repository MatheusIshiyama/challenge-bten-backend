import { Request, Response } from "express";
import { User } from "@models/User";
import UserService from "@services/UserService";

class UserController {
  async getUsers(req: Request, res: Response) {
    try {
      const user: User[] = await UserService.getUsers();
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const { userId = null } = req.params;
      if (!userId) return res.status(400).json({ error: "UserId is missing" });

      const user: User = await UserService.getUser(userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  async addUser(req: Request, res: Response) {
    try {
      const { name, homeTeam = null, age, height } = req.body;

      const user: User = await UserService.addUser({ name, homeTeam, age, height });

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { userId = null } = req.params;
      if (!userId) return res.status(400).json({ error: "UserId is missing" });

      const userData: User = await UserService.getUser(userId);
      if (!userData) return res.status(404).json({ error: "User not found" });

      const {
        name = userData.name,
        homeTeam = userData.homeTeam,
        age = userData.age,
        height = userData.height,
      } = req.body;

      const user = await UserService.updateUser(userId, { name, homeTeam, age, height });

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      if (!userId) return res.status(400).json({ error: "UserId is missing" });

      const userData: User = await UserService.getUser(userId);
      if (!userData) return res.status(404).json({ error: "User not found" });

      await UserService.deleteUser(userId);

      return res.status(200).json({ message: "User has been deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();
