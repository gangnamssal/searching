/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import SearchBar from '@components/SearchBar';
import SearchRecommend from '@/components/SearchRecommend';

export default function Home() {
  return (
    <main css={homeCss.container}>
      <title css={homeCss.title}>
        <p>국내 모든 임상시험 검색하고</p>
        <p>온라인으로 참여하기</p>
      </title>

      <section>
        <SearchBar />
      </section>
      <SearchRecommend />
    </main>
  );
}

const homeCss = {
  container: css({
    display: 'grid',
    height: '100vh',
    justifyItems: 'center',
    backgroundColor: '#d0e8fd',
    alignContent: 'center',
    gap: '2%',
  }),

  title: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    p: {
      margin: '0',
      fontSize: '2rem',
      fontWeight: '900',
    },
  }),
};
