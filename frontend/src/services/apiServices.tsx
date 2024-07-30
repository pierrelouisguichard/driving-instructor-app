// src/api/pupilApi.ts

import { ReactNode } from "react";
import { DrivingSkillInterface, PupilInterface } from "../interface/Interfaces";

const PUPILS_API_URL = "http://localhost:4000/api/pupils/";

/**
 * Fetches the list of pupils from the specified API endpoint.
 * Returns an array of PupilInterface objects if successful.
 * Handles various HTTP errors and logs them to the console.
 *
 * @returns {Promise<PupilInterface[]>} An array of pupil objects.
 * @throws Will throw an error if the fetch operation fails or the response is not OK.
 */
export const fetchAllPupils = async (): Promise<PupilInterface[]> => {
  try {
    const response = await fetch(PUPILS_API_URL);

    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new Error("Pupils not found (404)");
        case 500:
          throw new Error("Server error (500)");
        default:
          throw new Error(`Unexpected error: ${response.status}`);
      }
    }

    const data: PupilInterface[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching pupils:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to fetch pupils. ${error.message}`);
    } else {
      throw new Error("Failed to fetch pupils. Please try again later.");
    }
  }
};

export const fetchSinglePupil = async (id: string): Promise<any> => {
  const url = `${PUPILS_API_URL}${id}`;

  try {
    const response = await fetch(url);
    const pupil = await response.json();

    if (!response.ok) {
      // If the response is not OK, throw an error with a relevant message
      throw new Error(
        pupil.error || "An error occurred while fetching the pupil data."
      );
    }

    return pupil;
  } catch (error) {
    // Log the error and rethrow a more generic error for the caller
    console.error(`Failed to fetch pupil with ID ${id}:`, error);
    throw new Error("Failed to fetch pupil data.");
  }
};

interface ReportPayload {
  to: string;
  subject: string;
  html: ReactNode;
}

export const sendProgressReport = async (
  payload: ReportPayload
): Promise<void> => {
  try {
    const response = await fetch(`${PUPILS_API_URL}send-report`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to send report");
    }
  } catch (error) {
    console.error("Failed to send report:", error);
    throw new Error("An error occurred while sending the report.");
  }
};

interface Pupil {
  firstName: string;
  lastName: string;
  eMail: string;
  progressRecords: DrivingSkillInterface[];
}

export const savePupil = async (id: string, pupil: Pupil): Promise<void> => {
  const url = id
    ? `http://localhost:4000/api/pupils/${id}`
    : "http://localhost:4000/api/pupils";
  const method = id ? "PATCH" : "POST";

  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(pupil),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to save pupil data");
    }
  } catch (error) {
    console.error("Error saving pupil:", error);
    throw new Error("An error occurred while saving the pupil.");
  }
};
