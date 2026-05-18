import { useEffect, useState } from 'react';
import {api, type Cat} from '../shared/api/apiClient';
import type {Breed} from "@thatapicompany/thecatapi";

export const App = () => {
    const [pets, setPets] = useState<Cat[]>([]);
    const [breeds, setBreeds] = useState<Breed[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const testApi = async () => {
            try {
                console.log("Fetching cats from The Cat API...");
                const data = await api.getCats();
                const fetchedBreeds = await api.getBreeds();
                console.log("Successfully fetched pets:", data);
                setPets(data);
                setBreeds(fetchedBreeds);
            } catch (err) {
                console.error("Test API call failed:", err);
                setError("Failed to fetch data. Check your console logs and .env file.");
            } finally {
                setLoading(false);
            }
        };

        testApi();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">ShelterFlow Dashboard</h1>
                <p className="text-gray-600">Testing API Connection...</p>
            </header>

            <main className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Connection Status:</h2>

                {loading && (
                    <div className="text-blue-600 animate-pulse font-medium">
                        ⏳ Connecting to The Cat API and fetching data...
                    </div>
                )}

                {error && (
                    <div className="text-red-600 bg-red-50 p-3 rounded border border-red-200">
                        ❌ {error}
                    </div>
                )}

                {!loading && !error && (
                    <div>
                        <div className="text-green-600 font-medium mb-4">
                            ✅ Success! Received {pets.length} cats from The Cat API.
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-bold text-gray-700">Sample Cat Items:</h3>
                            <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-x-auto max-h-60">
                {JSON.stringify(pets, null, 2)}
              </pre>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-bold text-gray-700">Sample Breed Items:</h3>
                            <pre className="bg-gray-900 text-green-400 p-4 rounded text-xs overflow-x-auto max-h-60">
                {JSON.stringify(breeds, null, 2)}
              </pre>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};