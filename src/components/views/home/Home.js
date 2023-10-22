import React, { useState } from "react";
import { Col, Container, Row, Dropdown } from "react-bootstrap";
import CardProduct from "./cardProduct/CardProduct";
import AboutUs from "./AboutUs/AboutUs";
import Testimonials from "./Testimonials/Testimonial";
import CarouselHome from "./carouselHome/CarouselHome";
import ContactUs from "./ContactUs.js/ContactUs";
import { useSelector } from "react-redux";
import BarsChart from "../../charts/BarsChart";

const Home = () => {
  const { data: products } = useSelector(state => state.app);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4
  const [selectedCategory, setSelectedCategory] = useState("Todas");


  const filteredProducts = selectedCategory === "Todas"
    ? products
    : products.filter(product => product.category === selectedCategory);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProducts.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (event) => {
    event.preventDefault()
    setCurrentPage(Number(event.target.id));
  };

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
        <a href="/" className="page-link" id={number} onClick={handleClick}>
          {number}
        </a>
      </li>
    );
  });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reestablece a la pag 1 cuando cambia de categoria
  };

  return (
    <div>
      <Container className="py-5 ">
        <h1 className="display-4 text-center">Estadisticas <span>de venta</span></h1>
        <div>
        <div className="bg-light mx-auto px-2 border border-1 border-dark" style={{ width: "75%", height: "50%" }}>
          <BarsChart />
        </div>
      </div>
        <hr />
      </Container>
    </div>
  );
};

export default Home;
