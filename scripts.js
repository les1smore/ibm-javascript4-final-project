document.getElementById("search-button").addEventListener("click", function () {
  var searchTerm = document.getElementById("search-input").value.toLowerCase();
  var resultsContainer = document.getElementById("results-container");

  console.log("Search Term:", searchTerm); // Debugging statement

  // Hide the results container by default
  resultsContainer.style.display = "none";
  resultsContainer.innerHTML = ""; // Clear previous results

  // Define destination arrays
  var destinations = [
    {
      name: "Sydney, Australia",
      description:
        "A beautiful coastal city with a relaxed atmosphere, featuring the Sydney Opera House, Harbour Bridge, and stunning beaches.",
      image: "sydney.jpg",
      tags: ["beach"], // tag destinations for easier filtering
    },
    {
      name: "Rio de Janeiro, Brazil",
      description:
        "Marvel at the breathtaking views of Rio, enjoy the Copacabana and Ipanema beaches.",
      image: "./rio.jpg",
      tags: ["beach"],
    },
    {
      name: "Kyoto, Japan",
      description:
        "Home to thousands of classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines, and traditional wooden houses.",
      image: "./kyoto.jpg",
      tags: ["temple"],
    },
    {
      name: "Siem Reap, Cambodia",
      description:
        "Famous for the magnificent temples of Angkor Wat, a vast temple complex featuring the intricate carvings and architecture of the Khmer Empire.",
      image: "./siem.jpg",
      tags: ["temple"],
    },
    {
      name: "New York, USA",
      description:
        "The Big Apple, a city that never sleeps, offering a diverse cultural scene, Broadway shows, and iconic sights like Times Square.",
      image: "./newyork.jpg",
      tags: ["usa"],
      timeZone: "America/New_York",
    },
    {
      name: "Los Angeles, USA",
      description:
        "The City of Angels, known for its entertainment industry, beaches, and cultural diversity.",
      image: "./la.jpg",
      tags: ["usa"],
      timeZone: "America/Los_Angeles",
    },
  ];

  // Initialize an empty array for filtered destinations
  var filteredDestinations = [];

  // Filter logic for different search terms
  if (searchTerm === "beach") {
    filteredDestinations = destinations
      .filter(function (destination) {
        return destination.tags.includes("beach");
      })
      .slice(0, 2); // Limit to two results for simplicity
  } else if (searchTerm === "temple") {
    filteredDestinations = destinations
      .filter(function (destination) {
        return destination.tags.includes("temple");
      })
      .slice(0, 2);
  } else if (searchTerm === "usa") {
    var filteredDestinations = destinations
      .filter(function (destination) {
        return destination.tags
          .map((tag) => tag.toLowerCase())
          .includes(searchTerm);
      })
      .slice(0, 2);

    console.log("Filtered Destinations:", filteredDestinations); // Debugging statement
    // Display the time for all USA destinations
    var timeElement = document.createElement("div");
    timeElement.className = "current-time";
    // Display the time for the first USA destination
    timeElement.innerHTML = `Current Local Time (America/New_York): ${getCurrentTime(
      "America/New_York"
    )}`;
    resultsContainer.appendChild(timeElement);

    filteredDestinations = destinations
      .filter(function (destination) {
        return destination.tags.includes("usa");
      })
      .slice(0, 2);
  }

  // Add new results to the page
  filteredDestinations.forEach(function (destination) {
    var destinationElement = document.createElement("div");
    destinationElement.className = "destination-result";
    var localTime = destination.timeZone
      ? `<p>Local Time: ${getCurrentTime(destination.timeZone)}</p>`
      : "";
    destinationElement.innerHTML = `
      <img src="${destination.image}" alt="${destination.name}">
      <h3>${destination.name}</h3>
      <p>${destination.description}</p>
      ${localTime}
      <button onclick="visitDestination('${destination.name}')">Visit</button>
    `;
    resultsContainer.appendChild(destinationElement);
  });

  // Show the results container if there are results
  if (filteredDestinations.length > 0) {
    resultsContainer.style.display = "grid";
  }
});

document.getElementById("clear-button").addEventListener("click", function () {
  document.getElementById("search-input").value = "";
  resultsContainer.style.display = "none"; // Hide results container
  document.getElementById("results-container").innerHTML = ""; // Clear the results
});

// Utility function to get the current function time given a timezone
function getCurrentTime(timeZone) {
  var now = new Date();
  var options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: timeZone,
    hour12: false,
  };
  return new Intl.DateTimeFormat("en-US", options).format(now);
}

function visitDestination(name) {
  console.log("Visiting " + name);
  // Implement the navigation or action for visiting a destination
}
