import conf from "../conf/conf";
import { Account, Client, Databases, Storage } from "appwrite"

class AppwriteClient {
    client = new Client();
    account;
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
}

const clientService = new AppwriteClient();

export { clientService }