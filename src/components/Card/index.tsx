import React, { useState, useEffect, createRef} from "react";
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles";
import classNames from "classnames";

interface NewsCardsProps {
  article?: any;
  i: number;
  activeArticle: number;
}

const NewsCard: React.FC<NewsCardsProps> = ({
  article: { description, publishedAt, source, title, url, urlToImage },
  i,
  activeArticle,
}) => {
  const classes = useStyles();
  const [elRefs, setElRefs] = useState([] as any);
  const scrollToRef = (ref: any) => {
    
    window.scroll(0, ref.current.offsetTop - 60)
  };
  useEffect(() => {
    setElRefs((refs: any ) =>
      Array(20)
        .fill(null)
        .map((_, j) => refs[j] || createRef())
    );
  }, []);

  useEffect(() => {
    if(i === activeArticle && elRefs[activeArticle]) {
      console.log(elRefs)
      scrollToRef(elRefs[activeArticle]);
    }
  },[i, activeArticle, elRefs]);

  return (
    <Card
      ref={elRefs[i]}
      className={classNames(
        classes.card,
        activeArticle === i ? classes.activeCard : null
      )}
    >
      <CardActionArea href={url} target="_blank">
        <CardMedia
          className={classes.media}
          image={
            urlToImage ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSES_-JKqi3RVilmzFQgX1g-6ThPngtDSeyBA&usqp=CAU"
          }
        />
        <div className={classes.details}>
          <Typography
            className={classes.title}
            variant="body2"
            color="textSecondary"
            component="h2"
          >
            {new Date(publishedAt).toDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h2">
            {source.name}
          </Typography>
        </div>
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary">
          Learn More
        </Button>
        <Typography variant="h5" color="textSecondary">
          {i + 1}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
