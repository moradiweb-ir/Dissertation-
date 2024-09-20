"use server";

import PatientModel from "@/models/patient-model";

export const getAllPatients = async () => {
  try {
    const patients = await PatientModel.find().sort({ createdAt: -1 });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(patients)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

