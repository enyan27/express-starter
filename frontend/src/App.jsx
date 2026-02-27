import { useEffect } from "react";
import { api } from "./libs/axios";

const App = () => {
  useEffect(() => {
    (async () => console.log((await api.get("/")).data))();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-orange-100">
        <div className="max-w-5xl mx-auto">
          <header className="flex justify-between">
            <h1>寝ても覚めても🦔</h1>
            <h1>寝ても覚めても🦔</h1>
          </header>
          <main className="bg-orange-200">
            <h1>寝ても覚めても🦔</h1>
          </main>
          <footer className="flex justify-center">
            <h1>寝ても覚めても🦔</h1>
          </footer>
        </div>
      </div>
    </>
  );
};

export default App;
