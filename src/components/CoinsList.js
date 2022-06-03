import React, { useEffect, useState } from "react";

import { CryptoState } from "../CryptoContext";
import {
  Container,
  createTheme,
  Grid,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
} from "@material-ui/core";
import Coin from "./Coin";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";

const CoinsList = () => {
  const [search, setSearch] = useState("");
  const { currency, symbol, coins, loading } = CryptoState();

  const [page, setPage] = useState(1);
  const {fetchCoins} = CryptoState();

  

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const useStyles = makeStyles({
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    },
  });

  const classes = useStyles();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  // console.log(coins);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Typography
          variant="h4"
          style={{ textAlign: "center", margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Container>
          {loading ? (
            <LinearProgress style={{ background: "gold" }} />
          ) : (
            <Grid container spacing={4}>
              {handleSearch()
                .slice((page - 1) * 12, (page - 1) * 12 + 12)
                .map((coin) => (
                  <Grid item key={coin.id} xs={4} md={4} lg={3}>
                    <Coin
                      id={coin.id}
                      key={coin.id}
                      name={coin.name}
                      image={coin.image}
                      symbol={coin.symbol}
                      price={coin.current_price}
                      volume={coin.market_cap}
                      priceChange={coin.price_change_percentage_24h}
                      marketCap={coin.market_cap}
                      rank={coin.market_cap_rank}
                      currencySymbol={symbol}
                    />
                  </Grid>
                ))}
            </Grid>
          )}
        </Container>
        <Pagination
          count={(handleSearch()?.length / 12).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsList;
