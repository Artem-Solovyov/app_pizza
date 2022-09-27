import React, {useEffect, useRef} from 'react';
import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import Sceleton from "../components/PizzaBlock/Sceleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {selectFilter, setCategoryId, setFilters, setPageCount} from "../redux/filterSlice";
import qs from "qs";
import {useNavigate} from "react-router-dom";
import {fetchPizzas, selectPizza} from "../redux/pizzaSlice";

const Home = () => {

  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const {sort, pageCount, categoryId, searchValue} = useSelector(selectFilter)
  const {items, status} = useSelector(selectPizza)

  const onClickCategoryId = (id) => {
    dispatch(setCategoryId(id))
  }

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
      }))
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

  const onChangePage = (number) => {
    dispatch(setPageCount(number))
  }
  return (
      <div className="container">
        <div className="content__top">
          <Categories categoryId={categoryId} onClickCategoryId={onClickCategoryId}/>
          <Sort/>
        </div>
        <h2 className="content__title">Всі піцци</h2>
        <div className="content__items">
          {status === 'loading'
              ? [...new Array(6)].map((_, index) => <Sceleton key={index}/>)
              : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza}/>)
          }
        </div>
        <Pagination currenPage={pageCount} setCurrentPage={onChangePage}/>

      </div>
  );
};

export default Home;