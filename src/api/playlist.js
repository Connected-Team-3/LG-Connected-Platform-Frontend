export const getPlaylists = async (userId) => {
    try {
        const response = await fetch(`/api/playlist/getPlaylist/${userId}`);
        const data = await response.json();
        
        if (data.success && data.result?.list) {
            return data.result.list; // result.list를 반환
        } else {
            console.error("Failed to fetch playlists:", data.message);
            return []; // 빈 배열 반환
        }
    } catch (error) {
        console.error("Error fetching playlists:", error);
        return []; // 에러 발생 시 빈 배열 반환
    }
};
