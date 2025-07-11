import { clientService } from "./ClientService";
import { ID } from "appwrite";
import conf from "../conf/conf";

class LikeService {
    async registerLike({ slug, userId }) {
        try {
            await clientService.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appWriteCollectionLikesId,
                ID.unique(),
                {
                    slug,
                    userId
                }
            )
        } catch (error) {
            console.log("APPWRITE :: unRegisterLike",error);
        }
    }

    async unRegisterLike({slug, userId}){
        try {
            await clientService.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appWriteCollectionLikesId,
                slug
            )
            return true;
        } catch (error) {
            console.log("APPWRITE :: unRegisterLike",error);
            return false;
        }
    }

    async isLiked(queries){
        try {
            await clientService.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appWriteCollectionLikesId,
                queries
            )
        } catch (error) {
            console.log("APPWRITE :: isLiked",error);
        }
    }

const likeService = new LikeService();
export default likeService;