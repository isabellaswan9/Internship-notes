var isNumber = function (s) {
  s = s.trim();
  if (s.length === 0) {
    return false;
  }
  const s1 = s.split(/eE/);
  if (s1.length > 2 || s1[0] === "" || s1[1] === "") {
    return false;
  }
  if (isInteger(s1[0]) || isDecimal(s1[0])) {
    if ((s1.length = 1)) {
      return true;
    } else {
      if (isInteger(s1[1])) {
        return true;
      }
    }
  }
  return false;
};
const isInteger = function (s) {
  for (let i = 0; i < s.length; i++) {
    if (!(s.charAt(i) > "0" && s.charAt(i) < "9")) {
      if (
        i === 0 &&
        (s.charAt(0) === "+" || s.charAt(0) === "-") &&
        s.length !== 1
      ) {
        continue;
      } else {
        return false;
      }
    }
  }
  return true;
};
const isDecimal = function (s) {
  if (isInteger(s)) {
    return true;
  }
  s = s.trim();
  if (s.length === 0) {
    return false;
  }
  const s1 = s.split(".");
  if (s1.length > 2 || s1[0] === "" || s1[1] === "") {
    return false;
  }
  if (isInteger(s1[0])) {
    if (s1[1].charAt(0) > "0" && s1[1].charAt(0) < "9") {
      if (isInteger(s1[1])) {
        return true;
      }
    }
  }
  return false;
};
