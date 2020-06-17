/**
 * @module botbuilder-storage-firestore
 */
import { Storage, StoreItems } from 'botbuilder-core';
export declare class FirestoreStorage implements Storage {
    readonly collection: string;
    readonly settings: object;
    constructor(collection: any, settings?: object);
    delete(keys: string[]): Promise<void>;
    read(keys: string[]): Promise<StoreItems>;
    write(changes: StoreItems): Promise<void>;
}
