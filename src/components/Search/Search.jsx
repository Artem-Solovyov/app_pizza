import React, {useRef, useState} from 'react';
import s from './search.module.scss'
import searchLogo from '../../assets/img/search-512.webp'
import closeLogo from '../../assets/img/closeIcon.png'
import useDebounce from "../../hooks/useDebounce";

const Search = ({searchValue, setSearchValue}) => {
  const [value, setValue] = useState('');
  const debounce = useDebounce(setSearchValue, 300)
  const inputRef = useRef();
  const onChange = (e) => {
    setValue(e.target.value)
    debounce(value)
  }
  const onClickClose = () => {
    setSearchValue('')
    inputRef.current.focus()
  }

  return (
      <div className={s.root}>
        <img className={s.searchLogo} src={searchLogo} alt="Search logo"/>
        <input ref={inputRef} className={s.input} type="text" placeholder={'Пошук піцци...'}
               value={value} onChange={onChange}/>
        {searchValue && <img className={s.closeLogo} src={closeLogo} alt="Close logo"
                             onClick={onClickClose}/>}
      </div>
  );
};

export default Search;