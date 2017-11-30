

gimp_sounds = [
  new Audio('/audios/gimperSound2.wav'),
  new Audio('/audios/gimperSound3.wav'),
  new Audio('/audios/gimperSound4.wav'),
  new Audio('/audios/gimperSound5.wav'),

];

gimps_selected = [];

function link_to_arrange(gimp_list) {
  if (gimp_list.length > 0) {
    let element_list = [];
    for (let i=0; i<gimp_list.length; i++) {
      element_list.push(`gimps[]=${gimp_list[i]}`);
    }
    const element_str = element_list.join('&');
    window.location.href = `/arrange?${element_str}`;
  } else {
    alert('pick flowers to continue');
  }
}

/*
function recreate_arrange_link(gimp_list) {
  if (gimp_list) {
    let element_list = [];
    for (let i=0; i<gimp_list.length; i++) {
      element_list.push(`gimps[]=${gimp_list[i]}`);
    }
    const element_str = element_list.join('&');
    const arrange_link = document.getElementById('arrange_link');
    arrange_link.href = `/arrange?${element_str}`;
    arrange_link.onclick = null;
  } else {
    addEventListener(arrange_link, 'onclick', function() {
      alert('gimpy GIMP GIIIIIIIIMP');
    });
  }
}
*/
function gimp_on_up(gimp_num) {
    const lil_g = document.getElementById('lil_gimper_' + gimp_num);
    const gimp_sound = gimp_sounds[Math.floor(Math.random()*gimp_sounds.length)];
    if (!gimps_selected.includes(gimp_num)) {
      lil_g.classList.add('chosen');
      gimp_sound.pause();
      gimp_sound.currentTime = 0;
      gimp_sound.play();
      gimps_selected.push(gimp_num);
    } else {
      lil_g.classList.remove('chosen');
      gimp_sound.pause();
      gimp_sound.currentTime = 0;
      index = gimps_selected.indexOf(gimp_num);
      gimps_selected.splice(index, 1);
    }
    //recreate_arrange_link(gimps_selected);
}
//function dragstart_handler(ev) {

//}

//function gimp_drag(ev) {
  //ev.preventDefault();
  //lil_g = document.getElementById('lil_gimper_drag');
  // alert(`clientX: ${ev.clientX}, clientY: ${ev.clientY}`);
  //lil_g.style.left = `${ev.screenX}px`;
  //lil_g.style.top = `${ev.screenY}px`;
//}


function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    //document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  //} else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    //elmnt.onmousedown = dragMouseDown;
  //}


  function elementDrag(e) {
    e.preventDefault();
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - parseInt(e.clientX);
    pos2 = pos4 - parseInt(e.clientY);
    pos3 = parseInt(e.clientX);
    pos4 = parseInt(e.clientY);
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function dragMouseDown(e) {
    e.preventDefault();
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = parseInt(e.clientX);
    pos4 = parseInt(e.clientY);
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  elmnt.onmousedown = dragMouseDown;
}

function generate_img() {
  const element = document.getElementById('arrangement_canvas');
  const gimpers = element.getElementsByClassName('arrangeable_gimper');
  const elCanvasso = document.createElement('canvas');
  elCanvasso.width = element.clientWidth;
  elCanvasso.height = element.clientHeight;
  const ctx = elCanvasso.getContext('2d');
  for (let i=0; i<gimpers.length; i++) {
    const gimpdiv = gimpers[i];
    const gimpsvg = gimpdiv.getElementsByTagName("img")[0];
    const x = parseInt(gimpdiv.style.left);
    const y = parseInt(gimpdiv.style.top);
    ctx.drawImage(gimpsvg, x, y);
  }
  const flower_img = elCanvasso.toDataURL("image/png");
  return flower_img;
  // temp code
  //var w=window.open('about:blank','image from canvas');
  //w.document.write("<img src='"+flower_img+"' alt='from canvas'/>");
  // end temp code
}

function submitFlowerForm () {
  let form = document.getElementById('form');
  let image = generate_img();
  let input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'allflowers';
  input.value= image;
  form.appendChild(input);
  return true;
}
