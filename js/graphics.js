//Common Graphics Functions

// WARNING: this function is extremely slow, use drawImage instead!!
function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
	ctx.fillStyle = fillColor;
	ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

// WARNING: this function is extremely slow, use drawImage instead!!
function colorCircle(centerX, centerY, radius, fillColor) {
	ctx.fillStyle = fillColor;
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
	ctx.fill();
}

// WARNING: this function is extremely slow, use drawImage instead!!
function colorEmptyCircle(centerX, centerY, radius, strokeColor) {
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
	ctx.strokeStyle = strokeColor;
	ctx.stroke();
}

// WARNING: this function is extremely slow, use drawImage instead!!
function colorText(text = '', posX = 0, posY = 0, font = '16px Courier', color = 'white', alignment = 'left', shadow = true) {
	ctx.textAlign = alignment;
	ctx.font = font;
	if (shadow) {
		ctx.fillStyle = 'black';
		ctx.fillText(text, posX + 1, posY + 1);
	}
	ctx.fillStyle = color;
	ctx.fillText(text, posX, posY);
}

// WARNING: this function is extremely slow, use drawImage instead!!
function colorLine(startX, startY, endX, endY, lineWidth, fillColor) {
	ctx.strokeStyle = fillColor;
	ctx.lineWidth = lineWidth;
	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.stroke();
}

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY, withAngle) {
	ctx.save(); // allows us to undo translate movement and rotate spin
	ctx.translate(atX, atY); // sets the point where our graphic will go
	ctx.rotate(withAngle); // sets the rotation
	ctx.drawImage(graphic, -graphic.width / 2, -graphic.height / 2); // center, draw
	ctx.restore(); // undo the translation movement and rotation since save()
}

function drawLaserBeamLine(graphic, atX, atY) {
	for (var i = 0; i < (c.height) / graphic.height + 5; i++) {
		ctx.save(); // allows us to undo translate movement and rotate spin
		ctx.translate(atX, atY + Math.sin(180) * graphic.height * i); // sets the point where our graphic will go
		ctx.drawImage(graphic, -graphic.width / 2, -graphic.height / 2); //
		ctx.restore(); // undo the translation movement and rotation since save()
	}
}

function drawAngledLaserBeamLine(graphic, atX, atY, theAngle) {
	ctx.save(); // allows us to undo translate movement and rotate spin
	//ctx.translate(atX + Math.cos(theAngle * Math.PI / 180) * graphic.width , atY + Math.sin(theAngle * Math.PI / 180) * graphic.height );
	ctx.translate(atX, atY);
	ctx.rotate(theAngle * Math.PI / 180); // sets the rotation
	ctx.drawImage(graphic, -graphic.width, -graphic.height / 2); //
	ctx.restore(); // undo the translation movement and rotation since save()
}