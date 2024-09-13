"use server";

import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs/server";

export const createUser = async () => {
  try {
    const user = await currentUser();
    const mongoDBUserObj = {
      name: `${user?.firstName} ${user?.lastName}`,
      clerkUserId: user?.id,
      email: user?.emailAddresses[0].emailAddress,
      profilePic: user?.imageUrl,
      isApproved: false,
      isSuperAdmin: false,
    };

    const newUser = new UserModel(mongoDBUserObj);
    await newUser.save();
    return {
      success: true,
      message: "User created successfully",
      data: JSON.parse(JSON.stringify(newUser)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getUserDataFromMongoDB = async () => {
  try {
    const user = await currentUser();

    // check if user exists in MongoDB , if yes return user data
    const userFromMongoDB = await UserModel.findOne({ clerkUserId: user?.id });
    if (userFromMongoDB) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(userFromMongoDB)),
      };
    }

    // if user does not exist in MongoDB, create user and return user data
    const newUser = await createUser();
    if (newUser.success) {
      return {
        success: true,
        data: newUser.data,
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
