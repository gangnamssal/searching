/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';

export default function SearchBar() {
  return (
    <>
      <form css={searchBarCss.outer} onSubmit={(e) => e.preventDefault()}>
        <AiOutlineSearch css={searchBarCss.icon} size={20} />
        <input css={searchBarCss.input} type="text" />
        <input css={searchBarCss.button} type="submit" value={'검색'} />
      </form>
    </>
  );
}

const searchBarCss = {
  outer: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid white',
    borderRadius: '30px',
    width: '40vw',
    height: '7vh',
    backgroundColor: 'white',
  }),

  icon: css({
    marginLeft: '5%',
  }),

  input: css({
    width: '27vw',
    height: '5vh',
    border: 'none',
    '&:focus': {
      outline: 'none',
    },
    fontSize: '1rem',
    fontWeight: '600',
  }),

  button: css({
    width: '7vw',
    height: '7vh',
    border: '1px solid #357ae1',
    borderRadius: '0 30px 30px 0',
    backgroundColor: '#357ae1',
    color: 'white',
    fontWeight: '600',
    fontSize: '0.8rem',
    cursor: 'pointer',
  }),
};
