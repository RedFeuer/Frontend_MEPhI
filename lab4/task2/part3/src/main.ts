import { User } from "./User.js";
import type { UserInstance } from "./types.js";

const user: UserInstance = new User("Danila", 19);

user.hello();