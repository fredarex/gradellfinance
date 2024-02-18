import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import { useSelector, useDispatch } from "react-redux";
import { Bar } from "react-chartjs-2";
import { useWindowSize as useWindowSizeD } from "@react-hook/window-size";
import {
  formatOverviewNumber,
  wordedDate,
  getPreviousDates,
  startDate,
  getCurrencySymbol,
} from "utils";
import LoaderComponent from "components/BitcoinOverview/LoaderComponent";
import { getVolumeChartData } from "store/volumeData/action";
import { ErrorDisplay } from "components";
import {
  BarChartContainer,
  CarouselVolumeChart,
  OverviewInfo,
  StyledVolumeChart,
} from "./VolumeChart.styles";

export function VolumeChart(props) {
  const [width, height] = useWindowSizeD({ width: 200 });

  const dispatch = useDispatch();
  const currency = useSelector((state) => state.universalVariables.currency);
  const isBlacked = useSelector((state) => state.universalVariables.isBlacked);

  const currencySymbol = getCurrencySymbol(currency);
  const { timeSpan } = props;
  let span;
  switch (timeSpan) {
    case "1":
      span = 30;
      break;
    case "3":
      span = 90;
      break;
    case "6":
      span = 180;
      break;
    case "12":
      span = 360;
      break;
    default:
      span = 7;
      break;
  }

  const error = useSelector((state) => state.volumeData.error);
  const isLoading = useSelector((state) => state.volumeData.isLoading);

  const volumeDatapoints = useSelector(
    (state) => state.volumeData.data?.volumeDatapoints
  );
  const todaysVolume = useSelector(
    (state) => state.volumeData.data?.todaysVolume
  );

  useEffect(() => {
    dispatch(getVolumeChartData(span));
  }, [currency, props.timeSpan]);

  const barChart = (
    <Bar
      data={{
        labels: getPreviousDates(startDate(), props.timeSpan),
        datasets: [
          {
            data: volumeDatapoints,
            borderColor: isBlacked ? "#2172E5" : "#1AD761",
            backgroundColor: isBlacked ? "#2172E5" : "#1AD761",
            borderRadius: 2,
          },
        ],
      }}
      options={{
        scales: {
          y: {
            display: false,
            grid: {
              display: false,
            },
            ticks: {
              callback: function (value, index, ticks) {
                return value;
              },
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              callback: function (val, index) {
                const day = this.getLabelForValue(val).split("-")[1];
                return day;
              },
              font: {
                size: 6,
              },
              maxRotation: 0,
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: function (context) {
                return `Price: ${currencySymbol}${context[0].formattedValue}`;
              },
              label: function (context) {
                return `date: ${context.label}`;
              },
            },
          },
          legend: { display: false },
        },
      }}
    />
  );

  if (error) {
    return (
      <StyledVolumeChart>
        <ErrorDisplay errorMessage={error.message} />
      </StyledVolumeChart>
    );
  }

  return (
    <>
      {width > 602 ? (
        <StyledVolumeChart>
          {isLoading && <LoaderComponent />}
          <OverviewInfo>
            <p>Volume 24h</p>
            <div>
              {currencySymbol}
              {formatOverviewNumber(todaysVolume)}
            </div>
            <p>{wordedDate(new Date())}</p>
          </OverviewInfo>
          <BarChartContainer>{barChart}</BarChartContainer>
        </StyledVolumeChart>
      ) : (
        <CarouselVolumeChart>
          {isLoading && <LoaderComponent />}
          <OverviewInfo>
            <p>Volume 24h</p>
            <div>
              {currencySymbol}
              {formatOverviewNumber(todaysVolume)}
            </div>
            <p>{wordedDate(new Date())}</p>
          </OverviewInfo>
          <BarChartContainer>{barChart}</BarChartContainer>
        </CarouselVolumeChart>
      )}
    </>
  );
}

export default VolumeChart;
