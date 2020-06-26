/**
 * @module botbuilder-storage-firestore
 */
import { Firestore } from '@google-cloud/firestore';
import { Storage, StoreItems } from 'botbuilder-core';
export declare class FirestoreStorage implements Storage {
    readonly collection: string;
    readonly settings: object;
    readonly firestore: Firestore;
    constructor(collection: any, settings?: object);
    delete(keys: string[]): Promise<void>;
    read(keys: string[]): Promise<StoreItems>;
    write(changes: StoreItems): Promise<void>;
}
