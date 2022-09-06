function calender(arr) {
  let newObj = {};
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    let count = 1;
    let width = 600;
    let temp = arr[i].end;

    for (let j = i + 1; j < arr.length; j++) {
      if (temp > arr[j].start) {
        count = count + 1;
      }
    }
    if (i > 0) {
      if (arr[i - 1].end > arr[i].start) {
        count = count + 1;
        width = width / count;
      }
      if (
        i < arr.length - 1 &&
        arr[i].end > arr[i + 1].start &&
        !(arr[i - 1].end > arr[i].start)
      ) {
        width = width / count;
      }
      if (
        i < arr.length - 1 &&
        arr[i - 1].end > arr[i].start &&
        arr[i].end > arr[i + 1].start
      ) {
        width = 600 - newArr[i - 1].width;
      }
      if (
        i < arr.length - 1 &&
        arr[i - 1].end > arr[i].start &&
        !(arr[i].end > arr[i + 1].start)
      ) {
        width = 600 - newArr[i - 1].width;
      }
      if (
        i < arr.length - 1 &&
        i <= arr.length - 3 &&
        arr[i + 1].start < arr[i - 1].end &&
        arr[i - 1].end > arr[i].start
      ) {
        width = newArr[i - 1].width;
      }
      if (
        i < arr.length - 1 &&
        arr[i + 1].start < arr[i - 1].end &&
        arr[i - 1].end > arr[i].start
      ) {
        width = newArr[i - 1].width;
      }
      if (
        i >= 2 &&
        i < arr.length - 1 &&
        arr[i - 1].end > arr[i].start &&
        arr[i].end > arr[i + 1].start &&
        arr[i - 2].end > arr[i].start
      ) {
        width = newArr[i - 1].width;
      }
      if (
        arr.length > 2 &&
        i == arr.length - 1 &&
        arr[i].start < arr[i - 2].end
      ) {
        width = newArr[i - 1].width;
      }
      if (i > 2 && arr[i].start < arr[i - 2].end) {
        width = newArr[i - 1].width;
      }
    } else {
      width = width / count;
    }

    newObj = { ...arr[i], width };
    newArr.push(newObj);
  }

  return newArr;
}

function margin() {
  let arr = calender([
    { id: 1, start: 90, end: 130 }, // an event from 10:30am to 11.10am
    { id: 2, start: 105, end: 135 }, // an event from 10:45am to 11:15am
    { id: 3, start: 120, end: 240 }, // an event from 11:00am to 1:00pm
    { id: 4, start: 180, end: 260 }, // an event from 12:00pm to 1:20pm
    { id: 5, start: 500, end: 560 }, // an event from 5:20pm to 6:20pm
  ]);

  let newArr = [];
  let newObj = {};

  let left = 0;

  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      left = 0;

      newObj = { ...arr[0], left };
      newArr.push(newObj);
    }
    if (i === 1) {
      if (arr[i - 1].end > arr[i].start) {
        left = newArr[i - 1].width;
        newObj = { ...arr[i], left };
        newArr.push(newObj);
      } else {
        left = 0;
        newObj = { ...arr[i], left };
        newArr.push(newObj);
      }
    }
    if (i > 1) {
      if (arr[i].start < arr[i - 1].end) {
        left = newArr[i - 1].width + newArr[i - 1].left;

        if (left >= 600) {
          left = 0;
        }

        newObj = { ...arr[i], left };
        newArr.push(newObj);
      } else {
        left = 0;
        newObj = { ...arr[i], left };
        newArr.push(newObj);
      }
    }
  }
  return newArr;
}

let arr = margin();

for (let i = 0; i < arr.length; i++) {
  schedule = arr[i];
  let height = arr[i].end - arr[i].start;
  let marginTop = arr[i].start;
  let left = arr[i].left;

  let divFlex = document.createElement("div");
  divFlex.className = "div-flex";
  divFlex.style.width = schedule.width + "px";
  divFlex.style.height = height + "px";
  divFlex.style.top = marginTop + "px";
  divFlex.style.left = left + "px";
  divFlex.style.position = "absolute";
  divFlex.style.border = "thin groove";
  divFlex.style.marginLeft = "5px";

  let divBackGround = document.createElement("div");
  divBackGround.className = "div-backgrn";

  let div = document.createElement("div");
  div.className = "schedules";

  let divText = document.createElement("div");
  divText.textContent = "Sample Item";
  divText.className = "div-text";

  let divLocation = document.createElement("div");
  divLocation.textContent = "Sample Location";
  divLocation.className = "div-location";

  div.append(divText, divLocation);

  divFlex.append(divBackGround, div);

  document.getElementById("calander").appendChild(divFlex);
}
