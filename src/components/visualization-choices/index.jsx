import React from "react";
import { SCATTER_PLOT, BAR_GRAPH } from "../../constants";
import scatterIcon from "../../icons/scatter.png";
import barIcon from "../../icons/bar.png";
import "./index.css";

const CHOICES = [
  {
    type: SCATTER_PLOT,
    name: "Scatter Plot",
    icon: scatterIcon
  },
  {
    type: BAR_GRAPH,
    name: "Bar Graph",
    icon: barIcon
  }
];

const VisualizationChoices = ({
  visualizationChoice,
  setVisualizationChoice
}) => {
  return (
    <div className="Visualization-choices">
      {CHOICES.map(choice => {
        const selected = visualizationChoice === choice.type;
        const choiceClass = selected
          ? "Visualization-choice-selected"
          : "Visualization-choice";
        return (
          <div
            key={choice.type}
            className={choiceClass}
            onClick={() => setVisualizationChoice(choice.type)}
          >
            <img
              className="Visualization-icon-img"
              src={choice.icon}
              alt={choice.name}
              width={60}
              height={60}
            />
            {choice.name}
          </div>
        );
      })}
    </div>
  );
};

export default VisualizationChoices;
