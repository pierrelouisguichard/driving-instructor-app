import { ReactNode } from "react";
import { Pupil, PupilWithID, User } from "../interface/Interfaces";

const PUPILS_API_URL = "http://localhost:4000/api/pupils/";

/*
 * Handles interactions with external APIs, centralising API logic.
 * Manages operations including:
 * - Fetching all pupils
 * - Retrieving individual pupil data
 * - Sending reports via email
 * - Creating, updating, and deleting pupil records
 */
export const fetchAllPupils = async (user: User): Promise<PupilWithID[]> => {
  try {
    const response = await fetch(PUPILS_API_URL, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

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

    const data: PupilWithID[] = await response.json();
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

export const fetchSinglePupil = async (
  id: string,
  user: User
): Promise<PupilWithID> => {
  const url = `${PUPILS_API_URL}${id}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const pupil = await response.json();

    if (!response.ok) {
      throw new Error(
        pupil.error || "An error occurred while fetching the pupil data."
      );
    }

    return pupil;
  } catch (error) {
    console.error(`Failed to fetch pupil with ID ${id}:`, error);
    throw new Error("Failed to fetch pupil data.");
  }
};

export interface ReportPayload {
  to: string;
  subject: string;
  html: ReactNode;
}

export const sendProgressReport = async (
  payload: ReportPayload,
  user: User
): Promise<void> => {
  try {
    const response = await fetch(`${PUPILS_API_URL}send-report`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
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

/*
 * This method creates a new pupil if no ID is provided,
 * or updates an existing pupil if an ID is present.
 */
export const savePupil = async (
  id: string | undefined,
  pupil: Pupil,
  user: User
): Promise<void> => {
  const url = id ? `${PUPILS_API_URL}${id}` : `${PUPILS_API_URL}`;
  const method = id ? "PATCH" : "POST";

  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(pupil),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
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

export const deletePupil = async (
  id: string,
  user: User
): Promise<{ success: boolean }> => {
  if (!id) return { success: false };

  try {
    const response = await fetch(`${PUPILS_API_URL}${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.ok) {
      return { success: true };
    } else {
      const error = await response.json();
      console.error("Error deleting pupil:", error);
      return { success: false };
    }
  } catch (error) {
    console.error("Error deleting pupil:", error);
    return { success: false };
  }
};
