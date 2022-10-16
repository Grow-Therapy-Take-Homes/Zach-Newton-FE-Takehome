import React from "react";
import { ITopWikiArticle } from "../api";
import "./ArticleList.css";

interface IPaginationSelectorProps {
  currentPage: number;
  numberPages: number;
  onPageChange: (page: number) => void;
}
const maxPageNumBeforeAfterCurrent = 3;
const PaginationSelector: React.FunctionComponent<IPaginationSelectorProps> = ({currentPage, numberPages, onPageChange}) => {
  const pageNumbers = React.useMemo(() => 
    new Array(numberPages).fill(0).map((v, i) => i).filter((i) => i >= currentPage - maxPageNumBeforeAfterCurrent && i <= currentPage + maxPageNumBeforeAfterCurrent),
  [numberPages, currentPage]);
  return <ul className="wn-pagination-selector">
    <li><button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 0}>Prev</button></li>
    {pageNumbers[0] > 0 ? <li><span>...</span></li> : null}
  {pageNumbers.map((pageNum) => <li key={pageNum} className={pageNum === currentPage ? "active" : ""}><button onClick={() => onPageChange(pageNum)}>{pageNum + 1}</button></li>)}
    {pageNumbers[pageNumbers.length - 1] < numberPages - 1 ? <li><span>...</span></li> : null}
    <li><button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === numberPages - 1}>Next</button></li>
  </ul>
};

interface IArticleLinkProps {
  article: string;
  pinned: boolean;
  onArticlePin: (article: string) => void;
}
const ArticleLink: React.FunctionComponent<IArticleLinkProps> = ({article, pinned, onArticlePin}) =>
  <span className="wn-article-list-item-title">
    <button className="wn-article-list-item-pin" onClick={() => onArticlePin(article)} title="pin article">
      {pinned ? <span>&#9733;</span> : <span>&#9734;</span>}
    </button>
    <a href={`https://en.wikipedia.org/wiki/${article}`}>{article.replace(/_/g, " ")}</a>
  </span>;

interface IArticleListItemProps {
  article: ITopWikiArticle;
  pinned: boolean;
  onArticlePin: (article: string) => void;
}
const ArticleListItem: React.FunctionComponent<IArticleListItemProps> = ({ article, onArticlePin, pinned }) => {
  return (
    <li className="wn-article-list-item">
      <span className="wn-article-list-item-rank">#{article.rank}</span>
      <span>
        <ArticleLink article={article.article} pinned={pinned} onArticlePin={onArticlePin} />
        <span className="wn-article-list-item-views"><span>Views:</span><span>{article.views}</span></span>
      </span>
    </li>
  );
};

interface IArticleListProps {
  articles: ITopWikiArticle[];
  pinnedArticles: Set<string>;
  numberResultsPerPage: number;
  onArticlePin: (article: string) => void;
}

export const ArticleList: React.FunctionComponent<IArticleListProps> = ({ articles, numberResultsPerPage, onArticlePin, pinnedArticles}) => {
  const [page, setPage] = React.useState(0);
  const currentPage: ITopWikiArticle[] = React.useMemo(
    () => articles.filter((article, i) => i >= page * numberResultsPerPage && i < page * numberResultsPerPage + numberResultsPerPage),
    [numberResultsPerPage, articles, page],
  );
  const handlePageChange = React.useCallback((newPage: number) => {
    setPage(newPage)
  }, [setPage]);
  return <>
    <ul className="wn-pinned-article-list">
      {Array.from(pinnedArticles.values()).map((article) => <li key={article} >
          <ArticleLink article={article} pinned={true} onArticlePin={onArticlePin} />
        </li>)}
    </ul>
    <PaginationSelector currentPage={page} numberPages={Math.ceil(articles.length / numberResultsPerPage)} onPageChange={handlePageChange} />
    <ul className="wn-article-list">
      {currentPage.map((article) => <ArticleListItem key={article.article} article={article} onArticlePin={onArticlePin} pinned={pinnedArticles.has(article.article)} />)}
    </ul>
    <PaginationSelector currentPage={page} numberPages={Math.ceil(articles.length / numberResultsPerPage)} onPageChange={handlePageChange} />
  </>
};
