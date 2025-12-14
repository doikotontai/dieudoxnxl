<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDBdfswGWEefQR8Djscm2hkaKsi0438ODQ",
    authDomain: "webshop-japan.firebaseapp.com",
    projectId: "webshop-japan",
    storageBucket: "webshop-japan.firebasestorage.app",
    messagingSenderId: "854451712478",
    appId: "1:854451712478:web:d55198786d10a9b98d2d4f",
    measurementId: "G-LGWDL5HTYZ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>