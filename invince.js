
var input = document.querySelector("#phone"),
	dialCode = document.querySelector(".dialCode"),
 	errorMsg = document.querySelector("#error-msg");
	
var iti = intlTelInput(input, {
  initialCountry: "us",
  placeholderNumberType: 'FIXED_LINE',
});

var updateInputValue = function (event) {
       dialCode.value = "+" + iti.getSelectedCountryData().dialCode;
};
input.addEventListener('input', updateInputValue, false);
input.addEventListener('countrychange', updateInputValue, false);

var errorMap = [
  "Please enter a valid phone number.",
  "Please select a valid country code.",
  "The phone number is too short. Please check and try again.",
  "The phone number is too long. Please check and try again.",
  "Please enter a valid phone number."
];

var reset = function() {
  input.classList.remove("error");
  errorMsg.innerHTML = "";
  errorMsg.classList.add("hide");
};

input.addEventListener('blur', function() {
  reset();
  if (input.value.trim()) {
    if (iti.isValidNumber()) {
      validMsg.classList.remove("hide");
    } else {
      input.classList.add("error");
      var errorCode = iti.getValidationError();
      errorMsg.innerHTML = errorMap[errorCode];
      errorMsg.classList.remove("hide");
    }
  }
});

input.addEventListener('change', reset);
input.addEventListener('keyup', reset);



  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    loop: true,
    speed: 800,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true, // 👈 stops on hover
    },
  });
