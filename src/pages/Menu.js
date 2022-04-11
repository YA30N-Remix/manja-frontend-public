import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getMenuPage } from "../store/actions";
import Loading from "../components/loading";
import Hero from "../components/hero";
import Banner from "../components/banner";
import Title from "../components/title";
import FoodItem from "../components/food-item";
import IngredientModal from "../components/ingredient-modal";

const Menu = ({ isLoading, menu, getMenuPage, match, selectedLanguage }) => {
  React.useEffect(() => {
    getMenuPage(match.params.restaurantSlug, match.params.menuSlug);
  }, [getMenuPage, match.params.restaurantSlug, match.params.menuSlug]);

  var letterSpacing = "";
  if (selectedLanguage.letterSpacing) {
    letterSpacing = "letter-spacing";
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Hero img={menu.coverPhoto}>
            <Banner title={menu.title} subtitle={menu.welcomeText}></Banner>
          </Hero>

          <section className="py-5">
            <div className="container-fluid">
              {menu.subMenus.map((item) => (
                <React.Fragment key={item.subMenuId}>
                  <Title title={item.title} />
                  <div className="row">
                    <div className="col-md-10 mx-auto">
                      {item.foods.map((foodItem) => (
                        <FoodItem
                          key={foodItem.foodId}
                          food={foodItem}
                          restaurantSlug={match.params.restaurantSlug}
                        ></FoodItem>
                      ))}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </section>

          <IngredientModal></IngredientModal>
        </>
      )}
    </>
  );
};

const mapStateToProps = ({
  menu: { isLoading, menu },
  language: { selectedLanguage },
}) => {
  return {
    isLoading,
    menu,
    selectedLanguage,
  };
};

export default connect(mapStateToProps, {
  getMenuPage,
})(Menu);
