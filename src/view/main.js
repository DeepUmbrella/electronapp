window.addEventListener("DOMContentLoaded", () => {
  //main

  const userNameShowElement = document.querySelector("#user-name-show");
  const userIdShowElement = document.querySelector("#user-id-show");
  const userGoldNumberElement = document.querySelector("#user-gold-number");
  const userIdSelectElement = document.querySelector("#user-id-select");
  const arrivalTimeElement = document.querySelector("#arrival-time");
  const gameOptionsElement = document.querySelector("#game-options");
  const gameValueElement = document.querySelector("#game-value");
  //

  window.WinAPI.HandleEvent("setting-update", (name, id, gold, arrivalTime) => {
    userNameShowElement.innerHTML = name;
    userIdShowElement.innerHTML = id;
    userGoldNumberElement.innerHTML = gold;
    userIdSelectElement.value = id;
    arrivalTimeElement.innerHTML = arrivalTime;
  });

  const toggleElements = document.querySelectorAll('[data-toggle="recharge"]');

  for (const toggleElement of toggleElements) {
    toggleElement.addEventListener("click", (e) => {
      //打开窗口
      const target = toggleElement.dataset.rechargeTarget;

      const element = document.querySelector(target);
      // 使用 dataset 属性访问 data-* 属性的值

      if (element) {
        element.classList.toggle("recharge-open");
      }
    });
  }

  //select options

  const rechargeOptionsElement = document.querySelector("#recharge-options");

  const paymentElement = document.querySelector(
    '[data-toggle="recharge-pre-order"]'
  );

  const firstLevelChildren = document.querySelectorAll(".option-item");

  const allShowPaymentsElements = document.querySelectorAll(".pay-number");

  const paymentToDoneElement = document.querySelector(
    '[data-toggle="recharge-payment"]'
  );

  const paymentLoadingMaskElement = document.querySelector(
    ".payment-loading-mask"
  );

  const rechargePageElement = document.querySelector(".recharge-done");

  const paymentDoneElement = document.querySelector(
    '[data-toggle="recharge-done"]'
  );

  gameOptionsElement.addEventListener("change", (e) => {
    e.preventDefault();
    allShowPaymentsElements.forEach((element) => {
      element.innerHTML = "0.00";
    });
    rechargeOptionsElement.dataset.show = e.target.value;
  });

  if (paymentDoneElement && rechargePageElement) {
    paymentDoneElement.addEventListener("click", () => {
      // 计算加法结果
      const newTotal =
        parseInt(userGoldNumberElement.innerHTML) -
        parseInt(paymentElement.dataset.selectPrice);

      // 判断是否超过最大整数
      if (newTotal < 0) {
        // 如果超过最大整数，则设置为最大整数
        userGoldNumberElement.innerHTML = (0).toString();
      } else {
        // 如果没有超过最大整数，正常设置值
        userGoldNumberElement.innerHTML = newTotal.toString();
      }

      rechargePageElement.classList.remove("recharge-open");

      //
      allShowPaymentsElements.forEach((element) => {
        element.innerHTML = "0.00";
      });
      paymentElement.dataset.selectPrice = "0.00";
      paymentElement.classList.remove("enable");

      firstLevelChildren.forEach((element) => {
        element.classList.remove("selected");
      });
    });
  }

  let paymentDoneSignal = false;

  if (paymentToDoneElement && paymentLoadingMaskElement) {
    paymentToDoneElement.addEventListener("click", () => {
      if (paymentDoneSignal) {
        return;
      }
      paymentDoneSignal = true;

      paymentLoadingMaskElement.classList.add("show-loading");
      setTimeout(() => {
        paymentLoadingMaskElement.classList.remove("show-loading");

        const allCurrentOpenElements =
          document.querySelector(".recharge-doing");

        allCurrentOpenElements.classList.remove("recharge-open");

        //打开窗口
        const target = paymentToDoneElement.dataset.rechargeTarget;

        const element = document.querySelector(target);
        // 使用 dataset 属性访问 data-* 属性的值

        if (element) {
          element.classList.toggle("recharge-open");
        }
        paymentDoneSignal = false;
      }, 6 * 1000);
    });
  }

  if (rechargeOptionsElement) {
    rechargeOptionsElement.addEventListener("click", (e) => {
      for (var i = 0; i < firstLevelChildren.length; i++) {
        var child = firstLevelChildren[i];

        if (child.contains(e.target)) {
          paymentElement.dataset.selectPrice = child.dataset.topUpNumber;

          for (const showPaymentElement of allShowPaymentsElements) {
            showPaymentElement.innerHTML =
              "" + child.dataset.topUpNumber + ".00";
          }

          !child.classList.contains("selected") &&
            child.classList.add("selected");

          !paymentElement.classList.contains("enable") &&
            paymentElement.classList.add("enable");
        } else {
          child.classList.remove("selected");
        }
      }
    });
  }

  //payment order

  if (paymentElement) {
    paymentElement.addEventListener("click", (e) => {
      const selectPrice = paymentElement.dataset.selectPrice;

      const prePrice = parseInt(selectPrice);

      if (prePrice <= 0) return;

      //打开窗口
      const target = paymentElement.dataset.rechargeTarget;

      const element = document.querySelector(target);
      // 使用 dataset 属性访问 data-* 属性的值

      if (element) {
        element.classList.toggle("recharge-open");
      }
    });
  }
});
