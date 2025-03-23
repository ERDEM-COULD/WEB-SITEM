document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const likeButton = document.getElementById("like-button");
    const dislikeButton = document.getElementById("dislike-button");
    const messageContainer = document.getElementById("message-container");
    const messageText = document.getElementById("message-text");
    const redirectText = document.getElementById("redirect-text");

    let userVoted = JSON.parse(localStorage.getItem('userVoted')) || null;

    // Kullanıcı ID'si
    const userID = localStorage.getItem('userID') || Date.now();
    if (!localStorage.getItem('userID')) {
        localStorage.setItem('userID', userID);
    }

    // Beğenme butonuna tıklama
    likeButton.addEventListener("click", () => {
        // Ekranı donaltma
        blockScreen();

        // 2 saniye boyunca yazıyı ekranda göster
        messageText.textContent = "TEŞEKKÜRLER!";
        redirectText.textContent = ""; // "ŞİKAYET/ÖNERİ" metnini temizle
        messageContainer.style.color = "green"; // Yeşil renkte
        messageContainer.style.display = "block"; // Mesajı görünür yap

        setTimeout(() => {
            // 2 saniye sonra mesajı gizle
            messageContainer.style.display = "none"; // Mesajı gizle
        }, 2000); // 2 saniye sonra

        setTimeout(() => {
            if (userVoted === "like") {
                userVoted = null;
                likeButton.style.backgroundColor = "white";
            } else {
                userVoted = "like";
                likeButton.style.backgroundColor = "blue";
                dislikeButton.style.backgroundColor = "white";
            }

            localStorage.setItem('userVoted', JSON.stringify(userVoted));
        }, 2000); // 2 saniye bekleme süresi
    });

    // Beğenmeme butonuna tıklama
    dislikeButton.addEventListener("click", () => {
        // Ekranı donaltma
        blockScreen();

        // 2 saniye boyunca yazıyı ekranda göster
        messageText.textContent = "ÜZGÜNÜZ";
        redirectText.textContent = "ŞİKAYET/ÖNERİ'YE YÖNLENDİRİLİYORSUNUZ";
        messageContainer.style.color = "red"; // Kırmızı renkte
        messageContainer.style.display = "block"; // Mesajı görünür yap

        setTimeout(() => {
            // 2 saniye sonra başka bir sayfaya yönlendir
            window.location.href = "http://192.168.1.35:3000";
        }, 2000); // 2 saniye sonra yönlendir

        setTimeout(() => {
            // 2 saniye sonra mesajı gizle
            messageContainer.style.display = "none"; // Mesajı gizle
        }, 2000); // 2 saniye sonra
    });

    // Ekranı 2 saniye boyunca donaltma fonksiyonu
    function blockScreen() {
        // Ekranın donması
        document.body.style.pointerEvents = "none"; // Kullanıcı etkileşimini engelle
        setTimeout(() => {
            document.body.style.pointerEvents = "auto"; // Etkileşimi tekrar aç
        }, 2000); // 2 saniye sonra tekrar aç
    }
});
