import React from 'react';
import axios, { CancelTokenSource } from 'axios';
import ITrack from '../interfaces/Track';
import './index.css';
import { TrackItem } from '../TrackItem';

const defaultTraks: ITrack[] = [];

const TrackList = () => {
  const [error, setError]: [
    string,
    (error: string) => void
  ] = React.useState<string>('');

  const [loading, setLoading]: [
    boolean,
    (loading: boolean) => void
  ] = React.useState<boolean>(true);

  const [tracks, setTracks]: [
    ITrack[],
    (tracks: ITrack[]) => void
  ] = React.useState(defaultTraks);

  const cancelToken = axios.CancelToken; //create cancel token
  const [cancelTokenSource, setCancelTokenSource]: [
    CancelTokenSource,
    (cancelTokenSource: CancelTokenSource) => void
  ] = React.useState(cancelToken.source());

  const handleCancelClick = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel('User cancelled operation');
    }
  };

  React.useEffect(() => {
    axios
      .get<ITrack[]>('https://jsonplaceholder.typicode.com/albums/1/photos?id=1&id=2&id=3&id=4&id=5&id=6', {
        cancelToken: cancelTokenSource.token,
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      })
      .then((response) => {
        setTracks(response.data);
        setLoading(false);
      })
      .catch((ex) => {
        let error = axios.isCancel(ex)
          ? 'Request Cancelled'
          : ex.code === 'ECONNABORTED'
            ? 'A timeout has occurred'
            : ex.response.status === 404
              ? 'Resource Not Found'
              : 'An unexpected error has occurred';

        setError(error);
        setLoading(false);

      });
  }, []);
  return (
    <section className="track-list-container">
      {loading && <button onClick={handleCancelClick}>Cancel</button>}
      <li className="track-item">
            <p className='track-item-p-first'>id</p>
            <p className='track-item-p-first'>albumId</p>
            <p className='track-item-p-first'>title</p>
            <p className='track-item-p-first'>image</p>
        </li>
      {tracks.map((track) => (
            <TrackItem
              albumId={ track.albumId }
              id={ track.id }
              title={ track.title }
              thumbnailUrl = { track.thumbnailUrl }
              url={ track.url }
            ></TrackItem>
        ))}
    </section>
  );
};
export { TrackList };