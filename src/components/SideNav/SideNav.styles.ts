import styled from "styled-components";

export const SNAv = styled.div`
  height: 100%; /* 100% Full-height */
  width: 200px; /* 0 width - change this with JavaScript */
  position: absolute; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
  
  .loading {
    opacity: 0;
    transition: all 0.2s ease-in;
  }
  
  .loaded {
    opacity: 1;
    transition: all 0.2s ease-in;
  }

  a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #2a49ad;
    display: block;
    transition: 0.3s;
  }

  /* When you mouse over the navigation links, change their color */

  a:hover {
    color: #f1f1f1;
  }

  /* Position and style the close button (top right corner) */

  .sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
  }


  /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
  @media screen and (max-height: 450px) { {
    padding-top: 15px;
  }
    a {
      font-size: 18px;
    }
  }

`