/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import SearchResult from '@components/SearchResult';

const blankData = '검색어 없음';

export default function SearchRecommend({ data, query }: ISearchRecommendProps) {
  return (
    <>
      <div css={searchRecommendCss.container}>
        <div css={searchRecommendCss.contents}>
          <p css={searchRecommendCss.header}>추천 검색어</p>
          {data?.map((keyword: IApiData) => SearchResult(keyword, 20, true))}
          {data?.length === 0 && query ? SearchResult(blankData, 20, false) : null}
        </div>
      </div>
    </>
  );
}

interface ISearchRecommendProps {
  data?: IApiData[];
  query: string;
}

const searchRecommendCss = {
  container: css({
    width: '40vw',
    minWidth: '500px',
    height: '350px',
    maxHeight: '350px',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    backgroundColor: 'white',
    borderRadius: '15px',
  }),

  contents: css({
    padding: '4%',
  }),

  header: css({
    margin: '0',
    fontSize: '0.8rem',
  }),
};
