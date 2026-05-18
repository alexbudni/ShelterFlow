import {type Breed, TheCatAPI} from "@thatapicompany/thecatapi";

// 1. Initialize the SDK using Vite's environment variables
const apiKey = import.meta.env.VITE_CAT_API_KEY || "";
const theCatAPI = new TheCatAPI(apiKey);

export interface Cat {
    id: string;
    name: string;
    breed: string;
    status: 'Available' | 'Under Review';
    imageUrl: string;
}

export interface FetchOptions {
    limit?: number;
    page?: number;
    hasBreeds?: 1 | 0;
}

export const api = {
    /**
     * Fetches random cats using the official SDK.
     */
    getCats: async (options?: FetchOptions): Promise<Cat[]> => {
        try {
            // The SDK abstracts the query parameter stringification
            const searchParams = {
                limit: options?.limit || 10,
                page: options?.page || 0,
                has_breeds: options?.hasBreeds !== undefined ? options.hasBreeds : 1,
            };
            
            const images = await theCatAPI.images.searchImages(searchParams as any);

            return images.map((img: any) => ({
                id: img.id,
                name: `Cat ${img.id.substring(0, 4)}`,
                breed: img.breeds?.[0]?.name || 'Unknown',
                status: 'Available',
                imageUrl: img.url
            }));

        } catch (error) {
            // The SDK throws ApiRequestError (network) or ApiResponseError (HTTP status)
            console.error("SDK Error fetching cats:", error);
            return [];
        }
    },

    /**
     * Fetches the list of all available cat breeds for dropdowns/filters.
     */
    getBreeds: async (): Promise<Breed[]> => {
        try {
            // The SDK abstracts this, but fetching directly ensures clean, lightweight data mapping
            const headers: HeadersInit = apiKey ? { 'x-api-key': apiKey } : {};
            const response = await fetch('https://api.thecatapi.com/v1/breeds', { headers });

            if (!response.ok) throw new Error('Failed to fetch breeds');

            return await response.json();
        } catch (error) {
            console.error("API Error fetching breeds:", error);
            return [];
        }
    },
};