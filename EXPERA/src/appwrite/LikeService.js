import { clientService } from "./ClientService";
import { ID, Query } from "appwrite";
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
            console.log("APPWRITE :: unRegisterLike", error);
        }
    }

    async unRegisterLike({ slug, userId }) {
        try {
            const queries = [Query.and([
                Query.equal('slug', slug),
                Query.equal('userId', userId),
            ])]
            const doc = await clientService.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appWriteCollectionLikesId,
                queries
            )
            const docId = doc.documents[0].$id;
            await clientService.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appWriteCollectionLikesId,
                docId
            )
            return true;
        } catch (error) {
            console.log("APPWRITE :: unRegisterLike", error);
            return false;
        }
    }

    async isLiked(queries) {
        try {
            const likes = await clientService.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appWriteCollectionLikesId,
                queries
            )
            if (likes) {
                return likes;
            }
        } catch (error) {
            console.log("APPWRITE :: isLiked", error);
        }
    }

    async getLikedPosts({ userId }) {
        try {
            const queries = [Query.equal('userId', userId)];
            const posts = await clientService.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appWriteCollectionLikesId,
                queries
            )

            if (posts) {
                return posts;
            }
        } catch (error) {
            console.log("APPWRITE :: getLikedPosts", error);
        }
    }
}
const likeService = new LikeService();
export default likeService;