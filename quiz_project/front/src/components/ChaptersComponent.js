import React from 'react';
import '../assets/ChaptersComponent.css'; 
const ChaptersComponent = () => {
  return (
    <div className="chapters-container">
      <div className="chapter-block">
        <h2>Chapitre 1 : Les Capteurs Utilisés dans le Robot</h2>
        <p>
          Dans ce premier chapitre, les enfants découvriront l'importance cruciale des capteurs
          dans la robotique. Ils exploreront en détail chaque capteur utilisé dans le robot suiveur
          de ligne, notamment le capteur DHT11 pour la détection de la température et de l'humidité,
          le capteur de gaz MQ-6 pour surveiller les éventuelles fuites de gaz, la photodiode pour
          détecter les variations de lumière, et l'ultrason pour mesurer les distances avec précision.
          Les enfants apprendront comment chaque capteur fonctionne, comment ils interagissent avec
          l'environnement, et comment ils fournissent des données essentielles au fonctionnement du robot.
        </p>
      </div>
      <div className="chapter-block">
        <h2>Chapitre 2 : La Carte Utilisée dans le Robot (ESP32)</h2>
        <p>
          Dans ce deuxième chapitre, les enfants plongeront dans le monde de la carte ESP32, qui est
          le cerveau de leur robot suiveur de ligne. Ils découvriront les caractéristiques et les capacités
          puissantes de cette carte, tels que le Wi-Fi et le Bluetooth intégrés, qui permettent au robot d'être
          contrôlé à distance. Les enfants apprendront également à programmer la carte ESP32 et à la configurer
          pour interagir avec les différents capteurs du robot. Des exemples pratiques et des projets simples
          aideront les enfants à maîtriser l'utilisation de cette carte et à comprendre son rôle essentiel dans
          le fonctionnement global du robot.
        </p>
      </div>
      <div className="chapter-block">
        <h2>Chapitre 3 : Les Codes Arduino pour le Robot</h2>
        <p>
          Dans ce troisième chapitre, les enfants exploreront le langage de programmation Arduino, qui est
          utilisé pour programmer la carte ESP32 et contrôler le comportement du robot. Ils apprendront les bases
          de la programmation, comme les variables, les boucles et les instructions conditionnelles, puis ils se
          lanceront dans la création des codes spécifiques au suiveur de ligne. Les enfants auront l'occasion de
          comprendre comment les données des capteurs sont interprétées dans le code, et comment ils peuvent optimiser
          les performances du robot en ajustant les paramètres dans les codes Arduino.
        </p>
      </div>
     
    </div>
  );
};

export default ChaptersComponent;
