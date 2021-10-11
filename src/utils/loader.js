const loading = (popup, isloading) => {
  const submitBtn = popup.querySelector('.form__submit-btn');
  !isloading
    ? (submitBtn.textContent = 'Save')
    : (submitBtn.textContent = 'Loading...');
};

export default loading;
