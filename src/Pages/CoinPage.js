import {
  Container,
  Grid,
  Avatar,
  ThemeProvider,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import axios from "axios";
import millify from "millify";
import moment from "moment";
import HTMLReactParser from "html-react-parser";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/Api";
import { CryptoState } from "../CryptoContext";
import { useStyles, darkTheme } from "./CoinPageStyles";
import {
  MonetizationOnOutlined,
  FlashOnOutlined,
  TrendingUpOutlined,
  MonetizationOnRounded,
  GradeRounded,
  PeopleRounded,
  OpacityRounded,
  QueryBuilderRounded,
  BarChartRounded,
  AutorenewRounded,
} from "@material-ui/icons";
import CoinInfo from "../components/CoinInfo";

const CoinPage = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(false);

  const { currency, symbol } = CryptoState();

  const stats = [
    {
      title: "Price",
      value: `${symbol} ${
        currency === "usd"
          ? coin?.market_data?.current_price?.usd &&
            millify(coin?.market_data?.current_price?.usd)
          : coin?.market_data?.current_price?.inr &&
            millify(coin?.market_data?.current_price?.inr)
      }`,
      icon: <MonetizationOnOutlined />,
    },
    {
      title: "Rank",
      value: coin?.market_cap_rank,
      icon: <TrendingUpOutlined />,
    },
    {
      title: "Total Volume",
      value: `${symbol} ${
        currency === "usd"
          ? coin?.market_data?.total_volume?.usd &&
            millify(coin?.market_data?.total_volume?.usd)
          : coin?.market_data?.total_volume?.inr &&
            millify(coin?.market_data?.total_volume?.inr)
      }`,
      icon: <FlashOnOutlined />,
    },
    {
      title: "Market Cap",
      value: `${symbol} ${
        currency === "usd"
          ? coin?.market_data?.market_cap?.usd &&
            millify(coin?.market_data?.market_cap?.usd)
          : coin?.market_data?.market_cap?.inr &&
            millify(coin?.market_data?.market_cap?.inr)
      }`,
      icon: <MonetizationOnRounded />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `${symbol} ${
        currency === "usd"
          ? coin?.market_data?.high_24h?.usd &&
            millify(coin?.market_data?.high_24h?.usd)
          : coin?.market_data?.high_24h?.inr &&
            millify(coin?.market_data?.high_24h?.inr)
      }`,
      icon: <GradeRounded />,
    },
  ];

  const genericStats = [
    {
      title: "community score",
      value: coin?.community_score,
      icon: <PeopleRounded />,
    },
    {
      title: "liquidity score",
      value: coin?.liquidity_score,
      icon: <OpacityRounded />,
    },
    {
      title: "last updated",
      value: moment(coin?.market_data?.last_updated).startOf("ss").fromNow(),
      icon: <QueryBuilderRounded />,
    },
    {
      title: "Total Supply",
      value:
        coin?.market_data?.total_supply &&
        millify(coin?.market_data?.total_supply),

      icon: <BarChartRounded />,
    },
    {
      title: "Circulating Supply",
      value:
        coin?.market_data?.circulating_supply &&
        millify(coin?.market_data?.circulating_supply),
      icon: <AutorenewRounded />,
    },
  ];

  const fetchCoinDetails = async () => {
    setLoading(true);
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoinDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, currency]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        {loading ? (
          <LinearProgress style={{ background: "gold" }} />
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={12} lg={12}>
              <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                  <Typography variant="h4" className={classes.heading}>
                    <Avatar
                      alt={coin?.name}
                      src={coin?.image?.small}
                      className={classes.small}
                      style={{ margin: "auto" }}
                    />
                    {`${coin?.name} (${coin?.id}-${coin?.symbol}) Price`}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    className={classes.subHeading}
                  >
                    {`${coin?.name} live price in ${currency}. View value statistics, market cap and supply.`}
                  </Typography>
                </div>
              </Container>
            </Grid>
            <Grid item xs={12} md={12} lg={12} className={classes.chart}>
              <CoinInfo coin={coin} />
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <Container>
                <div className={classes.tagline}>
                  <Typography variant="h6" className={classes.heading}>
                    {`${coin?.name} value statistics`}
                  </Typography>
                </div>
                <List>
                  {stats.map((item) => {
                    return (
                      <ListItem key={item.title} className={classes.listItem}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText>{item.title}</ListItemText>
                        <ListSubheader>{item.value}</ListSubheader>
                      </ListItem>
                    );
                  })}
                </List>
              </Container>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <Container>
                <div className={classes.tagline}>
                  <Typography variant="h6" className={classes.heading}>
                    {`Other Stats`}
                  </Typography>
                </div>
                <List>
                  {genericStats.map((item) => {
                    return (
                      <ListItem key={item.title} className={classes.listItem}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText>{item.title}</ListItemText>
                        <ListSubheader>{item.value}</ListSubheader>
                      </ListItem>
                    );
                  })}
                </List>
              </Container>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Container>
                <div className={classes.tagline}>
                  <Typography variant="h6" className={classes.heading}>
                    {`What is ${coin?.name}?`}
                  </Typography>
                </div>
                <p className={classes.info}>
                  {HTMLReactParser(
                    !coin?.description?.en ? "" : coin?.description?.en
                  )}
                </p>
              </Container>
            </Grid>
          </Grid>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default CoinPage;
