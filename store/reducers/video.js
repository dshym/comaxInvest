import { ADD_VIDEO, DELETE_VIDEO, SET_VIDEOS } from '../actions/video';
import Video from '../../models/video';

const initialState = {
    videos: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_VIDEOS:
            return {
                videos: action.loadedVideos
            };
        case ADD_VIDEO: 
            const newVideo = new Video(
                action.videoData.id,
                action.videoData.title,
                action.videoData.url,
                action.videoData.description,
            );
            return {
                ...state,
                videos: state.videos.concat(newVideo)
            }
        case DELETE_VIDEO:
            return {
                ...state,
                videos: state.videos.filter(video => video.id !== action.vidId)
            }
    }
    return state;
};