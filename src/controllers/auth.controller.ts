import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export const authenticateUser = async (request: Request, response: Response) => {
  try{
      const { username, password } = request.body;
      const authenticatedUser = await AuthService.authenticate({ username, password });
      response.status(201).json(authenticatedUser);
  } catch (error: any) {
      response.status(500).json({ message: error.message });
  }
}

export const changePassword = async (request: Request, response: Response) => {
  try{
    const { user_id, new_password, user_role } = request.body;
    const updatedUser = await AuthService.changePassword(
      Number(user_id), 
      String(user_role), 
      String(new_password)
    );
    response.status(201).json(updatedUser);
  } catch (error: any) {
    response.status(500).json({ message: error.message });
  }
}
