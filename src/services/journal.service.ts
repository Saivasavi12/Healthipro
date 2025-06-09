import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:4000/healthipro/api/journals", // Replace with your API base URL
    timeout: 5000, // Set a timeout in milliseconds
    headers: {
      "Content-Type": "application/json",
    },
  });


  export const createJournalEntry = async (content: any, token: any) => {
    try {
      const response = await apiClient.post(
        '/saveJournal',
        { content }, // Include content of the journal
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the Authorization header
          },
        }
      );
      return response.data; // Return the journal entry response
    } catch (error) {
      console.error('Error creating journal entry:', error);
      throw error; // Rethrow error to be handled by the calling function
    }
  };
  
  // Function to get all journal entries
  export const getAllJournalEntries = async (token: any) => {
    try {
      const response = await apiClient.get('/retrieveJournal', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return the list of journal entries
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      throw error; // Rethrow error to be handled by the calling function
    }
  };

  export const getJournalEntry = async (token: any, id: any) => {
    try {
      const response = await apiClient.get(`/retrieveJournal/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return the list of journal entries
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      throw error;
    }
  };