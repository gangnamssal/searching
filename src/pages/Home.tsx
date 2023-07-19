/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';

import useSearch from '@hooks/useSearch';
import SearchBar from '@components/SearchBar';
import SearchRecommend from '@components/SearchRecommend';

export default function Home() {
  const [keyboardMove, setKeyboardMove] = useState<number>(-1);

  console.log(keyboardMove);

  const {
    data: { data },
    query,
    setQuery,
  } = useSearch('/sick', { expired: 10000 });

  useEffect(() => {
    setKeyboardMove(-1);
  }, [data]);

  return (
    <main css={homeCss.container}>
      <title css={homeCss.title}>
        <p>국내 모든 임상시험 검색하고</p>
        <p>온라인으로 참여하기</p>
      </title>

      <section>
        <SearchBar data={data} setQuery={setQuery} setKeyboardMove={setKeyboardMove} />
      </section>

      <section>
        {data.length || query ? (
          <SearchRecommend data={data} query={query} keyboardMove={keyboardMove} />
        ) : (
          <div css={{ height: '350px' }}></div>
        )}
      </section>
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
