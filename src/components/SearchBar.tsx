/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';

let keyboardInputTime: number;

export default function SearchBar({ data, setQuery, setKeyboardMove }: IProps) {
  const keyboardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    if (keyboardInputTime) clearTimeout(keyboardInputTime);
    keyboardInputTime = setTimeout(() => {
      if (setQuery) setQuery(() => inputValue);
    }, 400);
  };

  const plus = (num: number) => {
    return data && num >= data?.length - 1 ? (num = data.length) : ++num;
  };

  const minus = (num: number) => {
    return num < 1 ? (num = 0) : --num;
  };

  const handleKeyboardMove = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const code = e.code;

    switch (code) {
      case KeyCode.ArrowDown:
        if (setKeyboardMove) setKeyboardMove(plus);
        break;
      case KeyCode.ArrowUp:
        if (setKeyboardMove) setKeyboardMove(minus);
        break;
    }
  };

  return (
    <>
      <form css={searchBarCss.outer} onSubmit={(e) => e.preventDefault()}>
        <AiOutlineSearch css={searchBarCss.icon} size={20} />
        <input css={searchBarCss.input} type="text" onChange={keyboardInput} onKeyUp={handleKeyboardMove} />
        <input css={searchBarCss.button} type="submit" value={'검색'} />
      </form>
    </>
  );
}

interface IProps {
  data?: IApiData[];
  setQuery?: React.Dispatch<React.SetStateAction<string>>;
  setKeyboardMove?: React.Dispatch<React.SetStateAction<number>>;
}

enum KeyCode {
  ArrowDown = 'ArrowDown',
  ArrowUp = 'ArrowUp',
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
