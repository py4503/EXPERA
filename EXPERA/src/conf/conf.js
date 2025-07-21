
const conf = {
    appwriteUrl : import.meta.env.VITE_APPWRITE_URL,
    appwriteProjectId : import.meta.env.VITE_APPWRITE_PROJECT_ID,
    appwriteDatabaseId : import.meta.env.VITE_APPWRITE_DATABASE_ID,
    appwriteCollectionPostsId : import.meta.env.VITE_APPWRITE_COLLECTION_POSTS,
    appWriteCollectionLikesId : import.meta.env.VITE_APPWRITE_COLLECTION_LIKES,
    appwriteCollectionSavedPostsId : import.meta.env.VITE_APPWRITE_COLLECTION_SAVED_POSTS,
    appwriteBucketId : import.meta.env.VITE_APPWRITE_BUCKET_ID,
}

export default conf;