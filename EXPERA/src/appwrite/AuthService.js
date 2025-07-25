import conf from "../conf/conf";
import { ID } from "appwrite"
import { clientService } from "./ClientService";

class AuthService {
    async createAccount({ email, password, name }) {
        try {
            const account = await clientService.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            if (account) {
                return this.login({ email, password });
            }
            return account;
        } catch (error) {
            console.log("APPWRITE :: createAccount", error);
        }
    }
    async login({ email, password }) {
        try {
            const session = await clientService.account.createEmailPasswordSession(
                email,
                password
            )

            if (session) {
                return session;
            }
        } catch (error) {
            console.log("APPWRITE :: login", error);
        }
    }
    async logout() {
        try {
            return await clientService.account.deleteSessions();
        } catch (error) {
            console.log("APPWRITE :: logout", error);
            return false;
        }
    }
    async getCurrentUser() {
        try {
            const user = await clientService.account.get();
            if (user) {
                return user;
            }
        } catch (error) {
            console.log("APPWRITE :: getCurrentUser :: user not logged in");
        }
    }
}

const authService = new AuthService();

export default authService;
