import {Account, Client, Avatars, OAuthProvider, Databases } from 'react-native-appwrite';

// permite el manejo de deep linking en react native 
import * as Linking from 'expo-linking'; // import * as Linking -> significa se importa todo el contenido del módulo expo-linking y se 
                                         // agrupa bajo el nombre Linking

import { openAuthSessionAsync } from "expo-web-browser"; // abre una sesión de autenticación en un navegador web seguro

export const config = {
    platform: 'com.jsm.restate',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
    galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
    reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
    propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
}


export const client = new Client()
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!);


export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

export async function login (){
    try {
        const redirectUri = Linking.createURL('/');

        const response = await account.createOAuth2Token(OAuthProvider.Google,redirectUri);

        if (!response) throw new Error('Fallo el login');

        const browserResult = await openAuthSessionAsync(
            response.toString(),
            redirectUri
        );

        if (browserResult.type !== 'success') throw new Error('Fallo el login');

        const url = new URL(browserResult.url);

        const secret = url.searchParams.get('secret')?.toString();
        const userId = url.searchParams.get('userId')?.toString();
        if (!secret || !userId) throw new Error('Fallo el login');

        const session = await account.createSession(userId, secret);

        if (!session) throw new Error('Fallo el login');

        return true;

    } catch (error) {
        console.log(` Error en el login: ${error}`);
        return false;  
    }
}

export async function logout() {
    try {
        await account.deleteSession('current');
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getCurrentUser(){
    try {
        const response = await account.get();

        if(response.$id){
            const userAbatar = avatar.getInitials(response.name);
            return { 
                ...response,
                avatar: userAbatar.toString(),
            }
        }

        return response;
    } catch (error){
        console.log(error);
        return null;
    }
}
