# uptimerobot.js
A simple and intuitive way to interact with the UptimeRobot API v2, allowing users to easily monitor their websites' uptime, downtime, and performance metrics.

---

## Features
- **Easy to Use**: Designed with simplicity in mind, enabling quick integration into your projects.
- **Event-Driven**: Supports event-based responses for real-time monitoring and handling.
- **Promise-Based API**: Offers a promise-based approach for handling asynchronous operations, making your code cleaner and more readable.
- **Flexible Configuration**: Allows customization of request parameters to suit your monitoring needs.
- **Error Handling**: Emits detailed error events for robust error handling and debugging.

---

## Installation
To install `uptimerobot.js`, using npm:

```bash
npm install uptimerobot.js
```

or you can use yarn:

```bash
yarn add uptimerobot.js
```

---

## Usage
First import the `URClient` class from the library:
```js
import { URClient } from "uptimerobot.js";
```

Then initialize the client with your Uptime Robot API Key
> NOTE: read-only keys are required, any other key type will error.

```js
const ur = new URClient({ api_key: "ur1237348731-138175683126-39765382165" });
```

---

## Available Methods
Currently you can only fetch all monitors, we are working on adding more functionality and improvements over-time.

### Get All Monitors
To retrieve all monitors with the default options:

###### Promise

```js
ur.getMonitors().then(monitors => {
    console.log(`Fetched a total of: ${monitors.length} monitors`);
}).catch((err) => {
    console.error(`Error fetching monitors: ${err.message}`);
});
```

###### Events
You can additionally listen to **all** events using our emitter.

```js
await ur.getMonitors();

ur.on("getMonitors", (monitors) => {
    console.log(`Fetched a total of: ${monitors.length} monitors`)
});

ur.on("error", (error) => {
    console.log(`Error fetching monitors: ${error}`)
})
```

---

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue if you have any suggestions or find any bugs.

---

## License
This project is licensed under the [MIT License](https://opensource.org/license/mit) - See [LICENSE](./LICENSE) for details! 
