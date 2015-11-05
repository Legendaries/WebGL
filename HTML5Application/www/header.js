function initHeader(){
	document.getElementById('header').innerHTML = "<ul id = 'header_menu'> <li><a href = 'index.html'>Home</a></li> <li> <a href = 'Games.html'> WebGL </a> <ul class = 'dropup'> <li><a href = 'stars/index.html'> Stars </a></li> <li><a href = 'mandelbrot/index.html'> Mandelbrot </a></li> </ul> </li> </ul>";
	sel.style.display='none';
	sel.offsetHeight; // no need to store this anywhere, the reference is enough
	sel.style.display='';
}
function initFooter(){

}