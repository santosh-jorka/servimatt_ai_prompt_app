import { fetchPaginatedAIResponse } from "./PaginatedAI";

export const getAIResponse = async (
  prompt: string,
  page: number = 1,
  pageSize: number = 1
) => {
  const response = await fetchPaginatedAIResponse(prompt, page, pageSize);

  return {
    text: response.text,
    page: response.page,
    totalPages: response.totalPages,
  };
};
