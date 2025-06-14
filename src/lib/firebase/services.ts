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
import bcrypt from "bcryptjs";

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

const signUp = async (
    userData: {
        fullname: string;
        email: string;
        phone: string;
        password: string;
        role?: string;
    },
    callback: ({
        success,
        message,
    }: {
        success: boolean;
        message: string;
    }) => void
) => {
    const q = query(
        collection(firestore, "users"),
        where("email", "==", userData.email)
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    if (data.length > 0) {
        callback({
            success: false,
            message: "User already exists",
        });
    } else {
        if (!userData.role) {
            userData.role = "member";
        }
        userData.password = await bcrypt.hash(userData.password, 10);
        await addDoc(collection(firestore, "users"), userData)
            .then(() => {
                callback({
                    success: true,
                    message: "User created successfully",
                });
            })
            .catch((error) => {
                callback({
                    success: false,
                    message: error.message,
                });
            });
    }
};

export { retrieveData, retrieveDataById, signUp };
