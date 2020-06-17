/**
 * @module botbuilder-storage-firestore
 */

import { Firestore } from '@google-cloud/firestore'
import { Storage, StoreItems } from 'botbuilder-core'

export class FirestoreStorage implements Storage {
  readonly collection: string
  readonly settings: object

  public constructor(collection, settings: object = {}) {
    this.collection = collection
    this.settings = settings
  }

  public async delete(keys: string[]): Promise<void> {
    const firestore = new Firestore(this.settings)
    try {
      keys.map(key => firestore.collection(this.collection).doc(key).delete())
    } finally {
      firestore.terminate()
    }
  }

  public async read(keys: string[]): Promise<StoreItems> {
    const firestore = new Firestore(this.settings)
    try {
      const refs = keys.map(key => firestore.collection(this.collection).doc(key))
      const snapshots = await firestore.getAll(...refs)

      const result: StoreItems = {}
      snapshots.map(doc => doc.exists ? result[doc.id] = doc.data() : null)
      return result

    } finally {
      firestore.terminate()
    }
  }

  public async write(changes: StoreItems): Promise<void> {
    const firestore = new Firestore(this.settings)
    try {
      await Promise.all(
        Object.keys(changes).map(
          key => firestore.collection(this.collection)
            .doc(key)
            .set(changes[key])
        )
      )
    } finally {
      firestore.terminate()
    }
  }
}
