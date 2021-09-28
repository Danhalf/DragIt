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

         const handleMouseDown = (event) => {
            const target = event.target;
            if (target === draggable) {
               pressed = true;
               target.classList.add("drag-now");
               console.log(target)
               elementOffsetX = x - target.offsetLeft;
               elementOffsetY = y - target.offsetTop;
               target.style.left = `${x - elementOffsetX}px`;
               target.style.top = `${y - elementOffsetY}px`;
            }
         }

         const handleMouseUp = (event) => {
            const target = event.target;
            if (target === draggable) {
               pressed = false;
               target.classList.remove("drag-now");
            }
         }

         const handleMouseMove = (event) => {
            const target = event.target;
            [x, y] = [event.clientX, event.clientY]

            if (pressed && target === draggable) {
               target.style.left = `${x - elementOffsetX}px`;
               target.style.top = `${y - elementOffsetY}px`;
               if (parseInt(target.style.left) < 0) {
                  target.style.left = `0px`;
               }
               if (parseInt(target.style.left) > rightBreak) {
                  target.style.left = `${rightBreak}px`;
               }
               if (parseInt(draggable.style.top) < 0) {
                  target.style.top = `0px`;
               }
               if (parseInt(target.style.top) > bottomBreak) {
                  target.style.top = `${bottomBreak}px`;
               }
            }
         }
         draggable.addEventListener("mousedown", (event) => {
            if (event.target === this.closeElementButtonSelector) {
               return
            }
            handleMouseDown(event)
         });
         parent.addEventListener("mouseup", handleMouseUp);
         parent.addEventListener("mousemove", handleMouseMove);
         parent.addEventListener('mouseleave', handleMouseUp);
      })


   }
}

const draggableElement = new DragIt({ draggableElementSelector: ['.drag-1', '.drag-3'] });

draggableElement.start();





