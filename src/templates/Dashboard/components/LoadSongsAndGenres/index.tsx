import React from 'react';

interface Props {
  tracksProgress: number;
  genresProgress: number;
}

const LoadSongsAndGenres: React.FC<Props> = ({ tracksProgress, genresProgress }) => {
  return (
    <>
      <p>The playlist creation will take some steps. <br/>
      First, we need to load your saved tracks:</p>
      <LinearProgressWithLabel value={tracksProgress} />
      <p>(this should take from 20 to 30 seconds)</p>
      <p>Now, we must get the genres of the tracks:</p>
      <LinearProgressWithLabel value={genresProgress} />
      <p>(this should take less than 10 seconds)</p>
    </>
  );
}

export default LoadSongsAndGenres;
