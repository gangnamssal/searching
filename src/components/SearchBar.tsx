/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';

let keyboardInputTime: number;

export default function SearchBar({ setQuery }: IProps) {
  const keyboardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (keyboardInputTime) clearTimeout(keyboardInputTime);

    const inputValue = e.target.value;
    keyboardInputTime = setTimeout(() => {
      if (setQuery) setQuery(() => inputValue);
    }, 400);
  };

  return (
    <>
      <form css={searchBarCss.outer} onSubmit={(e) => e.preventDefault()}>
        <AiOutlineSearch css={searchBarCss.icon} size={20} />
        <input css={searchBarCss.input} type="text" onChange={keyboardInput} />
        <input css={searchBarCss.button} type="submit" value={'검색'} />
      </form>
    </>
  );
}

interface IProps {
  setQuery?: React.Dispatch<React.SetStateAction<string>>;
}

const searchBarCss = {
  outer: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid white',
    borderRadius: '30px',
    width: '40vw',
    minWidth: '500px',
    height: '7vh',
    backgroundColor: 'white',
  }),

  icon: css({
    marginLeft: '5%',
  }),

  input: css({
    width: '27vw',
    minWidth: '370px',
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
    minWidth: '85px',
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
