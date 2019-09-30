
function Carousel(containerID) {
	this.container = document.getElementById(containerID) || document.body;
	this.slides = this.container.querySelectorAll('.carousel');
	this.total = this.slides.length - 1;
	this.current = 0;

	this.slide(this.current)
}

Carousel.prototype.next = function(interval) {
	(this.current === this.total) ? this.current = 0 : this.current += 1;

	this.stop();
	this.slide(this.current);

	if(typeof interval === 'number' && (interval % 1) === 0) {
		var context = this;
		this.run = setTimeout(function() {
			context.next(interval);
		}, interval);
	}
};

Carousel.prototype.prev = function(interval) {
	(this.current === 0) ? this.current = this.total : this.current -= 1;

	this.stop();
	this.slide(this.current);

	if(typeof interval === 'number' && (interval % 1) === 0) {
		var context = this;
		this.run = setTimeout(function() {
			context.prev(interval);
		}, interval);
	}
};

Carousel.prototype.stop = function() {
	clearTimeout(this.run);
};

Carousel.prototype.slide = function(index) {
	if( index >= 0 && index <= this.total) {
		this.stop();
		for ( let i = 0; i <= this.total; i++) {
			if ( i === index ) {
				this.slides[i].style.display ="inline-block";
			} else {
				this.slides[i].style.display = 'none';
			}
		}
	} else {
		alert("Index " + index + " doesn't exist. Availiable : 0 -" + this.total);
	}
};