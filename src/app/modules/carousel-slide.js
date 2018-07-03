import OdoDialog from '@odopod/odo-dialog';
import OdoResponsiveImages from '@odopod/odo-responsive-images';

const SETTINGS = {
  ClassName: {
    DIALOG: 'card-carousel__dialog'
  }
};

class Slide {
  constructor(base) {
    this.base = base;

    this.dialogEl = document.querySelector(`.${SETTINGS.ClassName.DIALOG}`);

    this.dialog = new OdoDialog(this.dialogEl, {
      scrollableElement: '.dialog-grid'
    });

    this.dialog.on(OdoDialog.EventType.OPENED, function () {
      OdoResponsiveImages.updateOffsets();
    });
  }
}

export default Slide;
