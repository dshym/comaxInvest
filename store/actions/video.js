import Video from "../../models/video";

export const ADD_VIDEO = 'ADD_VIDEO';
export const SET_VIDEOS = 'SET_VIDEOS';
export const DELETE_VIDEO = 'DELETE_VIDEO';


export const fetchVideos = () => {
    return async dispatch => {
        const response = await fetch(
            `https://comaxinvest-8c0f1-default-rtdb.firebaseio.com/videos.json`
        );

        const resData = await response.json();
        const loadedVideos = [];

        for(const key in resData) {
            loadedVideos.push(new Video(key, resData[key].title, resData[key].url, resData[key].description));
        }

        dispatch({type: SET_VIDEOS, loadedVideos: loadedVideos});
    };
};  

export const deleteVideo = videoId => {
    return async (dispatch) => {
        const response = await fetch(
            `https://comaxinvest-8c0f1-default-rtdb.firebaseio.com/videos/${videoId}.json`,
            {
                method: 'DELETE'
            }
        );
        if(!response.ok) {
            throw new Error('Something went wrong.');
        }
        dispatch({ type: DELETE_VIDEO, vidId: videoId});
    };
};

export const addVideo = (title, url, description) => {
    return async dispatch => {
        
        const response = await fetch(
            `https://comaxinvest-8c0f1-default-rtdb.firebaseio.com/videos.json`,
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                url,
                description,
            })
            }
        );

        const resData = await response.json();

        dispatch({
            type: ADD_VIDEO,
            videoData: {
            id: resData.name,
            title,
            url,
            description
            }
        });
    };
};

