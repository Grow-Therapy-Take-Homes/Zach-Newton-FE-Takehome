import React from 'react';
import { render, screen } from '@testing-library/react';
import { ArticleList } from '../components';
import SampleData from "./sampleData.json";

const sampleArticles = SampleData.items[0].articles;

describe("ArticleList", () => {
  it("renders 100 items", () => {
    render(<ArticleList pinnedArticles={new Set()} numberResultsPerPage={100} onArticlePin={() => {}} articles={sampleArticles} />)
    const listElements = screen.queryAllByText("Views:");
    expect(listElements.length).toBe(100);
  });
  it("renders 25 items", () => {
    render(<ArticleList pinnedArticles={new Set()} numberResultsPerPage={25} onArticlePin={() => {}} articles={sampleArticles} />)
    const listElements = screen.queryAllByText("Views:");
    expect(listElements.length).toBe(25);
  });
  it("renders pinned articles", () => {
    const pinnedArticle = sampleArticles[0].article;
    render(<ArticleList pinnedArticles={new Set([pinnedArticle])} numberResultsPerPage={25} onArticlePin={() => {}} articles={sampleArticles} />)
    const listElements = screen.getAllByText(pinnedArticle.replace(/_/g, " "));
    expect(listElements.length).toBe(2);
  });
});
