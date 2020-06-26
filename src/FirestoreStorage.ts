/**
 * @module botbuilder-storage-firestore
 */

import { Firestore } from '@google-cloud/firestore'
import { Storage, StoreItems } from 'botbuilder-core'

export class FirestoreStorage implements Storage {
  readonly collection: string
  readonly settings: object
  readonly firestore: Firestore

  public constructor(collection, settings: object = {}) {
    this.collection = collection
    this.settings = settings
    this.firestore = new Firestore(this.settings)
  }

  public async delete(keys: string[]): Promise<void> {
    keys.map(key => this.firestore.collection(this.collection).doc(key).delete())
  }

  public async read(keys: string[]): Promise<StoreItems> {
    const refs = keys.map(key => this.firestore.collection(this.collection).doc(key))
    const snapshots = await this.firestore.getAll(...refs)

    const result: StoreItems = {}
    snapshots.map(doc => doc.exists ? result[doc.id] = doc.data() : null)
    return result
  }

  public async write(changes: StoreItems): Promise<void> {
    await Promise.all(
      Object.keys(changes).map(
        key => this.firestore.collection(this.collection)
          .doc(key)
          .set(changes[key])
      )
    )
  }
}
