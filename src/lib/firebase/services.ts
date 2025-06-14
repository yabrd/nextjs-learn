import {
    collection,
    getDocs,
    getFirestore,
    getDoc,
    doc,
    query,
    where,
    addDoc,
} from "@firebase/firestore";
import app from "./init";

const firestore = getFirestore(app);
const retrieveData = async (collectionName: string) => {
    const snapshot = await getDocs(collection(firestore, collectionName));
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data;
};

const retrieveDataById = async (collectionName: string, id: string) => {
    const snapshot = await getDoc(doc(firestore, collectionName, id));
    const data = snapshot.data();
    return data;
};

const retrieveDataByField = async (
    collectionName: string,
    field: string,
    value: string
) => {
    const q = query(
        collection(firestore, collectionName),
        where(field, "==", value)
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data; // <-- penting!
};

const addData = async (
    collectionName: string,
    data: any,
    callback: Function
) => {
    await addDoc(collection(firestore, collectionName), data)
        .then(() => {
            callback(true);
        })
        .catch((error) => {
            callback(false);
        });
};

export { retrieveData, retrieveDataById, addData, retrieveDataByField };
