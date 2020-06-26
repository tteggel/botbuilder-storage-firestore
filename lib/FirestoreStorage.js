"use strict";
/**
 * @module botbuilder-storage-firestore
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreStorage = void 0;
const firestore_1 = require("@google-cloud/firestore");
class FirestoreStorage {
    constructor(collection, settings = {}) {
        this.collection = collection;
        this.settings = settings;
        this.firestore = new firestore_1.Firestore(this.settings);
    }
    delete(keys) {
        return __awaiter(this, void 0, void 0, function* () {
            keys.map(key => this.firestore.collection(this.collection).doc(key).delete());
        });
    }
    read(keys) {
        return __awaiter(this, void 0, void 0, function* () {
            const refs = keys.map(key => this.firestore.collection(this.collection).doc(key));
            const snapshots = yield this.firestore.getAll(...refs);
            const result = {};
            snapshots.map(doc => doc.exists ? result[doc.id] = doc.data() : null);
            return result;
        });
    }
    write(changes) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(Object.keys(changes).map(key => this.firestore.collection(this.collection)
                .doc(key)
                .set(changes[key])));
        });
    }
}
exports.FirestoreStorage = FirestoreStorage;
//# sourceMappingURL=FirestoreStorage.js.map