import React from "react";
import { SCATTER_PLOT, BAR_GRAPH } from "../visualizations/constants";
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
CHOICES[SCATTER_PLOT] = {
  icon: scatterIcon
};
CHOICES[BAR_GRAPH] = {
  icon: barIcon
};

const GraphicChoices = ({ graphicChoice, setGraphicChoice }) => {
  return (
    <div className="Graphic-choices">
      {CHOICES.map(choice => {
        const selected = graphicChoice === choice.type;
        const choiceClass = selected
          ? "Graphic-choice-selected"
          : "Graphic-choice";
        return (
          <div
            className={choiceClass}
            onClick={() => setGraphicChoice(choice.type)}
          >
            <img
              className="Graphic-icon-img"
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

export default GraphicChoices;
