import React from 'react';
import Logo from "./logo.png";
import './App.css';
import { ArticleList, FilterBar } from './components';
import { getTopWikipediaArticlesForDay, ITopWikiArticle } from './api';

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const App: React.FunctionComponent = () => {
  const [date, setDate] = React.useState<number>(yesterday.getTime());
  const [numResults, setNumResults] = React.useState(100);
  const [topWikiArticles, setTopWikiArticles] = React.useState<ITopWikiArticle[]>([]);
  const [error, setError] = React.useState<Error | undefined>();

  const handleDateChange = React.useCallback((newDate: Date) => {
    setDate(newDate.getTime());
  }, []);

  const handleNumberResultsChange = React.useCallback((newNumResults: number) => {
    setNumResults(newNumResults);
  }, []);

  React.useEffect(() => {
    const day = new Date(date);
    getTopWikipediaArticlesForDay(day)
      .then((articles) => {
        setTopWikiArticles(articles);
        setError(undefined);
      })
      .catch((e) => {
        setTopWikiArticles([]);
        setError(e);
      });
  }, [date]);

  return (
    <div className="wn">
      <header className="wn-header">
        {/* Logo from www.wikipedia.org */}
        <img className="wn-header-logo" src={Logo} alt="wikipedia logo" />
        <a href="/" className="wn-header-title">WikiNews</a>
        <span className="wn-header-spacer">
        </span>
        <span className="wn-header-description">Your source for any day's top Wikipedia articles!</span>
      </header>
      <main className="wn-app">
        <FilterBar date={date} onDateChange={handleDateChange} numberResults={numResults} onNumberResultsChange={handleNumberResultsChange} />
        {error ? <div className="wn-error"><pre>{error.toString() ?? error.message ?? JSON.stringify(error, undefined, 2)}</pre></div> : null}
        <ArticleList numberResultsPerPage={numResults} articles={topWikiArticles} />
      </main>
      <footer className="wn-footer">
        <a className="wn-footer-link" href="https://github.com/znewton/wikinews">
          {/* Icon from https://icons.getbootstrap.com/icons/github/ */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="github-icon" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          <span>View on Github</span>
        </a>
        <span className="wn-footer-text">Built with &hearts; by Zach Newton for Grow Therapy take home assessment.</span>
      </footer>
    </div>
  );
}

export default App;
