function get_coords(str) { //getting coordinates from the string
	var ind = str.indexOf(",");
	var x = str.substring(1, ind);
	var y = str.substring(ind + 2, str.length - 1);
	return [x, y];
}

function build_paral(x3, y3) { //building the parallelogram and the yellow circle
	var coords1 = get_coords(document.getElementById("first_point").value);
	var coords2 = get_coords(document.getElementById("second_point").value);
	var x1 = parseFloat(coords1[0]), y1 = parseFloat(coords1[1]);
	var x2 = parseFloat(coords2[0]), y2 = parseFloat(coords2[1]);

	var a = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	var b = Math.sqrt(Math.pow(x2 - x3, 2) + Math.pow(y2 - y3, 2));
	var c = Math.sqrt(Math.pow(x1 - x3, 2) + Math.pow(y1 - y3, 2));
	var p = 0.5 * (a + b + c);
	var parallel_area = 2 * Math.sqrt(p * (p - a) * (p - b) * (p - c)); //calculating the parallelogram area
	document.getElementById("parallel_area").value = parallel_area;

	var x0 = (x1 + x3) / 2;
	var y0 = (y1 + y3) / 2; //calculating the coordinates of the center of the parallelogram
	var x4 = 2 * x0 - x2;
	var y4 = 2 * y0 - y2; //calculating the coordinates of the fourth point of the parallelogram

	var R = Math.sqrt(parallel_area / Math.PI); //calculating the radius of the circle
	var div1 = document.createElement('div');
	div1.className = "yellow_circle";
	div1.id = "yell";
	div1.style.top = (y0 - R) + "px";
	div1.style.left = (x0 - R) + "px";
	div1.style.width = div1.style.height = 2 * R - 2 + "px";
	document.body.append(div1); //adding the circle to HTML

	var alpha = Math.asin((y3 - y2) / b);
	var beta = Math.asin((y1 - y2) / a); //calculating the angles to skew the parallelogram sides
	
	var line1 = document.createElement('hr');
	var line2 = document.createElement('hr');
	line1.id = "line1";
	line2.id = "line2";
	line1.style.top = ((y1 + y2) / 2 - 8.5)+ "px";
	line2.style.top = ((y4 + y3) / 2 - 8.5)+ "px";
	line2.style.width = line1.style.width = Math.abs(x2 - x1) - 2 + "px";
	if (x2 < x1) {
		line2.style.webkitTransform = line1.style.webkitTransform = "skewY(" + beta + "rad)";
		line1.style.left = x2 + "px";
		line2.style.left = x3 + "px";
	} else {
		line2.style.webkitTransform = line1.style.webkitTransform = "skewY(" + ((-1) * beta) + "rad)";
		line1.style.left = x1 + "px";
		line2.style.left = x4 + "px";
	}
	document.body.append(line1);
	document.body.append(line2); //adding two parallelogram sides to HTML

	var line3 = document.createElement('hr');
	var line4 = document.createElement('hr');
	line3.id = "line3";
	line4.id = "line4";
	line3.style.top = ((y3 + y2) / 2 - 8.5)+ "px";
	line4.style.top = ((y1 + y4) / 2 - 8.5)+ "px";
	line4.style.width = line3.style.width = Math.abs(x3 - x2) - 2 + "px";
	if (x2 < x3) {
		line4.style.webkitTransform = line3.style.webkitTransform = "skewY(" + alpha + "rad)";
		line3.style.left = x2 + "px";
		line4.style.left = x1 + "px";
	} else {
		line4.style.webkitTransform = line3.style.webkitTransform = "skewY(" + ( (-1) * alpha) + "rad)";
		line3.style.left = x3 + "px";
		line4.style.left = x4 + "px";
	}
	document.body.append(line3);
	document.body.append(line4); //adding the other two parallelogram sides to HTML
	
	document.getElementById("circle_area").value = Math.PI * Math.pow(R, 2); //calculating the circle area
}

document.addEventListener("click", function(){ //processing the clicks
	var e = window.event;
	var x = e.pageX;
	var y = e.pageY;
	if (!(((x >= 0) && (x <= 350) && (y >= 0) && (y <= 220)) || ((x >= 0) && (x <= 95) && (y >= 221) && (y <= 265)))) { //isolating the form area
		var div = document.createElement('div');
		div.className = "red_circle";
		div.style.top = (y - 5.5) + "px";
		div.style.left = (x - 5.5) + "px";
		var coord = "(" + x + ", " + y + ")";
		if (document.getElementById("first_point").value == "") {
			document.getElementById("first_point").value = coord;
			div.id = "c1";
		} else if (document.getElementById("second_point").value == "") {
			document.getElementById("second_point").value = coord;
			div.id = "c2";
		} else if (document.getElementById("third_point").value == "") {
			document.getElementById("third_point").value = coord;
			div.id = "c3";
			build_paral(parseFloat(x), parseFloat(y));
		} else {
			document.getElementById("first_point").value = document.getElementById("second_point").value;
			document.getElementById("second_point").value = document.getElementById("third_point").value;
			document.getElementById("third_point").value = coord;
			let red_circle = document.getElementById("c1"); //removing the odd point from HTML
			red_circle.parentNode.removeChild(red_circle);
			let s_circle = document.getElementById("c2");
			s_circle.id = "c1";
			let t_circle = document.getElementById("c3");
			t_circle.id = "c2";
			div.id = "c3";
			let yellow_circle = document.getElementById("yell");
			yellow_circle.parentNode.removeChild(yellow_circle); //removing the yellow circle from HTML
			let line1 = document.getElementById("line1");
			line1.parentNode.removeChild(line1);
			let line2 = document.getElementById("line2");
			line2.parentNode.removeChild(line2);
			let line3 = document.getElementById("line3");
			line3.parentNode.removeChild(line3);
			let line4 = document.getElementById("line4");
			line4.parentNode.removeChild(line4); //removing the parallelogram from HTML
			build_paral(x, y); //building the parallelogram and the yellow circle
		}
		document.body.append(div); //adding the red circle to HTML
	}
});

document.addEventListener("mousemove", function(){ //getting current cursor coordinates
	var e = window.event;
    document.getElementById('coords').value = "(" + e.pageX + ", " + e.pageY + ")";
});

function reset() { //reseting the page
	var circle1 = document.getElementById("c1");
	circle1.parentNode.removeChild(circle1);
	var circle2 = document.getElementById("c2");
	circle2.parentNode.removeChild(circle2);
	var circle3 = document.getElementById("c3");
	circle3.parentNode.removeChild(circle3);
	var yellow_circle = document.getElementById("yell");
	yellow_circle.parentNode.removeChild(yellow_circle);
	var line1 = document.getElementById("line1");
	line1.parentNode.removeChild(line1);
	var line2 = document.getElementById("line2");
	line2.parentNode.removeChild(line2);
	var line3 = document.getElementById("line3");
	line3.parentNode.removeChild(line3);
	var line4 = document.getElementById("line4");
	line4.parentNode.removeChild(line4);
	document.forms[0].reset();
}

function about() { //displaying the info
	window.alert("This program was made by Iryna Zozulia on 4th August, 2020" + 
			   "\nVersion: 1.0" +
			   "\nInstructions:" +
			   "\n1) Click the left mouse button to choose the point;" +
			   "\n2) Press the 'Скасувати' button to reset the page;" +
			   "\n3) Press the 'Інформація' button to read the info;" +
			   "\n4) Note that you can't select a point in the form area.");
}