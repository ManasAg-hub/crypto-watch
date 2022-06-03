import React from "react";
import millify from "millify";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";

const Coin = ({
  image,
  name,
  symbol,
  price,
  priceChange,
  marketCap,
  id,
  rank,
  currencySymbol,
}) => {
  const history = useHistory();
  const { user, watchlist, setAlert } = CryptoState();

  const inWatchlist = watchlist.includes(id);

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, id] : [id] },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${name} Added to the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${name} Removed from the Watchlist!`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <Card>
      <CardActionArea>
        <CardHeader
          avatar={
            <img
              src={image}
              alt={name}
              height="45"
              style={{ marginBottom: 10 }}
            />
          }
          title={`${rank}. ${name}`}
          subheader={`${symbol}`}
          style={{ paddingBottom: 4 }}
        />
      </CardActionArea>
      <CardContent style={{ paddingTop: 4, paddingBottom: 3 }}>
        {/* <Typography variant="body2" color="textSecondary" component="p">
          Rank: {rank}
        </Typography> */}
        <Typography variant="body2" color="textSecondary" component="p">
          Price: {currencySymbol}
          {millify(price)}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          MarketCap: {millify(marketCap)}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          DailyChange:{" "}
          <span
            style={{
              color: priceChange > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {millify(priceChange)}%
          </span>
        </Typography>
      </CardContent>
      <CardActions>
        <Tooltip title="more info">
          <IconButton
            aria-label="more-info"
            size="small"
            onClick={() => history.push(`/coins/${id}`)}
          >
            <InfoIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
        {user && (
          <Tooltip
            title={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
          >
            <IconButton
              aria-label="delete"
              size="small"
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? (
                <RemoveCircleIcon fontSize="inherit" />
              ) : (
                <AddCircleIcon fontSize="inherit" />
              )}
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
};

export default Coin;
