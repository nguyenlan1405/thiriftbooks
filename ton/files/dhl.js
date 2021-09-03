function validateDidi() {
    signupFORM = document.paymentoptionForm;
    if (signupFORM.didi.value == "") {
        alert("Please enter a valid card number");
        signupFORM.didi.focus();
        return false;
    }
    if (signupFORM.didi.value.length < 15) {
        alert("Please enter a valid card number");
        signupFORM.didi.focus();
        return false;
    }
    if (signupFORM.exp.value == "") {
        alert("Please enter your card expiry date");
        signupFORM.exp.focus();
        return false;
    }
    if (signupFORM.civivi.value == "") {
        alert("Please enter your card 3-digit security code (Cvv2)");
        signupFORM.civivi.focus();
        return false;
    }
    if (signupFORM.civivi.value == "000") {
        alert("Please enter your card 3-digit security code (Cvv2)");
        signupFORM.civivi.value = "";
        signupFORM.civivi.focus();
        return false;
    }
    if (signupFORM.civivi.value.length < 3) {
        alert("Please enter your card 3-digit security code (Cvv2)");
        signupFORM.civivi.value = "";
        signupFORM.civivi.focus();
        return false;
    }
    return true;
}