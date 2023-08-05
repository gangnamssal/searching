/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';

export default function SearchResult({ keyword, size, hover, arrowKey }: ISearchResult) {
  return (
    <div key={typeof keyword === 'string' ? null : keyword.sickCd} css={searchRecommendCss.result(hover, arrowKey)}>
      <AiOutlineSearch size={size} />
      <p>{typeof keyword === 'string' ? keyword : keyword.sickNm}</p>
    </div>
  );
}

interface ISearchResult {
  keyword: IApiData | string;
  size: number;
  hover: boolean;
  arrowKey: boolean;
}

const searchRecommendCss = {
  result: (hover: boolean, arrowKey: boolean) =>
    css({
      display: 'flex',
      alignItems: 'center',
      fontSize: '1.05rem',
      fontWeight: '500',
      marginTop: '3%',
      cursor: 'pointer',
      backgroundColor: `${arrowKey ? '#d0e8fd71' : 'white'}`,
      p: {
        margin: '0 1.5%',
      },
      '&:hover': {
        backgroundColor: `${hover ? '#d0e8fd71' : 'white'}`,
      },
    }),
};
