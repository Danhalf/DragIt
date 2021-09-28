class DragIt {
   constructor({
      closeElementButtonSelector = '.close-drag-it',
      showElementSelector = '.show-drag-it',
      draggableElementSelector = '.drag-it',
   }) {
      this.draggableElementSelector = document.querySelectorAll(
         draggableElementSelector
      );
      this.closeElementButtonSelector = document.querySelectorAll(
         closeElementButtonSelector
      );
      this.showElementSelector = document.querySelectorAll(showElementSelector);
   }


   start() {
      console.log(this.draggableElementSelector)
      let x, y, elementOffsetX, elementOffsetY = 0
      let pressed = false;

      this.draggableElementSelector.forEach((draggable, idx) => {
         const parent = draggable.parentElement;
         const elemWidth = draggable.clientWidth;
         const elemHeight = draggable.clientHeight;
         const parentWidth = draggable.parentElement.offsetWidth;
         const parentHeight = draggable.parentElement.offsetHeight;
         const elemBorder =
            (draggable.offsetWidth -
               draggable.clientWidth) * 2;
         const bottomBreak = parentHeight - elemHeight - elemBorder;
         const rightBreak = parentWidth - elemWidth - elemBorder;

         if (this.closeElementButtonSelector[idx]) {
            draggable.addEventListener("click", (evt) => {
               evt.preventDefault();
               const target = evt.target;
               if (target === this.closeElementButtonSelector[idx]) {
                  draggable.classList.add("hide-content");
                  this.showElementSelector[idx].classList.remove("hide-content");
               }
            });
         }
         if (this.showElementSelector[idx]) {
            this.showElementSelector[idx].addEventListener("click", () => {
               draggable.classList.remove("hide-content");
               this.showElementSelector[idx].classList.add("hide-content");
            });
         }

         const handleMouseDown = () => {

            pressed = true;
            draggable.classList.add("drag-now");
            elementOffsetX = x - draggable.offsetLeft;
            elementOffsetY = y - draggable.offsetTop;
            draggable.style.left = `${x - elementOffsetX}px`;
            draggable.style.top = `${y - elementOffsetY}px`;
         }

         const handleMouseUp = () => {
            pressed = false;
            draggable.classList.remove("drag-now");
         }

         const handleMouseMove = (event) => {
            [x, y] = [event.clientX, event.clientY]

            if (pressed) {
               draggable.style.left = `${x - elementOffsetX}px`;
               draggable.style.top = `${y - elementOffsetY}px`;
               if (parseInt(draggable.style.left) < 0) {
                  draggable.style.left = `0px`;
               }
               if (parseInt(draggable.style.left) > rightBreak) {
                  draggable.style.left = `${rightBreak}px`;
               }
               if (parseInt(draggable.style.top) < 0) {
                  draggable.style.top = `0px`;
               }
               if (parseInt(draggable.style.top) > bottomBreak) {
                  draggable.style.top = `${bottomBreak}px`;
               }
            }
         }
         draggable.addEventListener("mousedown", (event) => {
            if (event.target === this.closeElementButtonSelector) {
               return
            }
            handleMouseDown()
         });
         parent.addEventListener("mouseup", handleMouseUp);
         parent.addEventListener("mousemove", handleMouseMove);
         parent.addEventListener('mouseleave', handleMouseUp);
      })


   }
}

const draggableElement = new DragIt({ draggableElementSelector: ['.drag-1', '.drag-3'] });

draggableElement.start();





