import React from "react";
import ITrack from "../interfaces/Track";
import '../TrakList/index.css';

const TrackItem = ({ id, albumId, title, thumbnailUrl }: ITrack) => {
    return (
        <li className="track-item">
            <p className='track-item-p'>{id}</p>
            <p className='track-item-p'>{albumId}</p>
            <p className='track-item-p'>{title}</p>
            <img src={thumbnailUrl} alt={title}/>
        </li>
    );
}

export { TrackItem };