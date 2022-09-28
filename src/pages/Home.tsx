import React, {useCallback, useEffect, useRef} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import qs from "qs";

import {Categories, Sort, Skeleton, PizzaBlock, Pagination} from '../components'
import {list} from "../components/Sort";
import {setCategoryId, setFilters, setPageCount} from "../redux/filter/slice";
import {FilterStateType} from "../redux/filter/types";
import {selectFilter} from "../redux/filter/selectors";
import {fetchPizzas} from "../redux/pizza/asyncAction";
import {selectPizza} from "../redux/pizza/selectors";
import {useAppDispatch} from "../hooks/hooks";

const Home: React.FC = () => {

  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const {sort, pageCount, categoryId, searchValue} = useSelector(selectFilter)
  const {items, status} = useSelector(selectPizza)

  const onClickCategoryId = useCallback((id: number) => {
    dispatch(setCategoryId(id))
  }, [])

  const getPizzas = async () => {
    dispatch(fetchPizzas({
      categoryId,
      sort,
      searchValue,
      pageCount
    }))

    window.scrollTo(0, 0)
  }

  //Вшиваємо параметри в URL якщо вже був перший render
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sort: sort.sortProperty,
        pageCount,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sort, pageCount, searchValue]);

  //Якщо був перший рендер, то перевіряємо URL params і зберігаємо у store
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = list.find((obj) => obj.sortProperty === params.sort)
      dispatch(setFilters({
        ...params,
        sort
      } as FilterStateType))
      isSearch.current = true
    }
  }, []);

  //Get запит на піцци (initial params | URL params)
  useEffect(() => {
    if (!isSearch.current) {
      getPizzas()
    }
    isSearch.current = false
    window.scrollTo(0, 0)
  }, [categoryId, sort, pageCount, searchValue]);

  const onChangePage = (number: number) => {
    dispatch(setPageCount(number))
  }
  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategoryId={onClickCategoryId}/>
        <Sort value={sort}/>
      </div>
      <h2 className="content__title">Всі піци</h2>
      <div className="content__items">
        {status === 'loading'
          ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
          : items.map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza}/>)
        }
      </div>
      {categoryId === 0 && <Pagination currenPage={pageCount} setCurrentPage={onChangePage}/>}

    </div>
  );
};

export default Home;