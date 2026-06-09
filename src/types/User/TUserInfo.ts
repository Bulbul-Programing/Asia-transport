export enum UserRole {
    MP = "MP",
    ADMIN = "ADMIN",
    USER = "USER"
}

export type TUser = {
    id: string;
    name: string;
    email: string;
    profilePhoto?: string | null;
    password: string;
    phone: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updateAt: Date;
};

export const TUserCategory = [
    { label: "Admin", value: "ADMIN" },
    { label: "User", value: "USER" }
]