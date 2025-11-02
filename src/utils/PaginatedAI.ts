export interface AIResponsePage {
  text: string;
  page: number;
  totalPages: number;
}

const API_BASE_URL = import.meta.env.VITE_AI_API_URL;

export const fetchPaginatedAIResponse = async (
  prompt: string,
  page: number = 1,
  pageSize: number = 1
): Promise<AIResponsePage> => {
  try {
    const apiUrl = `${API_BASE_URL}?type=all-meat&paras=${pageSize}&start-with-lorem=1`;
   
    await new Promise((resolve) =>
      setTimeout(resolve, 100 + Math.random() * 1500)
    );

    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const data = await res.json();
    const text = data.join("\n\n") + `\n(Page ${page})`;

    const totalPages = Math.floor(Math.random() * 5) + 1;

    return { text, page, totalPages };
  } catch {
    throw new Error("Failed to fetch AI response. Please try again.");
  }
};
