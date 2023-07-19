/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import SearchResult from '@components/SearchResult';

const blankData = '검색어 없음';

export default function SearchRecommend({ data, query, keyboardMove }: ISearchRecommendProps) {
  return (
    <>
      <div css={searchRecommendCss.container}>
        <div css={searchRecommendCss.contents}>
          <p css={searchRecommendCss.header}>추천 검색어</p>
          {data?.map((keyword: IApiData, index: number) => (
            <SearchResult
              key={keyword.sickCd}
              keyword={keyword}
              size={20}
              hover={true}
              arrowKey={index === keyboardMove - 1 ? true : false}
            />
          ))}
          {data?.length === 0 && query ? (
            <SearchResult keyword={blankData} size={20} hover={false} arrowKey={false} />
          ) : null}
        </div>
      </div>
    </>
  );
}

interface ISearchRecommendProps {
  data?: IApiData[];
  query: string;
  keyboardMove: number;
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
