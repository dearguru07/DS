import React, { useEffect, useState } from "react";

const TravelRoute = () => {
  const tickets = [
    ["Paris", "Skopje"],
    ["Zurich", "Amsterdam"],
    ["Prague", "Zurich"],
    ["Barcelona", "Berlin"],
    ["Kiev", "Prague"],
    ["Skopje", "Paris"],
    ["Amsterdam", "Barcelona"],
    ["Berlin", "Kiev"],
    ["Berlin", "Amsterdam"],
  ];

  const [route, setRoute] = useState([]);

  useEffect(() => {
    const findRoute = (tickets, start) => {
      const graph = {};
      tickets.forEach(([from, to]) => {
        if (!graph[from]) graph[from] = [];
        graph[from].push(to);
      });

      for (let city in graph) {
        graph[city].sort(); 
      }

      const result = [];
      const dfs = (city) => {
        while (graph[city] && graph[city].length > 0) {
          const nextCity = graph[city].shift();
          dfs(nextCity);
        }
        result.push(city);
      };

      dfs(start);
      return result.reverse();
    };

    const startCity = "Kiev";
    const travelRoute = findRoute(tickets, startCity);
    setRoute(travelRoute);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Travel Route</h1>
      <p>{route.length > 0 ? route.join(" → ") : "Calculating..."}</p>
    </div>
  );
};

export default TravelRoute;
