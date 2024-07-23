import React from 'react';
import '../assets/Vid.css'
import vid from '../videos/vid.mp4';
const VideoDescription = () => {
  return (
    <div className="video-description-container">
      <div className="video-container">
        <iframe 
          width="560" 
          height="315" 
          src={vid} 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
        ></iframe>
      </div>
      <div className="description-container">
  <h2 className="description-title">Comment accompagner une personne atteinte d'un cancer ?</h2>
  <p className="description-text">
  Découvrez les clés pour soutenir un proche dans son combat contre le cancer en seulement 4 minutes. 
    Apprenez comment offrir un soutien efficace et bienveillant pour l'aider à traverser cette épreuve difficile.
  </p>
</div>

    </div>
  );
}

export default VideoDescription;
