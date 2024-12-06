export const getVideoHistory = async (userId) => {
    const response = await fetch(`/api/videoHistory/getHistories/${userId}`);
    return response.json();
};
