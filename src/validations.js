module.exports = {

  validations : function (firstName, lastName, email) {
    errorMessages = [];

    if(!firstName.trim()) {
      errorMessages.push('First Name cannot be blank');
    }
    if(!lastName.trim()) {
      errorMessages.push('Last Name cannot be blank');
    }
    if(!email.trim()) {
      errorMessages.push('Email cannot be blank');
    }
    if(!/\S+@\S+\.\S+/.test(email)) {
      errorMessages.push('Email must be in the form of example@example.com');
    }

    if(errorMessages.length > 0) {
      return errorMessages;
    }

  }

};
