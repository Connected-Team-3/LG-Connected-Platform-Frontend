import axios from 'axios';

export const getVideoById = async (videoId) => {
    try {
        const response = await axios.get(`/api/video/play/${videoId}`);
        if (response?.data?.result?.data) {
            return response.data;
        } else {
            console.warn(`No data found for video ID ${videoId}`);
            return { result: { data: null } }; // 기본값 반환
        }
    } catch (error) {
        console.error(`Error fetching video with ID ${videoId}:`, error);
        return { result: { data: null } }; // 기본값 반환
    }
};
