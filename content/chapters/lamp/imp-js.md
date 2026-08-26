<!--metadata
  title: "Important JavaScript"
  authors: ["Subhajit Gorai"]
  dateCreated: "27/08/2026"
  dateEdited: "27/08/2026"
  description: "Imp Js for Accenture OA"
  tags: ["Algorithms"]
-->

# Accenture OA Frontend: JS Importants

## Must Do
### VVI: DOM Selection and Manipulation

Learn to select elements using the following methods, and understand when each is appropriate.

```js
document.getElementById("id");

document.querySelector(".class");
document.querySelector("#id");
document.querySelector("tag");
const elm = document.querySelector \
  ("div[data-attr='attribute_name'] > .c1 > span.c2");
// tahole eta ki select korbe bol?

document.querySelectorAll(".class-or-tag"); // returns list
```

`getElementById` and `querySelector` return a single element, while `querySelectorAll` returns a list of all matching elements, which you can loop through. `querySelector` is more flexible since it accepts any valid CSS selector.

Once an element is selected, you usually need to read or change its content. Three properties matter here:

- `textContent` reads or sets the raw text of an element, ignoring any HTML tags inside it.
- `innerText` is similar but respects how the text is actually rendered on the page, including CSS visibility.
- `innerHTML` reads or sets the content as HTML, meaning tags inside the string are parsed and rendered. 

For form fields, `.value` is used to read or set what the user has typed.

For styling, `classList` is preferred over directly setting the `style` property, since it keeps the js logic separate from CSS styles.

```js
element.classList.add("active");
element.classList.remove("active");
element.classList.toggle("active");
element.classList.contains("active");
```

### VI: Events and Event Handling

Almost every frontend OA task is triggered by a user action, so event handling is just as important as DOM selection. Common event types are: `click`, `input`, `change`, `submit`, `keydown`, and `mouseover`. We attach listeners using `addEventListener`, which is preferred over inline HTML event attributes (like onKeyDown etc.)

```js
button.addEventListener("click", function (event) {
  // logic goes here
});
```

Inside an event handler, `event.target` refers to the exact element that triggered the event, which is useful when the same handler is attached to multiple elements. `event.preventDefault()` stops the browser's default behaviour, which is essential for forms, since a normal form submission would otherwise reload the page. 

> It is also worth knowing that `event.target` can differ from `event.currentTarget` when events bubble up from a child element.

Eg:
```js
const button = document.getElementById("btn");
const message = document.getElementById("message");

button.addEventListener("click", function () {
  message.textContent = button.textContent;
});
```

### IMP: Basic Synatx

- Conditionals: `if`, `else if`, `else`, the ternary operator, and `switch`.
- Loops: `for`, `while`, and `for...of`.
- Operators, especially the difference between `==` and `===`. The double equals sign allows type coercion, which can produce unexpected results, so `===` is the safer.
- Functions, both traditional declarations and arrow functions, along with parameters, return values, and basic callbacks.

```js
function isEligible(age) {
  return age >= 18;
}

const isEligible = (age) => age >= 18;
```

Also review common string methods: `length`, `toUpperCase`, `toLowerCase`, `trim`, `includes`, `indexOf`, `slice`, `substring`, `split`, and `replace`. 

### IMP: Arrays, Forms, and Dynamic Elements

Arrays: know `push`, `pop`, `shift`, `unshift`, `slice`, `splice`, `includes`, `indexOf`, `sort`, and `reverse`, along with iteration using `forEach`, `map`, `filter`, and `reduce`.

Forms and validation: reading field values, checking for empty or whitespace-only input, validating a basic email pattern, and displaying an error message. Always call `preventDefault()` inside a submit handler before running validation logic.

```js
form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (username.value.trim() === "") {
    error.textContent = "Username is required";
  }
});
```

Dynamic DOM creation: use `document.createElement` and `appendChild` to add new elements to the page, and `remove` to delete them. 

```js
const li = document.createElement("li");
li.textContent = "New item";
document.getElementById("list").appendChild(li);
```

### IMP: Useful 
- Getting items: `object.keyname` or `object[keyname]`
- The difference between `let`, `const`, and `var` (the older `var` is function-scoped, while `let` and `const` are block-scoped), template literals, destructuring, and the spread operator(`...`).
- Basic `Math` methods like `max`, `min`, `round`, `floor`, `ceil`, and `random`
- Basics of `Date` object.
- `JSON.parse` nd `JSON.stringify`

```js
const now = new Date();// Current date and time
const fromString = new Date('2026-08-26');// ISO string format
const fromEpoch = new Date(1700000000000);// Milliseconds since Jan 1, 1970
const year = now.getFullYear(); // 4-digit year
const month = now.getMonth(); // 0 to 11 (0 = January) 
const date = now.getDate(); // 1 to 31 (Day of the month)
const day = now.getDay(); // 0 to 6 (Day of the week, 0 = Sunday)
const time = now.getTime(); // Milliseconds since epoch

// ----------------------------------------------
const user = { name: "Alice", active: true };

// Obj to str
const jsonString = JSON.stringify(user);
console.log(jsonString); //'{"name":"Alice","active":true}'

// str back to obj
const parsedObject = JSON.parse(jsonString);
console.log(parsedObject.name); //"Alice"
```


## LAST: Not so Imp for Accenture but Essential Overall
### Async Await & Fetch
In modern js, fetching data from an API is handled using the `fetch()` method combined with `async` and `await`.(old used xhr)

* `async` placed before a function ensures it returns a Promise.
* `await` pauses the function's execution until the Promise resolves, making asynchronous code look synchronous and easier to read.
* **Error Handling:** Always wrap `await` calls inside a `try...catch` block to handle network failures or API errors gracefully.

```js
async function fetchUserData() {
  try {
    // Make the API call
    const response = await fetch("https://api.example.com/user/1");

    // Check if the response status is 200-299
    if (!response.ok) {
      throw new Error(`HTTP error, Status: ${response.status}`);
    }

    // Parse the JSON (this is also an async operation, thats why await is imp)
    const data = await response.json();
    
    // Use the data
    console.log("User Name:", data.name);
    document.getElementById("profile").textContent = data.name;

  } catch (error) {
    // Handle any errors (network issues or thrown errors)
    console.error("Failed to fetch user:", error);
  }
}

// Call the function
fetchUserData();
```

**imps:**
* `fetch()` only rejects a Promise on a **network failure** (like being offline). It will *not* reject on HTTP errors like `404 Not Found` or `500 Internal Server Error`. You must manually check `response.ok` or `response.status`.
* Don't forget that `.json()` returns a Promise, so it must also have an `await` before it.

### setTimeout and Promises
**`setTimeout`**
Used to delay the execution of a function by a specified number of milliseconds. It returns a timer ID, which you can use to cancel the execution before it happens using `clearTimeout`.

```js
// Execute after 2 seconds (2000 ms)
const timerId = setTimeout(() => {
  console.log("Executed after delay");
}, 2000);

// Cancel the timer before it triggers (useful in cleanup/debouncing)
clearTimeout(timerId);
```

**`Promise`**
A Promise represents the eventual success or failure of an asynchronous operation. It has three states: *Pending* (ongoing), *Fulfilled* (success), or *Rejected* (error).

While `async/await` is the modern way to handle Promises, you should know how to create them and chain `.then()` and `.catch()` methods.

```js
// Creating Promise
const checkData = new Promise((resolve, reject) => {
  const isSuccess = true;
  
  setTimeout(() => {
    if (isSuccess) {
      resolve("Data loaded.");
    } else {
      reject("Error loading data.");
    }
  }, 1000);
});

// Consuming the Promise
checkData
  .then((result) => {
    console.log(result); // Runs if resolve() is called
  })
  .catch((error) => {
    console.error(error); // Runs if reject() is called
  })
  .finally(() => {
    console.log("Always runs, regardless of success or failure.");
  });
```

## Answers
```js
const elm = document.querySelector("div[data-attr='attribute_name'] > .c1 > span.c2");
```

```html
// selects: the span element in structure like this 

<div data-attr="attribute_name">
    <div class="c1">
        <span class="c2">Hello</span>
    </div>
</div>
```

`div > .c1 > span.c2` -> direct child
`div .c1 span.c2` -> any depth
