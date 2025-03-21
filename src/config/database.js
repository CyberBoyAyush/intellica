import { Client, Databases, Query, ID } from 'appwrite';

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

export const createLearningPath = async (userId, topicName, modules) => {
  try {
    return await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID,
      ID.unique(),
      {
        userID: userId,
        topicName,
        modules: JSON.stringify(modules), // Convert array to string
        progress: 0
      }
    );
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create learning path in database');
  }
};

export const getLearningPaths = async (userId) => {
  try {
    const response = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID,
      [Query.equal('userID', userId)]
    );

    // Parse modules string back to array for each document
    return {
      ...response,
      documents: response.documents.map(doc => ({
        ...doc,
        modules: JSON.parse(doc.modules)
      }))
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch learning paths');
  }
};

export const updateLearningPathProgress = async (pathId, progress) => {
  try {
    return await databases.updateDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID,
      pathId,
      {
        progress: Math.min(progress, 100), // Ensure progress doesn't exceed 100
      }
    );
  } catch (error) {
    console.error('Progress update error:', error);
    throw new Error('Failed to update progress');
  }
};

export const deleteLearningPath = async (pathId) => {
  try {
    await databases.deleteDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID,
      pathId
    );
  } catch (error) {
    console.error('Delete error:', error);
    throw new Error('Failed to delete learning path');
  }
};
