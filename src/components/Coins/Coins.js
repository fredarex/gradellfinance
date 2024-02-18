import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Coin, ErrorDisplay } from "components";
import { useSelector, useDispatch } from "react-redux";
import { getCoinsData } from "store/coinsData/actions";
import topDownArrow from "icons/topDownArrow.svg";
import ArrowDown from "icons/ArrowDown.svg";
import ArrowLeft from "icons/ArrowLeft.svg";
import ArrowRight from "icons/ArrowRight.svg";
import TornadoSort from "icons/TornadoSort.svg";
import {
  SortingContainer,
  CoinsContainer,
  SortControl,
  DisplayCountControl,
  RankingSort,
  SortBy,
  TableHead,
  CoinsBox,
  IndexHeader,
  IdHeader,
  PriceHeader,
  HourHeader,
  DayHeader,
  VolumeHeader,
  CirculatingHeader,
  WeekHeader,
  SparklineHeader,
  TornadoIcon,
  ScrollContainer,
} from "./Coins.styles";

export function Coins() {
  const dispatch = useDispatch();
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortType, setSortType] = useState("volume");

  const currency = useSelector((state) => state.universalVariables.currency);
  const isLoading = useSelector((state) => state.coinsData.isLoading);
  const error = useSelector((state) => state.coinsData.error);
  const hasMore = useSelector((state) => state.coinsData.hasMore);
  const coinsData = useSelector((state) => state.coinsData.data?.coinsData);
  const currentPage = useSelector((state) => state.coinsData.data?.currentPage);

  useEffect(() => {
    if (coinsData.length >= 30) {
      return;
    }
    dispatch(getCoinsData());
  }, [currency]);

  const fetchMoreCoins = () => {
    setTimeout(() => {
      dispatch(getCoinsData());
    }, 500);
  };

  if (error) {
    return <ErrorDisplay errorMessage={error.message} />;
  }

  return (
    <CoinsContainer>
      <CoinsBox>
        <InfiniteScroll
          dataLength={coinsData.length}
          next={fetchMoreCoins}
          hasMore={hasMore}
          loader={<h3>Loading...</h3>}
          scrollThreshold={1.0}
        >
          <ScrollContainer>
            <TableHead>
              <IndexHeader>#</IndexHeader>
              <IdHeader>
                <span>Name</span>
                <TornadoIcon
                  alt="sortname"
                  data-value={"name"}
                  src={TornadoSort}
                />
              </IdHeader>
              <PriceHeader>
                <span>Price</span>
                <TornadoIcon
                  alt="sortprice"
                  data-value={"current_price"}
                  src={TornadoSort}
                />
              </PriceHeader>
              <HourHeader>
                <span>1h</span>
                <TornadoIcon
                  alt="sorthour"
                  data-value={"price_change_percentage_1h_in_currency"}
                  src={TornadoSort}
                />
              </HourHeader>
              <DayHeader>
                <span>24h</span>
                <TornadoIcon
                  alt="sortday"
                  data-value={"price_change_percentage_24h_in_currency"}
                  src={TornadoSort}
                />
              </DayHeader>
              <WeekHeader>
                <span>7d</span>
                <TornadoIcon
                  alt="sortweek"
                  data-value={"price_change_percentage_7d_in_currency"}
                  src={TornadoSort}
                />
              </WeekHeader>
              <VolumeHeader>24h Vol / Market Cap</VolumeHeader>
              <CirculatingHeader>Circulating /Total Sup</CirculatingHeader>
              <SparklineHeader>Last 7d</SparklineHeader>
            </TableHead>
            {coinsData?.map((coinData, index) => (
              <Coin
                key={`${coinData.id} +${Math.random(20)}`}
                coinData={coinData}
                index={index + 1}
                currency={currency}
              />
            ))}
          </ScrollContainer>
        </InfiniteScroll>
      </CoinsBox>
    </CoinsContainer>
  );
}

export default Coins;
