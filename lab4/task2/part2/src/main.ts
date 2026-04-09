import { User } from "./User.js";
import type { IUser } from "./interfaces.js";

const user: IUser = new User("Danila", 19);

user.hello();