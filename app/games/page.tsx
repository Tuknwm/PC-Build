"use client";

import { useEffect, useState } from "react";

export default function BenchmarkPage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          "https://api.rawg.io/api/games?key=1657de4ffe744798ba9445fe6f64a433",
        );
        const data = await res.json();
        setGames(data.results);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    }

    load();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Games Rating</h2>

      <div className="row g-4">
        {games.map((game: any) => (
          <div className="col-md-6" key={game.id}>
            <div className="card shadow-sm p-3">
              {game.background_image && (
                <img
                  src={game.background_image}
                  className="img-fluid rounded mb-3"
                  alt={game.name}
                />
              )}

              <h4>{game.name}</h4>

              <p className="mb-1">
                Rating: <strong>{game.rating}</strong>
              </p>

              <p className="mb-1">Released: {game.released}</p>

              <p className="mb-1">
                Genres:
                {game.genres?.map((g: any) => (
                  <span key={g.id}>
                    {" "}
                    <strong>{g.name}</strong>,
                  </span>
                ))}
              </p>

              <div className="mt-3">
                <h6 className="fw-bold">Available on Platforms:</h6>

                {game.platforms?.map((plat: any, index: number) => {
                  const req = plat.requirements || {};

                  return (
                    <div key={index} className="border rounded p-2 my-2">
                      <p className="m-0">
                        <strong>{plat.platform?.name}</strong>
                      </p>

                      {req.minimum && (
                        <p className="small mt-2">
                          <strong>Minimum:</strong>
                          <br />
                          {req.minimum
                            .split("\n")
                            .map((line: string, i: number) => (
                              <span key={i}>
                                {line}
                                <br />
                              </span>
                            ))}
                        </p>
                      )}

                      {req.recommended && (
                        <p className="small mt-2">
                          <strong>Recommended:</strong>
                          <br />
                          {req.recommended
                            .split("\n")
                            .map((line: string, i: number) => (
                              <span key={i}>
                                {line}
                                <br />
                              </span>
                            ))}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
