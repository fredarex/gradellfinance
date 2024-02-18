import React from "react";
import { PriceChart, VolumeChart } from "components";
import Carousel, { consts } from "react-elastic-carousel";
import { useSelector } from "react-redux";
import { CarouselComponent } from "components/VolumeChart/VolumeChart.styles";
import { useWindowSize as useWindowSizeD } from "@react-hook/window-size";
import {
  ChartContainer,
  ChartWrap,
  StyledBitcoinOverview,
  YourOverview,
} from "./BitcoinOverview.styles";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 558, itemsToShow: 2 },
];

export function BitcoinOverview() {
  const [width] = useWindowSizeD({ wait: 200 });

  const timeSpan = useSelector((state) => state.universalVariables.timeSpan);

  return (
    <StyledBitcoinOverview>
      <YourOverview>Your overview</YourOverview>
      <ChartContainer>
        {width > 602 ? (
          <>
            <PriceChart timeSpan={timeSpan} />
            <VolumeChart timeSpan={timeSpan} />
          </>
        ) : (
          <CarouselComponent breakPoints={breakPoints}>
            <PriceChart timeSpan={timeSpan} />
            <VolumeChart timeSpan={timeSpan} />
          </CarouselComponent>
        )}
      </ChartContainer>
    </StyledBitcoinOverview>
  );
}

export default BitcoinOverview;
