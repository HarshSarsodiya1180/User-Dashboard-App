import User from "../types/usertypes";

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();

    return data.map((user: User) => ({
      ...user,
      creationDate: new Date().toLocaleDateString(),
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
