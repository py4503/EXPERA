import { ID, Query } from "appwrite";
import conf from "../conf/conf";
import { clientService } from "./ClientService";

class PostService {
    async createPost({ title, content, status, featuredImage, userId, slug }) {
        try {
            const post = await clientService.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionPostsId,
                slug,
                {
                    title,
                    content,
                    status,
                    featuredImage,
                    userId
                }
            )

            if (post) {
                return post
            }
        } catch (error) {
            console.log("APPWRITE :: createPost", error);
        }
    }

    async updatePost({ slug, title, content, featuredImage, status }) {
        try {
            const post = await clientService.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionPostsId,
                slug,
                {
                    title,
                    content,
                    status,
                    featuredImage,
                }
            )
            if (post) {
                return post;
            }
        } catch (error) {
            console.log("APPWRITE :: updatePost", error);
        }
    }

    async deletePost(slug) {
        try {
            await clientService.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionPostsId,
                slug
            )
            return true;
        } catch (error) {
            console.log("APPWRITE :: deletePost", error);
            return false;
        }
    }

    async getSinglePost(slug) {
        try {
            const post = await clientService.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionPostsId,
                slug
            )

            if (post) {
                return post;
            }
        } catch (error) {
            console.log("APPWRITE :: getSinglePost", error);
        }
    }

    async getAllPosts(queries = [Query.equal('status', 'active')]) {
        try {
            const posts = await clientService.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionPostsId,
                queries
            )

            if (posts) {
                return posts;
            }
        } catch (error) {
            console.log("APPWRITE :: getAllPosts", error);
        }
    }

    async uploadFile(file) {
        try {
            const fileId = await clientService.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            if (fileId) {
                return fileId;
            }
        } catch (error) {
            console.log("APPWRITE :: uploadFile", error);
        }
    }

    getFile(fileId) {
        try {
            const file = clientService.bucket.getFileView(
                conf.appwriteBucketId,
                fileId
            )
            if (file) {
                return file;
            }
        } catch (error) {
            console.log("APPWRITE :: uploadFile", error);
        }
    }
}

const postService = new PostService();

export default postService;