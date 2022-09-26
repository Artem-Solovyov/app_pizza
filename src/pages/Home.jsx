import React, {useEffect, useRef, useState} from 'react';
import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import Sceleton from "../components/PizzaBlock/Sceleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setFilters, setPageCount} from "../redux/filterSlice";
import axios from "axios";
import qs from "qs";
import {useNavigate} from "react-router-dom";

const Home = ({searchValue}) => {
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {sort, pageCount} = useSelector(state => state.filter)
  const categoryId = useSelector(state => state.filter.categoryId)

  const onClickCategoryId = (id) => {
    dispatch(setCategoryId(id))
  }

  const fetchPizzas = () => {
    setIsLoading(true)
    axios.get(`https://632b1dd01090510116d1c169.mockapi.io/items?search=${searchValue}&page=${pageCount}&limit=8&${
        categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${
        sort.sortProperty.includes('-') ? sort.sortProperty.substring(1) : sort.sortProperty}&order=${
        sort.sortProperty.includes('-') ? 'asc' : 'desc'} `)
        .then((response) => {
          setItems(response.data)
          setIsLoading(false)
        })
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
      fetchPizzas()
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
          {isLoading
              ? [...new Array(6)].map((_, index) => <Sceleton key={index}/>)
              : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza}/>)
          }
        </div>
        {items.length >= 8 && <Pagination currenPage={pageCount} setCurrentPage={onChangePage}/>}

      </div>
  );
};

export default Home;