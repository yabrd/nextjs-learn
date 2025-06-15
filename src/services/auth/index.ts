import instance from "@/lib/axios/instance";
import { addData, retrieveDataByField } from "@/lib/firebase/services";
import bcrypt from "bcryptjs";

const signUp = async (
    userData: {
        fullname: string;
        email: string;
        phone: string;
        password: string;
        role?: string;
        created_at?: Date;
        updated_at?: Date;
    },
    callback: Function
) => {
    const data: any = await retrieveDataByField("users", "email", userData.email);
    if (data.length > 0) {
        callback(false);
    } else {
        if (!userData.role) {
            userData.role = "member";
        }
        userData.password = await bcrypt.hash(userData.password, 10);
        userData.created_at = new Date();
        userData.updated_at = new Date();
        await addData("users", userData, (result: boolean) => {
            if (result) {
                callback(userData);
            }
        });
    }
};

const signIn = async (email: string) => {
    const data: any = await retrieveDataByField("users", "email", email);
    if (data) {
        return data[0];
    } else {
        return null;
    }
};

const signInWithGoogle = async (
    userData: {
        fullname: string;
        email: string;
        type: string;
        role?: string;
        created_at?: Date;
        updated_at?: Date;
    },
    callback: Function
) => {
    const data: any = await retrieveDataByField("users", "email", userData.email);
    if (data.length > 0) {
        callback(data[0]);
    } else {
        data.role = "member";
        data.created_at = new Date();
        userData.updated_at = new Date();
        await addData("users", userData, (result: boolean) => {
            if (result) {
                callback(userData);
            }
        });
    }
};

const authServices = {
    registerAccount: (data: any) => instance.post("/api/user/register", data),
};

export { signUp, signIn, signInWithGoogle, authServices };