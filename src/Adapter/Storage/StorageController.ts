import { createMMKV } from 'react-native-mmkv';
import { PersistanceStorageKey } from './PersistanceStorageKey';
// Assuming Logger is available:
// import { Logger } from '../../Utils/logger';

// Initialize MMKV once for a single, shared, high-performance instance
export const mmkvStorage = createMMKV();

/**
 * 🚀 Fully Synchronous (Non-Async) Storage Controller using MMKV.
 * This class provides a clean, typed API for managing persistent data
 * and removes all unnecessary async/await overhead associated with
 * slower storage methods.
 */
class PersistanceStorage {
    
    /**
     * Stores data synchronously in MMKV.
     * Objects are automatically JSON.stringify'd.
     * @param key The storage key (from the PersistanceStorageKey enum).
     * @param value The value to store (string, number, boolean, or object).
     */
    public SET_DATA = (
        key: PersistanceStorageKey,
        value: object | string | number | boolean| any,
    ): void => {
        const keyString = key.toString();
        try {
            if (typeof value === 'object' && value !== null) {
                // MMKV's set method handles various types. For objects, we stringify explicitly.
                mmkvStorage.set(keyString, JSON.stringify(value));
            } else {
                // Direct set for primitives (string, number, boolean)
                mmkvStorage.set(keyString, value);
            }
            // Logger.success("SET_DATA", { key, value }); // Use your logger if available
        } catch (err) {
            console.error(`MMKV SET_DATA error for key ${keyString}:`, err);
            // Re-throw or handle as per app error policy
        }
    };

    /**
     * Retrieves data synchronously from MMKV and casts it to the expected type T.
     * Automatically attempts to parse JSON for stored objects.
     * @param key The storage key.
     * @returns The retrieved value of type T, or null if the key is not found or retrieval fails.
     */
    public GET_DATA = <T>(key: PersistanceStorageKey): T | null => {
        const keyString = key.toString();
        try {
            // Attempt to retrieve the value as a string
            const value = mmkvStorage.getString(keyString);

            if (value === null || value === undefined) {
                // Return null if key is not found
                return null;
            }

            // 1. Try to parse as JSON (for objects)
            try {
                const parsedValue = JSON.parse(value);
                // If successful, return the parsed object/array
                return parsedValue as T;
            } catch (e) {
                // 2. If JSON parsing fails, it's a primitive stored as a string.
                // MMKV.get methods handle type casting, but we stick to getString
                // and rely on manual type conversion for robustness.
                
                // Return the raw string value (which TypeScript assumes is T)
                // This covers plain strings and string representations of primitives
                return value as T;
            }
        } catch (err) {
            console.error(`MMKV GET_DATA error for key ${keyString}:`, err);
            return null; // Return null on error
        }
    };

    /**
     * Retrieves all keys currently stored in MMKV synchronously.
     * @returns An array of strings representing all stored keys.
     */
    public GET_ALL_KEYS = (): string[] => {
        try {
            return mmkvStorage.getAllKeys();
        } catch (err) {
            console.error("MMKV GET_ALL_KEYS error:", err);
            return []; // Return an empty array on failure
        }
    };

    /**
     * Removes a specific item synchronously from MMKV.
     */
    public REMOVE_DATA = (key: PersistanceStorageKey): void => {
        const keyString = key.toString();
        try {
            mmkvStorage.remove(keyString);
            console.log(`Data for key ${keyString} removed from MMKV.`);
        } catch (err) {
            console.error(`MMKV REMOVE_DATA error for key ${keyString}:`, err);
        }
    };

    /**
     * Clears all data synchronously from MMKV.
     */
    public CLEAR_ALL = (): void => {
        try {
            mmkvStorage.clearAll();
            console.log('All data cleared from MMKV storage');
        } catch (err) {
            console.error('Error clearing all data from MMKV:', err);
        }
    };

    // checks if value exits on keys or not 
    public CHECK_KEY = (key: PersistanceStorageKey): boolean => {
        const keyString = key.toString();
        try {
            return mmkvStorage.contains(keyString);
        } catch (err) {
            console.error(`MMKV CHECK_KEY error for key ${keyString}:`, err);
            return false;
        }
    };
}

// Export a single, ready-to-use instance (Singleton)
export const StorageController = new PersistanceStorage();