import OdoCarousel from '@odopod/odo-carousel';
import Slide from './carousel-slide';

const SETTINGS = {
  ClassName: {
    BASE: 'card-carousel',
    SLIDE: 'card-carousel__slide'
  }
};

class CardCarousel {
  constructor(base) {
    this.base = base;

    this.carousel = new OdoCarousel(base);

    this.slideEls = this.base.querySelectorAll(`.${SETTINGS.ClassName.SLIDE}`);

    this.slides = Array.from(this.slideEls).map(el => new Slide(el));
  }

  static initializeAll() {
    const modules = document.querySelectorAll(`.${SETTINGS.ClassName.BASE}`);
    return Array.from(modules).map(el => new CardCarousel(el));
  }
}

export default CardCarousel;
