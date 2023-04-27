import React from "react";
import tw from "tailwind-styled-components";

const ScoreOverlayContainer = tw.div`
  fixed
  top-2
  left-2
  flex
  justify-center
  items-center
  pointer-events-none
  z-10
  w-full
  max-w-custom

`;

const ScoreOverlayContent = tw.div`
  p-2
  bg-black bg-opacity-20
  rounded-lg
  backdrop-filter backdrop-blur-md
  pointer-events-auto
  flex
  flex-col
  w-full
  border-1 border-zinc-900 
  shadow-lg
  
  
`;

const ScoreOverlayText = tw.p`
  text-sm
  font-medium
  mb-0
text-white
w-full
flex justify-start
px-3
`;

const ScoreOverlayValue = tw.span`
  font-bold
  text-sm
  text-white
`;

const ScoreOverlay = ({ currentCountry, score, highestStreak }) => {
  return (
    <ScoreOverlayContainer style={{ background: "black" }}>
      <ScoreOverlayContent>
        <ScoreOverlayText>
          <ScoreOverlayValue style={{ fontSize: "20px" }}>
            {currentCountry}
          </ScoreOverlayValue>
        </ScoreOverlayText>
        <div className="flex w-full border-t-2 border-zinc-900 mt-2 pt-2">
          <ScoreOverlayText>
            <ScoreOverlayValue>{score}/190</ScoreOverlayValue>
          </ScoreOverlayText>
          <ScoreOverlayText>
            <ScoreOverlayValue>{highestStreak}</ScoreOverlayValue>
          </ScoreOverlayText>
        </div>
      </ScoreOverlayContent>
    </ScoreOverlayContainer>
  );
};

export default ScoreOverlay;
