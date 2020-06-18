//image loading
var imageNames = [
	"PlayerSpaceship.png",
	"PlayerSpaceship_Outline.png",
	"shield_1.png",
	"shield_2.png",
	"shield_3.png",
	"shield_4.png",
	"shield_5.png",
	"shield_5-super.png",
	"shot_laser1.png",
	"shot_laser2.png",
	"enemyAalt.png",
	"enemyAalt_shot.png",
	"enemyB.png",
	"Level_1_Background.jpg",
	"PlayerSpaceship_chris.png",
	"greeblicious.gif",
	"Asteroid_2.png",
	"asteroid_3.png",
	"asteroid_4.png",
	"asteroid_5.png",
	"weapon_atom_1.png",
	"weapon_atom_2.png",
	"weapon_basic.png",
	"weapon_mid.png",
	"satellite_human.png",
	"LV1_Boss.png",
	"star.png",
	"pickupItem_atom.png",
	"pickupItem_mid.png",
	"pickupItem_laser.png",
	"pickupItem_shield.png",
	"pickupItem_speed.png",
	"MainScreen.png",
	"TitleScreenTwo.png",
	"leftUiSegment.png",
	"rightUiSegment.png",
	"bossBasicWeapon.png",
	"GameOverScreen.png",
	"uiLeftSegment.png",
	"uiRightSegment.png",
	"uiShieldBar.png",
	"uiShieldBarsInvincible.png",
	"uiSmallBracket_Left.png",
	"uiSmallBracket_Right.png",
	"uiCenterBracket_Left.png",
	"uiCenterBracket_Right.png"
];
var imageLoadCounter = imageNames.length;
var imageArray = [];

function receivedImage() {
	imageLoadCounter--;
	if (imageLoadCounter <= 0) {
		startGame();
	}
}

function imageLoading() {
	for (var i = 0; i < imageNames.length; i++) {
		var newImg = document.createElement("img");
		newImg.onload = receivedImage;
		newImg.src = imageNames[i];
		imageArray[imageNames[i]] = newImg;
	}
}
