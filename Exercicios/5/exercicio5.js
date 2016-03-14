var interval = null;
var banners = ["img/meme_1.jpg", "img/meme_2.jpg", "img/meme_3.jpg"];
var currentBanner = 0;

// troca banner
function slideBanner() {
	currentBanner = (currentBanner + 1) % 4;
	
	// se o resto de (banner + 1) / 4 for maior que 2, seta 0 pois o array só tem idx até 2
	if(currentBanner > 2) {
		currentBanner = 0;
	}
	document.getElementById("bannerImg").src = banners[currentBanner];
}

interval = setInterval(slideBanner, 4000);

// dá stop na execução e anula o intervalo
function stopBannerExecution() {
	clearInterval(interval);
	interval = null;
}

// reinicia a execução nos 4 segundos
function startBannerExecution() {
	interval = setInterval(slideBanner, 4000);
}