import { ID, Query } from "appwrite";
import conf from "../conf/conf";
import { clientService } from "./ClientService";

class PostService {
    async createPost({ title, content, status, featuredImage, userId, slug, userName }) {
        console.log("Create post data ::", "title:", title, "content:", content, "userName:", userName)
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
                    userId,
                    userName
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

    async getAllPosts(queries = [Query.equal('status', 'publish')]) {
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
            console.log("APPWRITE :: getFile", error);
        }
    }

    async deleteFile(fileId) {
        try {
            await clientService.bucket.deleteFile(fileId);
        } catch (error) {
            console.log("APPWRITE :: deleteFile", error);
        }
    }

    async savePost({ slug, userId }) {
        try {
            const saved = await clientService.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionSavedPostsId,
                ID.unique(),
                {
                    slug,
                    userId
                }
            )
            if (saved) {
                return saved;
            }
        } catch (error) {
            console.log("APPWRITE :: savePost", error);
        }
    }

    async getSavedPosts(queries) {
        try {
            const posts = await clientService.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionSavedPostsId,
                queries
            )


            if (posts) {
                return posts;
            }
        } catch (error) {
            console.log("APPWRITE :: getSavedPosts", error);
        }
    }

    async removeFromSaved({ slug, userId }) {
        try {
            const queries = [Query.and([
                Query.equal('slug', slug),
                Query.equal('userId', userId),
            ])]
            const doc = await clientService.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionSavedPostsId,
                queries
            )
            const docId = doc.documents[0].$id;
            await clientService.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionSavedPostsId,
                docId
            )
            return true;
        } catch (error) {
            console.log("APPWRITE :: removeFromSaved", error);
            return false;
        }
    }
}

const postService = new PostService();

export default postService;