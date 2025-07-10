import conf from "../conf/conf";
import { Account, Client, Databases } from "appwrite"

class AppwriteClient{
    client = new Client();
    account;
    databases;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
    }
}

const clientService = new AppwriteClient();

export {clientService}