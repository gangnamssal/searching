/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';

export default function SearchRecommend() {
  return (
    <>
      <div css={searchRecommendCss.container}>
        <div css={searchRecommendCss.contents}>
          <p css={searchRecommendCss.header}>추천 검색어</p>

          <div css={searchRecommendCss.result}>
            <AiOutlineSearch size={20} />
            <p>dfdfsdfds</p>
          </div>
        </div>
      </div>
    </>
  );
}

const searchRecommendCss = {
  container: css({
    width: '40vw',
    height: 'auto',
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

  result: css({
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.25rem',
    fontWeight: '500',
    marginTop: '3%',
    p: {
      margin: '0 1.5%',
    },
  }),
};
