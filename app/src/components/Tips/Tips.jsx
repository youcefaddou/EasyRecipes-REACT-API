import { useState, useEffect } from 'react';
import './Tips.css';

const Tips = () => {
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    {
      id: 1,
      title: "Conservation des Herbes",
      content: "Pour garder vos herbes fraîches plus longtemps, enveloppez-les dans un torchon humide et placez-les dans un sac en plastique au réfrigérateur."
    },
    {
      id: 2,
      title: "Cuisson des Pâtes",
      content: "Ajoutez une cuillère à soupe d'huile d'olive dans l'eau de cuisson pour éviter que les pâtes ne collent entre elles."
    },
    {
      id: 3,
      title: "Oignons sans Larmes",
      content: "Placez vos oignons au congélateur 15 minutes avant de les émincer pour éviter de pleurer pendant la découpe."
    },
    {
      id: 4,
      title: "Œufs Parfaits",
      content: "Pour des œufs durs parfaits, ajoutez une pincée de bicarbonate de soude dans l'eau de cuisson pour faciliter l'épluchage."
    },
    {
      id: 5,
      title: "Riz Moelleux",
      content: "Laissez reposer votre riz 5 minutes après la cuisson, couvert, pour un résultat plus moelleux et parfaitement cuit."
    },
    {
      id: 6,
      title: "Viande Tendre",
      content: "Laissez reposer votre viande 5 à 10 minutes après la cuisson pour que les jus se répartissent uniformément."
    },
    {
      id: 7,
      title: "Salade Fraîche",
      content: "Lavez votre salade à l'eau vinaigrée pour la garder fraîche plus longtemps et éliminer les bactéries."
    },
    {
      id: 8,
      title: "Pommes de Terre",
      content: "Pour des frites croustillantes, faites-les tremper dans l'eau froide 30 minutes avant la cuisson."
    },
    {
      id: 9,
      title: "Gâteau Moelleux",
      content: "Ajoutez une cuillère à café de vinaigre blanc dans votre pâte à gâteau pour un résultat plus moelleux."
    },
    {
      id: 10,
      title: "Épluchage Facile",
      content: "Pour éplucher facilement les tomates, faites une petite entaille en croix et plongez-les dans l'eau bouillante 30 secondes."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tips-container">
      <h2 className="tips-title">Astuces de Cuisine</h2>
      <div className="tips-wrapper">
        {tips.map((tip, index) => (
          <div
            key={tip.id}
            className={`tip-card ${index === currentTip ? 'active' : ''}`}
          >
            <h3 className="tip-title">{tip.title}</h3>
            <p className="tip-content">{tip.content}</p>
          </div>
        ))}
      </div>
      <div className="tips-dots">
        {tips.map((_, index) => (
          <button
            key={index}
            className={`tip-dot ${index === currentTip ? 'active' : ''}`}
            onClick={() => setCurrentTip(index)}
          />
        ))}
      </div>
    </div>
  );
};
export default Tips;
