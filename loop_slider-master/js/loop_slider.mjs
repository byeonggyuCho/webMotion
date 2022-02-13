import Animate from './animate.mjs';

const slider = document.querySelector('#slider');
const slider2 = document.querySelector('#slider2');
const prev = slider.querySelector('.prev');
const next = slider.querySelector('.next');
const speed = 500;
let enableClick = true;

init(slider);
init(slider2);

next.addEventListener('click', e=>{
    e.preventDefault();

    if(enableClick){
        enableClick = false;
        nextSlide(slider);
        nextSlide(slider2);
    }    
})

prev.addEventListener('click', e=>{
    e.preventDefault();

    if(enableClick){
        enableClick = false;
        prevSlide(slider);
        prevSlide(slider2);
    }    
})

function init(frame){
    const ul = frame.querySelector('ul');
    const lis = ul.querySelectorAll('li');
    const len = lis.length;
    ul.style.left = '-100%';
    ul.style.width = `${100*len}%`;
    lis.forEach(li=>li.style.width=`${100/len}%`)
    ul.prepend(ul.lastElementChild);
}

function nextSlide(frame){
    const ul = frame.querySelector('ul');
    new Animate(ul,{
        prop: 'left',
        value: '-200%',
        duration: speed,
        callback: ()=>{
            ul.style.left = '-100%';
            ul.append(ul.firstElementChild);
            enableClick = true;
        }
    })
}

function prevSlide(frame){
    const ul = frame.querySelector('ul');
    new Animate(ul, {
        prop: 'left',
        value: '0%',
        duration: speed,
        callback: ()=>{
            ul.style.left = '-100%',
            ul.prepend(ul.lastElementChild);
            enableClick = true;
        }
    })
}