import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards";
import UseStyles from "./styles";
import wordsToNumbers from "words-to-numbers";

const alanKey =
  "8f2199fcfd9ac34a6314c7e79e2205f32e956eca572e1d8b807a3e2338fdd0dc/stage";
const App = () => {
  const [newsArticles, SetNewsArticles] = useState([] as any);
  const [activeArticle, setActiveArticle] = useState(-1);
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({
        command,
        articles,
        number,
      }: {
        command: any;
        articles: any;
        number: any;
      }) => {
        if (command === "newHeadLines") {
          SetNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((prevArticle) => prevArticle + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];
          if (parsedNumber > 20) {
            alanBtn().playText("Please try that again");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening...")
          }
        }
      },
    });
  }, []);
  const classes = UseStyles();
  return (
    <div>
      <div className={classes.logoContainer}>
        <img
          src="https://alan.app/voice/images/previews/preview.jpg"
          alt="Logo"
          className={classes.alanLogo}
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
};

export default App;
