import React, { useState } from 'react';
import Button from '@enact/sandstone/Button';
import Input from '@enact/sandstone/Input';
import Spinner from '@enact/sandstone/Spinner';
import {Header, Panel} from '@enact/sandstone/Panels';
import axiosInstance from '../auth/axiosInstance';

function VideoUploadPanel() {
    const [video, setVideo] = useState(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setVideo(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!video) {
            setStatus("동영상을 선택해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append('video', video);

        try {
            setLoading(true);
            setStatus("업로드 중...");
            const response = await axiosInstance.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const result = await response.json();
            if (response.ok) {
                setStatus("업로드 완료!");
            } else {
                setStatus(result.message || "업로드 실패!");
            }
        } catch (error) {
            setStatus("서버 오류. 다시 시도해주세요.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Panel style={{backgroundColor: '#fff' }}>
            <Header>동영상 업로드</Header>
            <form onSubmit={handleSubmit}>
                <Input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    required
                    style={{ marginBottom: '20px' }}
                />
                <br />
                <Button
                    type="submit"
                    disabled={loading}
                    style={{ marginBottom: '20px' }}
                >
                    {loading ? <Spinner size="small" /> : '업로드'}
                </Button>
            </form>
            <div>{status}</div>
        </Panel>
    );
}

export default VideoUploadPanel;
