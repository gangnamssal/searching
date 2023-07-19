/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';

export default function SearchResult(keyword: IApiData | string, size: number, hover: boolean) {
  return (
    <div key={typeof keyword === 'string' ? null : keyword.sickCd} css={searchRecommendCss.result(hover)}>
      <AiOutlineSearch size={size} />
      <p>{typeof keyword === 'string' ? keyword : keyword.sickNm}</p>
    </div>
  );
}

const searchRecommendCss = {
  result: (hover: boolean) =>
    css({
      display: 'flex',
      alignItems: 'center',
      fontSize: '1.05rem',
      fontWeight: '500',
      marginTop: '3%',
      cursor: 'pointer',
      p: {
        margin: '0 1.5%',
      },
      '&:hover': {
        backgroundColor: `${hover ? '#d0e8fd71' : 'white'}`,
      },
    }),
};
