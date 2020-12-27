<template>
  <div>
    <div class="header container">
      <div class="header__left">
          <a class="header__logo" href="index.html">
              <img src="@/assets/img/logo.png" alt="logo">bran <span>d</span>
          </a>
          <form class="header__search">
              <a href="#" class="header__browse">Browse <i class="fas fa-caret-down"></i></a>
                  <input type="text" placeholder="Search for item">
                  <button class="header__search-button"><i class="fas fa-search"></i></button>
          </form>
      </div>
      <div class="header__right">
          <a 
              href="#" 
              class="header__cart" 
              id="toggle-basket" 
              @click="showBasket = !showBasket"
          >
              <div id="cart-badge" class="header__cart-badge">0</div>
              <img src="@/assets/img/cart.png" alt="card" class="header__cart-img">
          </a>
          <div class="drop-cart" v-show="showBasket">
                <Basket ref="bask"/>
              <div class="drop-cart__total">
                  <span class="drop-cart__total-name">TOTAL</span>
                  <span id="basket-total" class="drop-cart__total-sum">$500.00</span>
              </div>
              <a id="checkout-button" onclick="return false" href="checkout.html" class="drop-cart__button">Checkout</a>
              <a id="go-cart" href="shopping-cart.html" class="drop-cart__button">Go to cart</a>
          </div>

          <a href="#" class="button">My Account<i class="fas fa-caret-down"></i></a>
          <a href="#" class="icon-user"><i class="fas fa-user-alt"></i></a>
      </div>
  </div>
  <div class="header_line"></div>
  <div class="topNav">
      <a href="product.html">Home</a>
      <a href="product.html">Man</a>
      <a href="product.html">Women</a>
      <a href="product.html">Kids</a>
      <a href="product.html">Accessories</a>
      <a href="product.html">Featured</a>
      <a href="product.html">Hot Deals </a>
  </div>
  <div class="image-frame">
      <div class="container second-block">
          <div class="forBorder">
              <div class="theBrand">The Brand</div>
              <div class="ofLuxerious">of luxerious <span>fashion</span></div>
          </div>
      </div>
  </div>
  <!--div class="container hot-offers">
    <div class="hot-offers__left">
          <a class="hot-offers__square">
              <img src="@/assets/img/Layer 30.jpg" alt="">
              <div class="hot-offers__text">
                  <div class="hot-offers__upper-text">
                      hot deal
                  </div>
                  <div class="hot-offers__under-text">
                      for men
                  </div>
              </div>
          </a>
          <a class="hot-offers__square">
              <img src="@/assets/img/Layer 37.jpg" alt="">
              <div class="hot-offers__text">
                  <div class="hot-offers__upper-text">
                      luxirous &amp; trendy
                  </div>
                  <div class="hot-offers__under-text">
                      accesories
                  </div>
              </div>
          </a>
      </div>
      <div class="hot-offers__right">
          <a class="hot-offers__square">
              <img src="@/assets/img/Layer 32.jpg" alt="">
              <div class="hot-offers__text">
                  <div class="hot-offers__upper-text">
                      30% offer
                  </div>
                  <div class="hot-offers__under-text">
                      women
                  </div>
              </div>
          </a>
          <a class="hot-offers__square">
              <img src="@/assets/img/Layer 31.jpg" alt="">
              <div class="hot-offers__text">
                  <div class="hot-offers__upper-text">
                      new arrivals
                  </div>
                  <div class="hot-offers__under-text">
                      for kids
                  </div>
              </div>
          </a>
      </div>
  </div-->
  <div class="container featured-items">
      <div class="featured-items__title">
          <h2>Featured Items</h2>
          <h4>Shop for items based on what we featured in this week</h4>
      </div>

      <Catalog />
      
  </div>  <!-- End of div.featured-items-->
  <div class="container offer-women">
  <div class="offer-women__dicount">
      <h2>30% <span>offer</span></h2>
      <h3>for women</h3>
  </div>
      <div class="offer-women__bonus">
          <div class="offer-women__pic"><img src="@/assets/img/car.png" alt=""></div>
          <div class="offer-women__text">
              <h3>Free Delivery</h3>
              <p>Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.</p>
          </div>
      </div>
      <div class="offer-women__bonus">
          <div class="offer-women__pic"><img src="@/assets/img/proc.png" alt=""></div>
          <div class="offer-women__text">
              <h3>Sales &amp; discounts</h3>
              <p>Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.</p>
          </div>
      </div>
      <div class="offer-women__bonus">
          <div class="offer-women__pic"><img src="@/assets/img/corona.png" alt=""></div>
          <div class="offer-women__text">
              <h3>Quality assurance</h3>
              <p>Worldwide delivery on all. Authorit tively morph next-generation innov tion with extensive models.</p>
          </div>
      </div>
  </div><!-- End of .offer-women -->
  <div class="subscibe"><div class="subscibe-shadow">
  <div class="container subscibe_wrapper">
      <div class="subscribe-left">
          <img src="@/assets/img/subsribe-face.png" alt="face">
          <div>
          <p>“Vestibulum quis porttitor dui! Quisque viverra nunc mi, 
  a pulvinar purus condimentum a. Aliquam condimentum mattis neque sed pretium”</p>
          <h4>Bin Burhan</h4>
          <p>Dhaka, Bd</p>
          <div class="subscribe-pagination">
              <a href="#"></a>
              <a href="#"></a>
              <a href="#"></a>
          </div>
          </div>
      </div>
      <div class="subscribe-border"></div>
      <div class="subscribe-right">
          <h3>subscribe</h3>
          <h4>for our newletter and promotion</h4>
          <form action="">
              <input type="text" placeholder="Enter your Email">
              <button>Subscribe</button>
          </form>
      </div>
  </div> <!-- End of .subscibe_wrapper -->
  </div></div> <!-- End of .subscibe -->
  <div class="container footer-menu">
      <div class="footer-menu__left">
          <a class="header__logo" href="index.html">
              <img src="@/assets/img/logo.png" alt="logo">bran <span>d</span>
          </a>
          <p>
              Objectively transition extensive data rather than cross functional solutions. Monotonectally syndicate multidisciplinary materials before go forward benefits. Intrinsicly syndicate an expanded array of processes and cross-unit partnerships.
          </p>
          <p>
              Efficiently plagiarize 24/365 action items and focused infomediaries. Distinctively seize superior initiatives for wireless technologies. Dynamically optimize.
          </p>

      </div>
      <div class="footer-menu__right">
          <div class="footer-menu__right-item">
              <h3>company</h3>
              <a href="#">Home</a>
              <a href="#">Shop</a>
              <a href="#">About</a>
              <a href="#">How It Works</a>
              <a href="#">Contact</a>
          </div>
          <div class="footer-menu__right-item">
              <h3>information</h3>
              <a href="#">Terms and Conditions</a>
              <a href="#">Privacy Polocy</a>
              <a href="#">How to Buy</a>
              <a href="#">How to Sell</a>
              <a href="#">Promotion</a>
          </div>
          <div class="footer-menu__right-item">
              <h3>shop category</h3>
              <a href="#">Men</a>
              <a href="#">Women</a>
              <a href="#">Child</a>
              <a href="#">Apparel</a>
              <a href="#">Browse All</a>
          </div>
      </div>  <!-- End of footer-menu__right -->
  </div> <!-- End of footer-menu -->
  <div class="footer">
      <div class="container footer_center">
          <div>
              &copy; 2017  Brand  All Rights Reserved.
          </div>
          <div>
              <a href="#" class="footer__social"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="footer__social"><i class="fab fa-twitter"></i></a>
              <a href="#" class="footer__social"><i class="fab fa-linkedin-in"></i></a>
              <a href="#" class="footer__social"><i class="fab fa-pinterest-p"></i></a>
              <a href="#" class="footer__social"><i class="fab fa-google-plus-g"></i></a>
          </div>
      </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import Catalog from '@/components/Catalog.vue';
import Basket from '@/components/Basket.vue';

export default {
    name: 'Home',
    components: { Catalog, Basket },
    data() {
        return {
            showBasket: false
        }
    },
    methods: {
        get(url) {
            return fetch(url)
                .then(data => data.json())
        },
    },
    mounted() {
        console.log(this);
    }
}
</script>
