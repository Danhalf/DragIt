[1mdiff --git a/dragIt.js b/dragIt.js[m
[1mindex 4f24a06..2b05c4f 100644[m
[1m--- a/dragIt.js[m
[1m+++ b/dragIt.js[m
[36m@@ -48,38 +48,45 @@[m [mclass DragIt {[m
             });[m
          }[m
 [m
[31m-         const handleMouseDown = () => {[m
[31m-[m
[31m-            pressed = true;[m
[31m-            draggable.classList.add("drag-now");[m
[31m-            elementOffsetX = x - draggable.offsetLeft;[m
[31m-            elementOffsetY = y - draggable.offsetTop;[m
[31m-            draggable.style.left = `${x - elementOffsetX}px`;[m
[31m-            draggable.style.top = `${y - elementOffsetY}px`;[m
[32m+[m[32m         const handleMouseDown = (event) => {[m
[32m+[m[32m            const target = event.target;[m
[32m+[m[32m            if (target === draggable) {[m
[32m+[m[32m               pressed = true;[m
[32m+[m[32m               target.classList.add("drag-now");[m
[32m+[m[32m               console.log(target)[m
[32m+[m[32m               elementOffsetX = x - target.offsetLeft;[m
[32m+[m[32m               elementOffsetY = y - target.offsetTop;[m
[32m+[m[32m               target.style.left = `${x - elementOffsetX}px`;[m
[32m+[m[32m               target.style.top = `${y - elementOffsetY}px`;[m
[32m+[m[32m            }[m
          }[m
 [m
[31m-         const handleMouseUp = () => {[m
[31m-            pressed = false;[m
[31m-            draggable.classList.remove("drag-now");[m
[32m+[m[32m         const handleMouseUp = (event) => {[m
[32m+[m[32m            const target = event.target;[m
[32m+[m[32m            if (target === draggable) {[m
[32m+[m[32m               pressed = false;[m
[32m+[m[32m               target.classList.remove("drag-now");[m
[32m+[m[32m            }[m
          }[m
 [m
          const handleMouseMove = (event) => {[m
[32m+[m[32m            const target = event.target;[m
             [x, y] = [event.clientX, event.clientY][m
 [m
[31m-            if (pressed) {[m
[31m-               draggable.style.left = `${x - elementOffsetX}px`;[m
[31m-               draggable.style.top = `${y - elementOffsetY}px`;[m
[31m-               if (parseInt(draggable.style.left) < 0) {[m
[31m-                  draggable.style.left = `0px`;[m
[32m+[m[32m            if (pressed && target === draggable) {[m
[32m+[m[32m               target.style.left = `${x - elementOffsetX}px`;[m
[32m+[m[32m               target.style.top = `${y - elementOffsetY}px`;[m
[32m+[m[32m               if (parseInt(target.style.left) < 0) {[m
[32m+[m[32m                  target.style.left = `0px`;[m
                }[m
[31m-               if (parseInt(draggable.style.left) > rightBreak) {[m
[31m-                  draggable.style.left = `${rightBreak}px`;[m
[32m+[m[32m               if (parseInt(target.style.left) > rightBreak) {[m
[32m+[m[32m                  target.style.left = `${rightBreak}px`;[m
                }[m
                if (parseInt(draggable.style.top) < 0) {[m
[31m-                  draggable.style.top = `0px`;[m
[32m+[m[32m                  target.style.top = `0px`;[m
                }[m
[31m-               if (parseInt(draggable.style.top) > bottomBreak) {[m
[31m-                  draggable.style.top = `${bottomBreak}px`;[m
[32m+[m[32m               if (parseInt(target.style.top) > bottomBreak) {[m
[32m+[m[32m                  target.style.top = `${bottomBreak}px`;[m
                }[m
             }[m
          }[m
[36m@@ -87,7 +94,7 @@[m [mclass DragIt {[m
             if (event.target === this.closeElementButtonSelector) {[m
                return[m
             }[m
[31m-            handleMouseDown()[m
[32m+[m[32m            handleMouseDown(event)[m
          });[m
          parent.addEventListener("mouseup", handleMouseUp);[m
          parent.addEventListener("mousemove", handleMouseMove);[m
[1mdiff --git a/index.html b/index.html[m
[1mindex 3d24587..e08c9c6 100644[m
[1m--- a/index.html[m
[1m+++ b/index.html[m
[36m@@ -14,21 +14,20 @@[m
         <h3 class="inner-text">Click and drag me!</h3>[m
       </div>[m
       <button class="show-window hide-content">Show window</button>[m
[31m-    </div>[m
[31m-    <div class="parrent">[m
[31m-      <div class="drag drag-2">[m
[32m+[m[32m      <div class="drag drag-3">[m
         <button class="close-drag">X</button>[m
[31m-        <h3 class="inner-text">Click and drag me22!</h3>[m
[32m+[m[32m        <h3 class="inner-text">Click and drag me333!</h3>[m
       </div>[m
       <button class="show-window hide-content">Show window</button>[m
     </div>[m
     <div class="parrent">[m
[31m-      <div class="drag drag-3">[m
[32m+[m[32m      <div class="drag drag-2">[m
         <button class="close-drag">X</button>[m
[31m-        <h3 class="inner-text">Click and drag me333!</h3>[m
[32m+[m[32m        <h3 class="inner-text">Click and drag me22!</h3>[m
       </div>[m
       <button class="show-window hide-content">Show window</button>[m
     </div>[m
[32m+[m[32m    <div class="parrent"></div>[m
 [m
     <script src="./dragIt.js"></script>[m
   </body>[m
